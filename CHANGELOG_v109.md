# v109 Supabase Final Flow Stabilization

- 모든 저장 흐름을 Supabase 원본 우선으로 고정했습니다.
- Supabase 저장 성공 후 구글시트 백업이 자동으로 따라가도록 유지하고, Supabase 저장 실패 시 재시도를 추가했습니다.
- 구글시트 읽기/API read 기능을 비활성화해 구글시트가 웹앱 원본을 덮어쓰지 않도록 했습니다.
- 만족도조사 조회는 Supabase를 먼저 사용하고, 구글 조회는 예외적 fallback으로만 사용합니다.
- 만족도조사 응답은 Supabase에 먼저 저장한 뒤 구글시트에 자동 백업합니다.
- 설문 응답 API의 구글 백업 URL은 Vercel 환경변수/기본 Apps Script URL을 사용하도록 보강했습니다.
- Supabase/구글시트 백업 API 실행 시간을 넉넉하게 유지했습니다.
