import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server runtime on Vercel — dynamic app with admin uploads + Supabase.
  images: {
    // Product photography is served from Supabase Storage.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
