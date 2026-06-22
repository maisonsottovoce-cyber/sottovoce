# Maison Sottovoce

The official website of **Maison Sottovoce**.

*Sotto voce* — "in a soft voice." A house built on quiet craft and considered detail.

## About

This repository holds the source for the Maison Sottovoce brand site and storefront,
built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com),
backed by [Supabase](https://supabase.com) (database, image/video storage, admin auth)
and deployed on [Vercel](https://vercel.com).

## Tech stack

- **Next.js 16** (App Router, server runtime)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** — Postgres + Storage + Auth (powers the `/admin` dashboard)
- **Vercel** for hosting (auto-deploys from `main`)

## Getting started

Requires [Node.js](https://nodejs.org) 18.18+ (developed on Node 22+).

```bash
# install dependencies
npm install

# start the dev server at http://localhost:3000
npm run dev

# production build
npm run build
```

The storefront runs on the static fallback catalogue (`src/data/*`) until Supabase is
configured. To enable the admin and live data, follow [`SETUP.md`](SETUP.md).

## Admin

`/admin` is a full back-office (login-protected) for managing products (prices, sizes &
per-size stock, sale prices, photos, video, SEO, ordering), collections, journal articles,
and site settings. It requires the Supabase env vars below and a server runtime (Vercel).

## Deployment

Hosted on **Vercel** — every push to `main` auto-deploys. The three Supabase env vars
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
must be set in the Vercel project. See [`SETUP.md`](SETUP.md).

## Structure

| Path | Purpose |
| --- | --- |
| `src/app/` | Pages and layout (App Router) |
| `src/app/admin/` | Admin dashboard (products, collections, journal, settings) |
| `src/lib/catalog.ts` | Storefront read layer (Supabase + static fallback) |
| `src/lib/admin-catalog.ts` | Admin read layer (service role) |
| `supabase/schema.sql` | Database schema, RLS, storage buckets |
| `scripts/seed.mjs` | Seed the DB with the starter catalogue |
| `public/` | Static assets served as-is |

## Contributing

This is a private project. Changes are made through pull requests against the `main` branch.

## License

All rights reserved. © Maison Sottovoce.
