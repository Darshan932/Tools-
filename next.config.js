/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com'], // Add any image domains you'll use
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Configure redirects for SEO
  async redirects() {
    return [
      {
        source: '/tools',
        destination: '/categories/all',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;