import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Prisma client from being bundled — it needs native bindings at runtime
  serverExternalPackages: ["@prisma/client", "prisma"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
};

export default nextConfig;
