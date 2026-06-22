// Optional base path prefix for raw /public asset URLs. Empty on Vercel
// (root domain); kept env-driven so the site could also be hosted under a
// subpath later without touching callers.
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
