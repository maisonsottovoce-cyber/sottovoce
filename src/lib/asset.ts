// Base path for /public assets. Matches next.config's basePath so raw
// <img src="/images/..."> URLs resolve under /sottovoce on GitHub Pages.
// Empty for local dev and Vercel (root domain).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(src?: string): string | undefined {
  if (!src) return src;
  if (/^https?:\/\//.test(src)) return src;
  return BASE + (src.startsWith("/") ? src : `/${src}`);
}

/** Path to an optimized lookbook photo, e.g. lb(31) → /images/lookbook/img_31.jpg */
export function lb(n: number): string {
  return `/images/lookbook/img_${String(n).padStart(2, "0")}.jpg`;
}
