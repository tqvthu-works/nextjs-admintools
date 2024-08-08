/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        port: "",
      },
    ],
  },
  api: {
    per_page: 20,
    bodyParser: {
      sizeLimit: '1mb',
    },
  }
};

module.exports = nextConfig;
