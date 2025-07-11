/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Resolve the undici module issue
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': 'next/dist/compiled/undici'
    }
    return config;
  },
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
};

export default nextConfig; 