const YANDEX_METRIKA_ID = 108491610;

type GoalParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "reachGoal",
      goal: string,
      params?: GoalParams,
    ) => void;
  }
}

export const trackDonetskGoal = (goal: string, params: GoalParams = {}) => {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;

  window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, {
    page: "/donetsk",
    ...params,
  });
};
