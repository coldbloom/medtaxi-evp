import type { ImgHTMLAttributes } from "react";

// Small SVGs already have their final size/format and do not need an image runtime.
export function StaticImage({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element -- Static SVG with explicit dimensions.
  return <img {...props} alt={alt ?? ""} loading="lazy" decoding="async" />;
}
