# 제9회 머내마을영화제 예약·후원·관리 웹앱 v12

제9회 머내마을영화제용 예약·후원·관리 대시보드 시제품입니다. 이번 버전에는 **네이버 클라우드 SENS 예약 확인 문자 자동발송**을 붙일 수 있는 Vercel 서버리스 함수가 추가되었습니다.

## v12 반영 내용

- 예약이 `확정`되면 입력한 전화번호로 예약 확인 문자를 자동 발송합니다.
- 신청 화면에 `예약 확정 시 입력한 연락처로 예약 확인 문자를 받겠습니다.` 체크 항목을 추가했습니다.
- 신청 완료 팝업에 문자 자동발송 상태와 `문자 다시 발송` 버튼을 추가했습니다.
- 관리자 신청자 명단에 문자 상태와 `문자발송` 버튼을 추가했습니다.
- 신청자 CSV에 문자 수신 동의, 문자 상태, 발송일, SENS 요청 ID를 추가했습니다.
- Vercel 배포용 `api/send-sms.js`, `package.json`, `vercel.json`, `.env.example`, `deploy_guide.md`를 추가했습니다.

## 발송 문자 문구

확정 예약일 때 아래 형식으로 LMS가 발송됩니다.

```text
홍길동 님 예약이 완료되었습니다.
예약번호: rsv-...
영화명: 얼굴
좌석/인원: A-002 / 1명
일시: 9월 9일 (수) 오후 07:00
장소: 동천농협강당
상영 당일 현장에서 예약번호와 신청자 이름을 알려주세요.
```

문자 내용은 `api/send-sms.js`의 `buildMessage()` 함수에서 수정할 수 있습니다. 화면의 복사·공유 문구는 `app.js`의 `reservationConfirmationMessage()`에서 수정할 수 있습니다.

## 배포 방식 추천

추천은 **GitHub + Vercel + 네이버 클라우드 SENS**입니다.

- GitHub: 코드 저장과 버전 관리
- Vercel: 웹앱 배포와 `/api/send-sms` 서버리스 함수 실행
- 네이버 클라우드 SENS: 예약 완료 SMS/LMS 발송

GitHub Pages는 단순 정적 페이지 배포에는 좋지만, SENS Access Key와 Secret Key를 숨겨서 실행할 서버 기능이 없으므로 문자 자동발송에는 적합하지 않습니다. 이번 앱은 Vercel을 기준으로 준비했습니다.

자세한 순서는 [deploy_guide.md](./deploy_guide.md)를 보세요.

## Vercel 환경변수

Vercel Dashboard > Project > Settings > Environment Variables에 아래 값을 넣습니다.

```text
NAVER_CLOUD_ACCESS_KEY=네이버클라우드 Access Key ID
NAVER_CLOUD_SECRET_KEY=네이버클라우드 Secret Key
NAVER_SENS_SERVICE_ID=ncp:sms:kr:...
NAVER_SENS_FROM=등록된 발신번호 숫자만
SMS_DRY_RUN=true
```

선택값:

```text
ALLOWED_ORIGIN=https://your-domain.vercel.app
```
`SMS_DRY_RUN=true`로 둔 상태에서는 실제 문자가 나가지 않습니다. 화면과 API 연결을 먼저 확인한 뒤, 실발송 테스트 때 `SMS_DRY_RUN=false`로 바꾸거나 환경변수에서 삭제하세요.


## 로컬 확인

화면만 확인하려면 `index.html`을 열면 됩니다. 다만 SENS 자동 문자는 `file://` 로컬 파일에서는 발송되지 않습니다.

Vercel 방식으로 로컬 API까지 테스트하려면 다음처럼 실행합니다.

```bash
npm install -g vercel
vercel dev
```

## 개막식 기본 정보

- 영화제 기간: `2026년 9월 9일 ~ 9월 13일`
- 개막식: `9월 9일 저녁 7시`
- 장소: `동천농협강당`
- 개막식 영화: `얼굴`
- 참석: `박정민 배우`
- 소개영상: `https://youtu.be/dM0quIEmrYA`

## 개막작 후원자 선예약 / 일반석 운영

- 후원자 선예약 기간에는 후원에 참여하는 관객이 먼저 개막작 예약을 신청할 수 있습니다.
- 신청 화면에는 `박정민배우를 가장 가까이서 만날 수 있는 후원자님들을 위한 선예약` 문구를 반영했습니다.
- 후원자 선예약 확정자는 자동으로 지정좌석이 배정됩니다.
- 일반석 오픈 이후 신청자는 자유석으로 접수됩니다.
- 지정좌석 수, 총 정원, 후원자 선예약 시작/종료, 일반석 오픈 시작/종료는 관리자 화면에서 수정할 수 있습니다.

## 기존 주요 기능

- QR 첫 화면에서 `개막작 티켓팅`, `영화 신청하기`, `후원하기`로 이동합니다.
- 후원 버튼은 `https://aq.gy/f/2hekV` 링크를 새 창으로 엽니다.
- 일반 상영작은 상영작, 상영관, 시간, 정원 현황을 보고 신청할 수 있습니다.
- 남은 좌석 안이면 `확정`, 남은 좌석보다 많으면 `대기`로 저장됩니다.
- 신청 완료 후 예약번호가 보이고, 후원 안내는 신청 전과 신청 후의 문구를 다르게 구성했습니다.
- 관리자 신청자 명단에서 `참석 확인` 버튼으로 실제 참석 여부와 실제 참석 인원을 기록할 수 있습니다.
- 대시보드에서 신청자 수, 확정 신청 인원, 실제 참석 인원, 대기 인원을 구분해 봅니다.
- 인쇄 시 오프라인 체크인용 `참석 체크` 칸이 신청자 명단에 나타납니다.
- 상세 통계와 CSV 다운로드, JSON 백업/복원이 가능합니다.

## 파일 구성

- `index.html`: 앱 진입 파일
- `styles.css`: 화면 스타일
- `app.js`: 신청, 개막작 티켓팅, 참석 확인, 관리자, 통계, 백업 기능
- `api/send-sms.js`: 네이버 클라우드 SENS 문자 발송 서버리스 함수
- `package.json`: Vercel 배포용 설정
- `vercel.json`: Vercel 헤더 설정
- `.env.example`: 환경변수 예시
- `deploy_guide.md`: 배포와 SENS 설정 가이드
- `notification_plan.md`: 카카오톡·문자·메일 알림 확장 방안
- `schema.sql`: 실제 서버 DB 확장용 테이블 초안
- `assets/face-poster.jpeg`: 개막식 영화 포스터

## 실제 운영 전 중요한 점

현재 앱의 예약 데이터는 브라우저 `localStorage`에 저장됩니다. Vercel에 배포하면 문자 발송은 가능하지만, 여러 관객의 신청을 관리자 한 화면에 중앙 집계하려면 Supabase, Firebase, 자체 서버 DB 같은 중앙 저장소 연결이 필요합니다.

현장 운영용 최종 구조는 **Vercel + Supabase DB + SENS**를 권장합니다. 이 구조에서는 예약 저장, 정원 초과 방지, 문자 발송, 관리자 통계가 모두 중앙에서 안정적으로 처리됩니다.
