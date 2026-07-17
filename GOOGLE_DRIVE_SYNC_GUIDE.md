# 구글드라이브 / 구글시트 연동 가이드

이 버전은 관리자 화면에서 `통계 구글드라이브 저장`, `신청자현황 구글드라이브 저장` 버튼을 누르면 Google Apps Script 웹앱 URL로 데이터를 전송할 수 있도록 준비되어 있습니다.

## 1. 구글시트 만들기

1. Google Drive에서 새 Google Sheets 파일을 만듭니다.
2. 파일 이름 예시: `제9회 머내마을영화제_신청자_통계`
3. 주소에서 스프레드시트 ID를 복사합니다.

예시 주소:

```text
https://docs.google.com/spreadsheets/d/스프레드시트ID/edit
```

## 2. Apps Script 만들기

구글시트에서 `확장 프로그램 > Apps Script`를 열고 아래 코드를 붙여넣습니다.

```javascript
const SPREADSHEET_ID = '여기에_스프레드시트_ID를_넣으세요';

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const type = data.type || 'data';
  const title = data.title || type;
  const rows = Array.isArray(data.rows) ? data.rows : [];

  if (!rows.length) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, message: 'no rows' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheetName = title + '_' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd_HHmmss');
  const sheet = ss.insertSheet(sheetName.substring(0, 99));
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, rows[0].length);

  const logSheet = ss.getSheetByName('저장기록') || ss.insertSheet('저장기록');
  if (logSheet.getLastRow() === 0) {
    logSheet.appendRow(['저장일시', '종류', '파일명', '행수']);
  }
  logSheet.appendRow([new Date(), type, data.filename || '', rows.length]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true, sheetName }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. 웹앱으로 배포

1. Apps Script 오른쪽 위 `배포 > 새 배포`를 누릅니다.
2. 유형은 `웹 앱`을 선택합니다.
3. 실행 계정은 `나`로 둡니다.
4. 액세스 권한은 운영 방식에 맞게 설정합니다. 행사 내부에서만 쓸 경우 접근 권한을 제한하는 것이 좋습니다.
5. 배포 후 나오는 웹앱 URL을 복사합니다.

## 4. 영화제 웹앱에서 연결

1. 관리자 모드에 들어갑니다.
2. `통계 구글드라이브 저장` 또는 `신청자현황 구글드라이브 저장` 버튼을 누릅니다.
3. 처음 한 번 Apps Script 웹앱 URL을 입력합니다.
4. 이후부터는 같은 브라우저에 URL이 저장되어 바로 전송됩니다.
5. URL을 바꾸려면 관리자 > 백업 화면의 `구글드라이브 연동 URL 초기화`를 누릅니다.

## 운영 메모

- 이 방식은 구글드라이브에 직접 CSV 파일을 올리는 방식이 아니라, 구글시트 안에 새 시트를 만들어 저장하는 방식입니다.
- 신청자 개인정보가 포함될 수 있으므로 구글시트 공유 권한을 운영진에게만 제한하세요.
- 정식 중앙 DB 연동을 붙이면, 저장 버튼 없이 자동 동기화도 가능하지만 현재 버전은 운영진이 버튼을 눌러 저장하는 방식입니다.
