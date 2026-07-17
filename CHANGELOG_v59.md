# v59 Google Sheets Data Robust Fix

- Google Apps Script가 단일 저장 payload(type + rows 배열)과 전체 저장 payload(applicants/stats/screenings)를 모두 읽도록 확장했습니다.
- 구글시트 저장기록에 받은 키, rows 형태, 원문 길이를 남겨 데이터가 실제로 들어왔는지 확인할 수 있게 했습니다.
- 구글드라이브 관련 버튼 액션을 모두 전체 동기화 방식으로 연결해 신청자/통계/상영정보가 함께 전송되게 했습니다.
