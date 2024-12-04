import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React strict mode
  swcMinify: true, // Uses SWC for minifying the JavaScript
  images: {
    domains: ["flowbite.com"], // Allows loading images from specified domains
  },
};

export default nextConfig;
