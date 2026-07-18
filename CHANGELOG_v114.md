# v114 관리자 라우트 분리 및 서버 원본 구글백업 강화

- 일반관리자 전용 주소를 `/admin`으로 고정했습니다.
- 마스타관리자 전용 주소를 `/adminor`로 분리했습니다.
- 관리자 메뉴 클릭은 두 주소에서 같은 hash 라우트를 쓰되, 권한 판정은 현재 pathname으로 분리되도록 수정했습니다.
- 구글시트 백업을 브라우저 payload에만 의존하지 않고 `/api/supabase-google-backup` 서버 API가 Supabase 원본을 직접 읽어 Apps Script로 보내는 경로를 추가했습니다.
- 서버 원본 백업 실패 시 기존 브라우저 payload 백업으로 fallback하도록 했습니다.
- `/adminor` Vercel rewrite를 추가했습니다.
