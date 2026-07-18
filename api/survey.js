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

function normalizeSurveyQuestion(q, index) {
  return {
    id: q?.id || `q-${index + 1}`,
    order: q?.order || index + 1,
    type: q?.type || 'text',
    title: q?.title || `문항 ${index + 1}`,
    choices: q?.choices || '',
    required: q?.required === true || q?.required === 'true' || q?.required === '필수',
    enabled: q?.enabled === false || q?.enabled === 'false' || q?.enabled === 'OFF' ? false : true
  };
}

function defaultSurveyQuestions() {
  return [
    { id: 'q-overall', order: 1, type: 'rating', title: '전체적으로 만족하셨나요?', choices: '', required: true, enabled: true },
    { id: 'q-venue', order: 2, type: 'rating', title: '상영 장소와 환경은 만족스러웠나요?', choices: '', required: true, enabled: true },
    { id: 'q-guide', order: 3, type: 'rating', title: '진행과 안내는 만족스러웠나요?', choices: '', required: true, enabled: true },
    { id: 'q-return', order: 4, type: 'rating', title: '다음에도 참여하고 싶으신가요?', choices: '', required: true, enabled: true },
    { id: 'q-good', order: 5, type: 'text', title: '좋았던 점을 적어 주세요.', choices: '', required: false, enabled: true },
    { id: 'q-improve', order: 6, type: 'text', title: '개선하면 좋을 점을 적어 주세요.', choices: '', required: false, enabled: true }
  ];
}

function findSurveyDispatchByToken(state, token) {
  const t = normalizeValue(token);
  if (!t) return null;
  return (Array.isArray(state.surveyDispatches) ? state.surveyDispatches : []).find((dispatch) => normalizeValue(dispatch.token) === t) || null;
}

function findSurveyResponseByToken(state, token) {
  const t = normalizeValue(token);
  if (!t) return null;
  return (Array.isArray(state.surveyResponses) ? state.surveyResponses : []).find((response) => normalizeValue(response.token) === t) || null;
}

function supabaseSurveyLookupPayload(state, token) {
  const dispatch = findSurveyDispatchByToken(state, token);
  if (!dispatch) return { ok: false, message: '설문 대상 정보를 찾지 못했습니다. 관리자에서 테스트 링크를 다시 만들어 주세요.' };
  const existing = findSurveyResponseByToken(state, token);
  const settings = state.surveySettings || {};
  if (settings.enabled === false || settings.enabled === 'false' || settings.enabled === 'OFF') {
    return { ok: false, message: '현재 만족도조사가 비활성화되어 있습니다.' };
  }
  const questions = (Array.isArray(state.surveyQuestions) && state.surveyQuestions.length ? state.surveyQuestions : defaultSurveyQuestions())
    .map(normalizeSurveyQuestion)
    .filter((q) => q.enabled !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  return {
    ok: true,
    source: 'supabase',
    alreadySubmitted: Boolean(existing),
    participant: {
      id: dispatch.id || '',
      token: dispatch.token || token,
      reservationId: dispatch.reservationId || '',
      reservationNumber: dispatch.reservationNumber || '',
      screeningId: dispatch.screeningId || '',
      name: dispatch.name || '관객',
      phone: dispatch.phone || '',
      movieTitle: dispatch.movieTitle || '상영작',
      venue: dispatch.venue || '상영관',
      screeningTime: dispatch.screeningTime || '',
      type: dispatch.type || '',
      test: dispatch.test === true || String(dispatch.reservationId || '').startsWith('test-') || String(dispatch.name || '').includes('TEST')
    },
    questions
  };
}

async function fallbackSurveyLookupFromSupabase(token) {
  if (!supabaseConfig().configured) return null;
  const state = await readSupabaseState();
  return supabaseSurveyLookupPayload(state, token);
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
      const validWebhook = /^https:\/\/script\.google\.com\/macros\/s\//.test(webhookUrl) && webhookUrl.endsWith('/exec');
      if (!token) return sendJson(res, 400, { ok: false, message: '설문 토큰이 없습니다.' });
      let data = validWebhook ? null : { ok: false, message: '구글 설문 연동 URL이 없어 Supabase 원본에서 조회합니다.' };
      let upstreamStatus = validWebhook ? 200 : 404;
      if (validWebhook) {
        const url = `${webhookUrl}?action=surveyLookup&token=${encodeURIComponent(token)}`;
        try {
          const response = await fetch(url, { method: 'GET' });
          upstreamStatus = response.status || 500;
          data = await response.json().catch(() => ({}));
          if (response.ok && data && data.ok !== false && data.participant) return sendJson(res, 200, data);
        } catch (lookupError) {
          data = { ok: false, message: lookupError && lookupError.message ? lookupError.message : String(lookupError) };
        }
      }
      try {
        const fallback = await fallbackSurveyLookupFromSupabase(token);
        if (fallback) return sendJson(res, fallback.ok ? 200 : 404, { ...fallback, googleLookup: data || null });
      } catch (fallbackError) {
        return sendJson(res, 500, { ok: false, message: fallbackError && fallbackError.message ? fallbackError.message : 'Supabase 설문 조회 실패', googleLookup: data || null });
      }
      return sendJson(res, upstreamStatus, data || { ok: false, message: '설문 정보를 찾지 못했습니다.' });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const webhookUrl = decodeWebhook(body.webhookUrl || body.w);
      const validWebhook = /^https:\/\/script\.google\.com\/macros\/s\//.test(webhookUrl) && webhookUrl.endsWith('/exec');
      const surveyResponse = body.response || {};
      const payload = { type: 'survey-response', response: surveyResponse };
      let response = { ok: false, status: 502 };
      let data = { ok: false, message: validWebhook ? '구글시트 전송 전' : '구글 설문 연동 URL이 없어 Supabase에만 저장합니다.' };
      if (validWebhook) {
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
        data = await response.json().catch(() => ({}));
      }
      let supabaseUpdate = { skipped: true };
      try {
        supabaseUpdate = await appendSurveyResponseToSupabase(surveyResponse);
      } catch (supabaseError) {
        supabaseUpdate = { ok: false, message: supabaseError && supabaseError.message ? supabaseError.message : String(supabaseError) };
      }
      const finalOk = (response.ok && data?.ok !== false) || supabaseUpdate?.ok === true;
      return sendJson(res, finalOk ? 200 : response.status || 500, { ok: finalOk, ...(data || {}), supabaseUpdate, googleSubmitOk: response.ok && data?.ok !== false });
    }

    return sendJson(res, 405, { ok: false, message: 'GET 또는 POST만 허용됩니다.' });
  } catch (error) {
    return sendJson(res, 500, { ok: false, message: error && error.message ? error.message : '설문 처리 중 오류가 발생했습니다.' });
  }
};
