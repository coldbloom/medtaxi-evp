"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400;
  direction?: "fade" | "up" | "down" | "left" | "right";
}

/**
 * Легковесный компонент для анимации при скролле
 * Использует CSS-first подход - все анимации в CSS, JS только добавляет класс
 * Полностью безопасен для SEO/SSR - контент виден на сервере
 */
export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "fade",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Проверяем, поддерживает ли пользователь уменьшенную анимацию
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Если пользователь предпочитает уменьшенную анимацию, пропускаем
    if (prefersReducedMotion) {
      ref.current.classList.add("visible");
      return;
    }

    let observer: IntersectionObserver | null = null;

    // Небольшая задержка для применения начального состояния
    const timeoutId = setTimeout(() => {
      if (!ref.current) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && ref.current) {
              // Просто добавляем класс - вся анимация в CSS
              ref.current.classList.add("visible");
              if (observer) {
                observer.unobserve(ref.current);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      if (ref.current) {
        // Проверяем, виден ли элемент сразу (для элементов выше fold)
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          // Если элемент уже виден, добавляем класс с небольшой задержкой
          setTimeout(() => {
            if (ref.current) {
              ref.current.classList.add("visible");
            }
          }, 100);
        } else {
          // Если элемент не виден, наблюдаем за ним
          observer.observe(ref.current);
        }
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (observer && ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, []);

  // CSS классы для направления и задержки
  const directionClass = `animate-${direction}`;
  const delayClass = delay > 0 ? `animate-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${directionClass} ${delayClass} ${className}`}
      // Контент виден на сервере (opacity: 0 только для анимации, не скрывает от SEO)
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
