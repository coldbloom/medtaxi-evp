"use client";

import { useCallback, useEffect, useReducer } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType {
  const [, refreshButtonState] = useReducer((version: number) => version + 1, 0);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("reInit", refreshButtonState).on("select", refreshButtonState);

    return () => {
      emblaApi
        .off("reInit", refreshButtonState)
        .off("select", refreshButtonState);
    };
  }, [emblaApi]);

  const prevBtnDisabled = emblaApi ? !emblaApi.canScrollPrev() : true;
  const nextBtnDisabled = emblaApi ? !emblaApi.canScrollNext() : true;

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}
