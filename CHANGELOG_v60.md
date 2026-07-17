# v60 Google Sheets Sync Final Fix

- Google Apps Script로 보낼 때 payload=... form 방식으로 전송하도록 변경했습니다.
- Apps Script가 JSON, form payload, rows/applicants/stats/screenings 구조를 모두 읽도록 보강했습니다.
- 구글드라이브/구글드라이브 저장 버튼은 ADMIN > 백업·연동 화면에만 남기고, 다른 화면에서는 제거했습니다.
- ADMIN > 백업·연동 화면에서 통계 엑셀저장, 신청자 엑셀저장, 구글드라이브 연동을 한곳에서 처리합니다.
