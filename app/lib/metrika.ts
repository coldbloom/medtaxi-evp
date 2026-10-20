export const YANDEX_METRIKA_ID = 108491610;

export type GoalParams = Record<string, string | number | boolean>;

type HitOptions = { title: string; referer: string };
type InitOptions = {
  defer: true;
  ssr: true;
  webvisor: true;
  clickmap: true;
  ecommerce: string;
  referrer: string;
  url: string;
  accurateTrackBounce: true;
  trackLinks: true;
};
type MetrikaCommand =
  | [counterId: number, method: "init", options: InitOptions]
  | [counterId: number, method: "hit", url: string, options: HitOptions]
  | [counterId: number, method: "reachGoal", goal: string, params?: GoalParams];

type Metrika = {
  (...args: MetrikaCommand): void;
  a?: MetrikaCommand[];
  l?: number;
};

declare global {
  interface Window {
    ym?: Metrika;
    /** Page-lifetime state also survives Strict Mode effect remounts. */
    __medtaxiMetrika?: { initialized: boolean; lastUrl?: string };
  }
}

/** Keep campaign attribution intact; in-page anchor navigation is not a new view. */
function metrikaPageUrl(value: string, base: string): string {
  const url = new URL(value, base);
  url.hash = "";
  return url.href;
}

/** Both the route observer and the tag bootstrap may create the same queue first. */
function getMetrika(): Metrika {
  if (window.ym) return window.ym;
  const queue: Metrika = (...args) => {
    (queue.a ??= []).push(args);
  };
  queue.l = Date.now();
  window.ym = queue;
  return queue;
}

/** Goals may run before the route effect or afterInteractive bootstrap. */
export function initializeMetrika(path = window.location.href): Metrika {
  const ym = getMetrika();
  const state = window.__medtaxiMetrika ??= { initialized: false };
  const url = metrikaPageUrl(path, window.location.origin);

  if (!state.initialized) {
    // Initialization never sends an automatic view; this observer owns all hits.
    ym(YANDEX_METRIKA_ID, "init", {
      defer: true,
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url,
      accurateTrackBounce: true,
      trackLinks: true,
    });
    state.initialized = true;
  }
  return ym;
}

export function recordMetrikaPageView(path: string, title: string) {
  const ym = initializeMetrika(path);
  const state = window.__medtaxiMetrika!;
  const url = metrikaPageUrl(path, window.location.origin);
  if (state.lastUrl === url) return;
  ym(YANDEX_METRIKA_ID, "hit", url, {
    title,
    referer: state.lastUrl || document.referrer,
  });
  state.lastUrl = url;
}
