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
