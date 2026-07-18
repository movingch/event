const DEFAULT_GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEM_kItJA7eIk8fuGzsWbupiguPKiEhtnz-bk23qFRxVHJ1aWNwOFc_0vFXLXeY6w3/exec';

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
function parseAnswers(value) {
  if (!value) return {};
  if (typeof value === 'object' && !Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (error) {
      return {};
    }
  }
  return {};
}
function answerValue(response, answers, keys) {
  for (const key of keys) {
    const direct = response && response[key];
    if (direct !== undefined && direct !== null && String(direct) !== '') return direct;
    const nested = answers && answers[key];
    if (nested !== undefined && nested !== null && String(nested) !== '') return nested;
  }
  return '';
}

function buildDonations(state) {
  return arr(state.donations).map((d, i) => ({
    no: i + 1,
    createdAt: d.createdAt || '',
    donorName: d.donorName || '',
    depositorName: d.depositorName || '',
    phone: d.phone || '',
    amount: num(d.amount || 10000),
    smsStatus: d.smsStatus || '',
    smsSentAt: d.smsSentAt || '',
    smsRequestId: d.smsRequestId || '',
    smsError: d.smsError || ''
  }));
}

function buildSurvey(state) {
  const settings = state.surveySettings || {};
  const surveyQuestions = arr(settings.questions || state.surveyQuestions);
  const questions = surveyQuestions.map((q, i) => ({
    order: q.order || i + 1,
    id: q.id || '',
    enabled: q.enabled === false ? 'OFF' : 'ON',
    type: q.type || '',
    typeLabel: q.typeLabel || q.type || '',
    title: q.title || q.question || q.label || '',
    choices: Array.isArray(q.choices) ? q.choices.join(', ') : (q.choices || ''),
    required: q.required ? '필수' : '선택'
  }));
  const responses = arr(state.surveyResponses).map((r, i) => {
    const answers = parseAnswers(r.answers || r.response || r.responses);
    const row = {
      no: i + 1,
      index: i + 1,
      submittedAt: r.submittedAt || r.createdAt || '',
      reservationNumber: r.reservationNumber || '',
      token: r.token || '',
      name: r.name || '',
      phone: r.phone || r.contact || '',
      movieTitle: r.movieTitle || '',
      screeningTime: r.screeningTime || r.startTime || '',
      venue: r.venue || '',
      overallRating: answerValue(r, answers, ['overallRating', 'q-overall', 'overall', 'rating']),
      venueRating: answerValue(r, answers, ['venueRating', 'q-venue', 'venueSatisfaction']),
      guideRating: answerValue(r, answers, ['guideRating', 'q-guide', 'guideSatisfaction']),
      returnIntent: answerValue(r, answers, ['returnIntent', 'q-return', 'revisitIntent']),
      goodComment: answerValue(r, answers, ['goodComment', 'q-good', 'good', 'positiveComment']),
      improveComment: answerValue(r, answers, ['improveComment', 'q-improve', 'improve', 'improvementComment']),
      status: r.status || '응답완료',
      test: r.test ? 'TEST' : ''
    };
    // 문항 ID가 추가되거나 바뀌어도 구글시트에 값이 사라지지 않도록 answers 객체도 원형 그대로 보냅니다.
    row.answers = answers;
    row.answersText = JSON.stringify(answers);
    surveyQuestions.forEach((q, questionIndex) => {
      const qid = q && q.id ? String(q.id) : '';
      const label = `문항${questionIndex + 1}`;
      row[label] = qid && answers[qid] !== undefined && answers[qid] !== null ? answers[qid] : '';
    });
    return row;
  });
  const dispatches = arr(state.surveyDispatches).map((d, i) => ({
    no: i + 1,
    index: i + 1,
    sentAt: d.sentAt || d.createdAt || '',
    reservationNumber: d.reservationNumber || '',
    token: d.token || '',
    status: d.status || '',
    name: d.name || '',
    phone: d.phone || '',
    movieTitle: d.movieTitle || '',
    screeningTime: d.screeningTime || d.startTime || '',
    venue: d.venue || '',
    link: d.link || '',
    error: d.error || '',
    test: d.test ? 'TEST' : ''
  }));
  const stats = buildScreenings(state).map((s, i) => {
    const movie = s.movieTitle || '';
    const res = responses.filter((r) => r.movieTitle === movie);
    const sent = dispatches.filter((d) => d.movieTitle === movie).length;
    const ratings = res.map((r) => Number(r.overallRating || 0)).filter((n) => n > 0);
    return { no: i + 1, movieTitle: movie, screeningTime: s.startTime || '', venue: s.venue || '', attendedCount: s.attendedCount || 0, sentCount: sent, responseCount: res.length, responseRate: sent ? `${Math.round(res.length / sent * 100)}%` : '-', averageRating: ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : '-' };
  });
  return { settings: [{ festival: '제9회 머내마을영화제', enabled: settings.enabled ? 'ON' : 'OFF', updatedAt: new Date().toISOString() }], questions, responses, stats, dispatches };
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
  const donations = buildDonations(state);
  return {
    festival: '제9회 머내마을영화제', mode, generatedAt: new Date().toISOString(), applicants, stats, screenings, donations, survey: buildSurvey(state),
    rows: { applicants: rowsFromObjects(applicants), stats: rowsFromObjects(stats), screenings: rowsFromObjects(screenings), donations: rowsFromObjects(donations) }
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
      counts: { applicantsCount: payload.applicants.length, statsCount: payload.stats.length, screeningsCount: payload.screenings.length, surveyResponsesCount: payload.survey.responses.length, surveyDispatchesCount: payload.survey.dispatches.length, donationsCount: payload.donations.length },
      appsScript
    });
  } catch (error) {
    return json(res, error.status || 500, { ok: false, configured: supabaseConfig().configured, message: error.message || String(error), detail: error.data || null });
  }
};
