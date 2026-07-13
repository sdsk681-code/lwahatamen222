const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  allowedDevOrigins: [
    "localhost:5000",
    "127.0.0.1:5000",
    "*.replit.dev",
    "*.repl.co",
    "*.replit.app",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
