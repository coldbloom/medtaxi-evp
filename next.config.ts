import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import path from "path";
import { validateExportApiUrl } from "./scripts/validate-export-api.mjs";

const nextConfig: NextConfig = {
  output: "export",
  // Keep the existing canonical URLs; Nginx maps /route to /route.html.
  trailingSlash: false,
  // HTTP caching is configured by the static host (deploy/nginx-static.conf.example).
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app")],
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    // No /_next/image server is available in out/. Donetsk and Mercedes photos
    // already use responsive AVIF/WebP variants generated before deployment.
    unoptimized: true,
  },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    validateExportApiUrl(process.env.NEXT_PUBLIC_API_URL);
  }
  return nextConfig;
}
