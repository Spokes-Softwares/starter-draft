import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/hubs",
  transpilePackages: ["@repo/ui", "@repo/db"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hubs",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
