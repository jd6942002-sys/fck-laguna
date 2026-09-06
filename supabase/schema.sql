-- ============================================================
-- Sparkle: Supabase schema (replaces Firebase Firestore)
-- Project: sparkle  |  Applied via Supabase MCP migration
--   "sparkle_init_schema" (idempotency key sparkle-init-schema-2026-09-06-001)
-- Tables map 1:1 to the old Firestore model:
--   users/{userId}           -> public.user_profiles
--   users/{userId}/progress/ -> public.user_progress
-- RLS below is the direct port of firestore.rules ("isOwner" helpers).
-- ============================================================

-- ---------- USER PROFILES (was: users/{userId}) ----------
create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Explorer ✨',
  avatar_url text not null default 'initials',
  has_dyslexia boolean not null default false,
  has_adhd boolean not null default false,
  has_visual_impairment boolean not null default false,
  has_hearing_impairment boolean not null default false,
  has_motor_impairment boolean not null default false,
  has_autism boolean not null default false,
  has_anxiety boolean not null default false,
  preferred_learning_mode text not null default 'visual'
    constraint user_profiles_learning_mode_check
    check (preferred_learning_mode in ('dyslexia-friendly', 'audio', 'visual', 'memory')),
  font_size_preference text not null default 'normal'
    constraint user_profiles_font_size_check
    check (font_size_preference in ('normal', 'large', 'xl')),
  high_contrast boolean not null default false,
  reduced_motion boolean not null default false,
  onboarding_completed boolean not null default false,
  dark_mode boolean not null default false,
  ui_scale integer not null default 100,
  streak integer not null default 1,
  streak_last_date text,
  completed_test_levels jsonb not null default '[]',
  scores jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- USER PROGRESS (was: users/{userId}/progress/*) ----------
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id integer not null,
  is_completed boolean not null default false,
  score integer constraint user_progress_score_check check (score between 0 and 100),
  time_spent_minutes integer,
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- ---------- RLS ----------
alter table public.user_profiles enable row level security;
alter table public.user_progress enable row level security;

-- auth.uid() == user_id  =>  the Firestore 'isOwner(userId)' helper
drop policy if exists "profiles_select_own" on public.user_profiles;
create policy "profiles_select_own" on public.user_profiles
  for select using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.user_profiles;
create policy "profiles_insert_own" on public.user_profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.user_profiles;
create policy "profiles_update_own" on public.user_profiles
  for update using (auth.uid() = user_id);

drop policy if exists "progress_select_own" on public.user_progress;
create policy "progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.user_progress;
create policy "progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.user_progress;
create policy "progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id);

-- ---------- AUTO-CREATE profile on new signup (like the Firestore signup hook) ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (user_id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', 'Explorer ✨'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', 'initials')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- updated_at maintenance ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_set_updated_at on public.user_profiles;
create trigger user_profiles_set_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

drop trigger if exists user_progress_set_updated_at on public.user_progress;
create trigger user_progress_set_updated_at
  before update on public.user_progress
  for each row execute function public.set_updated_at();
