-- Apex Fuel: takım hazır ayarları (Team presets)
-- ÖNCE Crescent'in schema.sql dosyasını çalıştır (admin_users tablosu orada). Tekrar çalıştırılabilir.
create extension if not exists pgcrypto;

create table if not exists public.fuel_presets (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.fuel_presets enable row level security;
grant select on public.fuel_presets to anon, authenticated;
grant insert, update, delete on public.fuel_presets to authenticated;

drop policy if exists "Anyone can read fuel presets" on public.fuel_presets;
drop policy if exists "Admins manage fuel presets"   on public.fuel_presets;

create policy "Anyone can read fuel presets" on public.fuel_presets
  for select to anon, authenticated using (true);
create policy "Admins manage fuel presets" on public.fuel_presets
  for all to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
