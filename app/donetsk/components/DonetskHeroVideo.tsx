import { preload } from "react-dom";
import { donetskHeroVideo } from "../video.generated";

const { poster, mobile, desktop } = donetskHeroVideo;
const MOBILE_MEDIA = "(max-width: 767px)";

// A native player keeps the video usable without hydration or a player library.
export function DonetskHeroVideo() {
  // On smaller screens the player follows the hero copy, below the first screen.
  preload(poster.src, {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
    media: "(min-width: 1024px)",
  });

  return (
    <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#20332c] shadow-[0_35px_80px_rgba(0,0,0,.35)] sm:rounded-[2.5rem]">
      <video
        width={desktop.width}
        height={desktop.height}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        poster={poster.src}
        aria-label="Погрузка каталки на подъёмнике автомобиля"
        aria-describedby="donetsk-hero-video-caption"
        className="block aspect-[9/16] h-auto w-full bg-[#10211d] object-contain"
      >
        <source src={mobile.webm.src} type="video/webm" media={MOBILE_MEDIA} />
        <source src={mobile.mp4.src} type="video/mp4" media={MOBILE_MEDIA} />
        <source src={desktop.webm.src} type="video/webm" />
        <source src={desktop.mp4.src} type="video/mp4" />
        Ваш браузер не поддерживает видео. <a href={mobile.mp4.src}>Открыть ролик о погрузке каталки</a>.
      </video>
      <figcaption id="donetsk-hero-video-caption" className="px-5 py-4 text-sm leading-relaxed text-[#e0ebe6]">
        <span className="block font-extrabold text-[#f3b941]">Погрузка на подъёмнике</span>
        Наш транспорт для перевозок по Донецку и ДНР
        <span className="mt-2 block text-xs text-[#b9cec6]">
          Видео без звука.{" "}
          <a href={mobile.mp4.src} className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b941]">
            Открыть видео отдельно
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
