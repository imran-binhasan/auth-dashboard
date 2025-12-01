/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Disable fetch cache completely
  fetchCache: 'force-no-store',
};

module.exports = nextConfig;