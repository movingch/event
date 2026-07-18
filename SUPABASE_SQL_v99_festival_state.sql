-- 제9회 머내마을영화제 v99 Supabase 원본 DB 테이블
-- 기존 Supabase 프로젝트의 SQL Editor에서 그대로 실행하세요.

create table if not exists public.festival_state (
  key text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.festival_state enable row level security;

-- 웹브라우저는 직접 이 테이블에 접근하지 않고 Vercel API를 통해 접근합니다.
-- service_role key는 RLS를 우회하므로 별도 공개 정책을 만들지 않습니다.

insert into public.festival_state (key, state, updated_at)
values ('main', '{}'::jsonb, now())
on conflict (key) do nothing;
