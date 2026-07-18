# v99 Supabase 원본 DB 전환

- 기존 Supabase 프로젝트를 재사용하는 원본 DB 구조 추가
- 모든 브라우저/모바일/노트북이 Supabase의 단일 원본 상태를 읽도록 변경
- 신청/수정/삭제/참석체크/문자상태/만족도 응답 변경 시 Supabase에 자동 저장
- Supabase 저장 성공 후 현재 Google Sheet 구조로 자동 백업 요청
- Google Sheet는 원본이 아니라 현재 양식 그대로 따라오는 실시간 백업/공유용으로 유지
- Supabase 테이블 생성 SQL 추가: SUPABASE_SQL_v99_festival_state.sql
- Vercel API 추가: api/supabase-state.js
