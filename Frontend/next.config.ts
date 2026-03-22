import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // If your site is in a subfolder on Hostinger (e.g. example.com/app/), set basePath:
  // basePath: "/app",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
