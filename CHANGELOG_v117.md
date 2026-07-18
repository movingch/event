# v117 관리자 라우트/상세통계 오류 긴급 수정

- 관리자 내부 메뉴 이동을 #/admin/... 방식에서 #/stats, #/surveyView 등 단순 해시로 고정했습니다.
- /admin, /adminor 경로에서는 단순 해시를 해당 관리자 메뉴로 해석합니다.
- goAdminTab 함수가 다시 #/admin/...을 만들던 문제를 수정했습니다.
- 상영관 수정 이동도 #/screenings로 정리했습니다.
- 상세통계 화면의 allResponses 미정의 오류를 수정했습니다.
- 기존 #/admin/stats, #/admin/surveyView 주소도 호환됩니다.
