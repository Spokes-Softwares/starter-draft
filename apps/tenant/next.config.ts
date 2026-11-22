import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/tenant",
  transpilePackages: ["@repo/ui", "@repo/db"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tenant",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
