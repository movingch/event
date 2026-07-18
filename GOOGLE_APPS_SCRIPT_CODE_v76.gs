const SPREADSHEET_ID = '여기에_구글시트_ID를_넣으세요';
const TZ = 'Asia/Seoul';
const BRAND = {
  navy: '#1f2937',
  blue: '#2563eb',
  sky: '#e0f2fe',
  green: '#16a34a',
  greenBg: '#dcfce7',
  red: '#dc2626',
  redBg: '#fee2e2',
  amber: '#d97706',
  amberBg: '#fef3c7',
  gray: '#6b7280',
  grayBg: '#f3f4f6',
  line: '#d1d5db',
  white: '#ffffff'
};

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
    writePrintableApplicantsSheet(ss, data.applicants, now);
    writeSyncLogSheet(ss, body, now, data, raw);
    applySpreadsheetFinishing_(ss);

    return jsonOutput({
      ok: true,
      message: '저장 및 시트 디자인 적용 완료',
      version: 'v76-sheet-design',
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
      if (sheet.getLastRow() === 0) sheet.appendRow(['오류시각', '오류내용']);
      sheet.appendRow([formatDateTime(now), err && err.message ? err.message : String(err)]);
      styleSimpleLogSheet_(sheet, '저장오류');
    } catch (ignore) {}
    return jsonOutput({ ok: false, message: err && err.message ? err.message : String(err) });
  }
}

function doGet() {
  return jsonOutput({ ok: true, message: '머내마을영화제 구글시트 연동 웹앱 v76 시트 디자인 버전이 작동 중입니다.' });
}

function parseBody_(raw, e) {
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
  const sheet = resetSheet_(ss, '신청자현황');
  const headers = [
    'No', '신청일시', '예약번호', '참석여부', '신청자', '연락처', '영화명', '상영일', '상영시간', '상영관',
    '좌석', '신청인원', '참석인원', '티켓구분', '후원자명/입금자명', '문자수신', '문자상태', '문자발송일', '메모', '저장시각'
  ];

  const rows = applicants.map(function (r, index) {
    return [
      index + 1,
      valueOf(r, ['createdAt', '신청일', '신청일시']),
      valueOf(r, ['reservationNumber', '예약번호', 'reservationCode', 'reservationNo', 'code']),
      normalizeAttendance_(valueOf(r, ['attendanceStatus', '참석여부', 'status', '상태'])),
      valueOf(r, ['name', '신청자', 'applicantName']),
      valueOf(r, ['phone', '연락처', 'tel']),
      valueOf(r, ['movieTitle', '영화명', '영화', 'movie', 'title']),
      valueOf(r, ['screeningDate', '상영일', 'date']),
      valueOf(r, ['screeningTime', '상영시간', 'time']),
      valueOf(r, ['venue', '상영관', 'theater']),
      valueOf(r, ['seat', '좌석', 'seatLabel', 'seatNo']),
      valueOf(r, ['count', '신청인원', 'people', 'quantity', '인원']),
      valueOf(r, ['attendedCount', '참석인원', 'actualCount', '실제참석인원']),
      valueOf(r, ['ticketType', '티켓구분', 'type', '신청구분']),
      valueOf(r, ['donorName', '후원자명/입금자명']),
      valueOf(r, ['smsConsent', '문자수신동의']),
      valueOf(r, ['smsStatus', '문자상태']),
      valueOf(r, ['smsSentAt', '문자발송일']),
      valueOf(r, ['memo', '메모', 'note']),
      formatDateTime(now)
    ];
  });

  const attended = rows.filter(function (row) { return String(row[3]).indexOf('참석') >= 0 && String(row[3]).indexOf('미참석') < 0; }).length;
  const canceled = rows.filter(function (row) { return String(row[3]).indexOf('취소') >= 0; }).length;
  const title = '제9회 머내마을영화제 신청자현황';
  const summary = '기준시각: ' + formatDateTime(now) + '    총 신청자: ' + rows.length + '명    참석: ' + attended + '명    취소: ' + canceled + '명';
  writeDesignedTable_(sheet, title, summary, headers, rows, 4);
  setDropdown_(sheet, 4, 4, ['참석', '미참석', '취소']);
  setDropdown_(sheet, 4, 17, ['미발송', '발송완료', '실패', '대기']);
  paintStatusColumn_(sheet, 5, 4, rows.length);
  paintStatusColumn_(sheet, 5, 17, rows.length);
  sheet.getRange('F:F').setNumberFormat('@');
  sheet.getRange('B:B').setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.getRange('H:H').setNumberFormat('yyyy-mm-dd');
  capWidths_(sheet, {5: 90, 6: 120, 7: 180, 10: 150, 15: 160, 19: 260});
}

function writePrintableApplicantsSheet(ss, applicants, now) {
  const sheet = resetSheet_(ss, '신청자현황_출력용');
  const headers = ['No', '예약번호', '신청자', '연락처 뒷자리', '영화명', '상영일', '상영시간', '상영관', '좌석/인원', '참석체크', '메모'];
  const rows = applicants.map(function (r, index) {
    const phone = String(valueOf(r, ['phone', '연락처', 'tel']) || '').replace(/\D/g, '');
    const count = valueOf(r, ['count', '신청인원', 'people', 'quantity', '인원']);
    const attendedCount = valueOf(r, ['attendedCount', '참석인원', 'actualCount', '실제참석인원']);
    return [
      index + 1,
      valueOf(r, ['reservationNumber', '예약번호', 'reservationCode', 'reservationNo', 'code']),
      valueOf(r, ['name', '신청자', 'applicantName']),
      phone ? phone.slice(-4) : '',
      valueOf(r, ['movieTitle', '영화명', '영화', 'movie', 'title']),
      valueOf(r, ['screeningDate', '상영일', 'date']),
      valueOf(r, ['screeningTime', '상영시간', 'time']),
      valueOf(r, ['venue', '상영관', 'theater']),
      [valueOf(r, ['seat', '좌석', 'seatLabel', 'seatNo']), count || attendedCount ? String(count || attendedCount) + '명' : ''].filter(Boolean).join(' / '),
      '',
      valueOf(r, ['memo', '메모', 'note'])
    ];
  });
  writeDesignedTable_(sheet, '제9회 머내마을영화제 현장 체크용 명단', '출력시각: ' + formatDateTime(now) + '    개인정보 보호를 위해 연락처는 뒷자리만 표시합니다.', headers, rows, 4);
  setDropdown_(sheet, 4, 10, ['참석', '취소', '확인필요']);
  capWidths_(sheet, {2: 120, 3: 80, 5: 200, 8: 150, 9: 120, 11: 240});
}

function writeStatsSheet(ss, stats, now) {
  const sheet = resetSheet_(ss, '통계');
  const headers = [
    'No', '영화명', '상영관', '상영시간', '정원', '신청건수', '신청인원', '참석인원', '취소인원', '남은좌석', '신청률', '참석률', '정원상태', '저장시각'
  ];
  const rows = stats.map(function (r, index) {
    return [
      index + 1,
      valueOf(r, ['movieTitle', '영화명', '영화', 'title', 'name']),
      valueOf(r, ['venue', '상영관', 'theater']),
      valueOf(r, ['screeningTime', '상영시간', 'time']),
      numberOrText_(valueOf(r, ['capacity', '정원'])),
      numberOrText_(valueOf(r, ['applicationCount', '신청건수', '신청'])),
      numberOrText_(valueOf(r, ['applicantCount', '신청인원', 'applied', 'applicants', 'reserved'])),
      numberOrText_(valueOf(r, ['attendedCount', '참석인원', 'attended', 'attendance', '참석'])),
      numberOrText_(valueOf(r, ['canceledSeats', '취소인원', '취소'])),
      numberOrText_(valueOf(r, ['remainingSeats', '남은좌석'])),
      valueOf(r, ['applicationRate', '신청률', 'applyRate']),
      valueOf(r, ['attendanceRate', '참석률']),
      valueOf(r, ['status', '정원상태']),
      formatDateTime(now)
    ];
  });

  const totalCapacity = sumColumn_(rows, 4);
  const totalApplied = sumColumn_(rows, 6);
  const totalAttended = sumColumn_(rows, 7);
  const totalCanceled = sumColumn_(rows, 8);
  const totalRemaining = sumColumn_(rows, 9);
  const attendanceRate = totalApplied ? Math.round((totalAttended / totalApplied) * 1000) / 10 + '%' : '0%';

  sheet.clear();
  clearFilter_(sheet);
  sheet.getRange(1, 1, 1, headers.length).merge().setValue('제9회 머내마을영화제 운영 통계')
    .setBackground(BRAND.navy).setFontColor(BRAND.white).setFontWeight('bold').setFontSize(15).setHorizontalAlignment('center');
  sheet.getRange(2, 1, 1, headers.length).merge().setValue('기준시각: ' + formatDateTime(now) + '    총 회차: ' + rows.length + '개')
    .setBackground(BRAND.grayBg).setFontColor(BRAND.navy).setFontWeight('bold');
  const cards = [
    ['총 좌석수', totalCapacity], ['신청인원', totalApplied], ['참석인원', totalAttended], ['취소인원', totalCanceled], ['잔여좌석', totalRemaining], ['참석률', attendanceRate]
  ];
  for (var i = 0; i < cards.length; i++) {
    var col = i * 2 + 1;
    sheet.getRange(4, col, 1, 2).merge().setValue(cards[i][0]).setBackground(BRAND.sky).setFontWeight('bold').setHorizontalAlignment('center');
    sheet.getRange(5, col, 1, 2).merge().setValue(cards[i][1]).setBackground(BRAND.white).setFontWeight('bold').setFontSize(14).setHorizontalAlignment('center');
  }
  const headerRow = 7;
  sheet.getRange(headerRow, 1, 1, headers.length).setValues([headers]);
  if (rows.length) sheet.getRange(headerRow + 1, 1, rows.length, headers.length).setValues(rows);
  styleHeader_(sheet, headerRow, headers.length);
  addFilter_(sheet, headerRow, headers.length, Math.max(rows.length, 1));
  sheet.setFrozenRows(headerRow);
  styleTableBody_(sheet, headerRow + 1, headers.length, rows.length);
  paintRateColumns_(sheet, headerRow + 1, 11, rows.length);
  paintRateColumns_(sheet, headerRow + 1, 12, rows.length);
  paintRemainingColumn_(sheet, headerRow + 1, 10, rows.length);
  sheet.autoResizeColumns(1, headers.length);
  capWidths_(sheet, {2: 220, 3: 150, 13: 110});
}

function writeScreeningsSheet(ss, screenings, now) {
  const sheet = resetSheet_(ss, '상영관영화');
  const headers = ['No', '상영일', '상영시간', '영화명', '상영관', '회차ID', '정원', '신청인원', '참석인원', '잔여석', '상태', '개막작', '티켓팅단계', '담당STAFF', '연락처', '기타', '저장시각'];
  const rows = screenings.map(function (r, index) {
    const start = valueOf(r, ['startTime', '시작']);
    return [
      index + 1,
      valueOf(r, ['screeningDate', '상영일']) || datePart_(start),
      valueOf(r, ['screeningTime', '상영시간', 'time']) || timePart_(start),
      valueOf(r, ['movieTitle', '영화명', '영화', 'title']),
      valueOf(r, ['venue', '상영관', 'theater']),
      valueOf(r, ['screeningId', '회차ID', 'id']),
      numberOrText_(valueOf(r, ['capacity', '정원'])),
      numberOrText_(valueOf(r, ['applicantCount', '신청인원'])),
      numberOrText_(valueOf(r, ['attendedCount', '참석인원'])),
      numberOrText_(valueOf(r, ['remainingSeats', '남은좌석', '잔여석'])),
      valueOf(r, ['status', '상태']) || '예정',
      valueOf(r, ['opening', '개막작여부']),
      valueOf(r, ['ticketingPhase', '티켓팅단계']),
      valueOf(r, ['staff', '담당스태프', 'STAFF']),
      valueOf(r, ['staffPhone', '연락처']),
      valueOf(r, ['notes', '기타']),
      formatDateTime(now)
    ];
  });
  writeDesignedTable_(sheet, '제9회 머내마을영화제 상영관·영화 운영표', '기준시각: ' + formatDateTime(now) + '    상영회차: ' + rows.length + '개', headers, rows, 4);
  setDropdown_(sheet, 4, 11, ['예정', '진행중', '종료', '취소']);
  setDropdown_(sheet, 4, 12, ['개막작', '일반', 'TRUE', 'FALSE']);
  paintStatusColumn_(sheet, 5, 11, rows.length);
  paintRemainingColumn_(sheet, 5, 10, rows.length);
  capWidths_(sheet, {4: 220, 5: 150, 6: 140, 14: 130, 16: 260});
}

function writeSyncLogSheet(ss, body, now, data, raw) {
  const sheet = getOrCreateSheet(ss, '저장기록');
  const headers = ['No', '저장시각', '저장방식', '신청자수', '통계수', '상영정보수', '상태', '받은키', 'rows형태', '원문길이', '원문앞부분'];
  if (sheet.getLastRow() === 0 || String(sheet.getRange(1, 1).getValue()) !== 'No') {
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  const nextNo = Math.max(sheet.getLastRow(), 1);
  sheet.appendRow([
    nextNo,
    formatDateTime(now),
    body.mode || body.type || 'auto',
    data.applicants.length,
    data.stats.length,
    data.screenings.length,
    '성공',
    Object.keys(body || {}).join(', '),
    Array.isArray(body.rows) ? 'rows=array' : (body.rows ? 'rows=object' : ''),
    String(raw || '').length,
    String(raw || '').slice(0, 180)
  ]);
  styleSimpleLogSheet_(sheet, '저장기록');
}

function writeDesignedTable_(sheet, title, summary, headers, rows, headerRow) {
  sheet.clear();
  clearFilter_(sheet);
  const colCount = headers.length;
  sheet.getRange(1, 1, 1, colCount).merge().setValue(title)
    .setBackground(BRAND.navy).setFontColor(BRAND.white).setFontWeight('bold').setFontSize(15).setHorizontalAlignment('center');
  sheet.getRange(2, 1, 1, colCount).merge().setValue(summary)
    .setBackground(BRAND.grayBg).setFontColor(BRAND.navy).setFontWeight('bold');
  sheet.getRange(headerRow, 1, 1, colCount).setValues([headers]);
  if (rows.length > 0) sheet.getRange(headerRow + 1, 1, rows.length, colCount).setValues(rows);
  styleHeader_(sheet, headerRow, colCount);
  styleTableBody_(sheet, headerRow + 1, colCount, rows.length);
  addFilter_(sheet, headerRow, colCount, Math.max(rows.length, 1));
  sheet.setFrozenRows(headerRow);
  sheet.autoResizeColumns(1, colCount);
}

function styleHeader_(sheet, row, colCount) {
  sheet.getRange(row, 1, 1, colCount)
    .setBackground(BRAND.navy)
    .setFontColor(BRAND.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, BRAND.line, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(row, 32);
}

function styleTableBody_(sheet, startRow, colCount, rowCount) {
  if (rowCount <= 0) return;
  const range = sheet.getRange(startRow, 1, rowCount, colCount);
  range.setBorder(true, true, true, true, true, true, BRAND.line, SpreadsheetApp.BorderStyle.SOLID)
    .setVerticalAlignment('middle')
    .setWrap(true);
  for (var i = 0; i < rowCount; i++) {
    if (i % 2 === 1) sheet.getRange(startRow + i, 1, 1, colCount).setBackground('#f9fafb');
  }
  sheet.setRowHeights(startRow, rowCount, 28);
}

function addFilter_(sheet, headerRow, colCount, rowCount) {
  clearFilter_(sheet);
  sheet.getRange(headerRow, 1, rowCount + 1, colCount).createFilter();
}

function clearFilter_(sheet) {
  const filter = sheet.getFilter();
  if (filter) filter.remove();
}

function resetSheet_(ss, name) {
  const sheet = getOrCreateSheet(ss, name);
  clearFilter_(sheet);
  sheet.clear();
  try { sheet.setHiddenGridlines(true); } catch (err) {}
  return sheet;
}

function setDropdown_(sheet, headerRow, column, values) {
  const maxRows = Math.max(sheet.getMaxRows() - headerRow, 100);
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(values, true).setAllowInvalid(true).build();
  sheet.getRange(headerRow + 1, column, maxRows, 1).setDataValidation(rule);
}

function paintStatusColumn_(sheet, startRow, column, rowCount) {
  if (rowCount <= 0) return;
  const values = sheet.getRange(startRow, column, rowCount, 1).getValues();
  const colors = values.map(function (row) {
    const v = String(row[0] || '');
    if (v.indexOf('참석') >= 0 && v.indexOf('미참석') < 0) return [BRAND.greenBg];
    if (v.indexOf('발송완료') >= 0 || v.indexOf('성공') >= 0 || v.indexOf('진행중') >= 0) return [BRAND.greenBg];
    if (v.indexOf('취소') >= 0 || v.indexOf('실패') >= 0 || v.indexOf('오류') >= 0) return [BRAND.redBg];
    if (v.indexOf('대기') >= 0 || v.indexOf('예정') >= 0 || v.indexOf('확인') >= 0) return [BRAND.amberBg];
    return [BRAND.grayBg];
  });
  sheet.getRange(startRow, column, rowCount, 1).setBackgrounds(colors).setFontWeight('bold').setHorizontalAlignment('center');
}

function paintRateColumns_(sheet, startRow, column, rowCount) {
  if (rowCount <= 0) return;
  const values = sheet.getRange(startRow, column, rowCount, 1).getValues();
  const colors = values.map(function (row) {
    const n = parsePercent_(row[0]);
    if (n >= 80) return [BRAND.greenBg];
    if (n >= 50) return [BRAND.amberBg];
    return [BRAND.redBg];
  });
  sheet.getRange(startRow, column, rowCount, 1).setBackgrounds(colors).setHorizontalAlignment('center').setFontWeight('bold');
}

function paintRemainingColumn_(sheet, startRow, column, rowCount) {
  if (rowCount <= 0) return;
  const values = sheet.getRange(startRow, column, rowCount, 1).getValues();
  const colors = values.map(function (row) {
    const n = Number(row[0]);
    if (!isNaN(n) && n <= 0) return [BRAND.redBg];
    if (!isNaN(n) && n <= 5) return [BRAND.amberBg];
    return [BRAND.greenBg];
  });
  sheet.getRange(startRow, column, rowCount, 1).setBackgrounds(colors).setHorizontalAlignment('center').setFontWeight('bold');
}

function capWidths_(sheet, caps) {
  Object.keys(caps).forEach(function (key) {
    const col = Number(key);
    const cap = caps[key];
    if (sheet.getColumnWidth(col) > cap) sheet.setColumnWidth(col, cap);
  });
  sheet.setColumnWidth(1, 48);
}

function styleSimpleLogSheet_(sheet, title) {
  try { sheet.setHiddenGridlines(true); } catch (err) {}
  clearFilter_(sheet);
  const lastCol = sheet.getLastColumn();
  const lastRow = sheet.getLastRow();
  if (lastRow < 1 || lastCol < 1) return;
  sheet.getRange(1, 1, 1, lastCol).setBackground(BRAND.navy).setFontColor(BRAND.white).setFontWeight('bold').setHorizontalAlignment('center');
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, lastCol).setBorder(true, true, true, true, true, true, BRAND.line, SpreadsheetApp.BorderStyle.SOLID).setWrap(true);
    paintStatusColumn_(sheet, 2, Math.min(7, lastCol), lastRow - 1);
  }
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, Math.max(lastRow, 2), lastCol).createFilter();
  sheet.autoResizeColumns(1, lastCol);
  capWidths_(sheet, {8: 220, 11: 320});
}

function applySpreadsheetFinishing_(ss) {
  const order = ['신청자현황', '신청자현황_출력용', '통계', '상영관영화', '저장기록', '저장오류'];
  order.forEach(function (name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    try { sheet.setTabColor(tabColorFor_(name)); } catch (err) {}
  });
}

function tabColorFor_(name) {
  if (name === '신청자현황') return '#2563eb';
  if (name === '신청자현황_출력용') return '#0f766e';
  if (name === '통계') return '#7c3aed';
  if (name === '상영관영화') return '#ea580c';
  if (name === '저장기록') return '#64748b';
  if (name === '저장오류') return '#dc2626';
  return '#6b7280';
}

function sumColumn_(rows, index) {
  return rows.reduce(function (sum, row) {
    const n = Number(row[index]);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);
}

function parsePercent_(value) {
  if (typeof value === 'number') return value <= 1 ? value * 100 : value;
  const n = Number(String(value || '').replace('%', '').trim());
  return isNaN(n) ? 0 : n;
}

function numberOrText_(value) {
  const n = Number(String(value == null ? '' : value).replace(/,/g, '').replace('%', ''));
  if (value !== '' && value != null && !isNaN(n) && String(value).indexOf('%') < 0) return n;
  return value == null ? '' : value;
}

function normalizeAttendance_(value) {
  const text = String(value == null ? '' : value).trim();
  if (!text) return '미참석';
  if (text.indexOf('취소') >= 0 || text === 'canceled' || text === 'cancelled') return '취소';
  if (text.indexOf('참석') >= 0 || text === 'attended' || text === 'present') return '참석';
  return text;
}

function datePart_(value) {
  const d = toDate_(value);
  return d ? Utilities.formatDate(d, TZ, 'yyyy-MM-dd') : '';
}

function timePart_(value) {
  const d = toDate_(value);
  return d ? Utilities.formatDate(d, TZ, 'HH:mm') : '';
}

function toDate_(value) {
  if (!value) return null;
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
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
  return Utilities.formatDate(date, TZ, 'yyyy-MM-dd HH:mm:ss');
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
