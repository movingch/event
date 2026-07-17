# v63 Google Sheet server proxy sync

- 구글시트 연동을 브라우저 직접 전송에서 Vercel API 서버 프록시 방식으로 변경했습니다.
- 구글드라이브 연동 시 전송 예정 신청자/통계/상영정보 건수를 먼저 보여줍니다.
- 신청자가 0명인 브라우저에서 연동할 경우 확인창으로 저장을 막을 수 있게 했습니다.
- `/api/google-drive-sync`를 추가해 Apps Script 응답과 전송 건수를 확인합니다.
