const crypto = require('crypto');

const ENV_DEFINITIONS = [
  { key: 'NAVER_CLOUD_ACCESS_KEY', aliases: ['NCP_ACCESS_KEY'] },
  { key: 'NAVER_CLOUD_SECRET_KEY', aliases: ['NCP_SECRET_KEY'] },
  { key: 'NAVER_SENS_SERVICE_ID', aliases: ['NCP_SENS_SERVICE_ID'] },
  { key: 'NAVER_SENS_FROM', aliases: ['NCP_SENS_FROM'] }
];

function envValue(key, aliases = []) {
  const names = [key, ...aliases];
  for (const name of names) {
    const value = process.env[name];
    if (value !== undefined && String(value).trim() !== '') return String(value).trim();
  }
  return '';
}

function sensConfig() {
  return {
    accessKey: envValue('NAVER_CLOUD_ACCESS_KEY', ['NCP_ACCESS_KEY']),
    secretKey: envValue('NAVER_CLOUD_SECRET_KEY', ['NCP_SECRET_KEY']),
    serviceId: envValue('NAVER_SENS_SERVICE_ID', ['NCP_SENS_SERVICE_ID']),
    from: envValue('NAVER_SENS_FROM', ['NCP_SENS_FROM']),
    apiBase: envValue('NAVER_SENS_API_BASE') || 'https://sens.apigw.ntruss.com'
  };
}

function missingEnvNames() {
  return ENV_DEFINITIONS
    .filter((item) => !envValue(item.key, item.aliases))
    .map((item) => `${item.key}${item.aliases.length ? ` 또는 ${item.aliases.join('/')}` : ''}`);
}

function allowedOrigins() {
  const value = envValue('ALLOWED_ORIGIN') || envValue('SENS_ALLOWED_ORIGINS');
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function setCors(req, res) {
  const origins = allowedOrigins();
  if (!origins.length) return;
  const origin = req.headers.origin || '';
  if (origins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function isAllowedOrigin(req) {
  const origins = allowedOrigins();
  if (!origins.length) return true;
  const origin = req.headers.origin || '';
  // Same-origin server-to-server or health checks may not send Origin.
  return !origin || origins.includes(origin);
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function normalizePhone(phone) {
  let digits = String(phone || '').replace(/[^0-9]/g, '');
  if (digits.startsWith('82')) digits = `0${digits.slice(2)}`;
  return digits;
}

function safeText(value, maxLength = 80) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function buildMessage(body) {
  if (body && body.kind === 'donation') {
    const donorName = safeText(body.donorName, 30) || '후원자';
    const depositorName = safeText(body.depositorName, 30) || donorName;
    return [
      `${donorName} 후원자님, 머내마을영화제 후원 참여에 진심으로 감사드립니다.`,
      `입금자명: ${depositorName}`,
      '주민들이 손수 만드는 영화제를 위해 소중하게 사용하겠습니다.',
      '제9회 머내마을영화제에서 반갑게 뵙겠습니다.'
    ].join('\n');
  }
  const name = safeText(body.name, 30) || '신청자';
  const reservationId = safeText(body.reservationNumber || body.reservationId, 60) || '현장 확인';
  const movieTitle = safeText(body.movieTitle, 80) || '상영작';
  const people = safeText(body.people, 30) || '1명';
  const dateTime = safeText(body.dateTime, 80) || '일시 미정';
  const venue = safeText(body.venue, 80) || '상영관 미정';

  return [
    `${name} 님 예약이 완료되었습니다.`,
    `예약번호: ${reservationId}`,
    `영화명: ${movieTitle}`,
    `신청인원: ${people}`,
    `일시: ${dateTime}`,
    `장소: ${venue}`,
    '상영 당일 현장에서 예약번호와 신청자 이름을 알려주세요.'
  ].join('\n');
}

function createSignature({ method, uri, timestamp, accessKey, secretKey }) {
  const message = `${method} ${uri}\n${timestamp}\n${accessKey}`;
  return crypto.createHmac('sha256', secretKey).update(message).digest('base64');
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'POST 요청만 허용됩니다.' });
  }

  if (!isAllowedOrigin(req)) {
    return sendJson(res, 403, { ok: false, error: '허용되지 않은 배포 주소입니다.' });
  }

  if (process.env.SENS_SMS_ENABLED === 'false') {
    return sendJson(res, 503, { ok: false, error: 'SENS 문자 발송이 비활성화되어 있습니다.' });
  }

  const missing = missingEnvNames();
  if (missing.length) {
    return sendJson(res, 501, {
      ok: false,
      error: `SENS 환경변수가 설정되지 않았습니다: ${missing.join(', ')}`
    });
  }

  const config = sensConfig();
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const to = normalizePhone(body.phone || body.to);
  const from = normalizePhone(config.from);

  if (!/^01[0-9]{8,9}$/.test(to)) {
    return sendJson(res, 400, { ok: false, error: '수신자 휴대폰 번호를 확인해주세요.' });
  }
  if (!/^0[0-9]{8,10}$/.test(from)) {
    return sendJson(res, 500, { ok: false, error: '발신번호 환경변수를 확인해주세요.' });
  }

  const content = buildMessage(body);
  const contentBytes = Buffer.byteLength(content, 'utf8');
  const messageType = contentBytes > 90 ? 'LMS' : 'SMS';
  const serviceId = config.serviceId;
  const accessKey = config.accessKey;
  const secretKey = config.secretKey;
  const timestamp = Date.now().toString();
  const method = 'POST';
  const uri = `/sms/v2/services/${serviceId}/messages`;
  const apiBase = config.apiBase;
  const signature = createSignature({ method, uri, timestamp, accessKey, secretKey });

  const naverPayload = {
    type: messageType,
    contentType: 'COMM',
    countryCode: '82',
    from,
    content,
    messages: [{ to }]
  };
  if (messageType !== 'SMS') naverPayload.subject = body.kind === 'donation' ? '머내마을영화제 후원 감사' : '머내마을영화제 예약';

  if (process.env.SMS_DRY_RUN === 'true') {
    return sendJson(res, 200, {
      ok: true,
      dryRun: true,
      requestId: `dry-run-${Date.now()}`,
      type: messageType
    });
  }

  try {
    const response = await fetch(`${apiBase}${uri}`, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-signature-v2': signature
      },
      body: JSON.stringify(naverPayload)
    });
    const data = await response.json().catch(() => ({}));
    const ok = response.ok && (data.statusCode === '202' || data.statusName === 'success');
    return sendJson(res, ok ? 200 : response.status || 500, {
      ok,
      requestId: data.requestId || '',
      requestTime: data.requestTime || '',
      statusCode: data.statusCode || String(response.status),
      statusName: data.statusName || '',
      type: messageType,
      error: ok ? '' : (data.statusName || data.message || 'SENS 문자 발송 요청 실패')
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: error && error.message ? error.message : 'SENS 문자 발송 중 오류가 발생했습니다.'
    });
  }
};
