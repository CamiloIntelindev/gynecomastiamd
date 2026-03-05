import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Configuración para WPGraphQL API
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gynecomastiamd.com',
      },
    ],
  },
};

export default nextConfig;
