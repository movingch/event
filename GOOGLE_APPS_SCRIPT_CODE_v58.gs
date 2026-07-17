const SPREADSHEET_ID = '여기에_구글시트_ID를_넣으세요';

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const now = new Date();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    const applicants = normalizeRecords(body.applicants, body.rows && body.rows.applicants);
    const stats = normalizeRecords(body.stats, body.rows && body.rows.stats);
    const screenings = normalizeRecords(body.screenings, body.rows && body.rows.screenings);

    writeApplicantsSheet(ss, applicants, now);
    writeStatsSheet(ss, stats, now);
    writeScreeningsSheet(ss, screenings, now);
    writeSyncLogSheet(ss, body, now, applicants.length, stats.length, screenings.length);

    return jsonOutput({
      ok: true,
      message: '저장 완료',
      savedAt: now.toISOString(),
      applicantsCount: applicants.length,
      statsCount: stats.length,
      screeningsCount: screenings.length
    });
  } catch (err) {
    return jsonOutput({ ok: false, message: err && err.message ? err.message : String(err) });
  }
}

function doGet() {
  return jsonOutput({ ok: true, message: '머내마을영화제 구글시트 연동 웹앱이 작동 중입니다.' });
}

function normalizeRecords(records, rows) {
  if (Array.isArray(records) && records.length) return records;
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
      valueOf(r, ['count', '신청인원', 'people', 'quantity']),
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
      valueOf(r, ['applicationCount', '신청건수']),
      valueOf(r, ['applicantCount', '신청인원', 'applied', 'applicants', 'reserved']),
      valueOf(r, ['openingApplicantCount', '개막작신청인원']),
      valueOf(r, ['generalApplicantCount', '일반신청인원']),
      valueOf(r, ['attendedCount', '참석인원', 'attended', 'attendance']),
      valueOf(r, ['canceledCount', '취소건수', 'cancelled', 'canceled', 'cancel']),
      valueOf(r, ['canceledSeats', '취소인원']),
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

function writeSyncLogSheet(ss, body, now, applicantsCount, statsCount, screeningsCount) {
  const sheet = getOrCreateSheet(ss, '저장기록');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['저장시각', '저장방식', '신청자수', '통계수', '상영정보수', '메시지']);
  }

  sheet.appendRow([
    formatDateTime(now),
    body.mode || 'auto',
    applicantsCount || 0,
    statsCount || 0,
    screeningsCount || 0,
    body.message || ''
  ]);
}

function writeRows(sheet, headers, rows) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
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
