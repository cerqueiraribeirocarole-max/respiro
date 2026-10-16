create table if not exists public.respiro_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '' check (char_length(display_name)<=80),
 created_at timestamptz not null default now()
);
create table if not exists public.respiro_saves (
 user_id uuid primary key references auth.users(id) on delete cascade,
 progress jsonb not null default '{}'::jsonb check (jsonb_typeof(progress)='object' and octet_length(progress::text)<=250000),
 updated_at timestamptz not null default now()
);
alter table public.respiro_profiles enable row level security;
alter table public.respiro_saves enable row level security;
revoke all on public.respiro_profiles,public.respiro_saves from anon;
revoke all on public.respiro_profiles,public.respiro_saves from authenticated;
grant select,insert,update,delete on public.respiro_profiles,public.respiro_saves to authenticated;
create policy respiro_profiles_select on public.respiro_profiles for select to authenticated using ((select auth.uid())=user_id);
create policy respiro_profiles_insert on public.respiro_profiles for insert to authenticated with check ((select auth.uid())=user_id);
create policy respiro_profiles_update on public.respiro_profiles for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy respiro_profiles_delete on public.respiro_profiles for delete to authenticated using ((select auth.uid())=user_id);
create policy respiro_saves_select on public.respiro_saves for select to authenticated using ((select auth.uid())=user_id);
create policy respiro_saves_insert on public.respiro_saves for insert to authenticated with check ((select auth.uid())=user_id);
create policy respiro_saves_update on public.respiro_saves for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy respiro_saves_delete on public.respiro_saves for delete to authenticated using ((select auth.uid())=user_id);
