import path from 'node:path';

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Parent /Users/null/package-lock.json confuses Turbopack — pin project root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
