"use client";

import type { ComponentPropsWithRef } from "react";
import { useCallback, useEffect, useReducer } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export function useDotButton(
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType {
  const [, refreshCarouselState] = useReducer((version: number) => version + 1, 0);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi
      .on("reInit", refreshCarouselState)
      .on("select", refreshCarouselState);

    return () => {
      emblaApi
        .off("reInit", refreshCarouselState)
        .off("select", refreshCarouselState);
    };
  }, [emblaApi]);

  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;
  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
}

type DotButtonProps = ComponentPropsWithRef<"button">;

export function DotButton(props: DotButtonProps) {
  const { children, ...rest } = props;
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}
