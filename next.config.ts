import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rustacean.net",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
