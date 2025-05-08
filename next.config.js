/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', /* Static export uitgeschakeld */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
