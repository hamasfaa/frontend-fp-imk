import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "akcdn.detik.net.id",
      "cdn.detik.net.id",
      "i.ytimg.com",
      "34.101.249.2",
    ],
  },
};

export default nextConfig;
