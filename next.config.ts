import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: 'build',
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
