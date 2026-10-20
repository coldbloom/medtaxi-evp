import { initializeMetrika, YANDEX_METRIKA_ID, type GoalParams } from "@/app/lib/metrika";

export const trackDonetskGoal = (goal: string, params: GoalParams = {}) => {
  if (typeof window === "undefined") return;

  initializeMetrika()(YANDEX_METRIKA_ID, "reachGoal", goal, {
    page: "/donetsk",
    ...params,
  });
};
