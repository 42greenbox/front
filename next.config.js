/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com"],
  },
  experimental: {
    appDir: true,
  },
  // config
});
