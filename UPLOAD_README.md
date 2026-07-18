# v76 업로드 안내

이 ZIP은 GitHub 루트 업로드용입니다. 압축을 풀었을 때 `index.html`, `app.js`, `styles.css`, `api/`, `assets/`가 바로 보여야 합니다.

## 1. GitHub 업로드

ZIP을 풀고 저장소 루트에 전체 덮어쓰기 업로드합니다.

배포 확인 주소:

https://cine-event.vercel.app/?v=76

## 2. Apps Script 교체

Google Apps Script의 `Code.gs` 전체를 ZIP 안의 아래 파일 내용으로 교체합니다.

`GOOGLE_APPS_SCRIPT_CODE_v76.gs`

맨 위의 시트 ID만 현재 구글시트 ID로 유지/수정합니다.

```javascript
const SPREADSHEET_ID = '현재_구글시트_ID';
```

그 다음 반드시 `배포 -> 배포 관리 -> 수정 -> 새 버전 -> 배포`를 진행합니다.

## 3. 적용 내용

v76은 관리자 로그인/대시보드 구조를 변경하지 않았습니다. 핵심 변경은 구글시트 탭 디자인입니다.

- 신청자현황
- 신청자현황_출력용
- 통계
- 상영관영화
- 저장기록

위 탭들이 제목, 요약, No 번호, 필터, 색상, 드롭다운, 출력용 서식이 적용된 형태로 저장됩니다.
