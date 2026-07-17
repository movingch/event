const SPREADSHEET_ID = '여기에_구글시트_ID를_넣으세요';

function doPost(e) {
  const now = new Date();
  try {
    const raw = (e && e.postData && e.postData.contents) || '';
    const body = parseBody_(raw, e);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const data = extractData_(body);

    writeApplicantsSheet(ss, data.applicants, now);
    writeStatsSheet(ss, data.stats, now);
    writeScreeningsSheet(ss, data.screenings, now);
    writeSyncLogSheet(ss, body, now, data, raw);

    return jsonOutput({
      ok: true,
      message: '저장 완료',
      savedAt: now.toISOString(),
      applicantsCount: data.applicants.length,
      statsCount: data.stats.length,
      screeningsCount: data.screenings.length,
      bodyKeys: Object.keys(body || {})
    });
  } catch (err) {
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = getOrCreateSheet(ss, '저장오류');
      sheet.appendRow([formatDateTime(now), err && err.message ? err.message : String(err)]);
    } catch (ignore) {}
    return jsonOutput({ ok: false, message: err && err.message ? err.message : String(err) });
  }
}

function doGet() {
  return jsonOutput({ ok: true, message: '머내마을영화제 구글시트 연동 웹앱 v63가 작동 중입니다.' });
}

function parseBody_(raw, e) {
  // v63: 웹앱이 hidden form POST로 보내는 e.parameter.payload를 우선 읽고, 이전 JSON/raw 방식도 함께 지원합니다.
  if (e && e.parameter && e.parameter.payload) {
    try { return JSON.parse(e.parameter.payload); } catch (err0) {}
  }
  if (!raw) return {};
  try { return JSON.parse(raw); } catch (err) {}
  try {
    var text = String(raw);
    var payload = text;
    if (text.indexOf('payload=') === 0) {
      payload = text.substring('payload='.length);
    } else if (text.indexOf('&payload=') >= 0) {
      payload = text.split('&payload=')[1].split('&')[0];
    }
    return JSON.parse(decodeURIComponent(payload.replace(/\+/g, ' ')));
  } catch (err2) {}
  return { raw: String(raw) };
}

function extractData_(body) {
  const applicants = firstNonEmptyArray_(
    normalizeRecords(body.applicants),
    normalizeRecords(body.reservations),
    normalizeRecords(body.data && body.data.applicants),
    normalizeRecords(body.data && body.data.reservations),
    normalizeRecords(body.sheets && body.sheets.applicants),
    normalizeRecords(body.sheets && body.sheets.reservations),
    normalizeRecords(body.rows && body.rows.applicants),
    normalizeRecords(body.rows && body.rows.reservations),
    body.type === 'reservations' || body.type === 'applicants' ? normalizeRecords(body.rows) : [],
    body.type === 'reservations' || body.type === 'applicants' ? normalizeCsv_(body.csv) : []
  );

  const stats = firstNonEmptyArray_(
    normalizeRecords(body.stats),
    normalizeRecords(body.data && body.data.stats),
    normalizeRecords(body.sheets && body.sheets.stats),
    normalizeRecords(body.rows && body.rows.stats),
    body.type === 'stats' ? normalizeRecords(body.rows) : [],
    body.type === 'stats' ? normalizeCsv_(body.csv) : []
  );

  const screenings = firstNonEmptyArray_(
    normalizeRecords(body.screenings),
    normalizeRecords(body.data && body.data.screenings),
    normalizeRecords(body.sheets && body.sheets.screenings),
    normalizeRecords(body.rows && body.rows.screenings),
    body.type === 'screenings' ? normalizeRecords(body.rows) : [],
    body.type === 'screenings' ? normalizeCsv_(body.csv) : []
  );

  return { applicants: applicants, stats: stats, screenings: screenings };
}

function firstNonEmptyArray_() {
  for (var i = 0; i < arguments.length; i++) {
    if (Array.isArray(arguments[i]) && arguments[i].length > 0) return arguments[i];
  }
  return [];
}

function normalizeRecords(input) {
  if (!Array.isArray(input) || input.length === 0) return [];
  if (isArrayOfObjects_(input)) return input;
  if (Array.isArray(input[0])) return rowsToObjects_(input);
  return [];
}

function isArrayOfObjects_(arr) {
  return arr.length > 0 && Object.prototype.toString.call(arr[0]) === '[object Object]';
}

function rowsToObjects_(rows) {
  if (!Array.isArray(rows) || rows.length < 2) return [];
  const headers = rows[0].map(function (h) { return String(h || '').trim(); });
  return rows.slice(1).filter(function (row) {
    return Array.isArray(row) && row.some(function (cell) { return String(cell == null ? '' : cell).trim() !== ''; });
  }).map(function (row) {
    const obj = {};
    headers.forEach(function (header, index) {
      if (header) obj[header] = row[index] == null ? '' : row[index];
    });
    return obj;
  });
}

function normalizeCsv_(csv) {
  if (!csv || typeof csv !== 'string') return [];
  const rows = Utilities.parseCsv(csv);
  return rowsToObjects_(rows);
}

function writeApplicantsSheet(ss, applicants, now) {
  const sheet = getOrCreateSheet(ss, '신청자현황');
  sheet.clearContents();

  const headers = [
    '영화명', '상영관', '상영일', '상영시간', '예약번호', '신청자', '연락처', '이메일',
    '좌석', '신청인원', '참석인원', '참석여부', '티켓구분', '후원자명/입금자명',
    '문자수신동의', '문자상태', '문자발송일', '신청일', '메모', '저장시각'
  ];

  const rows = applicants.map(function (r) {
    return [
      valueOf(r, ['movieTitle', '영화명', '영화', 'movie', 'title']),
      valueOf(r, ['venue', '상영관', 'theater']),
      valueOf(r, ['screeningDate', '상영일', 'date']),
      valueOf(r, ['screeningTime', '상영시간', 'time']),
      valueOf(r, ['reservationNumber', '예약번호', 'reservationCode', 'reservationNo', 'code']),
      valueOf(r, ['name', '신청자', 'applicantName']),
      valueOf(r, ['phone', '연락처', 'tel']),
      valueOf(r, ['email', '이메일']),
      valueOf(r, ['seat', '좌석', 'seatLabel', 'seatNo']),
      valueOf(r, ['count', '신청인원', 'people', 'quantity', '인원']),
      valueOf(r, ['attendedCount', '참석인원', 'actualCount', '실제참석인원']),
      valueOf(r, ['attendanceStatus', '참석여부', 'status', '상태']),
      valueOf(r, ['ticketType', '티켓구분', 'type', '신청구분']),
      valueOf(r, ['donorName', '후원자명/입금자명']),
      valueOf(r, ['smsConsent', '문자수신동의']),
      valueOf(r, ['smsStatus', '문자상태']),
      valueOf(r, ['smsSentAt', '문자발송일']),
      valueOf(r, ['createdAt', '신청일']),
      valueOf(r, ['memo', '메모', 'note']),
      formatDateTime(now)
    ];
  });

  writeRows(sheet, headers, rows);
}

function writeStatsSheet(ss, stats, now) {
  const sheet = getOrCreateSheet(ss, '통계');
  sheet.clearContents();

  const headers = [
    '영화명', '상영관', '상영시간', '정원', '신청건수', '신청인원', '개막작신청인원',
    '일반신청인원', '참석인원', '취소건수', '취소인원', '남은좌석', '신청률',
    '참석률', '정원상태', '티켓팅단계', '저장시각'
  ];

  const rows = stats.map(function (r) {
    return [
      valueOf(r, ['movieTitle', '영화명', '영화', 'title', 'name']),
      valueOf(r, ['venue', '상영관', 'theater']),
      valueOf(r, ['screeningTime', '상영시간', 'time']),
      valueOf(r, ['capacity', '정원']),
      valueOf(r, ['applicationCount', '신청건수', '신청']),
      valueOf(r, ['applicantCount', '신청인원', 'applied', 'applicants', 'reserved']),
      valueOf(r, ['openingApplicantCount', '개막작신청인원']),
      valueOf(r, ['generalApplicantCount', '일반신청인원']),
      valueOf(r, ['attendedCount', '참석인원', 'attended', 'attendance', '참석']),
      valueOf(r, ['canceledCount', '취소건수', 'cancelled', 'canceled', 'cancel']),
      valueOf(r, ['canceledSeats', '취소인원', '취소']),
      valueOf(r, ['remainingSeats', '남은좌석']),
      valueOf(r, ['applicationRate', '신청률', 'applyRate']),
      valueOf(r, ['attendanceRate', '참석률']),
      valueOf(r, ['status', '정원상태']),
      valueOf(r, ['ticketingPhase', '티켓팅단계']),
      formatDateTime(now)
    ];
  });

  writeRows(sheet, headers, rows);
}

function writeScreeningsSheet(ss, screenings, now) {
  const sheet = getOrCreateSheet(ss, '상영관영화');
  sheet.clearContents();

  const headers = [
    '영화명', '상영관', '회차ID', '시작', '종료', '정원', '신청건수', '신청인원',
    '참석인원', '취소건수', '취소인원', '신청률', '참석률', '상태', '개막작여부',
    '티켓팅단계', 'GV', '모더레이터', '담당스태프', '연락처', '기타', '저장시각'
  ];

  const rows = screenings.map(function (r) {
    return [
      valueOf(r, ['movieTitle', '영화명', '영화', 'title']),
      valueOf(r, ['venue', '상영관', 'theater']),
      valueOf(r, ['screeningId', '회차ID', 'id']),
      valueOf(r, ['startTime', '시작']),
      valueOf(r, ['endTime', '종료']),
      valueOf(r, ['capacity', '정원']),
      valueOf(r, ['applicationCount', '신청건수']),
      valueOf(r, ['applicantCount', '신청인원']),
      valueOf(r, ['attendedCount', '참석인원']),
      valueOf(r, ['canceledCount', '취소건수']),
      valueOf(r, ['canceledSeats', '취소인원']),
      valueOf(r, ['applicationRate', '신청률']),
      valueOf(r, ['attendanceRate', '참석률']),
      valueOf(r, ['status', '상태']),
      valueOf(r, ['opening', '개막작여부']),
      valueOf(r, ['ticketingPhase', '티켓팅단계']),
      valueOf(r, ['gvHost', 'GV']),
      valueOf(r, ['moderator', '모더레이터']),
      valueOf(r, ['staff', '담당스태프']),
      valueOf(r, ['staffPhone', '연락처']),
      valueOf(r, ['notes', '기타']),
      formatDateTime(now)
    ];
  });

  writeRows(sheet, headers, rows);
}

function writeSyncLogSheet(ss, body, now, data, raw) {
  const sheet = getOrCreateSheet(ss, '저장기록');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['저장시각', '저장방식', '신청자수', '통계수', '상영정보수', '받은키', 'rows형태', 'applicants원본', 'stats원본', 'screenings원본', '원문길이', '원문앞부분']);
  }
  sheet.appendRow([
    formatDateTime(now),
    body.mode || body.type || 'auto',
    data.applicants.length,
    data.stats.length,
    data.screenings.length,
    Object.keys(body || {}).join(', '),
    Array.isArray(body.rows) ? 'rows=array' : (body.rows ? 'rows=object' : ''),
    describeArray_(body && body.applicants),
    describeArray_(body && body.stats),
    describeArray_(body && body.screenings),
    String(raw || '').length,
    String(raw || '').slice(0, 180)
  ]);
}

function writeRows(sheet, headers, rows) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length > 0) sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function describeArray_(value) {
  if (!Array.isArray(value)) return value == null ? '' : typeof value;
  if (!value.length) return 'array:0';
  var first = value[0];
  if (Array.isArray(first)) return 'array:' + value.length + ' first=array:' + first.length;
  if (first && typeof first === 'object') return 'array:' + value.length + ' firstKeys=' + Object.keys(first).slice(0, 8).join('|');
  return 'array:' + value.length + ' first=' + String(first).slice(0, 40);
}

function getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function valueOf(obj, keys) {
  for (var i = 0; i < keys.length; i++) {
    if (obj && obj[keys[i]] !== undefined && obj[keys[i]] !== null) return obj[keys[i]];
  }
  return '';
}

function formatDateTime(date) {
  return Utilities.formatDate(date, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
