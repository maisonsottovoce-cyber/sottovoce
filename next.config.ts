import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server runtime (Vercel) — replaces the previous static export.
  images: {
    // Allow remote images served from Supabase Storage.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
