"use client";

import { Carousel } from "@/app/components/Carousel";
import type { EmblaOptionsType } from "embla-carousel";

import type { ReviewItem } from "./Reviews";

interface ReviewsCarouselProps {
  items: ReviewItem[];
}

const OPTIONS: EmblaOptionsType = { loop: true };

export function ReviewsCarousel({ items }: ReviewsCarouselProps) {
  const slides = items.map((review, index) => (
    <article
      key={index}
      className="flex h-full flex-col rounded-lg bg-white p-6 shadow-md"
    >
      <div className="mb-4 flex items-center">
        <span className="text-2xl text-yellow-400" aria-hidden>
          ★★★★★
        </span>
      </div>
      <p className="mb-4 flex-1 italic text-gray-700">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="font-semibold text-gray-600">— {review.author}</p>
    </article>
  ));

  return (
    <Carousel
      slides={slides}
      options={OPTIONS}
      showArrows
      hideArrowsOnMobile={true}
      slideClassName="flex-[0_0_auto] min-w-0 w-full sm:w-[85%] md:w-[70%] lg:max-w-md shrink-0 snap-start px-2 md:px-4"
      ariaLabel="Отзывы клиентов"
    />
  );
}
