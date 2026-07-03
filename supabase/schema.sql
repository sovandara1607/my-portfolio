-- ============================================================================
-- Wallpapers schema for Supabase
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- ============================================================================

create table if not exists public.wallpapers (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  description   text not null default '',
  category      text not null check (category in ('abstract', 'typography')),
  tags          text[] not null default '{}',
  year          int  not null default extract(year from now()),
  accent_color  text not null default '#f38020',

  -- Cloudinary image references (the master upload)
  image_public_id text not null,
  image_url       text not null,
  width           int,
  height          int,

  created_at    timestamptz not null default now()
);

create index if not exists wallpapers_category_idx on public.wallpapers (category);
create index if not exists wallpapers_created_at_idx on public.wallpapers (created_at desc);

-- ----------------------------------------------------------------------------
-- Row Level Security
--   * Anyone (anon) can READ wallpapers  -> public gallery
--   * Only authenticated users can WRITE -> admin uploads/deletes
-- ----------------------------------------------------------------------------
alter table public.wallpapers enable row level security;

drop policy if exists "Wallpapers are publicly readable" on public.wallpapers;
create policy "Wallpapers are publicly readable"
  on public.wallpapers for select
  using (true);

drop policy if exists "Authenticated users can insert wallpapers" on public.wallpapers;
create policy "Authenticated users can insert wallpapers"
  on public.wallpapers for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update wallpapers" on public.wallpapers;
create policy "Authenticated users can update wallpapers"
  on public.wallpapers for update
  to authenticated
  using (true) with check (true);

drop policy if exists "Authenticated users can delete wallpapers" on public.wallpapers;
create policy "Authenticated users can delete wallpapers"
  on public.wallpapers for delete
  to authenticated
  using (true);

-- ============================================================================
-- Experience photos schema
--   Any number of photos per entry in profile.ts's `experience` array,
--   matched by its static `key` (e.g. "student-council"). Uploaded via /admin.
-- ============================================================================

create table if not exists public.experience_photos (
  id              uuid primary key default gen_random_uuid(),
  experience_key  text not null,

  -- Cloudinary image references (the master upload)
  photo_public_id text not null,
  photo_url       text not null,
  width           int,
  height          int,

  -- Optional outbound link (e.g. the original post/article/event page).
  link            text,

  sort_order      int not null default 0,
  created_at      timestamptz not null default now()
);

-- Safe to re-run: adds the column if this table already existed before `link`.
alter table public.experience_photos add column if not exists link text;

create index if not exists experience_photos_key_idx on public.experience_photos (experience_key);
create index if not exists experience_photos_key_sort_idx on public.experience_photos (experience_key, sort_order);

alter table public.experience_photos enable row level security;

drop policy if exists "Experience photos are publicly readable" on public.experience_photos;
create policy "Experience photos are publicly readable"
  on public.experience_photos for select
  using (true);

drop policy if exists "Authenticated users can insert experience photos" on public.experience_photos;
create policy "Authenticated users can insert experience photos"
  on public.experience_photos for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update experience photos" on public.experience_photos;
create policy "Authenticated users can update experience photos"
  on public.experience_photos for update
  to authenticated
  using (true) with check (true);

drop policy if exists "Authenticated users can delete experience photos" on public.experience_photos;
create policy "Authenticated users can delete experience photos"
  on public.experience_photos for delete
  to authenticated
  using (true);
