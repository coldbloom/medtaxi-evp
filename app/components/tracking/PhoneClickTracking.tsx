"use client";

import { useEffect } from "react";
import { initializeCallTracking, trackPhoneClick } from "@/app/lib/callTracking";

/** Один listener для всех ссылок, включая появляющиеся позже в модальном окне. */
export function PhoneClickTracking() {
  useEffect(() => {
    initializeCallTracking();

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      // closest находит ссылку даже при клике по вложенной иконке или span.
      //*** .closest(...) — метод DOM, который поднимается от event.target вверх по дереву (к родителям, дедушкам и т.д.) и возвращает ближайший элемент, удовлетворяющий CSS-селектору. Если ничего не найдено — возвращает null. ***//
      //*** 'a[href^="tel:"]' — CSS-селектор: То есть селектор ищет ссылки вида <a href="tel:+79991234567"> ***//
      const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;

      //*** getAttribute — это метод DOM, который возвращает значение указанного HTML-атрибута у элемента в виде строки (или null, если атрибута нет). ***//
      //*** link.getAttribute("href") — берёт значение атрибута href у ссылки. Для <a href="tel:+79991234567"> вернёт строку "tel:+79991234567" ***//
      const phone = link.getAttribute("href")?.slice(4);
      if (!phone) return;
      // Новая необёрнутая tel:-ссылка тоже учитывается, но с пометкой unlabelled.
      trackPhoneClick(link.dataset.callTrackingId || "unlabelled", phone);
      // preventDefault и ожидания ответа здесь нет: браузер сам открывает телефон.
    };

    // Capture ловит также клики в компонентах, которые останавливают bubbling.
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []); // Cleanup гарантирует один listener при повторном effect в Strict Mode.

  return null;
}
