import type { ReactNode } from "react";
import { Carousel } from "@/app/components/Carousel/Carousel";
import styles from "./VehicleGallery.module.css";

type VehicleGalleryPhoto = {
  id: string;
  caption: string;
  image: ReactNode;
};

type VehicleGalleryProps = {
  photos: readonly VehicleGalleryPhoto[];
  ariaLabel: string;
  theme?: "dark" | "light";
  imageAspectRatio?: "4 / 3" | "3 / 4";
};

// Image markup stays on the server; both vehicle galleries share the existing Carousel.
export function VehicleGallery({ photos, ariaLabel, theme = "dark", imageAspectRatio }: VehicleGalleryProps) {
  return (
    <div
      className={`${styles.gallery} ${theme === "light" ? styles.light : ""}`}
      role="region"
      aria-roledescription="карусель"
      aria-label={ariaLabel}
    >
      <Carousel
        className={styles.carousel}
        slideClassName="min-w-0 flex-[0_0_100%] shrink-0"
        options={{
          loop: true,
          align: "start",
          breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
        }}
        showArrows
        hideArrowsOnMobile={false}
        showDots={false}
        ariaLabel="Автомобиль и салон"
        slides={photos.map((photo, index) => (
          <figure key={photo.id} className={styles.slide}>
            <div className={styles.imageFrame} style={imageAspectRatio ? { aspectRatio: imageAspectRatio } : undefined}>{photo.image}</div>
            <figcaption className={styles.caption}>
              <span>{photo.caption}</span>
              <span className={styles.counter} aria-label={`Фото ${index + 1} из ${photos.length}`}>
                {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      />
    </div>
  );
}
