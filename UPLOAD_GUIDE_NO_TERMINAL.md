# 터미널 없이 수정본 배포하기

이 폴더는 Vercel + GitHub 업로드용 수정 배포 파일입니다.

## 이번 수정본 기준

- 메인 메뉴에서 개막작 신청 버튼 삭제
- STAFF / ADMIN 작은 메뉴 적용
- STAFF 화면 문구: 담당 상영 영화
- ADMIN에 STAFF 관리 탭 추가
- 영화별 STAFF 없음 / STAFF 있음 상태 표시
- STAFF가 비밀번호로 입장하면 해당 영화가 자동으로 STAFF 있음 처리
- ADMIN에서 영화별 STAFF 비밀번호 저장 및 상태 초기화 가능

## GitHub 웹에서 업로드하는 방법

1. 이 ZIP을 압축 해제합니다.
2. GitHub 저장소로 들어갑니다.
3. `Add file` → `Upload files`를 누릅니다.
4. 압축 해제한 폴더 안의 모든 파일과 폴더를 선택해서 올립니다.
   - `index.html`
   - `app.js`
   - `styles.css`
   - `assets` 폴더
   - `api` 폴더
   - `package.json`
   - `vercel.json`
   - 나머지 문서 파일
5. 아래쪽 Commit message에 예: `Update staff management` 입력
6. `Commit changes` 클릭
7. Vercel이 자동으로 새 Production 배포를 시작합니다.

## 주의

GitHub 저장소 안에 기존 파일이 있다면 같은 이름으로 덮어써야 합니다.  
Vercel 화면에 `To update your Production Deployment, push to the main branch.`라고 보이면 GitHub의 `main` 브랜치에 업로드/커밋하면 됩니다.

## 배포 확인

Vercel 배포가 완료되면 기존 웹주소를 새로고침해서 확인하세요.  
브라우저 캐시가 남아 보이면 강력 새로고침을 하거나 시크릿 창에서 확인하세요.
