-- Aamir Saifi Portfolio — Supabase Schema
-- Run this in your Supabase SQL editor (supabase.com → project → SQL Editor)

-- ── Projects ────────────────────────────────────────────
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text default '',
  tech text[] default '{}',
  category text default 'Frontend',
  live_url text default '',
  github_url text default '',
  featured boolean default false,
  thumbnail text default '',
  gallery text[] default '{}',
  created_at timestamptz default now()
);
alter table projects enable row level security;
create policy "Admin can do everything on projects"
  on projects for all using (auth.role() = 'authenticated');
create policy "Public can read projects"
  on projects for select using (true);

-- ── Components ───────────────────────────────────────────
create table if not exists components (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text default 'UI',
  description text default '',
  preview text default '',
  html text default '',
  css text default '',
  js text default '',
  react text default '',
  created_at timestamptz default now()
);
alter table components enable row level security;
create policy "Admin can do everything on components"
  on components for all using (auth.role() = 'authenticated');
create policy "Public can read components"
  on components for select using (true);

-- ── About ────────────────────────────────────────────────
create table if not exists about (
  id uuid primary key default gen_random_uuid(),
  name text default 'Aamir Saifi',
  title text default 'Frontend Developer',
  bio text default '',
  skills text[] default '{}',
  profile_image text default '',
  updated_at timestamptz default now()
);
alter table about enable row level security;
create policy "Admin can do everything on about"
  on about for all using (auth.role() = 'authenticated');
create policy "Public can read about"
  on about for select using (true);

-- ── Timeline ─────────────────────────────────────────────
create table if not exists timeline (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text default '',
  "order" integer default 0
);
alter table timeline enable row level security;
create policy "Admin can do everything on timeline"
  on timeline for all using (auth.role() = 'authenticated');
create policy "Public can read timeline"
  on timeline for select using (true);

-- ── Messages ─────────────────────────────────────────────
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table messages enable row level security;
create policy "Admin can do everything on messages"
  on messages for all using (auth.role() = 'authenticated');
-- Allow the contact form to insert messages (anon can insert)
create policy "Anyone can send a message"
  on messages for insert with check (true);

-- ── Settings ─────────────────────────────────────────────
create table if not exists settings (
  key text primary key,
  value text default ''
);
alter table settings enable row level security;
create policy "Admin can do everything on settings"
  on settings for all using (auth.role() = 'authenticated');
create policy "Public can read settings"
  on settings for select using (true);

-- ── Seed default settings ────────────────────────────────
insert into settings (key, value) values
  ('github', ''),
  ('linkedin', ''),
  ('twitter', ''),
  ('email', ''),
  ('hire_email', ''),
  ('phone', ''),
  ('location', ''),
  ('resume', '')
on conflict (key) do nothing;

-- ── Storage Bucket ───────────────────────────────────────
-- Run this in Supabase Storage section:
-- 1. Create a new bucket called "portfolio-media"
-- 2. Set it to Public
-- 3. Add RLS policies as needed
