import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no server, no image optimiser).
  output: "export",
  // Every route becomes dir/index.html, which static hosts resolve without guessing.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
