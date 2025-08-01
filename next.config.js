/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Ensure proper client-side routing
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Remove exportPathMap to let Next.js handle routing dynamically
};

module.exports = nextConfig;
