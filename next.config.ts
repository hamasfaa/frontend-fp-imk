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
      "127.0.0.1",
    ],
  },
};

export default nextConfig;
