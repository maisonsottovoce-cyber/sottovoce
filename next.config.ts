import type { NextConfig } from "next";

// Base path for GitHub Pages (served under /sottovoce). Set via
// NEXT_PUBLIC_BASE_PATH in CI; empty for local dev and Vercel (root domain).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
