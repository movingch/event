# 배포와 네이버 클라우드 SENS 설정 가이드

## 추천 배포 구조

1. GitHub에 이 폴더 전체를 저장합니다.
2. Vercel에서 GitHub 저장소를 Import합니다.
3. Vercel 환경변수에 네이버 클라우드 SENS 키를 등록합니다.
4. Vercel Production 배포 주소를 QR 코드로 만듭니다.

문자 자동발송이 필요하므로 GitHub Pages 단독 배포보다는 Vercel을 권장합니다. GitHub Pages는 정적 파일 배포에는 적합하지만, SENS Secret Key를 숨겨 실행할 서버리스 함수가 없습니다.

## 1. 네이버 클라우드 SENS 준비

네이버 클라우드 콘솔에서 다음을 준비합니다.

- SENS 프로젝트 생성
- SMS 서비스 ID 확인: `ncp:sms:kr:...` 형식
- 발신번호 사전 등록
- 계정 Access Key ID / Secret Key 발급

## 2. Vercel 환경변수 등록

Vercel Dashboard > Project > Settings > Environment Variables에 아래 값을 등록합니다.

```text
NAVER_CLOUD_ACCESS_KEY=네이버클라우드 Access Key ID
NAVER_CLOUD_SECRET_KEY=네이버클라우드 Secret Key
NAVER_SENS_SERVICE_ID=ncp:sms:kr:...
NAVER_SENS_FROM=등록된 발신번호 숫자만
SMS_DRY_RUN=true
```

운영 도메인을 제한하고 싶으면 아래 값을 추가합니다.

```text
ALLOWED_ORIGIN=https://your-domain.vercel.app
```
`SMS_DRY_RUN=true`로 둔 상태에서는 실제 문자가 나가지 않습니다. 신청 흐름을 확인한 뒤 실발송 테스트 때 `SMS_DRY_RUN=false`로 바꾸거나 환경변수에서 삭제하세요.


## 3. Vercel 배포

Vercel에서 저장소를 연결하면 별도 빌드 없이 배포됩니다. 프로젝트 루트에 `index.html`, `app.js`, `styles.css`, `api/send-sms.js`가 있어야 합니다.

로컬에서 확인하려면 다음 명령을 사용할 수 있습니다.

```bash
npm install -g vercel
vercel dev
```

## 4. 문자 발송 테스트

1. Vercel 배포 주소로 접속합니다.
2. 개막작 또는 일반 상영작을 신청합니다.
3. 예약이 `확정`되면 `/api/send-sms` 함수가 호출됩니다.
4. 신청 완료 팝업과 관리자 명단에서 문자 상태를 확인합니다.
5. 실패 시 Vercel Function Logs와 네이버 클라우드 SENS 발송 이력을 확인합니다.

## 5. 실제 운영 전 추가 권장 사항

현재 시제품은 브라우저 `localStorage`에 예약을 저장합니다. 실제 QR 배포 때 여러 관객의 신청을 중앙에서 모으려면 다음 구조가 필요합니다.

- Vercel: 화면과 서버리스 함수
- Supabase 또는 Firebase: 예약 DB
- SENS: 예약 확인 문자
- 관리자 로그인: 운영진 계정 기반 로그인

중앙 DB를 붙이면 정원 초과 방지, 대기자 전환, 문자 재발송, 통계가 모든 운영진에게 동일하게 보입니다.
