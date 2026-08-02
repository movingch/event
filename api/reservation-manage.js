const crypto = require('crypto');

const requestLog = new Map();

function env(name, aliases = []) {
  for (const key of [name, ...aliases]) {
    const value = String(process.env[key] || '').trim();
    if (value) return value;
  }
  return '';
}

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.end(JSON.stringify(data));
}

async function bodyOf(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('82')) digits = `0${digits.slice(2)}`;
  return digits;
}

function secret() {
  return env('RESERVATION_MANAGE_SECRET') || env('SUPABASE_SERVICE_ROLE_KEY', ['SUPABASE_SECRET_KEY']) || env('NAVER_CLOUD_SECRET_KEY', ['NCP_SECRET_KEY']);
}

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function signPayload(payload) {
  const encoded = base64url(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', secret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function verifyToken(token, expectedType) {
  const [encoded, supplied] = String(token || '').split('.');
  if (!encoded || !supplied) throw new Error('인증 정보가 올바르지 않습니다.');
  const expected = crypto.createHmac('sha256', secret()).update(encoded).digest('base64url');
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);
  if (suppliedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)) throw new Error('인증 정보가 올바르지 않습니다.');
  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
  if (payload.type !== expectedType || Number(payload.expiresAt || 0) < Date.now()) throw new Error('인증 시간이 만료되었습니다. 다시 인증해 주세요.');
  return payload;
}

function supabaseConfig() {
  const url = env('SUPABASE_URL').replace(/\/$/, '');
  const key = env('SUPABASE_SERVICE_ROLE_KEY', ['SUPABASE_SECRET_KEY', 'SUPABASE_ANON_KEY']);
  return { url, key, configured: Boolean(url && key) };
}

async function supabaseFetch(path, options = {}) {
  const cfg = supabaseConfig();
  if (!cfg.configured) throw new Error('예약 원본 저장소가 설정되지 않았습니다.');
  const response = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      'Content-Type': 'application/json; charset=utf-8',
      ...(options.headers || {})
    },
    cache: 'no-store'
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (error) { data = text; }
  if (!response.ok) throw new Error(data?.message || `예약 저장소 요청 실패: ${response.status}`);
  return data;
}

async function readState() {
  const rows = await supabaseFetch('festival_state?key=eq.main&select=key,state,updated_at&limit=1', { method: 'GET' });
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row?.state) throw new Error('예약 원본 데이터를 찾을 수 없습니다.');
  return row;
}

async function writeState(state, expectedUpdatedAt) {
  const updatedAt = new Date().toISOString();
  const path = `festival_state?key=eq.main&updated_at=eq.${encodeURIComponent(expectedUpdatedAt)}&select=key,state,updated_at`;
  const rows = await supabaseFetch(path, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ state, updated_at: updatedAt })
  });
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row) {
    const error = new Error('다른 예약 변경과 겹쳤습니다. 다시 시도해 주세요.');
    error.code = 'WRITE_CONFLICT';
    throw error;
  }
  return row;
}

function reservationsForPhone(state, phone) {
  return (Array.isArray(state.reservations) ? state.reservations : []).filter((item) => normalizePhone(item.phone) === phone);
}

function screeningOf(state, reservation) {
  return (Array.isArray(state.screenings) ? state.screenings : []).find((item) => String(item.id) === String(reservation.screeningId)) || null;
}

function festivalDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return new Date(NaN);
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(raw);
  return new Date(hasZone ? raw : `${raw.replace(' ', 'T')}+09:00`);
}

function safeReservation(state, reservation) {
  const screening = screeningOf(state, reservation);
  const startAt = screening?.startTime || '';
  const startTime = festivalDate(startAt).getTime();
  const canCancel = !['취소'].includes(String(reservation.status || '')) && reservation.attended !== true && String(reservation.attendanceStatus || '') !== '참석' && (!Number.isFinite(startTime) || startTime > Date.now());
  return {
    id: String(reservation.id || ''),
    reservationNumber: String(reservation.reservationNumber || ''),
    name: String(reservation.name || ''),
    status: String(reservation.status || '확정'),
    attendanceStatus: String(reservation.attendanceStatus || '신청'),
    seats: Math.max(1, Number(reservation.seats || 1)),
    movieTitle: String(screening?.title || '삭제된 회차'),
    venue: String(screening?.venue || ''),
    startTime: startAt,
    canceledAt: String(reservation.canceledAt || ''),
    cancelReason: String(reservation.cancelReason || ''),
    canCancel
  };
}

function rateLimited(req, phone) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const key = `${ip}:${phone}`;
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5 || (recent.length && now - recent[recent.length - 1] < 60 * 1000)) return true;
  recent.push(now);
  requestLog.set(key, recent);
  if (requestLog.size > 1000) requestLog.clear();
  return false;
}

async function sendSens(to, content, subject = '머내마을영화제 안내') {
  if (process.env.SENS_SMS_ENABLED === 'false') throw new Error('문자 발송이 비활성화되어 있습니다.');
  const accessKey = env('NAVER_CLOUD_ACCESS_KEY', ['NCP_ACCESS_KEY']);
  const secretKey = env('NAVER_CLOUD_SECRET_KEY', ['NCP_SECRET_KEY']);
  const serviceId = env('NAVER_SENS_SERVICE_ID', ['NCP_SENS_SERVICE_ID']);
  const from = normalizePhone(env('NAVER_SENS_FROM', ['NCP_SENS_FROM']));
  if (!accessKey || !secretKey || !serviceId || !from) throw new Error('문자 발송 설정을 확인해 주세요.');
  const type = Buffer.byteLength(content, 'utf8') > 90 ? 'LMS' : 'SMS';
  if (process.env.SMS_DRY_RUN === 'true') return { ok: true, dryRun: true };
  const timestamp = Date.now().toString();
  const uri = `/sms/v2/services/${serviceId}/messages`;
  const signature = crypto.createHmac('sha256', secretKey).update(`POST ${uri}\n${timestamp}\n${accessKey}`).digest('base64');
  const payload = { type, contentType: 'COMM', countryCode: '82', from, content, messages: [{ to }] };
  if (type === 'LMS') payload.subject = subject;
  const response = await fetch(`${env('NAVER_SENS_API_BASE') || 'https://sens.apigw.ntruss.com'}${uri}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-ncp-apigw-timestamp': timestamp, 'x-ncp-iam-access-key': accessKey, 'x-ncp-apigw-signature-v2': signature },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || (data.statusCode && data.statusCode !== '202')) throw new Error(data.message || data.statusName || '문자 발송에 실패했습니다.');
  return data;
}

function formatScreening(screening) {
  if (!screening?.startTime) return '일시 미정';
  const date = festivalDate(screening.startTime);
  if (Number.isNaN(date.getTime())) return String(screening.startTime);
  return new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(date);
}

async function triggerGoogleBackup(req) {
  try {
    const protocol = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
    const host = req.headers.host;
    if (!host) return;
    await fetch(`${protocol}://${host}/api/supabase-google-backup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: 'audience-reservation-cancel' })
    });
  } catch (error) {
    console.warn('취소 후 구글시트 백업 실패', error);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, message: 'POST 요청만 허용됩니다.' });
  try {
    if (!secret()) return json(res, 501, { ok: false, message: '본인 인증용 서버 설정이 없습니다.' });
    const body = await bodyOf(req);
    const action = String(body.action || '');

    if (action === 'request-code') {
      const phone = normalizePhone(body.phone);
      if (!/^01[0-9]{8,9}$/.test(phone)) return json(res, 400, { ok: false, message: '휴대폰 번호를 확인해 주세요.' });
      if (rateLimited(req, phone)) return json(res, 429, { ok: false, message: '인증번호 요청이 너무 잦습니다. 1분 후 다시 시도해 주세요.' });
      const row = await readState();
      if (!reservationsForPhone(row.state, phone).length) return json(res, 404, { ok: false, message: '해당 휴대폰 번호로 신청한 예약을 찾을 수 없습니다.' });
      const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
      const nonce = crypto.randomBytes(18).toString('base64url');
      const codeHash = crypto.createHmac('sha256', secret()).update(`${phone}:${code}:${nonce}`).digest('hex');
      const challenge = signPayload({ type: 'challenge', phone, nonce, codeHash, expiresAt: Date.now() + 5 * 60 * 1000 });
      await sendSens(phone, `[머내마을영화제]\n내 예약 확인 인증번호는 ${code}입니다.\n5분 안에 입력해 주세요.`, '머내마을영화제 인증번호');
      return json(res, 200, { ok: true, challenge, expiresIn: 300, message: '인증번호를 문자로 보냈습니다.' });
    }

    if (action === 'verify-code') {
      const verifyKey = `verify:${crypto.createHash('sha256').update(String(body.challenge || '')).digest('hex')}`;
      const attempts = Number(requestLog.get(verifyKey) || 0);
      if (attempts >= 6) return json(res, 429, { ok: false, message: '인증번호 입력 횟수를 초과했습니다. 새 인증번호를 받아 주세요.' });
      requestLog.set(verifyKey, attempts + 1);
      const payload = verifyToken(body.challenge, 'challenge');
      const code = String(body.code || '').replace(/\D/g, '').slice(0, 6);
      const actual = crypto.createHmac('sha256', secret()).update(`${payload.phone}:${code}:${payload.nonce}`).digest('hex');
      if (actual.length !== payload.codeHash.length || !crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(payload.codeHash))) return json(res, 401, { ok: false, message: '인증번호가 일치하지 않습니다.' });
      const row = await readState();
      requestLog.delete(verifyKey);
      const session = signPayload({ type: 'session', phone: payload.phone, expiresAt: Date.now() + 30 * 60 * 1000 });
      const reservations = reservationsForPhone(row.state, payload.phone).map((item) => safeReservation(row.state, item)).sort((a, b) => String(a.startTime).localeCompare(String(b.startTime)));
      return json(res, 200, { ok: true, session, reservations });
    }

    if (action === 'list') {
      const payload = verifyToken(body.session, 'session');
      const row = await readState();
      const reservations = reservationsForPhone(row.state, payload.phone).map((item) => safeReservation(row.state, item)).sort((a, b) => String(a.startTime).localeCompare(String(b.startTime)));
      return json(res, 200, { ok: true, reservations });
    }

    if (action === 'cancel') {
      const payload = verifyToken(body.session, 'session');
      let saved = null;
      let canceled = null;
      let state = null;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const row = await readState();
        state = row.state;
        const reservation = reservationsForPhone(state, payload.phone).find((item) => String(item.id) === String(body.reservationId || ''));
        if (!reservation) return json(res, 404, { ok: false, message: '취소할 예약을 찾을 수 없습니다.' });
        const safe = safeReservation(state, reservation);
        if (reservation.status === '취소') return json(res, 409, { ok: false, message: '이미 취소된 예약입니다.' });
        if (!safe.canCancel) return json(res, 409, { ok: false, message: '상영이 시작되었거나 참석 처리된 예약은 관객 화면에서 취소할 수 없습니다. 영화제 본부로 문의해 주세요.' });
        const now = new Date().toISOString();
        reservation.status = '취소';
        reservation.attended = false;
        reservation.attendedSeats = 0;
        reservation.attendanceStatus = '신청';
        reservation.canceledAt = now;
        reservation.canceledBy = '관객 본인';
        reservation.cancelReason = String(body.reason || '관객 본인 취소').trim().slice(0, 200) || '관객 본인 취소';
        reservation.updatedAt = now;
        try {
          saved = await writeState(state, row.updated_at);
          canceled = reservation;
          break;
        } catch (error) {
          if (error.code !== 'WRITE_CONFLICT' || attempt === 2) throw error;
        }
      }
      const screening = screeningOf(state, canceled);
      const smsResults = [];
      try {
        await sendSens(payload.phone, `[머내마을영화제]\n예약이 취소되었습니다.\n영화: ${screening?.title || '상영작'}\n일시: ${formatScreening(screening)}\n예약번호: ${canceled.reservationNumber || ''}`);
        smsResults.push({ type: 'cancel', ok: true });
      } catch (error) { smsResults.push({ type: 'cancel', ok: false, error: error.message }); }
      await triggerGoogleBackup(req);
      const reservations = reservationsForPhone(saved.state, payload.phone).map((item) => safeReservation(saved.state, item)).sort((a, b) => String(a.startTime).localeCompare(String(b.startTime)));
      return json(res, 200, { ok: true, message: '예약을 취소했습니다.', reservations, smsResults, updatedAt: saved.updated_at });
    }

    return json(res, 400, { ok: false, message: '지원하지 않는 요청입니다.' });
  } catch (error) {
    return json(res, error.code === 'WRITE_CONFLICT' ? 409 : 500, { ok: false, message: error.message || '예약 관리 중 오류가 발생했습니다.' });
  }
};
