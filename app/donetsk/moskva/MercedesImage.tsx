import { preload } from "react-dom";
import { mercedesImages } from "./mercedes-images.generated";

export const mercedesPhotos = [
  {
    name: "front",
    alt: "Наш чёрный Mercedes для дальних перевозок — вид спереди",
    caption: "Mercedes для дальних поездок",
  },
  {
    name: "stretcher-side",
    alt: "Mercedes с открытой задней дверью и выдвинутой каталкой для пациента",
    caption: "Посадка на каталке",
  },
  {
    name: "passenger-seats",
    alt: "Пассажирские сиденья в салоне нашего Mercedes",
    caption: "Места для сопровождающих",
  },
  {
    name: "stretcher-rear",
    alt: "Салон Mercedes с каталкой для перевозки пациента лёжа — вид сзади",
    caption: "Размещение пациента лёжа",
  },
] as const;

type MercedesImageProps = {
  name: keyof typeof mercedesImages;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

const srcSet = (variants: readonly { src: string; width: number }[]) =>
  variants.map(({ src, width }) => `${src} ${width}w`).join(", ");

// Pre-encoded photos follow DonetskImage: server HTML, no runtime image optimizer.
export function MercedesImage({ name, alt, sizes, className = "", priority = false }: MercedesImageProps) {
  const image = mercedesImages[name];

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
        alt={alt ?? mercedesPhotos.find((photo) => photo.name === name)!.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    </picture>
  );
}
