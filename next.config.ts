import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Image filenames contain a content hash, so updates always get a new URL.
        source: "/donetsk/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app")],
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
