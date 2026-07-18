function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function allowedOrigins() {
  const value = process.env.ALLOWED_ORIGIN || process.env.SENS_ALLOWED_ORIGINS || '';
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function setCors(req, res) {
  const origins = allowedOrigins();
  if (!origins.length) return;
  const origin = req.headers.origin || '';
  if (origins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function decodeWebhook(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^https:\/\/script\.google\.com\/macros\/s\//.test(raw)) return raw;
  try {
    return Buffer.from(raw, 'base64').toString('utf8');
  } catch (error) {
    return '';
  }
}

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  try {
    if (req.method === 'GET') {
      const query = req.query || {};
      const webhookUrl = decodeWebhook(query.webhookUrl || query.w);
      const token = String(query.token || query.t || '').trim();
      if (!/^https:\/\/script\.google\.com\/macros\/s\//.test(webhookUrl) || !webhookUrl.endsWith('/exec')) {
        return sendJson(res, 400, { ok: false, message: '설문 연동 URL을 확인할 수 없습니다.' });
      }
      if (!token) return sendJson(res, 400, { ok: false, message: '설문 토큰이 없습니다.' });
      const url = `${webhookUrl}?action=surveyLookup&token=${encodeURIComponent(token)}`;
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json().catch(() => ({}));
      return sendJson(res, response.ok ? 200 : response.status || 500, data);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const webhookUrl = decodeWebhook(body.webhookUrl || body.w);
      if (!/^https:\/\/script\.google\.com\/macros\/s\//.test(webhookUrl) || !webhookUrl.endsWith('/exec')) {
        return sendJson(res, 400, { ok: false, message: '설문 연동 URL을 확인할 수 없습니다.' });
      }
      const payload = { type: 'survey-response', response: body.response || {} };
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      return sendJson(res, response.ok ? 200 : response.status || 500, data);
    }

    return sendJson(res, 405, { ok: false, message: 'GET 또는 POST만 허용됩니다.' });
  } catch (error) {
    return sendJson(res, 500, { ok: false, message: error && error.message ? error.message : '설문 처리 중 오류가 발생했습니다.' });
  }
};
