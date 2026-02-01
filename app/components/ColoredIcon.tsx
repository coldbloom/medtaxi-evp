"use client";

import { useEffect, useRef, useState } from "react";

interface ColoredIconProps {
  src: string;
  alt: string;
  color?: string;
  size?: number;
  className?: string;
}

/**
 * Компонент для отображения SVG иконок с возможностью изменения цвета
 * Загружает SVG и применяет цвет через CSS переменные
 */
export default function ColoredIcon({
  src,
  alt,
  color = "#2563eb",
  size = 24,
  className = "",
}: ColoredIconProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        // Заменяем fill="white" на currentColor для возможности изменения через CSS
        const modifiedSvg = text.replace(/fill="[^"]*"/g, 'fill="currentColor"');
        setSvgContent(modifiedSvg);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [src]);

  if (isLoading) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`inline-block ${className}`}
        aria-label={alt}
      />
    );
  }

  return (
    <span
      className={`inline-block ${className}`}
      style={{ color, width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt}
    />
  );
}
