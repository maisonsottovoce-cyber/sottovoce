# Image & video assets

Real photography drops in here, replacing the CSS placeholders. Suggested structure:

```
public/images/hero/         → homepage + page heroes
public/images/categories/   → category tile imagery
public/images/editorial/    → lifestyle / journal imagery
public/images/products/     → product gallery shots
public/video/               → brand film + motion clips
```

## How to swap a placeholder for a real image

Every placeholder is rendered by `ImagePlaceholder`
(`src/components/content/ImagePlaceholder.tsx`). It accepts an optional `src`:

```tsx
<ImagePlaceholder label="Evening Dress" tone="ink" src="/images/products/roma-1.jpg" />
```

When `src` is set, the real image is shown instead of the gradient placeholder.

For product imagery, set the `src` field on each image in
`src/data/products.ts`:

```ts
images: [
  { label: "Evening Dress", tone: "ink", src: "/images/products/roma-1.jpg" },
  ...
]
```

> Note: this site deploys under a base path (`/sottovoce`) in production.
> When referencing assets in plain `<img>`/`src` strings, keep paths root-relative
> (`/images/...`); Next.js handles the base path for `next/link` and `next/font`.
> If a production image 404s, prefix it with the base path or migrate to `next/image`.
