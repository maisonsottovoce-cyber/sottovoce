import type { NextConfig } from "next";

// Repo name — the site is served from https://maisonsottovoce-cyber.github.io/sottovoce
const repo = "sottovoce";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out (required for GitHub Pages)
  output: "export",
  // GitHub Pages can't run Next's image optimization server
  images: { unoptimized: true },
  // Serve assets under the project subpath in production, root in local dev
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  // Emit folder-style URLs (/about/index.html) so Pages routing works
  trailingSlash: true,
};

export default nextConfig;
