# v106 - Supabase to Google Sheet backup hardening

- Supabase 저장 후 구글시트 백업 재시도를 3단계로 강화했습니다.
- 구글시트 백업 결과(성공/실패/건수)를 마스타관리자 백업·연동 화면에 표시합니다.
- `Supabase 최신 데이터를 구글시트로 강제 백업` 버튼을 추가했습니다.
- Google Apps Script URL이 브라우저 저장값에 없어도 Vercel 환경변수 또는 기본 URL로 백업을 시도합니다.
- Apps Script가 `ok:false`를 반환하면 성공으로 처리하지 않고 오류 메시지를 표시합니다.
- 구글시트 백업 API와 Supabase 저장 API의 Vercel 실행 시간을 늘려 대량 시트 쓰기 중 타임아웃 가능성을 줄였습니다.
