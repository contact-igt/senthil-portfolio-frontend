import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow the app to request quality 75 (default) and 90 (used in Footer)
    qualities: [75, 90],
    // Disable built-in image optimization during development to avoid
    // local cache/write issues; enable in production by default.
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
