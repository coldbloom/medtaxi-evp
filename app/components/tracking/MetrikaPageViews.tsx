"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { recordMetrikaPageView } from "@/app/lib/metrika";

/** Observe committed App Router navigation, including browser back and forward. */
export function MetrikaPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    recordMetrikaPageView(`${pathname}${search ? `?${search}` : ""}`, document.title);
  }, [pathname, search]);

  return null;
}
