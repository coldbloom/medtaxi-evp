import { VehicleGallery } from "../components/VehicleGallery";
import { MercedesImage, mercedesPhotos } from "./MercedesImage";

type MercedesGalleryProps = {
  priority?: boolean;
};

export function MercedesGallery({ priority = false }: MercedesGalleryProps) {
  return (
    <VehicleGallery
      ariaLabel="Фотографии нашего транспорта"
      photos={mercedesPhotos.map((photo, index) => ({
        id: photo.name,
        caption: photo.caption,
        image: (
          <MercedesImage
            name={photo.name}
            alt={photo.alt}
            sizes="(min-width: 1280px) 585px, (min-width: 1024px) 44vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
            priority={priority && index === 0}
          />
        ),
      }))}
    />
  );
}
