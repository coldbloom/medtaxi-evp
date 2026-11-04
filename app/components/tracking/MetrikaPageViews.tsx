"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { recordMetrikaPageView } from "@/app/lib/metrika";
import { trackSitePageView } from "@/app/lib/siteAnalytics";

/** Observe committed App Router navigation, including browser back and forward. */
export function MetrikaPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const path = `${pathname}${search ? `?${search}` : ""}`;
    trackSitePageView(path);
    try { recordMetrikaPageView(path, document.title); } catch { /* Independent providers. */ }
  }, [pathname, search]);

  return null;
}
