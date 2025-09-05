import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "truyentranh3q.com",
      },
      {
        protocol: "https",
        hostname: "images.spiderum.com",
      },
      {
        protocol: "https",
        hostname: "s1apihd.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "truyenhdt.com",
      },
      {
        protocol: "https",
        hostname: "s1.truyentranh3q.com",
      },
      {
        protocol: "https",
        hostname: "api.linhthanhnguyet.com",
      },
      {
        protocol: "http",
        hostname: "staging.api.linhthanhnguyet.com",
      },
      {
        protocol: "https",
        hostname: "api.thanhnhacchau.com",
      },
      {
        protocol: "http",
        hostname: "staging.api.thanhnhacchau.com",
      },
    ],
    domains: ["api.linhthanhnguyet.com", "api.thanhnhacchau.com"],
  },
  // Cấu hình cho Google AdSense
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  // Cấu hình CSP cho AdSense
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/api/ads.txt",
      },
    ];
  },
};

export default nextConfig;
