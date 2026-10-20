import { VehicleGallery } from "./VehicleGallery";

const photos = [
  {
    name: "medtaxi-interior",
    caption: "Салон с каталкой",
    alt: "Оранжевая каталка в салоне Mercedes Sprinter, сиденья и задний подъёмник",
  },
  {
    name: "medtaxi-lift-rear",
    caption: "Каталка на подъёмнике",
    alt: "Каталка на подъёмной платформе у открытых задних дверей Mercedes Sprinter",
  },
  {
    name: "medtaxi-lift-side",
    caption: "Подъёмник — вид сбоку",
    alt: "Каталка на платформе подъёмника Mercedes Sprinter — вид сбоку",
  },
] as const;

const sizes = "(min-width: 480px) 448px, calc(100vw - 32px)";

export function SprinterGallery() {
  return (
    <VehicleGallery
      ariaLabel="Фотографии Mercedes Sprinter"
      theme="light"
      imageAspectRatio="3 / 4"
      photos={photos.map((photo) => ({
        id: photo.name,
        caption: photo.caption,
        image: (
          <picture>
            <img
              src={`/donetsk/sprinter/${photo.name}-960.webp`}
              srcSet={`/donetsk/sprinter/${photo.name}-480.webp 480w, /donetsk/sprinter/${photo.name}-960.webp 960w`}
              sizes={sizes}
              width={960}
              height={1280}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ),
      }))}
    />
  );
}
