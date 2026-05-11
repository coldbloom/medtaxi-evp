"use client";

import { useRef, useEffect } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * Аккордеон на нативных <details>/<summary>.
 * Контент всегда в DOM при SSR — индексируется поисковиками.
 * JS только добавляет поведение «только один пункт открыт».
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const detailsList = container.querySelectorAll<HTMLDetailsElement>("details");

    const handleToggle = (e: Event) => {
      const target = e.target as HTMLDetailsElement;
      if (!target.open) return;
      detailsList.forEach((el) => {
        if (el !== target) el.open = false;
      });
    };

    detailsList.forEach((el) => el.addEventListener("toggle", handleToggle));
    return () =>
      detailsList.forEach((el) => el.removeEventListener("toggle", handleToggle));
  }, [items.length]);

  return (
    <div ref={containerRef} className="space-y-2" role="list">
      {items.map((item, index) => (
        <details
          key={index}
          className="group border border-gray-200 rounded-lg bg-gray-50/50 overflow-hidden"
          role="listitem"
        >
          <summary className="flex items-center gap-3 cursor-pointer list-none py-4 px-5 text-left text-lg font-semibold text-gray-900 hover:bg-gray-100/80 transition-colors [&::-webkit-details-marker]:hidden">
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold"
              aria-hidden
            >
              {index + 1}
            </span>
            <span className="flex-1">{item.question}</span>
            <span
              className="flex-shrink-0 w-6 h-6 text-gray-400 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="pb-4 px-5 pl-14 text-gray-600 border-t border-gray-100 pt-2">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
