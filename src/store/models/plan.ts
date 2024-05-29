import { createModel } from "@rematch/core";

import { setChosenPlan } from "../../helpers/plan";

import type { RootModel } from "./index";

type PlanState = {
  chosenPlan: {
    id: string;
    nickname?: string;
    amount: number;
  };
};

export const plan = createModel<RootModel>()({
  state: {
    chosenPlan: {},
  } as PlanState,
  reducers: {
    setChosenPlan(state, { planId, plans }: { planId: string; plans: [] }) {
      const chosenPlan = plans.find(({ id }) => id === planId);

      setChosenPlan(chosenPlan || {});

      return {
        ...state,
        chosenPlan,
      } as unknown as PlanState;
    },
  },
});
