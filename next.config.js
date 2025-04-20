/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // 一時的にコメントアウト
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
