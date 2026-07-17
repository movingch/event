# GitHub 웹 업로드용 최소 배포 파일

이 ZIP은 GitHub 업로드 오류를 줄이기 위해 필수 파일만 담은 버전입니다.
압축을 풀고, 폴더 안의 파일/폴더 전체를 GitHub 저장소 루트에 업로드하세요.

필수로 루트에 보여야 하는 항목:
- index.html
- app.js
- styles.css
- api/
- assets/
- package.json
- vercel.json
- site.webmanifest

ZIP 파일 자체나 v57_min_upload 폴더 자체를 올리지 말고, 폴더 안의 파일/폴더를 전체 선택해서 올리세요.


## v59 확인
Apps Script는 반드시 GOOGLE_APPS_SCRIPT_CODE_v59.gs로 교체하고 새 버전 배포를 해야 데이터가 들어갑니다.
