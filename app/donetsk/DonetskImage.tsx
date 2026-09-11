import { preload } from "react-dom";
import { donetskImages } from "./images.generated";

type DonetskImageProps = {
  name: keyof typeof donetskImages;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

// Pre-encoded responsive images need neither browser JS nor a cold optimizer request.
export function DonetskImage({ name, alt, sizes, className = "", priority = false }: DonetskImageProps) {
  const image = donetskImages[name];
  const srcSet = (variants: readonly { src: string; width: number }[]) =>
    variants.map(({ src, width }) => `${src} ${width}w`).join(", ");

  if (priority) {
    preload(image.avif[image.avif.length - 1].src, {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcSet(image.avif),
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(image.avif)} sizes={sizes} />
      <img
        src={image.webp[image.webp.length - 1].src}
        srcSet={srcSet(image.webp)}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    </picture>
  );
}
