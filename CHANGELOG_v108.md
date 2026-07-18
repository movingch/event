# v108 - 만족도조사 테스트 링크/문자 상영정보 조회 보강

- 테스트 문자/링크 생성 시 선택한 신청자의 상영정보를 더 넓게 찾도록 보강했습니다.
  - screeningId 직접 매칭
  - 영화명 매칭
  - 신청자 기록 안의 영화명/장소/상영일시 fallback
- 구글시트 백업이 실패해도 Supabase 원본에 저장된 테스트 링크는 계속 열리도록 수정했습니다.
- survey.html 조회가 Apps Script에서 실패할 때 Supabase 원본의 surveyDispatches를 fallback으로 조회하도록 API를 보강했습니다.
- 설문 제출 시 구글시트 전송이 실패해도 Supabase 저장이 성공하면 응답 완료로 처리해 관리자 통계에 반영되도록 했습니다.
- survey.html에서 webhook 파라미터가 없어도 token만 있으면 Supabase fallback 조회가 가능하도록 수정했습니다.
