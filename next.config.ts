import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import path from "path";
import { donetskHeroVideo } from "./app/donetsk/video.generated";
import { validateProductionApiUrl } from "./scripts/validate-production-api.mjs";

const videoAssets = [
  donetskHeroVideo.poster,
  donetskHeroVideo.mobile.webm,
  donetskHeroVideo.mobile.mp4,
  donetskHeroVideo.desktop.webm,
  donetskHeroVideo.desktop.mp4,
];

const nextConfig: NextConfig = {
  // Use the standard .next build, served by next start behind Nginx.
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app")],
    silenceDeprecations: ["legacy-js-api"],
  },
  async headers() {
    // Only the generated, content-hashed media can be cached immutably.
    // Source files and other public assets retain Next.js's default policy.
    return videoAssets.map(({ src }) => ({
      source: src,
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }));
  },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    validateProductionApiUrl(process.env.NEXT_PUBLIC_API_URL);
  }
  return nextConfig;
}
