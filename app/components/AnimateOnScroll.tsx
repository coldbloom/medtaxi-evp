"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400;
  direction?: "fade" | "up" | "down" | "left" | "right";
}

/**
 * Легковесный компонент для анимации при скролле
 * HTML виден сразу. Анимацию включаем после гидратации только ниже экрана.
 */
export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "fade",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already painted content must never disappear when JavaScript arrives late.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        element.classList.remove("animate-pending");
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Without a working observer the default, visible HTML is left untouched.
    observer.observe(element);
    element.classList.add("animate-pending");

    return () => {
      observer.disconnect();
      element.classList.remove("animate-pending");
    };
  }, []);

  // CSS классы для направления и задержки
  const directionClass = `animate-${direction}`;
  const delayClass = delay > 0 ? `animate-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${directionClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
