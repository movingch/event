function json(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.end(JSON.stringify(data));
}

function env(name) {
  return String(process.env[name] || '').trim();
}

const DEFAULT_GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEM_kItJA7eIk8fuGzsWbupiguPKiEhtnz-bk23qFRxVHJ1aWNwOFc_0vFXLXeY6w3/exec';

function supabaseConfig() {
  const url = env('SUPABASE_URL').replace(/\/$/, '');
  const key = env('SUPABASE_SERVICE_ROLE_KEY') || env('SUPABASE_SECRET_KEY') || env('SUPABASE_ANON_KEY');
  return { url, key, configured: Boolean(url && key) };
}

async function supabaseFetch(path, options = {}) {
  const cfg = supabaseConfig();
  if (!cfg.configured) {
    const err = new Error('Supabase 환경변수가 설정되지 않았습니다.');
    err.code = 'NO_SUPABASE_CONFIG';
    throw err;
  }
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
  if (!response.ok) {
    const err = new Error(typeof data === 'object' && data?.message ? data.message : `Supabase 요청 실패: ${response.status}`);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function readState() {
  const rows = await supabaseFetch('festival_state?key=eq.main&select=key,state,updated_at&limit=1', { method: 'GET' });
  const row = Array.isArray(rows) ? rows[0] : null;
  return row || null;
}

async function writeState(state) {
  const rows = await supabaseFetch('festival_state', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify([{ key: 'main', state, updated_at: new Date().toISOString() }])
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

function recordKey(item) {
  return String(item?.id || item?.token || item?.reservationId || item?.reservationNumber || item?.submittedAt || item?.createdAt || '');
}

function mergeSurveyRecords(remoteItems, incomingItems) {
  const merged = new Map();
  for (const item of Array.isArray(remoteItems) ? remoteItems : []) {
    const key = recordKey(item);
    if (key) merged.set(key, item);
  }
  for (const item of Array.isArray(incomingItems) ? incomingItems : []) {
    const key = recordKey(item);
    if (key) merged.set(key, { ...(merged.get(key) || {}), ...item });
  }
  return [...merged.values()];
}

function preserveConcurrentSurveyData(remoteState, incomingState, reason) {
  const destructiveReasons = ['clear-survey-responses', 'clear-survey-dispatches', 'delete-survey-response', 'delete-survey-dispatch', 'manual-force-migration'];
  if (destructiveReasons.some((prefix) => String(reason || '').startsWith(prefix))) return incomingState;
  const next = { ...incomingState };
  next.surveyResponses = mergeSurveyRecords(remoteState?.surveyResponses, incomingState?.surveyResponses);
  next.surveyDispatches = mergeSurveyRecords(remoteState?.surveyDispatches, incomingState?.surveyDispatches).map((dispatch) => {
    const remote = (Array.isArray(remoteState?.surveyDispatches) ? remoteState.surveyDispatches : []).find((item) => recordKey(item) === recordKey(dispatch));
    if (remote?.respondedAt && !String(dispatch.status || '').includes('응답')) return { ...dispatch, status: remote.status || '응답완료', respondedAt: remote.respondedAt, responseId: remote.responseId || dispatch.responseId || '' };
    return dispatch;
  });
  return next;
}

async function backupToGoogleSheet(googlePayload, webhookUrl) {
  const url = String(webhookUrl || env('GOOGLE_APPS_SCRIPT_URL') || DEFAULT_GOOGLE_APPS_SCRIPT_URL || '').trim();
  if (!url || !googlePayload) return { skipped: true, reason: 'NO_GOOGLE_BACKUP_CONFIG' };
  const upstream = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    body: JSON.stringify(googlePayload),
    redirect: 'follow'
  });
  const text = await upstream.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (error) { data = text.slice(0, 500); }
  const counts = {
    applicantsCount: Array.isArray(googlePayload.applicants) ? googlePayload.applicants.length : 0,
    statsCount: Array.isArray(googlePayload.stats) ? googlePayload.stats.length : 0,
    screeningsCount: Array.isArray(googlePayload.screenings) ? googlePayload.screenings.length : 0
  };
  if (!upstream.ok || (data && typeof data === 'object' && data.ok === false)) return { ok: false, status: upstream.status, data, counts };
  return { ok: true, data, counts };
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const cfg = supabaseConfig();
      if (!cfg.configured) return json(res, 200, { ok: false, configured: false, message: 'Supabase 환경변수가 설정되지 않았습니다.' });
      const row = await readState();
      return json(res, 200, { ok: true, configured: true, found: Boolean(row), data: row?.state || null, updatedAt: row?.updated_at || null });
    }

    if (req.method === 'POST') {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString('utf8');
      const body = raw ? JSON.parse(raw) : {};
      const state = body.state;
      if (!state || typeof state !== 'object') return json(res, 400, { ok: false, message: '저장할 state 데이터가 없습니다.' });
      const current = await readState();
      const safeState = current?.state && typeof current.state === 'object' ? preserveConcurrentSurveyData(current.state, state, body.reason) : state;
      const row = await writeState(safeState);
      let googleBackup = { skipped: true };
      if (body.googlePayload) {
        googleBackup = await backupToGoogleSheet(body.googlePayload, body.googleWebhookUrl);
      }
      return json(res, 200, { ok: true, data: row?.state || safeState, updatedAt: row?.updated_at || null, googleBackup });
    }

    return json(res, 405, { ok: false, message: 'GET/POST only' });
  } catch (error) {
    const status = error.status || 500;
    return json(res, status, { ok: false, configured: supabaseConfig().configured, message: error.message || String(error), detail: error.data || null });
  }
};
