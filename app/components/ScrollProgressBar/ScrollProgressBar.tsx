import type { CSSProperties } from "react";
import styles from "./ScrollProgressBar.module.css";

/** Настройки декоративного индикатора прокрутки всей страницы. */
export type ScrollProgressBarProps = {
  /** Цвет заполнения: любой CSS-цвет. По умолчанию — основной синий сайта. */
  color?: CSSProperties["color"];
  /** Толщина полосы в пикселях. По умолчанию — 3 px. */
  height?: number;
  /** Классы внешнего контейнера: например sticky top-0 z-30 и цвет фона дорожки. */
  className?: string;
};

/**
 * Серверный компонент: прогресс вычисляет CSS, без useEffect и scroll-listener.
 * Позиционирование задаётся через className, а заполняется только внутренний div.
 * Чтобы закрепить только полосу, разместите её ПОСЛЕ header, внутри контейнера
 * всей страницы: sticky ограничен высотой родителя, поэтому внутри шапки уйдёт с ней.
 *
 * Индикатор декоративный: не добавляем role="progressbar" с неактуальным
 * aria-valuenow и не отвлекаем скринридер объявлениями при каждой прокрутке.
 */
export function ScrollProgressBar({
  color = "#2563eb",
  height = 3,
  className = "",
}: ScrollProgressBarProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.progress} ${className}`.trim()}
      style={{ color, height }}
    >
      <div className={styles.fill} />
    </div>
  );
}
