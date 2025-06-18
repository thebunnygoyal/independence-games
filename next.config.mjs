/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/independence-games' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/independence-games/' : '',
};

export default nextConfig;