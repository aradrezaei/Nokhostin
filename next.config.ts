const nextConfig = {
  reactStrictMode: true,

  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  output: 'standalone', 

  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
