import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: 'https',
        hostname: 'assets.web3pay.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
