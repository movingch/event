# v61 Google Sheets sync transport fix

- Google Apps Script 전송 방식을 text/plain JSON으로 변경했습니다.
- Apps Script v61은 JSON, payload=, 기존 rows/csv 구조를 모두 읽습니다.
- 저장기록에 원본 배열 상태를 남겨 데이터 도착 여부를 더 쉽게 확인할 수 있습니다.
