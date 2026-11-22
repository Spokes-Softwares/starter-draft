import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/operations",
  transpilePackages: ["@repo/ui", "@repo/db"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/operations",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
