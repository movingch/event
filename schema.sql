-- 제9회 머내마을영화제 서버형 웹앱 확장용 데이터베이스 초안 v12
-- Supabase/PostgreSQL 기준 예시입니다.

create table screenings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  venue text not null,
  start_time timestamptz not null,
  end_time timestamptz,
  capacity integer not null check (capacity > 0),
  gv_host text,
  moderator text,
  staff text,
  staff_phone text,
  status text not null default '신청 가능',
  notes text,

  -- 개막작/얼굴 전용 설정. 일반 회차는 null 또는 기본값 사용.
  is_opening boolean not null default false,
  guest text,
  festival_start_date date,
  festival_end_date date,
  opening_main_end_at timestamptz,
  poster_src text,
  video_url text,
  early_bird_start timestamptz,
  early_bird_end timestamptz,
  general_open_at timestamptz,
  general_end_at timestamptz,
  designated_seat_count integer not null default 0 check (designated_seat_count >= 0),
  seat_prefix text not null default 'A',
  max_tickets_per_reservation integer not null default 4 check (max_tickets_per_reservation > 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table reservations (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null references screenings(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  seats integer not null check (seats > 0),
  status text not null check (status in ('확정', '대기', '취소')) default '확정',

  -- 개막작 티켓 구분
  ticket_type text not null default '일반' check (ticket_type in ('얼리버드', '일반', '일반상영')),
  seat_type text,
  seat_assignment text,
  donor_name text,

  -- 현장 참석 확인
  attended boolean not null default false,
  attended_seats integer not null default 0 check (attended_seats >= 0),
  attended_at timestamptz,

  -- 예약 확인 문자/SENS 발송 상태 요약
  sms_consent boolean not null default true,
  sms_status text not null default '미발송',
  sms_sent_at timestamptz,
  sms_request_id text,
  sms_error text,
  confirmation_channel text,
  confirmation_sent_at timestamptz,
  confirmation_status text,

  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sponsor_clicks (
  id uuid primary key default gen_random_uuid(),
  clicked_at timestamptz not null default now(),
  user_agent text,
  referrer text
);

-- 카카오 알림톡, 문자, 이메일 등 자동 발송을 연결할 때 발송 결과를 남기는 테이블입니다.
create table notification_logs (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid references reservations(id) on delete set null,
  channel text not null check (channel in ('카카오알림톡', '문자', '네이버SENS', '이메일', '카톡공유', '복사')),
  recipient text,
  message text not null,
  status text not null default '대기' check (status in ('대기', '성공', '실패')),
  provider text,
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

-- 빠른 통계 조회용 뷰
create view screening_stats as
select
  s.id,
  s.title,
  s.venue,
  s.start_time,
  s.capacity,
  s.is_opening,
  coalesce(sum(r.seats) filter (where r.status = '확정'), 0) as confirmed_seats,
  coalesce(sum(r.seats) filter (where r.status = '대기'), 0) as waitlist_seats,
  coalesce(sum(r.attended_seats) filter (where r.attended = true and r.status <> '취소'), 0) as actual_attendees,
  s.capacity - coalesce(sum(r.seats) filter (where r.status = '확정'), 0) as remaining_seats,
  coalesce(sum(r.seats) filter (where r.status = '확정' and r.ticket_type = '얼리버드'), 0) as earlybird_confirmed_seats,
  coalesce(sum(r.seats) filter (where r.status = '확정' and r.ticket_type = '일반'), 0) as general_confirmed_seats,
  case when s.capacity > 0 then round(coalesce(sum(r.seats) filter (where r.status = '확정'), 0)::numeric / s.capacity * 100, 1) else 0 end as occupancy_rate
from screenings s
left join reservations r on r.screening_id = s.id
where r.status is null or r.status <> '취소'
group by s.id;

-- 실제 운영 시 고려할 보안 정책 예시
-- 1. 일반 관객은 reservations insert만 허용
-- 2. 관리자만 screenings/reservations/notification_logs 전체 조회·수정·삭제 허용
-- 3. 전화번호, 이메일 등 개인정보는 관리자 화면에서만 노출
-- 4. 알림톡·문자·이메일 API 키는 브라우저에 넣지 말고 서버 함수 환경변수에 저장
