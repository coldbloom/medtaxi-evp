import { Carousel } from "@/app/components/Carousel/Carousel";
import { MercedesImage, mercedesPhotos } from "./MercedesImage";
import styles from "./MercedesGallery.module.css";

type MercedesGalleryProps = {
  priority?: boolean;
};

// Slides stay server-rendered; only the existing Carousel hydrates for navigation.
export function MercedesGallery({ priority = false }: MercedesGalleryProps) {
  return (
    <div
      className={styles.gallery}
      role="region"
      aria-roledescription="карусель"
      aria-label="Фотографии нашего транспорта"
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
        slides={mercedesPhotos.map((photo, index) => (
          <figure key={photo.name} className={styles.slide}>
            <div className={styles.imageFrame}>
              <MercedesImage
                name={photo.name}
                alt={photo.alt}
                sizes="(min-width: 1280px) 585px, (min-width: 1024px) 44vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                priority={priority && index === 0}
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>
              <span>{photo.caption}</span>
              <span className={styles.counter} aria-label={`Фото ${index + 1} из ${mercedesPhotos.length}`}>
                {String(index + 1).padStart(2, "0")} / {String(mercedesPhotos.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      />
    </div>
  );
}
