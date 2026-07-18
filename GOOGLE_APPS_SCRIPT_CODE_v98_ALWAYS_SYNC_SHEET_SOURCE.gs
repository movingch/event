const SPREADSHEET_ID = '1r3StMV26oHR2I5COtd3jgCxrFBK9F8W7bzvSPJCNnQI';
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
    if (body && body.type === 'survey-response') return handleSurveyResponse_(ss, body.response || {}, now);
    const data = extractData_(body);

    writeApplicantsSheet(ss, data.applicants, now);
    writeStatsSheet(ss, data.stats, now);
    writeScreeningsSheet(ss, data.screenings, now);
    writePrintableApplicantsSheet(ss, data.applicants, now);
    writeSurveySettingsSheet(ss, data.survey.settings, now);
    writeSurveyQuestionsSheet(ss, data.survey.questions, now);
    writeSurveyResponsesSheet(ss, data.survey.responses, now);
    writeSurveyStatsSheet(ss, data.survey.stats, now);
    writeSurveyDispatchesSheet(ss, data.survey.dispatches, now);
    writeSyncLogSheet(ss, body, now, data, raw);
    applySpreadsheetFinishing_(ss);

    return jsonOutput({
      ok: true,
      message: '저장 및 시트 디자인 적용 완료',
      version: 'v98-always-sync-preserve-widths',
      savedAt: now.toISOString(),
      applicantsCount: data.applicants.length,
      statsCount: data.stats.length,
      screeningsCount: data.screenings.length,
      surveyResponsesCount: data.survey.responses.length,
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

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (e && e.parameter && e.parameter.action === 'exportData') {
      return jsonOutput({ ok: true, message: '구글시트 원본 데이터 내보내기 완료', version: 'v98-always-sync-preserve-widths', data: exportCurrentData_(ss) });
    }
    if (e && e.parameter && e.parameter.action === 'surveyLookup') {
      return jsonOutput(lookupSurveyParticipant_(ss, String(e.parameter.token || '').trim()));
    }
  } catch (err) {
    return jsonOutput({ ok: false, message: err && err.message ? err.message : String(err) });
  }
  return jsonOutput({ ok: true, message: '머내마을영화제 구글시트 연동 웹앱 v98 항상동기화·열너비 보존 버전이 작동 중입니다.' });
}


function exportCurrentData_(ss) {
  return {
    festival: '제9회 머내마을영화제',
    generatedAt: new Date().toISOString(),
    applicants: exportApplicants_(ss),
    screenings: exportScreenings_(ss),
    survey: {
      settings: exportGenericSheet_(ss, '만족도_설정', 4),
      questions: exportGenericSheet_(ss, '만족도_문항', 4),
      responses: exportSurveyResponses_(ss),
      stats: exportGenericSheet_(ss, '만족도_통계', 6),
      dispatches: exportSurveyDispatches_(ss)
    }
  };
}

function exportApplicants_(ss) {
  const rows = exportGenericSheet_(ss, '신청자현황', 4);
  return rows.map(function (r) {
    return {
      createdAt: r['신청일시'] || '',
      reservationNumber: r['예약번호'] || '',
      attendanceStatus: normalizeAttendance_(r['참석여부'] || '신청'),
      name: r['신청자'] || '',
      phone: r['연락처'] || '',
      movieTitle: r['영화명'] || '',
      screeningDate: r['상영일'] || '',
      screeningTime: r['상영시간'] || '',
      venue: r['상영관'] || '',
      count: r['신청인원'] || '',
      attendedCount: r['참석인원'] || '',
      donorName: r['후원자명/입금자명'] || '',
      smsConsent: r['문자수신'] || '',
      smsStatus: r['문자상태'] || '',
      smsSentAt: r['문자발송일'] || '',
      memo: r['메모'] || ''
    };
  }).filter(function (r) { return r.reservationNumber || r.name || r.phone || r.movieTitle; });
}

function exportScreenings_(ss) {
  const rows = exportGenericSheet_(ss, '상영관영화', 4);
  return rows.map(function (r, index) {
    return {
      screeningId: r['회차ID'] || ('scr-sheet-' + (index + 1)),
      movieTitle: r['영화명'] || '',
      venue: r['상영관'] || '',
      screeningDate: r['상영일'] || '',
      screeningTime: r['상영시간'] || '',
      capacity: r['정원'] || '',
      status: r['상태'] || '',
      opening: r['개막작'] || '',
      staff: r['담당STAFF'] || r['담당스태프'] || '',
      staffPhone: r['연락처'] || '',
      notes: r['기타'] || ''
    };
  }).filter(function (r) { return r.screeningId || r.movieTitle || r.venue; });
}

function exportSurveyResponses_(ss) {
  const rows = exportGenericSheet_(ss, '만족도_응답', 4);
  return rows.map(function (r) {
    return {
      submittedAt: r['응답시각'] || '',
      reservationNumber: r['예약번호'] || '',
      token: r['설문토큰'] || '',
      name: r['이름'] || '',
      phone: r['연락처'] || '',
      movieTitle: r['영화명'] || '',
      screeningTime: r['상영일시'] || '',
      venue: r['장소'] || '',
      overallRating: r['전체만족도'] || '',
      venueRating: r['상영환경'] || '',
      guideRating: r['진행안내'] || '',
      returnIntent: r['재참여의향'] || '',
      goodComment: r['좋았던점'] || '',
      improveComment: r['개선의견'] || '',
      status: r['응답상태'] || ''
    };
  }).filter(function (r) { return r.token || r.reservationNumber || r.name || r.movieTitle; });
}

function exportSurveyDispatches_(ss) {
  const rows = exportGenericSheet_(ss, '만족도_문자발송기록', 4);
  return rows.map(function (r) {
    return {
      sentAt: r['발송시각'] || '',
      reservationNumber: r['예약번호'] || '',
      token: r['설문토큰'] || '',
      name: r['이름'] || '',
      phone: r['연락처'] || '',
      movieTitle: r['영화명'] || '',
      screeningTime: r['상영일시'] || '',
      venue: r['장소'] || '',
      status: r['발송상태'] || '',
      link: r['설문링크'] || '',
      error: r['오류메시지'] || ''
    };
  }).filter(function (r) { return r.token || r.reservationNumber || r.name || r.movieTitle; });
}

function exportGenericSheet_(ss, sheetName, headerRow) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < headerRow) return [];
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const values = sheet.getRange(headerRow, 1, lastRow - headerRow + 1, lastCol).getDisplayValues();
  if (!values.length) return [];
  const headers = values[0].map(function (h) { return String(h || '').trim(); });
  return values.slice(1).filter(function (row) {
    return row.some(function (cell) { return String(cell || '').trim() !== ''; });
  }).map(function (row) {
    const obj = {};
    headers.forEach(function (header, index) {
      if (header) obj[header] = row[index] || '';
    });
    return obj;
  });
}


function handleSurveyResponse_(ss, response, now) {
  const token = String(response.token || '').trim();
  if (!token) return jsonOutput({ ok: false, message: '설문 토큰이 없습니다.' });
  const existing = findSurveyResponseByToken_(ss, token);
  if (existing) return jsonOutput({ ok: true, alreadySubmitted: true, message: '이미 응답했습니다.' });
  const sheet = getOrCreateSheet(ss, '만족도_응답');
  if (sheet.getLastRow() === 0) {
    writeSurveyResponsesSheet(ss, [], now);
  }
  const answers = response.answers || {};
  const row = [
    Math.max(1, sheet.getLastRow() - 3),
    response.submittedAt || now,
    response.reservationNumber || '',
    token,
    response.name || '',
    response.phone || '',
    response.movieTitle || '',
    response.screeningTime || '',
    response.venue || '',
    response.seatPeople || '',
    answers['q-overall'] || response.overallRating || '',
    answers['q-venue'] || response.venueRating || '',
    answers['q-guide'] || response.guideRating || '',
    answers['q-return'] || response.returnIntent || '',
    answers['q-good'] || response.goodComment || '',
    answers['q-improve'] || response.improveComment || '',
    '응답완료'
  ];
  sheet.appendRow(row);
  styleSurveyResponseAppend_(sheet);
  return jsonOutput({ ok: true, message: '만족도조사 응답이 저장되었습니다.' });
}

function styleSurveyResponseAppend_(sheet) {
  try {
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow >= 5 && lastCol >= 17) {
      sheet.getRange(lastRow, 1, 1, lastCol).setBorder(true, true, true, true, true, true, BRAND.line, SpreadsheetApp.BorderStyle.SOLID).setWrap(true).setVerticalAlignment('middle');
      paintStatusColumn_(sheet, 5, 17, lastRow - 4);
      paintRateColumns_(sheet, 5, 11, lastRow - 4);
    }
  } catch (err) {}
}

function findSurveyResponseByToken_(ss, token) {
  const sheet = ss.getSheetByName('만족도_응답');
  if (!sheet || !token || sheet.getLastRow() < 5) return null;
  const values = sheet.getDataRange().getValues();
  for (var i = 4; i < values.length; i++) {
    if (String(values[i][3] || '').trim() === token) return values[i];
  }
  return null;
}

function lookupSurveyParticipant_(ss, token) {
  if (!token) return { ok: false, message: '설문 토큰이 없습니다.' };
  const existing = findSurveyResponseByToken_(ss, token);
  if (existing) return { ok: true, alreadySubmitted: true };
  const settings = readSurveySettings_(ss);
  if (settings.enabled !== 'ON') return { ok: false, message: '현재 만족도조사가 진행 중이 아닙니다.' };
  const participant = findSurveyDispatchByToken_(ss, token);
  if (!participant) return { ok: false, message: '설문 대상 정보를 찾을 수 없습니다.' };
  const questions = readSurveyQuestions_(ss);
  return { ok: true, participant: participant, questions: questions, settings: settings };
}

function readSurveySettings_(ss) {
  const sheet = ss.getSheetByName('만족도_설정');
  const fallback = { enabled: 'OFF', autoSmsEnabled: 'OFF', preventDuplicate: 'ON' };
  if (!sheet || sheet.getLastRow() < 5) return fallback;
  const row = sheet.getRange(5, 1, 1, Math.min(sheet.getLastColumn(), 9)).getValues()[0];
  return { enabled: String(row[2] || 'OFF'), autoSmsEnabled: String(row[3] || 'OFF'), preventDuplicate: String(row[6] || 'ON') };
}

function readSurveyQuestions_(ss) {
  const sheet = ss.getSheetByName('만족도_문항');
  if (!sheet || sheet.getLastRow() < 5) return [];
  const values = sheet.getRange(5, 1, sheet.getLastRow() - 4, Math.min(sheet.getLastColumn(), 9)).getValues();
  return values.filter(function(row) { return String(row[2] || '').trim() !== 'OFF' && String(row[5] || '').trim(); }).map(function(row) {
    var typeLabel = String(row[4] || '주관식');
    var type = typeLabel.indexOf('별점') >= 0 || typeLabel === 'rating' ? 'rating' : (typeLabel.indexOf('단일') >= 0 || typeLabel === 'single' ? 'single' : (typeLabel.indexOf('복수') >= 0 || typeLabel === 'multiple' ? 'multiple' : 'text'));
    return { id: String(row[1] || ''), enabled: String(row[2] || 'ON'), order: row[3], type: type, typeLabel: typeLabel, title: String(row[5] || ''), choices: String(row[6] || ''), required: String(row[7] || '') };
  });
}

function findSurveyDispatchByToken_(ss, token) {
  const sheet = ss.getSheetByName('만족도_문자발송기록');
  if (!sheet || sheet.getLastRow() < 5) return null;
  const values = sheet.getRange(5, 1, sheet.getLastRow() - 4, Math.min(sheet.getLastColumn(), 12)).getValues();
  for (var i = 0; i < values.length; i++) {
    const row = values[i];
    if (String(row[3] || '').trim() === token) {
      return {
        reservationNumber: row[2] || '',
        token: row[3] || '',
        name: row[4] || '',
        phone: row[5] || '',
        movieTitle: row[6] || '',
        screeningTime: row[7] || '',
        venue: row[8] || '',
        status: row[9] || '',
        link: row[10] || ''
      };
    }
  }
  return null;
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

  const survey = body.survey || {};
  const surveySettings = firstNonEmptyArray_(normalizeRecords(survey.settings), normalizeRecords(body.surveySettings));
  const surveyQuestions = firstNonEmptyArray_(normalizeRecords(survey.questions), normalizeRecords(body.surveyQuestions));
  const surveyResponses = firstNonEmptyArray_(normalizeRecords(survey.responses), normalizeRecords(body.surveyResponses));
  const surveyStats = firstNonEmptyArray_(normalizeRecords(survey.stats), normalizeRecords(body.surveyStats));
  const surveyDispatches = firstNonEmptyArray_(normalizeRecords(survey.dispatches), normalizeRecords(body.surveyDispatches));

  return {
    applicants: applicants,
    stats: stats,
    screenings: screenings,
    survey: {
      settings: surveySettings,
      questions: surveyQuestions,
      responses: surveyResponses,
      stats: surveyStats,
      dispatches: surveyDispatches
    }
  };
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
    '신청인원', '참석인원', '후원자명/입금자명', '문자수신', '문자상태', '문자발송일', '메모', '저장시각'
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
      valueOf(r, ['count', '신청인원', 'people', 'quantity', '인원']),
      valueOf(r, ['attendedCount', '참석인원', 'actualCount', '실제참석인원']),
      valueOf(r, ['donorName', '후원자명/입금자명']),
      valueOf(r, ['smsConsent', '문자수신동의']),
      valueOf(r, ['smsStatus', '문자상태']),
      valueOf(r, ['smsSentAt', '문자발송일']),
      valueOf(r, ['memo', '메모', 'note']),
      formatDateTime(now)
    ];
  });

  const attended = rows.filter(function (row) { return String(row[3]).indexOf('참석') >= 0 && String(row[3]).indexOf('미참석') < 0; }).length;
  const canceled = rows.filter(function (row) { return String(row[3]).indexOf('미참석') >= 0; }).length;
  const title = '제9회 머내마을영화제 신청자현황';
  const summary = '기준시각: ' + formatDateTime(now) + '    총 신청자: ' + rows.length + '명    참석: ' + attended + '명    미참석: ' + canceled + '명';
  writeDesignedTable_(sheet, title, summary, headers, rows, 4);
  setDropdown_(sheet, 4, 4, ['신청', '참석', '미참석']);
  setDropdown_(sheet, 4, 15, ['미발송', '발송완료', '실패', '대기']);
  paintStatusColumn_(sheet, 5, 4, rows.length);
  paintStatusColumn_(sheet, 5, 15, rows.length);
  sheet.getRange('F:F').setNumberFormat('@');
  sheet.getRange('B:B').setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.getRange('H:H').setNumberFormat('yyyy-mm-dd');
  capWidths_(sheet, {5: 90, 6: 120, 7: 180, 10: 150, 13: 160, 17: 260});
}

function writePrintableApplicantsSheet(ss, applicants, now) {
  const sheet = resetSheet_(ss, '신청자현황_출력용');
  const headers = ['No', '예약번호', '신청자', '연락처 뒷자리', '영화명', '상영일', '상영시간', '상영관', '인원', '참석체크', '메모'];
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
      count || attendedCount ? String(count || attendedCount) + '명' : '',
      '',
      valueOf(r, ['memo', '메모', 'note'])
    ];
  });
  writeDesignedTable_(sheet, '제9회 머내마을영화제 현장 체크용 명단', '출력시각: ' + formatDateTime(now) + '    개인정보 보호를 위해 연락처는 뒷자리만 표시합니다.', headers, rows, 4);
  setDropdown_(sheet, 4, 10, ['신청', '참석', '미참석']);
  capWidths_(sheet, {2: 120, 3: 80, 5: 200, 8: 150, 9: 120, 11: 240});
}

function writeStatsSheet(ss, stats, now) {
  const sheet = resetSheet_(ss, '통계');
  const headers = [
    'No', '영화명', '상영관', '상영시간', '정원', '신청건수', '신청인원', '참석인원', '미참석인원', '잔여인원', '신청률', '참석률', '정원상태', '저장시각'
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
      numberOrText_(valueOf(r, ['unattendedSeats', 'canceledSeats', '미참석인원', '취소인원', '취소'])),
      numberOrText_(valueOf(r, ['remainingCount', 'remainingSeats', '잔여인원'])),
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
    ['총 정원', totalCapacity], ['신청인원', totalApplied], ['참석인원', totalAttended], ['미참석인원', totalCanceled], ['잔여인원', totalRemaining], ['참석률', attendanceRate]
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
  capWidths_(sheet, {2: 220, 3: 150, 13: 110});
}

function writeScreeningsSheet(ss, screenings, now) {
  const sheet = resetSheet_(ss, '상영관영화');
  const headers = ['No', '상영일', '상영시간', '영화명', '상영관', '회차ID', '정원', '신청인원', '참석인원', '잔여인원', '상태', '개막작', '담당STAFF', '연락처', '기타', '저장시각'];
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
      numberOrText_(valueOf(r, ['remainingCount', 'remainingSeats', '잔여인원'])),
      valueOf(r, ['status', '상태']) || '예정',
      valueOf(r, ['opening', '개막작여부']),
      valueOf(r, ['staff', '담당스태프', 'STAFF']),
      valueOf(r, ['staffPhone', '연락처']),
      valueOf(r, ['notes', '기타']),
      formatDateTime(now)
    ];
  });
  writeDesignedTable_(sheet, '제9회 머내마을영화제 상영관·영화 운영표', '기준시각: ' + formatDateTime(now) + '    상영회차: ' + rows.length + '개', headers, rows, 4);
  setDropdown_(sheet, 4, 11, ['예정', '진행중', '종료', '마감']);
  setDropdown_(sheet, 4, 12, ['개막작', '일반', 'TRUE', 'FALSE']);
  paintStatusColumn_(sheet, 5, 11, rows.length);
  paintRemainingColumn_(sheet, 5, 10, rows.length);
  capWidths_(sheet, {4: 220, 5: 150, 6: 140, 14: 130, 16: 260});
}


function writeSurveySettingsSheet(ss, settings, now) {
  const sheet = resetSheet_(ss, '만족도_설정');
  const headers = ['No', '구분', '만족도조사', '자동문자', '발송지연분', '응답마감일', '중복방지', '문자내용/회차정보', '수정시각'];
  const source = settings && settings.length ? settings : [{ festival: '제9회 머내마을영화제', enabled: 'OFF', autoSmsEnabled: 'OFF', sendDelayMinutes: 5, responseDeadlineDays: 7, preventDuplicate: 'ON', smsTemplate: '기본 OFF 상태', updatedAt: now }];
  const rows = source.map(function (r, index) {
    return [index + 1, valueOf(r, ['festival', '구분']), valueOf(r, ['enabled', '만족도조사']), valueOf(r, ['autoSmsEnabled', '자동문자']), valueOf(r, ['sendDelayMinutes', '발송지연분']), valueOf(r, ['responseDeadlineDays', '응답마감일']), valueOf(r, ['preventDuplicate', '중복방지']), valueOf(r, ['smsTemplate', '문자내용']), valueOf(r, ['updatedAt', '수정시각']) || formatDateTime(now)];
  });
  writeDesignedTable_(sheet, '제9회 머내마을영화제 만족도조사 설정', '전체 ON/OFF, 자동문자, 회차별 사용 여부를 확인합니다. 기준시각: ' + formatDateTime(now), headers, rows, 4);
  setDropdown_(sheet, 4, 3, ['ON', 'OFF']);
  setDropdown_(sheet, 4, 4, ['ON', 'OFF']);
  setDropdown_(sheet, 4, 7, ['ON', 'OFF']);
  paintStatusColumn_(sheet, 5, 3, rows.length);
  paintStatusColumn_(sheet, 5, 4, rows.length);
}

function writeSurveyQuestionsSheet(ss, questions, now) {
  const sheet = resetSheet_(ss, '만족도_문항');
  const headers = ['No', '문항ID', '사용여부', '순서', '문항유형', '문항제목', '선택지', '필수여부', '저장시각'];
  const source = questions && questions.length ? questions : [];
  const rows = source.map(function (q, index) {
    return [index + 1, valueOf(q, ['id', '문항ID']), valueOf(q, ['enabled', '사용여부']), valueOf(q, ['order', '순서']), valueOf(q, ['typeLabel', 'type', '문항유형']), valueOf(q, ['title', '문항제목']), valueOf(q, ['choices', '선택지']), valueOf(q, ['required', '필수여부']), formatDateTime(now)];
  });
  writeDesignedTable_(sheet, '만족도조사 문항 관리표', '웹앱 관리자 > 만족도조사에서 수정한 문항 목록입니다. 기준시각: ' + formatDateTime(now), headers, rows, 4);
  setDropdown_(sheet, 4, 3, ['ON', 'OFF']);
  setDropdown_(sheet, 4, 5, ['별점 5점', '단일선택', '복수선택', '주관식', 'rating', 'single', 'multiple', 'text']);
  setDropdown_(sheet, 4, 8, ['필수', '선택']);
  paintStatusColumn_(sheet, 5, 3, rows.length);
}

function writeSurveyResponsesSheet(ss, responses, now) {
  const sheet = resetSheet_(ss, '만족도_응답');
  const headers = ['No', '응답시각', '예약번호', '설문토큰', '이름', '연락처', '영화명', '상영일시', '장소', '전체만족도', '상영환경', '진행안내', '재참여의향', '좋았던점', '개선의견', '응답상태'];
  const rows = (responses || []).map(function (r, index) {
    return [
      index + 1,
      valueOf(r, ['submittedAt', '응답시각']),
      valueOf(r, ['reservationNumber', '예약번호']),
      valueOf(r, ['token', '설문토큰']),
      valueOf(r, ['name', '이름']),
      valueOf(r, ['phone', '연락처']),
      valueOf(r, ['movieTitle', '영화명']),
      valueOf(r, ['screeningTime', '상영일시']),
      valueOf(r, ['venue', '장소']),
      valueOf(r, ['overallRating', '전체만족도']) || nestedAnswer_(r, 'q-overall'),
      valueOf(r, ['venueRating', '상영환경']) || nestedAnswer_(r, 'q-venue'),
      valueOf(r, ['guideRating', '진행안내']) || nestedAnswer_(r, 'q-guide'),
      valueOf(r, ['returnIntent', '재참여의향']) || nestedAnswer_(r, 'q-return'),
      valueOf(r, ['goodComment', '좋았던점']) || nestedAnswer_(r, 'q-good'),
      valueOf(r, ['improveComment', '개선의견']) || nestedAnswer_(r, 'q-improve'),
      valueOf(r, ['status', '응답상태']) || '응답완료'
    ];
  });
  writeDesignedTable_(sheet, '만족도조사 응답 원자료', '관객이 제출한 응답이 신청자 정보와 함께 누적됩니다. 기준시각: ' + formatDateTime(now), headers, rows, 4);
  paintStatusColumn_(sheet, 5, 15, rows.length);
  paintRateColumns_(sheet, 5, 11, rows.length);
}

function writeSurveyStatsSheet(ss, stats, now) {
  const sheet = resetSheet_(ss, '만족도_통계');
  const headers = ['No', '영화명', '상영일시', '장소', '참석자수', '발송수', '응답수', '응답률', '평균만족도'];
  const rows = (stats || []).map(function (r, index) {
    return [index + 1, valueOf(r, ['movieTitle', '영화명']), valueOf(r, ['screeningTime', '상영일시']), valueOf(r, ['venue', '장소']), valueOf(r, ['attendedCount', '참석자수']), valueOf(r, ['sentCount', '발송수']), valueOf(r, ['responseCount', '응답수']), valueOf(r, ['responseRate', '응답률']), valueOf(r, ['averageRating', '평균만족도'])];
  });
  const responseCount = sumColumn_(rows, 6);
  const sentCount = sumColumn_(rows, 5);
  writeDesignedTable_(sheet, '만족도조사 통계 리포트', '발송 ' + sentCount + '건 · 응답 ' + responseCount + '건 · 기준시각: ' + formatDateTime(now), headers, rows, 6);
  sheet.getRange(3, 1, 2, 9).merge().setValue('전체 응답률: ' + (sentCount ? Math.round(responseCount / sentCount * 100) + '%' : '-') + '     /     평균 만족도는 응답 원자료 기준으로 집계됩니다.')
    .setBackground('#ede9fe').setFontColor(BRAND.navy).setFontWeight('bold').setHorizontalAlignment('center');
  paintRateColumns_(sheet, 7, 8, rows.length);
}

function writeSurveyDispatchesSheet(ss, dispatches, now) {
  const sheet = resetSheet_(ss, '만족도_문자발송기록');
  const headers = ['No', '발송시각', '예약번호', '설문토큰', '이름', '연락처', '영화명', '상영일시', '장소', '발송상태', '설문링크', '오류메시지'];
  const rows = (dispatches || []).map(function (d, index) {
    return [index + 1, valueOf(d, ['sentAt', '발송시각']), valueOf(d, ['reservationNumber', '예약번호']), valueOf(d, ['token', '설문토큰']), valueOf(d, ['name', '이름']), valueOf(d, ['phone', '연락처']), valueOf(d, ['movieTitle', '영화명']), valueOf(d, ['screeningTime', '상영일시']), valueOf(d, ['venue', '장소']), valueOf(d, ['status', '발송상태']), valueOf(d, ['link', '설문링크']), valueOf(d, ['error', '오류메시지'])];
  });
  writeDesignedTable_(sheet, '만족도조사 문자 발송 기록', '설문 문자 발송 성공/실패 이력을 관리합니다. 기준시각: ' + formatDateTime(now), headers, rows, 4);
  paintStatusColumn_(sheet, 5, 10, rows.length);
}

function nestedAnswer_(obj, key) {
  try { return obj && obj.answers && obj.answers[key] != null ? obj.answers[key] : ''; } catch (err) { return ''; }
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
    if (v.indexOf('실패') >= 0 || v.indexOf('오류') >= 0) return [BRAND.redBg];
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
  });
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
  capWidths_(sheet, {8: 220, 11: 320});
}

function applySpreadsheetFinishing_(ss) {
  const order = ['신청자현황', '신청자현황_출력용', '통계', '상영관영화', '만족도_설정', '만족도_문항', '만족도_응답', '만족도_통계', '만족도_문자발송기록', '저장기록', '저장오류'];
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
  if (name === '만족도_설정') return '#0891b2';
  if (name === '만족도_문항') return '#0d9488';
  if (name === '만족도_응답') return '#16a34a';
  if (name === '만족도_통계') return '#7c3aed';
  if (name === '만족도_문자발송기록') return '#f59e0b';
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
  if (text.indexOf('미참석') >= 0 || text.indexOf('취소') >= 0 || text === 'canceled' || text === 'cancelled' || text === 'absent') return '미참석';
  if (text.indexOf('참석') >= 0 || text === 'attended' || text === 'present') return '참석';
  if (text.indexOf('신청') >= 0 || text === 'applied' || text === 'application') return '신청';
  return '신청';
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
