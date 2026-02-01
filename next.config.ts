// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/animation",
        destination: "/renders/animation",
      },
      {
        source: "/autocapital",
        destination: "/renders/conversion/autocapital",
      },
      {
        source: "/autoformatname",
        destination: "/renders/conversion/autoformatname",
      },
      {
        source: "/pending",
        destination: "/renders/pending",
      }
      ,
      {
        source: "/users",
        destination: "/renders/users",
      }
    ];
  },
};

export default nextConfig;
