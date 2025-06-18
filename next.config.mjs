/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Azure App Service - we need a regular Next.js app, not static export
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix for Azure deployment
  trailingSlash: false,
  // Enable experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  },
  // Azure App Service specific optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;