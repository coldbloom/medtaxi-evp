"use client";

import type { ReactNode } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton, DotButton } from "./useDotButton";
import { usePrevNextButtons } from "./usePrevNextButtons";
import cn from "clsx";

export type CarouselProps = {
  /** Слайды — любые React-узлы (картинки, карточки, текст и т.д.) */
  slides: ReactNode[];
  /** Опции Embla (loop, align, dragFree и т.д.) */
  options?: EmblaOptionsType;
  /** Класс корневого контейнера */
  className?: string;
  /** Класс обёртки каждого слайда (размер слайда задаётся здесь или контентом) */
  slideClassName?: string;
  /** Показывать стрелки */
  showArrows?: boolean;
  /** Скрыть стрелки на экранах уже 768px (по умолчанию true) */
  hideArrowsOnMobile?: boolean;
  /** Показывать точки */
  showDots?: boolean;
  /** aria-label для контейнера слайдов */
  ariaLabel?: string;
};

const defaultSlideClassName =
  "flex-[0_0_auto] min-w-0 w-full sm:w-[85%] md:w-[70%] lg:w-[400px] shrink-0 snap-start";

export function Carousel({
  slides,
  options,
  className,
  slideClassName = defaultSlideClassName,
  showArrows = false,
  hideArrowsOnMobile = true,
  showDots = true,
  ariaLabel = "Карусель",
}: CarouselProps) {
  const arrowsVisibleClass = hideArrowsOnMobile ? "flex max-md:hidden" : "flex";
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className={cn("relative w-full", className)}>
      {showArrows && (
        <>
          <button
            type="button"
            onClick={onPrevButtonClick}
            className={cn(
              "absolute left-2 top-1/2 z-10 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:left-4",
              arrowsVisibleClass
            )}
            aria-label="Предыдущий слайд"
          >
            <span className="h-3 w-3 rotate-45 border-l-2 border-b-2 border-gray-600" />
          </button>
          <button
            type="button"
            onClick={onNextButtonClick}
            className={cn(
              "absolute right-2 top-1/2 z-10 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:right-4",
              arrowsVisibleClass
            )}
            aria-label="Следующий слайд"
          >
            <span className="h-3 w-3 rotate-45 border-r-2 border-t-2 border-gray-600" />
          </button>
        </>
      )}

      <div className="overflow-hidden pb-8" ref={emblaRef} aria-label={ariaLabel}>
        <div className="flex touch-pan-y gap-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(slideClassName, "snap-start")}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showDots && scrollSnaps.length > 0 && (
        <div className="flex justify-center gap-3">
          {scrollSnaps.map((_, i) => (
            <DotButton
              key={i}
              onClick={() => onDotButtonClick(i)}
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === selectedIndex}
              className={cn(
                "h-3.5 w-3.5 rounded-full border-0 p-0 transition-colors",
                i === selectedIndex ? "bg-blue-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
