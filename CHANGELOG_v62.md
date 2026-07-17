# v62 구글시트 전송 방식 수정

- Apps Script 저장기록에서 원문길이가 0으로 기록되는 문제를 피하기 위해 웹앱 전송 방식을 hidden form POST 방식으로 변경했습니다.
- 웹앱은 `payload` 필드에 신청자현황, 통계, 상영관영화 JSON을 담아 Apps Script로 전송합니다.
- Apps Script는 `e.parameter.payload`를 우선 읽고, 기존 raw JSON/payload= 형식도 계속 지원합니다.
