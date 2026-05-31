// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],

    qualities: [75, 80, 85],
  },
  allowedDevOrigins: ["192.168.100.19"],
};

export default nextConfig;
