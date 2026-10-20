"use client";

import { useEffect } from "react";

const owners = new Set<symbol>();
let restore: (() => void) | undefined;

/** Share the lock so closing a menu cannot unlock an open contact dialog. */
export function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;
    const owner = Symbol("scroll-lock");
    if (owners.size === 0) {
      const { scrollX, scrollY } = window;
      const pathname = window.location.pathname;
      const { style } = document.body;
      const previous = { overflow: style.overflow, position: style.position, top: style.top, left: style.left, width: style.width };
      Object.assign(style, { overflow: "hidden", position: "fixed", top: `-${scrollY}px`, left: `-${scrollX}px`, width: "100%" });
      restore = () => {
        Object.assign(style, previous);
        if (window.location.pathname === pathname) window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      };
    }
    owners.add(owner);
    return () => {
      owners.delete(owner);
      if (owners.size === 0) {
        restore?.();
        restore = undefined;
      }
    };
  }, [isOpen]);
}
