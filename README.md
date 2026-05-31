# Maison Sottovoce

The official website of **Maison Sottovoce**.

*Sotto voce* — "in a soft voice." A house built on quiet craft and considered detail.

## About

This repository holds the source for the Maison Sottovoce brand site, built with
[Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com) and
deployed as a static site to GitHub Pages.

🌐 **Live site:** https://maisonsottovoce-cyber.github.io/sottovoce/

## Tech stack

- **Next.js** (App Router) with static export (`output: "export"`)
- **TypeScript**
- **Tailwind CSS**
- **GitHub Pages** for hosting (auto-deployed via GitHub Actions)

## Getting started

Requires [Node.js](https://nodejs.org) 18.18+ (the project is developed on Node 22+).

```bash
# install dependencies
npm install

# start the dev server at http://localhost:3000
npm run dev

# build the static site into ./out
npm run build
```

## Deployment

Every push to `main` triggers the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
static site and publishes it to GitHub Pages. No manual steps required.

## Structure

| Path | Purpose |
| --- | --- |
| `src/app/` | Pages and layout (App Router) |
| `src/app/page.tsx` | Home / landing page |
| `src/app/globals.css` | Global styles and theme tokens |
| `public/` | Static assets served as-is |
| `next.config.ts` | Next.js config (static export + Pages base path) |
| `.github/workflows/` | CI/CD (GitHub Pages deploy) |

## Contributing

This is a private project. Changes are made through pull requests against the `main` branch.

## License

All rights reserved. © Maison Sottovoce.
