# Maison SOTTOVOCE — Backend & Admin Setup

The site now has an **admin dashboard** (`/admin`) for uploading dress photos and
descriptions, backed by **Supabase** (database + image storage + login) and hosted on
**Vercel**. Follow these one-time steps.

> Until the Supabase keys below are set, the site still runs and shows the original 12
> dresses (fallback data), and `/admin` shows a setup notice.

---

## 1. Create a Supabase project (free)

1. Go to https://supabase.com → sign up → **New project**. Pick a name + a strong database
   password, choose a region near you.
2. When it finishes, open **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (keep secret!) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Create the database tables

1. In Supabase, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
   This creates the `products` and `product_images` tables, security rules, and the
   `product-images` storage bucket.

## 3. Create your admin login

1. Supabase → **Authentication → Users → Add user → Create new user**.
2. Enter your email + a password (this is your dashboard login). Tick "Auto confirm".
3. (Recommended) **Authentication → Providers → Email** → turn **off** "Allow new users to
   sign up" so only you can log in.

## 4. Configure local environment

Create a file named `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

(`.env.local` is git-ignored — never commit your keys.)

## 5. Seed the original 12 dresses (optional but recommended)

This uploads the existing lookbook photos to Supabase and creates the 12 products:

```powershell
$env:Path = "C:\Users\karin\AppData\Local\nodejs-portable\node-v24.16.0-win-x64;$env:Path"
node --env-file=.env.local scripts/seed.mjs
```

## 6. Run locally

```powershell
npm run dev
```

- Storefront: http://localhost:3000
- Admin: http://localhost:3000/admin → sign in with the user from step 3.
- Create a dress: fill the fields, upload photos, **Save** → it appears on the storefront.

## 7. Deploy to Vercel (free)

1. Go to https://vercel.com → sign up **with GitHub** → **Add New → Project** → import
   `maisonsottovoce-cyber/sottovoce`.
2. Before deploying, open **Environment Variables** and add the same three keys from step 4
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
3. **Deploy.** Every push to `main` now auto-deploys. Your live URL becomes a `vercel.app`
   address (a custom domain like `maisonsottovoce.com` can be added later in Vercel → Domains).

> The old GitHub Pages deployment is retired — a dynamic app with uploads can't run on Pages.

---

## How it works (for reference)

- **Data**: `src/lib/catalog.ts` reads published products from Supabase (falls back to
  `src/data/products.ts` when keys are absent). Client components read the public
  `/api/products` feed.
- **Admin**: `/admin` is protected by `src/proxy.ts` (Next 16's renamed middleware). Saves go through server actions in
  `src/app/admin/actions.ts` (service role) and revalidate the storefront instantly.
- **Images**: uploaded to the Supabase `product-images` bucket; the public URL is stored on
  each `product_images` row.
