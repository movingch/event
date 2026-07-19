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


const DEFAULT_GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEM_kItJA7eIk8fuGzsWbupiguPKiEhtnz-bk23qFRxVHJ1aWNwOFc_0vFXLXeY6w3/exec';

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

async function readSupabaseRecord() {
  const rows = await supabaseFetch('festival_state?key=eq.main&select=key,state,updated_at&limit=1', { method: 'GET' });
  const row = Array.isArray(rows) ? rows[0] : null;
  return row ? { state: row.state && typeof row.state === 'object' ? row.state : {}, updatedAt: row.updated_at || '' } : null;
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
    { id: 'q-return', order: 4, type: 'single', title: '다음에도 머내마을영화제에 참여하고 싶으신가요?', choices: '예, 아니오, 잘 모르겠음', required: true, enabled: true },
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

function settingIsOn(value, fallback = false) {
  if (value === true || value === 'true' || value === 'ON') return true;
  if (value === false || value === 'false' || value === 'OFF') return false;
  return fallback;
}

function surveySettings(state) {
  const source = state?.surveySettings || {};
  return {
    enabled: settingIsOn(source.enabled, false),
    preventDuplicate: settingIsOn(source.preventDuplicate, true),
    responseDeadlineDays: Math.max(1, Number(source.responseDeadlineDays || 7)),
    surveyTitle: String(source.surveyTitle || '만족도조사').trim(),
    surveyIntro: String(source.surveyIntro || '{이름} 님, 〈{영화명}〉 관람은 어떠셨나요?').trim(),
    privacyNotice: String(source.privacyNotice || '응답 내용은 영화제 운영 개선과 결과 정리를 위해 사용되며 관리자만 확인할 수 있습니다. 개인정보와 설문 응답은 신청 시 안내한 보유기간에 따라 관리됩니다.').trim(),
    completionTitle: String(source.completionTitle || '응답해 주셔서 감사합니다.').trim(),
    completionMessage: String(source.completionMessage || '소중한 의견은 다음 영화제를 준비하는 데 사용하겠습니다.').trim()
  };
}

function dispatchDeadline(dispatch, settings) {
  const base = new Date(dispatch?.sentAt || dispatch?.createdAt || '').getTime();
  return Number.isFinite(base) ? base + settings.responseDeadlineDays * 86400000 : 0;
}

function surveyExpired(dispatch, settings, now = Date.now()) {
  const deadline = dispatchDeadline(dispatch, settings);
  return Boolean(deadline && now > deadline);
}

function activeSurveyQuestions(state) {
  return (Array.isArray(state.surveyQuestions) && state.surveyQuestions.length ? state.surveyQuestions : defaultSurveyQuestions())
    .map(normalizeSurveyQuestion)
    .filter((q) => q.enabled !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function cleanSurveyAnswers(rawAnswers, questions) {
  const input = rawAnswers && typeof rawAnswers === 'object' && !Array.isArray(rawAnswers) ? rawAnswers : {};
  const answers = {};
  for (const question of questions) {
    const raw = input[question.id];
    const values = Array.isArray(raw) ? raw : (raw == null || raw === '' ? [] : [raw]);
    if (question.required && values.length === 0) {
      const error = new Error(`필수 문항에 응답해 주세요: ${question.title}`);
      error.status = 400;
      throw error;
    }
    if (!values.length) continue;
    if (question.type === 'rating') {
      const score = Number(values[0]);
      if (!Number.isInteger(score) || score < 1 || score > 5) {
        const error = new Error(`1점부터 5점 사이로 응답해 주세요: ${question.title}`);
        error.status = 400;
        throw error;
      }
      answers[question.id] = String(score);
      continue;
    }
    if (question.type === 'single' || question.type === 'multiple') {
      const allowed = String(question.choices || '').split(',').map((item) => item.trim()).filter(Boolean);
      const selected = [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
      if (question.required && selected.length === 0) {
        const error = new Error(`필수 문항에 응답해 주세요: ${question.title}`);
        error.status = 400;
        throw error;
      }
      if (question.type === 'single' && selected.length > 1) {
        const error = new Error(`하나만 선택해 주세요: ${question.title}`);
        error.status = 400;
        throw error;
      }
      if (selected.some((value) => !allowed.includes(value))) {
        const error = new Error(`올바른 선택지를 선택해 주세요: ${question.title}`);
        error.status = 400;
        throw error;
      }
      if (selected.length) answers[question.id] = question.type === 'multiple' ? selected : selected[0];
      continue;
    }
    const text = String(values[0] || '').trim().slice(0, 2000);
    if (question.required && !text) {
      const error = new Error(`필수 문항에 응답해 주세요: ${question.title}`);
      error.status = 400;
      throw error;
    }
    if (text) answers[question.id] = text;
  }
  return answers;
}

function supabaseSurveyLookupPayload(state, token) {
  const dispatch = findSurveyDispatchByToken(state, token);
  if (!dispatch) return { ok: false, message: '설문 대상 정보를 찾지 못했습니다. 관리자에서 테스트 링크를 다시 만들어 주세요.' };
  const existing = findSurveyResponseByToken(state, token);
  const settings = surveySettings(state);
  if (!settings.enabled) {
    return { ok: false, disabled: true, message: '현재 만족도조사가 비활성화되어 있습니다.' };
  }
  if (surveyExpired(dispatch, settings)) return { ok: false, expired: true, message: '설문 응답 기간이 종료되었습니다.' };
  const questions = activeSurveyQuestions(state);
  return {
    ok: true,
    source: 'supabase',
    alreadySubmitted: settings.preventDuplicate && Boolean(existing),
    responseDeadlineAt: dispatchDeadline(dispatch, settings) ? new Date(dispatchDeadline(dispatch, settings)).toISOString() : '',
    presentation: {
      surveyTitle: settings.surveyTitle,
      surveyIntro: settings.surveyIntro,
      privacyNotice: settings.privacyNotice,
      completionTitle: settings.completionTitle,
      completionMessage: settings.completionMessage
    },
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
      seatPeople: Number(dispatch.seatPeople || 1),
      type: dispatch.type || '',
      test: dispatch.test === true || String(dispatch.reservationId || '').startsWith('test-') || String(dispatch.name || '').includes('TEST')
    },
    questions
  };
}

async function fallbackSurveyLookupFromSupabase(token) {
  if (!supabaseConfig().configured) return null;
  const record = await readSupabaseRecord();
  return supabaseSurveyLookupPayload(record?.state || {}, token);
}

async function writeSupabaseState(state, expectedUpdatedAt) {
  const updatedAt = new Date().toISOString();
  if (expectedUpdatedAt) {
    return supabaseFetch(`festival_state?key=eq.main&updated_at=eq.${encodeURIComponent(expectedUpdatedAt)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ state, updated_at: updatedAt })
    });
  }
  return supabaseFetch('festival_state', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify([{ key: 'main', state, updated_at: updatedAt }])
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
  const token = String(response.token || '').trim();
  if (!token) { const error = new Error('설문 토큰이 없습니다.'); error.status = 400; throw error; }
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const record = await readSupabaseRecord();
    if (!record) { const error = new Error('설문 원본 데이터를 찾지 못했습니다.'); error.status = 503; throw error; }
    const state = record.state;
    const list = Array.isArray(state.surveyResponses) ? state.surveyResponses : [];
    const dispatches = Array.isArray(state.surveyDispatches) ? state.surveyDispatches : [];
    const matchedDispatch = findSurveyDispatchByToken(state, token);
    if (!matchedDispatch) { const error = new Error('유효하지 않은 설문 링크입니다.'); error.status = 404; throw error; }
    const settings = surveySettings(state);
    if (!settings.enabled) { const error = new Error('현재 만족도조사가 비활성화되어 있습니다.'); error.status = 403; throw error; }
    if (surveyExpired(matchedDispatch, settings)) { const error = new Error('설문 응답 기간이 종료되었습니다.'); error.status = 410; throw error; }
    if (settings.preventDuplicate && findSurveyResponseByToken(state, token)) { const error = new Error('이미 응답해 주셨습니다.'); error.status = 409; throw error; }
    const questions = activeSurveyQuestions(state);
    const answers = cleanSurveyAnswers(response.answers, questions);
    const now = new Date().toISOString();
    const isTest = matchedDispatch.test === true || String(matchedDispatch.reservationId || '').startsWith('test-') || String(matchedDispatch.name || '').includes('TEST');
    const enriched = {
      id: `survey-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      token: matchedDispatch.token,
      reservationId: matchedDispatch.reservationId || '',
      reservationNumber: matchedDispatch.reservationNumber || '',
      screeningId: matchedDispatch.screeningId || '',
      movieTitle: matchedDispatch.movieTitle || '',
      screeningTime: matchedDispatch.screeningTime || '',
      venue: matchedDispatch.venue || '',
      seatPeople: Number(matchedDispatch.seatPeople || 1),
      phone: matchedDispatch.phone || '',
      name: matchedDispatch.name || '익명',
      answers,
      createdAt: now,
      submittedAt: now,
      status: '응답완료',
      allowDuplicate: !settings.preventDuplicate,
      test: isTest,
      type: isTest ? 'test' : (matchedDispatch.type || '')
    };
    const next = list.concat(enriched);
    state.surveyResponses = next;
    state.surveyDispatches = dispatches.map((dispatch) => normalizeValue(dispatch.token) === normalizeValue(token)
      ? { ...dispatch, status: '응답완료', respondedAt: now, responseId: enriched.id }
      : dispatch);
    state.lastUpdated = now;
    const written = await writeSupabaseState(state, record.updatedAt);
    if (Array.isArray(written) && written.length) return { ok: true, count: next.length, matchedDispatch: true, state, response: enriched };
  }
  const conflict = new Error('동시에 접수된 응답이 많아 저장하지 못했습니다. 잠시 후 다시 제출해 주세요.');
  conflict.status = 409;
  throw conflict;
}

function decodeWebhook(value) {
  const raw = String(value || env('GOOGLE_APPS_SCRIPT_URL') || DEFAULT_GOOGLE_APPS_SCRIPT_URL || '').trim();
  if (!raw) return '';
  if (/^https:\/\/script\.google\.com\/macros\/s\//.test(raw)) return raw;
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf8').trim();
    return /^https:\/\/script\.google\.com\/macros\/s\//.test(decoded) ? decoded : '';
  } catch (error) {
    return '';
  }
}

async function submitSurveyResponseToGoogle(webhookUrl, surveyResponse) {
  const validWebhook = /^https:\/\/script\.google\.com\/macros\/s\//.test(webhookUrl) && webhookUrl.endsWith('/exec');
  if (!validWebhook || !surveyResponse) return { skipped: true, reason: 'NO_GOOGLE_WEBHOOK' };
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ type: 'survey-response', response: surveyResponse })
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (error) { data = text.slice(0, 500); }
  if (!response.ok || (data && typeof data === 'object' && data.ok === false)) {
    return { ok: false, status: response.status, data, message: data?.message || '구글시트 만족도 응답 백업 실패' };
  }
  return { ok: true, status: response.status, data };
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
      try {
        const supabaseLookup = await fallbackSurveyLookupFromSupabase(token);
        if (supabaseLookup && supabaseLookup.ok) {
          return sendJson(res, 200, { ...supabaseLookup, source: 'supabase' });
        }
        const lookupStatus = supabaseLookup?.expired ? 410 : (supabaseLookup?.disabled ? 403 : 404);
        return sendJson(res, lookupStatus, { ok: false, message: supabaseLookup?.message || 'Supabase 원본에서 설문 대상 정보를 찾지 못했습니다. 관리자에서 테스트 링크/문자를 다시 만들어 주세요.', supabaseLookup });
      } catch (fallbackError) {
        return sendJson(res, 500, { ok: false, message: fallbackError && fallbackError.message ? fallbackError.message : 'Supabase 설문 조회 실패' });
      }
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const webhookUrl = decodeWebhook(body.webhookUrl || body.w);
      const surveyResponse = body.response || {};
      let supabaseUpdate = { skipped: true };
      try {
        supabaseUpdate = await appendSurveyResponseToSupabase(surveyResponse);
      } catch (supabaseError) {
        supabaseUpdate = { ok: false, status: supabaseError?.status || 500, message: supabaseError && supabaseError.message ? supabaseError.message : String(supabaseError) };
      }
      let googleSubmit = { skipped: true };
      if (supabaseUpdate?.ok === true) {
        try {
          const backupPromise = submitSurveyResponseToGoogle(webhookUrl, supabaseUpdate.response || surveyResponse);
          googleSubmit = await Promise.race([
            backupPromise,
            new Promise((resolve) => setTimeout(() => resolve({ pending: true, message: '구글시트 백업은 뒤에서 처리 중입니다.' }), 1200))
          ]);
        } catch (googleError) {
          googleSubmit = { ok: false, message: googleError && googleError.message ? googleError.message : String(googleError) };
        }
      }
      const finalOk = supabaseUpdate?.ok === true;
      return sendJson(res, finalOk ? 200 : (supabaseUpdate.status || 500), {
        ok: finalOk,
        message: finalOk ? 'Supabase 원본에 저장했습니다.' : (supabaseUpdate.message || 'Supabase 저장 실패'),
        supabaseUpdate,
        googleSubmit,
        googleSubmitOk: googleSubmit?.ok === true,
        googleSubmitPending: googleSubmit?.pending === true
      });
    }

    return sendJson(res, 405, { ok: false, message: 'GET 또는 POST만 허용됩니다.' });
  } catch (error) {
    return sendJson(res, 500, { ok: false, message: error && error.message ? error.message : '설문 처리 중 오류가 발생했습니다.' });
  }
};
