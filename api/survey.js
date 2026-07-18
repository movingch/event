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


function env(name) {
  return String(process.env[name] || '').trim();
}

function supabaseConfig() {
  const url = env('SUPABASE_URL').replace(/\/$/, '');
  const key = env('SUPABASE_SERVICE_ROLE_KEY') || env('SUPABASE_SECRET_KEY') || env('SUPABASE_ANON_KEY');
  return { url, key, configured: Boolean(url && key) };
}

async function supabaseFetch(path, options = {}) {
  const cfg = supabaseConfig();
  if (!cfg.configured) return null;
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
  if (!response.ok) throw new Error(typeof data === 'object' && data?.message ? data.message : `Supabase 요청 실패: ${response.status}`);
  return data;
}

async function readSupabaseState() {
  const rows = await supabaseFetch('festival_state?key=eq.main&select=key,state,updated_at&limit=1', { method: 'GET' });
  const row = Array.isArray(rows) ? rows[0] : null;
  return row?.state && typeof row.state === 'object' ? row.state : {};
}

async function writeSupabaseState(state) {
  return supabaseFetch('festival_state', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify([{ key: 'main', state, updated_at: new Date().toISOString() }])
  });
}

function normalizeValue(value) {
  return String(value || '').trim().toLowerCase();
}

function cleanMovieTitle(value) {
  return String(value || '').replace(/^\s*제\s*\d+\s*회\s*/i, '').replace(/\s+/g, ' ').trim();
}

function digits(value) {
  return String(value || '').replace(/\D/g, '');
}

function responseKey(response) {
  return String(response?.id || response?.token || response?.reservationId || response?.reservationNumber || '');
}

function sameMovie(a, b) {
  const am = normalizeValue(cleanMovieTitle(a?.movieTitle || ''));
  const bm = normalizeValue(cleanMovieTitle(b?.movieTitle || ''));
  return Boolean(am && bm && am === bm);
}

function responseMatchesDispatch(response, dispatch) {
  if (!response || !dispatch) return false;
  const rt = normalizeValue(response.token);
  const dt = normalizeValue(dispatch.token);
  if (rt && dt && rt === dt) return true;
  const rr = normalizeValue(response.reservationId);
  const dr = normalizeValue(dispatch.reservationId);
  if (rr && dr && rr === dr) return true;
  const rn = normalizeValue(response.reservationNumber);
  const dn = normalizeValue(dispatch.reservationNumber);
  if (rn && dn && rn === dn) return true;
  const rp = digits(response.phone || response.contact || '');
  const dp = digits(dispatch.phone || '');
  if (rp && dp && rp === dp && sameMovie(response, dispatch)) return true;
  const rName = normalizeValue(String(response.name || '').replace(/\s*TEST\s*$/i, ''));
  const dName = normalizeValue(String(dispatch.name || '').replace(/\s*TEST\s*$/i, ''));
  if (rName && dName && rName === dName && sameMovie(response, dispatch)) return true;
  return false;
}

async function appendSurveyResponseToSupabase(response) {
  if (!supabaseConfig().configured || !response || typeof response !== 'object') return { skipped: true, reason: 'NO_SUPABASE' };
  const state = await readSupabaseState();
  const list = Array.isArray(state.surveyResponses) ? state.surveyResponses : [];
  const dispatches = Array.isArray(state.surveyDispatches) ? state.surveyDispatches : [];
  const matchedDispatch = dispatches.find((dispatch) => responseMatchesDispatch(response, dispatch));
  const now = new Date().toISOString();
  const enriched = {
    ...response,
    id: response.id || response.token || response.reservationId || response.reservationNumber || `survey-${Date.now()}`,
    token: response.token || matchedDispatch?.token || '',
    reservationId: response.reservationId || matchedDispatch?.reservationId || '',
    reservationNumber: response.reservationNumber || matchedDispatch?.reservationNumber || '',
    screeningId: response.screeningId || matchedDispatch?.screeningId || '',
    movieTitle: response.movieTitle || matchedDispatch?.movieTitle || '',
    venue: response.venue || matchedDispatch?.venue || '',
    phone: response.phone || response.contact || matchedDispatch?.phone || '',
    name: response.name || matchedDispatch?.name || '익명',
    createdAt: response.createdAt || response.submittedAt || now,
    submittedAt: response.submittedAt || response.createdAt || now,
    status: '응답완료',
    test: response.test === true || matchedDispatch?.test === true || String(response.reservationId || matchedDispatch?.reservationId || '').startsWith('test-') || String(response.name || matchedDispatch?.name || '').includes('TEST'),
    type: response.type || matchedDispatch?.type || (String(response.reservationId || matchedDispatch?.reservationId || '').startsWith('test-') ? 'test' : '')
  };
  const key = responseKey(enriched);
  const next = key ? list.filter((item) => responseKey(item) !== key) : list.slice();
  next.push(enriched);
  state.surveyResponses = next;
  state.surveyDispatches = dispatches.map((dispatch) => {
    if (!responseMatchesDispatch(enriched, dispatch)) return dispatch;
    return { ...dispatch, status: '응답완료', respondedAt: enriched.submittedAt, responseId: enriched.id };
  });
  state.lastUpdated = now;
  await writeSupabaseState(state);
  return { ok: true, count: next.length, matchedDispatch: Boolean(matchedDispatch) };
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
      const surveyResponse = body.response || {};
      const payload = { type: 'survey-response', response: surveyResponse };
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      let supabaseUpdate = { skipped: true };
      try {
        supabaseUpdate = await appendSurveyResponseToSupabase(surveyResponse);
      } catch (supabaseError) {
        supabaseUpdate = { ok: false, message: supabaseError && supabaseError.message ? supabaseError.message : String(supabaseError) };
      }
      return sendJson(res, response.ok ? 200 : response.status || 500, { ...(data || {}), supabaseUpdate });
    }

    return sendJson(res, 405, { ok: false, message: 'GET 또는 POST만 허용됩니다.' });
  } catch (error) {
    return sendJson(res, 500, { ok: false, message: error && error.message ? error.message : '설문 처리 중 오류가 발생했습니다.' });
  }
};
