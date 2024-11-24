import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
        pathname: "/v1/storage/buckets/6741ac790037f830945b/files/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "http",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "beforeifly.com",
        port: "",
        pathname: "/new/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "uprootedfilm.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "relevantbrands-2017.prophet.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "e7.pngegg.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
