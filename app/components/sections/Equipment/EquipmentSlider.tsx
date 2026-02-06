"use client";

import Image from "next/image";
import { Carousel } from "@/app/components/Carousel";
import type { EmblaOptionsType } from "embla-carousel";
import type { EquipmentItem } from "./Equipment";

export type EquipmentSliderProps = {
  items: EquipmentItem[];
};

const CAROUSEL_OPTIONS: EmblaOptionsType = { loop: true };

const SLIDE_CLASS =
  "flex-[0_0_auto] min-w-0 w-full sm:w-[85%] md:w-[70%] lg:max-w-md shrink-0 snap-start px-2";

export function EquipmentSlider({ items }: EquipmentSliderProps) {
  const slides = items.map((item, index) => (
    <figure
      key={index}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 70vw, 400px"
          className="object-cover"
        />
      </div>
      <figcaption className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </figcaption>
    </figure>
  ));

  return (
    <Carousel
      slides={slides}
      options={CAROUSEL_OPTIONS}
      showArrows
      hideArrowsOnMobile
      slideClassName={SLIDE_CLASS}
      ariaLabel="Оборудование для перевозки лежачих больных"
    />
  );
}
