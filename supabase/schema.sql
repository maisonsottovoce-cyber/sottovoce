-- Maison SOTTOVOCE — database schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).

-- ─────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  category        text not null,
  price           numeric not null default 0,
  color           text not null default '',
  available_colors jsonb not null default '[]'::jsonb,
  sizes           text[] not null default '{}',
  occasion        text[] not null default '{}',
  description     text not null default '',
  fit             text default '',
  fabric_care     text default '',
  stylist_note    text default '',
  is_new          boolean not null default false,
  is_best_seller  boolean not null default false,
  published       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  url         text not null,
  label       text default '',
  position    int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on public.product_images(product_id);

-- Keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────
alter table public.products enable row level security;
alter table public.product_images enable row level security;

-- Public can read published products; authenticated admins can read all.
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select using (published = true or auth.role() = 'authenticated');

drop policy if exists products_admin_write on public.products;
create policy products_admin_write on public.products
  for all to authenticated using (true) with check (true);

-- Images are public to read; only authenticated admins may write.
drop policy if exists product_images_public_read on public.product_images;
create policy product_images_public_read on public.product_images
  for select using (true);

drop policy if exists product_images_admin_write on public.product_images;
create policy product_images_admin_write on public.product_images
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────
-- Storage bucket for dress photography
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists product_images_public_select on storage.objects;
create policy product_images_public_select on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists product_images_auth_insert on storage.objects;
create policy product_images_auth_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

drop policy if exists product_images_auth_update on storage.objects;
create policy product_images_auth_update on storage.objects
  for update to authenticated using (bucket_id = 'product-images');

drop policy if exists product_images_auth_delete on storage.objects;
create policy product_images_auth_delete on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- ═══════════════════════════════════════════════════════════════════════════
-- Comprehensive admin extensions
-- (idempotent — safe to re-run on an existing database)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- products: new merchandising fields
-- ─────────────────────────────────────────────
alter table public.products add column if not exists compare_at_price numeric;   -- original price for markdowns
alter table public.products add column if not exists sort_order       int not null default 0;
alter table public.products add column if not exists seo_title        text;
alter table public.products add column if not exists seo_description  text;
alter table public.products add column if not exists video_url        text;       -- per-product clip (uploaded or external)

-- ─────────────────────────────────────────────
-- product_sizes: per-size stock / availability
-- ─────────────────────────────────────────────
create table if not exists public.product_sizes (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  size        text not null,
  available   boolean not null default true,
  quantity    int,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists product_sizes_product_id_idx on public.product_sizes(product_id);

alter table public.product_sizes enable row level security;
drop policy if exists product_sizes_public_read on public.product_sizes;
create policy product_sizes_public_read on public.product_sizes for select using (true);
drop policy if exists product_sizes_admin_write on public.product_sizes;
create policy product_sizes_admin_write on public.product_sizes
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────
-- collections
-- ─────────────────────────────────────────────
create table if not exists public.collections (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title          text not null,
  kicker         text default '',
  description    text default '',
  hero_label     text default '',
  hero_tone      text default 'charcoal',
  hero_image_url text,
  sort_order     int not null default 0,
  published      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
drop trigger if exists collections_touch_updated_at on public.collections;
create trigger collections_touch_updated_at
  before update on public.collections
  for each row execute function public.touch_updated_at();

alter table public.collections enable row level security;
drop policy if exists collections_public_read on public.collections;
create policy collections_public_read on public.collections
  for select using (published = true or auth.role() = 'authenticated');
drop policy if exists collections_admin_write on public.collections;
create policy collections_admin_write on public.collections
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────
-- occasion_edits ("Shop by Occasion" tiles)
-- ─────────────────────────────────────────────
create table if not exists public.occasion_edits (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  caption     text default '',
  href        text default '',
  tone        text default 'charcoal',
  label       text default '',
  image_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);
alter table public.occasion_edits enable row level security;
drop policy if exists occasion_edits_public_read on public.occasion_edits;
create policy occasion_edits_public_read on public.occasion_edits for select using (true);
drop policy if exists occasion_edits_admin_write on public.occasion_edits;
create policy occasion_edits_admin_write on public.occasion_edits
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────
-- journal_articles
-- ─────────────────────────────────────────────
create table if not exists public.journal_articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  category      text default '',
  date_label    text default '',
  excerpt       text default '',
  tone          text default 'charcoal',
  cover_url     text,
  product_slugs text[] not null default '{}',
  body          text[] not null default '{}',
  sort_order    int not null default 0,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
drop trigger if exists journal_touch_updated_at on public.journal_articles;
create trigger journal_touch_updated_at
  before update on public.journal_articles
  for each row execute function public.touch_updated_at();

alter table public.journal_articles enable row level security;
drop policy if exists journal_public_read on public.journal_articles;
create policy journal_public_read on public.journal_articles
  for select using (published = true or auth.role() = 'authenticated');
drop policy if exists journal_admin_write on public.journal_articles;
create policy journal_admin_write on public.journal_articles
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────
-- site_settings (single row, id = true)
-- ─────────────────────────────────────────────
create table if not exists public.site_settings (
  id                      boolean primary key default true,
  announcement_text       text default '',
  announcement_enabled    boolean not null default true,
  free_shipping_threshold numeric,
  shipping_returns_copy   text default '',
  updated_at              timestamptz not null default now(),
  constraint site_settings_singleton check (id)
);
insert into public.site_settings (id) values (true) on conflict (id) do nothing;

drop trigger if exists site_settings_touch_updated_at on public.site_settings;
create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

alter table public.site_settings enable row level security;
drop policy if exists site_settings_public_read on public.site_settings;
create policy site_settings_public_read on public.site_settings for select using (true);
drop policy if exists site_settings_admin_write on public.site_settings;
create policy site_settings_admin_write on public.site_settings
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────
-- Storage bucket for product videos
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-videos', 'product-videos', true)
on conflict (id) do nothing;

drop policy if exists product_videos_public_select on storage.objects;
create policy product_videos_public_select on storage.objects
  for select using (bucket_id = 'product-videos');

drop policy if exists product_videos_auth_insert on storage.objects;
create policy product_videos_auth_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'product-videos');

drop policy if exists product_videos_auth_update on storage.objects;
create policy product_videos_auth_update on storage.objects
  for update to authenticated using (bucket_id = 'product-videos');

drop policy if exists product_videos_auth_delete on storage.objects;
create policy product_videos_auth_delete on storage.objects
  for delete to authenticated using (bucket_id = 'product-videos');
