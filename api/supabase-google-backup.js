const DEFAULT_GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwc18Y1SArlzYkXfnw1so5SsFKUMg3v9-RgJagkvgihNgEqRuS-eJtM7fKpMfgqrnyE/exec';

function env(name) { return String(process.env[name] || '').trim(); }
function json(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.end(JSON.stringify(data));
}
function supabaseConfig() {
  const url = env('SUPABASE_URL').replace(/\/$/, '');
  const key = env('SUPABASE_SERVICE_ROLE_KEY') || env('SUPABASE_SECRET_KEY') || env('SUPABASE_ANON_KEY');
  return { url, key, configured: Boolean(url && key) };
}
async function supabaseFetch(path, options = {}) {
  const cfg = supabaseConfig();
  if (!cfg.configured) throw new Error('Supabase 환경변수가 설정되지 않았습니다.');
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
  return row ? { state: row.state || {}, updatedAt: row.updated_at || '' } : { state: {}, updatedAt: '' };
}
function arr(v) { return Array.isArray(v) ? v : []; }
function num(v) { const n = Number(v || 0); return Number.isFinite(n) ? n : 0; }
function datePart(v) { return String(v || '').slice(0, 10); }
function timePart(v) { const s = String(v || ''); return s.includes('T') ? s.slice(11, 16) : s.slice(0, 5); }
function screeningById(state, id) { return arr(state.screenings).find((s) => String(s.id) === String(id)) || null; }
function reservationsFor(state, screeningId) { return arr(state.reservations).filter((r) => String(r.screeningId) === String(screeningId)); }
function isCanceled(r) { return r.attended === false || r.attendanceStatus === '미참석' || r.status === '취소' || r.status === '미참석'; }
function appliedSeats(state, id) { return reservationsFor(state, id).filter((r) => !isCanceled(r)).reduce((sum, r) => sum + num(r.seats || r.count), 0); }
function applicationCount(state, id) { return reservationsFor(state, id).filter((r) => !isCanceled(r)).length; }
function attendedSeats(state, id) { return reservationsFor(state, id).filter((r) => r.attended === true || r.attendanceStatus === '참석').reduce((sum, r) => sum + num(r.attendedSeats || r.seats || r.count), 0); }
function canceledCount(state, id) { return reservationsFor(state, id).filter(isCanceled).length; }
function canceledSeats(state, id) { return reservationsFor(state, id).filter(isCanceled).reduce((sum, r) => sum + num(r.seats || r.count), 0); }
function rate(a, b) { return b ? `${Math.round((a / b) * 100)}%` : '0%'; }
function reservationNumber(state, r, s) {
  if (r.reservationNumber) return r.reservationNumber;
  const list = reservationsFor(state, r.screeningId).sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
  const idx = Math.max(0, list.findIndex((x) => String(x.id) === String(r.id))) + 1;
  const venue = String(s?.venue || 'A');
  const prefix = venue.includes('동천') ? 'DC' : venue.includes('머내') ? 'MN' : venue.includes('느티') ? 'NT' : 'MV';
  return `${prefix}-${String(idx || 1).padStart(3, '0')}`;
}
function attendanceState(r) {
  if (r.attended === true || r.attendanceStatus === '참석') return '참석';
  if (isCanceled(r)) return '미참석';
  return '신청';
}
function buildApplicants(state) {
  return arr(state.reservations).map((r) => {
    const s = screeningById(state, r.screeningId);
    return {
      movieTitle: s?.title || r.movieTitle || '삭제된 회차',
      venue: s?.venue || r.venue || '',
      screeningDate: datePart(s?.startTime || r.screeningTime || r.createdAt),
      screeningTime: timePart(s?.startTime || r.screeningTime),
      reservationNumber: reservationNumber(state, r, s),
      name: r.name || '',
      phone: r.phone || '',
      email: r.email || '',
      count: num(r.seats || r.count),
      attendedCount: attendanceState(r) === '참석' ? num(r.attendedSeats || r.seats || r.count) : 0,
      attendanceStatus: attendanceState(r),
      donorName: r.donorName || '',
      smsConsent: r.smsConsent === false ? '미동의' : '동의',
      smsStatus: r.smsStatus || '미발송',
      smsSentAt: r.smsSentAt || '',
      createdAt: r.createdAt || '',
      memo: r.note || ''
    };
  });
}
function buildStats(state) {
  return arr(state.screenings).map((s) => {
    const cap = num(s.capacity);
    const applied = appliedSeats(state, s.id);
    const attended = attendedSeats(state, s.id);
    return {
      movieTitle: s.title || '', venue: s.venue || '', screeningTime: s.startTime || '', capacity: cap,
      applicationCount: applicationCount(state, s.id), applicantCount: applied,
      openingApplicantCount: 0, generalApplicantCount: applied,
      attendedCount: attended, unattendedCount: canceledCount(state, s.id), unattendedSeats: canceledSeats(state, s.id),
      canceledCount: canceledCount(state, s.id), canceledSeats: canceledSeats(state, s.id), remainingCount: Math.max(0, cap - applied),
      applicationRate: rate(applied, cap), attendanceRate: rate(attended, applied), status: s.status || ''
    };
  });
}
function buildScreenings(state) {
  return arr(state.screenings).map((s) => {
    const cap = num(s.capacity);
    const applied = appliedSeats(state, s.id);
    const attended = attendedSeats(state, s.id);
    return {
      movieTitle: s.title || '', venue: s.venue || '', screeningId: s.id || '', startTime: s.startTime || '', endTime: s.endTime || '', capacity: cap,
      applicationCount: applicationCount(state, s.id), applicantCount: applied, openingApplicantCount: 0, generalApplicantCount: applied,
      attendedCount: attended, unattendedCount: canceledCount(state, s.id), unattendedSeats: canceledSeats(state, s.id), canceledCount: canceledCount(state, s.id), canceledSeats: canceledSeats(state, s.id),
      applicationRate: rate(applied, cap), attendanceRate: rate(attended, applied), status: s.status || '', opening: s.opening ? '개막작' : '', gvHost: s.gvHost || '', moderator: s.moderator || '', staff: s.staff || '', staffPhone: s.staffPhone || '', notes: s.notes || ''
    };
  });
}
function buildSurvey(state) {
  const settings = state.surveySettings || {};
  const questions = arr(settings.questions || state.surveyQuestions).map((q, i) => ({ order: i + 1, type: q.type || '', question: q.question || q.label || '', required: q.required ? '필수' : '' }));
  const responses = arr(state.surveyResponses).map((r, i) => ({
    index: i + 1, submittedAt: r.submittedAt || r.createdAt || '', reservationNumber: r.reservationNumber || '', name: r.name || '', phone: r.phone || '', movieTitle: r.movieTitle || '', venue: r.venue || '', rating: r.rating || r.averageRating || '', answers: JSON.stringify(r.answers || r.response || {})
  }));
  const dispatches = arr(state.surveyDispatches).map((d, i) => ({ index: i + 1, sentAt: d.sentAt || d.createdAt || '', status: d.status || '', name: d.name || '', phone: d.phone || '', movieTitle: d.movieTitle || '', venue: d.venue || '', token: d.token || '', test: d.test ? 'TEST' : '' }));
  return { settings: [{ festival: '제9회 머내마을영화제', enabled: settings.enabled ? 'ON' : 'OFF', updatedAt: new Date().toISOString() }], questions, responses, stats: [], dispatches };
}
function rowsFromObjects(items) {
  const keys = [...new Set(items.flatMap((item) => Object.keys(item || {})))];
  if (!keys.length) return [];
  return [keys, ...items.map((item) => keys.map((k) => item?.[k] ?? ''))];
}
function buildPayload(state, mode = 'server-supabase-auto') {
  const applicants = buildApplicants(state);
  const stats = buildStats(state);
  const screenings = buildScreenings(state);
  return {
    festival: '제9회 머내마을영화제', mode, generatedAt: new Date().toISOString(), applicants, stats, screenings, survey: buildSurvey(state),
    rows: { applicants: rowsFromObjects(applicants), stats: rowsFromObjects(stats), screenings: rowsFromObjects(screenings) }
  };
}
async function postToGoogle(payload, webhookUrl) {
  const url = String(webhookUrl || env('GOOGLE_APPS_SCRIPT_URL') || DEFAULT_GOOGLE_APPS_SCRIPT_URL || '').trim();
  if (!/^https:\/\/script\.google\.com\/macros\/s\//.test(url) || !url.includes('/exec')) throw new Error('유효한 Apps Script /exec URL이 아닙니다.');
  const upstream = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain; charset=utf-8', Accept: 'application/json, text/plain, */*' }, body: JSON.stringify(payload), redirect: 'follow' });
  const text = await upstream.text();
  let data = null;
  try { data = JSON.parse(text); } catch (error) { data = text.slice(0, 1000); }
  if (!upstream.ok || (data && typeof data === 'object' && data.ok === false)) {
    const err = new Error(data?.message || `Apps Script 저장 실패: ${upstream.status}`);
    err.data = data;
    err.status = upstream.status;
    throw err;
  }
  return data;
}
module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') return json(res, 405, { ok: false, message: 'POST only' });
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    const body = raw ? JSON.parse(raw) : {};
    const { state, updatedAt } = await readSupabaseState();
    if (!state || typeof state !== 'object') return json(res, 404, { ok: false, message: 'Supabase 원본 데이터가 없습니다.' });
    const payload = buildPayload(state, body.reason || 'server-supabase-auto');
    const appsScript = await postToGoogle(payload, body.googleWebhookUrl || body.webhookUrl || '');
    return json(res, 200, {
      ok: true,
      message: 'Supabase 원본을 구글시트로 백업했습니다.',
      updatedAt,
      counts: { applicantsCount: payload.applicants.length, statsCount: payload.stats.length, screeningsCount: payload.screenings.length, surveyResponsesCount: payload.survey.responses.length, surveyDispatchesCount: payload.survey.dispatches.length },
      appsScript
    });
  } catch (error) {
    return json(res, error.status || 500, { ok: false, configured: supabaseConfig().configured, message: error.message || String(error), detail: error.data || null });
  }
};
