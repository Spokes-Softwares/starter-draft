import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/auth",
  transpilePackages: ["@repo/ui"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
