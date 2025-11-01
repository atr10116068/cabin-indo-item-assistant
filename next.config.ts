import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/cabin-indo-item-assistant' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cabin-indo-item-assistant/' : '',
};

export default nextConfig;
