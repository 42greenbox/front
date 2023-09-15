/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com", "picsum.photos", "img.42greenbox.com"],
  },
  experimental: {
    appDir: true,
  },
  // config
});
