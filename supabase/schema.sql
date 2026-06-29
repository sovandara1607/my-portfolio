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
