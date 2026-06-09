// Base path for /public assets. Empty now that the app runs on a server
// runtime (Vercel) at the domain root rather than under /sottovoce on Pages.
const BASE = "";

export function assetPath(src?: string): string | undefined {
  if (!src) return src;
  if (/^https?:\/\//.test(src)) return src;
  return BASE + (src.startsWith("/") ? src : `/${src}`);
}

/** Path to an optimized lookbook photo, e.g. lb(31) → /images/lookbook/img_31.jpg */
export function lb(n: number): string {
  return `/images/lookbook/img_${String(n).padStart(2, "0")}.jpg`;
}
