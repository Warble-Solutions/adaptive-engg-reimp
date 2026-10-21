import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → `out/` folder, deployed to Netlify (no server needed).
  output: "export",
  // `/about` is emitted as `/about/index.html` – plays nicely with static hosts.
  trailingSlash: true,
  // No image optimisation server in static mode; images are pre-optimised to WebP.
  images: { unoptimized: true },
};

export default nextConfig;
