/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    // webpackの設定にカスタマイズを加える

    if (options.isServer) {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
