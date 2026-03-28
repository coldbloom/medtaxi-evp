import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app")],
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
