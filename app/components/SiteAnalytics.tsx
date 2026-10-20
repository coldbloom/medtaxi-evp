import { Suspense } from "react";
import Script from "next/script";
import { YANDEX_METRIKA_ID } from "@/app/lib/metrika";
import { MetrikaPageViews } from "./tracking/MetrikaPageViews";

export function SiteAnalytics() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function (w, d) {
            var src = "https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}";
            w.ym = w.ym || function () {
              (w.ym.a = w.ym.a || []).push(arguments);
            };
            w.ym.l = w.ym.l || Date.now();

            function load() {
              if (d.getElementById("yandex-metrika-script")) return;
              for (var i = 0; i < d.scripts.length; i++) {
                if (d.scripts[i].src === src) return;
              }
              var script = d.createElement("script");
              script.id = "yandex-metrika-script";
              script.async = true;
              script.src = src;
              d.head.appendChild(script);
            }

            function schedule() {
              if (typeof w.requestIdleCallback === "function") {
                w.requestIdleCallback(load, { timeout: 2000 });
              } else {
                w.setTimeout(load, 0);
              }
            }

            // Queue goals immediately; defer the library until the landing has loaded.
            if (w.location.pathname === "/donetsk" || w.location.pathname === "/donetsk/") {
              if (d.readyState === "complete") schedule();
              else w.addEventListener("load", schedule, { once: true });
            } else {
              load();
            }
          })(window, document);
        `}
      </Script>
      {/* Only this empty observer uses search params; page HTML stays server-rendered. */}
      <Suspense fallback={null}>
        <MetrikaPageViews />
      </Suspense>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- Tracking pixel must request Yandex directly when JavaScript is disabled. */}
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            width={1}
            height={1}
            style={{ position: "absolute", left: -9999 }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
