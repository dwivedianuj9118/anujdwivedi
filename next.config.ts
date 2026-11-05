import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `next build` writes the site to ./out
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
