import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { setChosenPlan } from "../helpers/plan";

type PlanState = {
  chosenPlan: {
    id: string;
    nickname?: string;
    amount: number;
  };
};

type PlanActions = {
  setChosenPlan: (
    planId: string,
    plans: { id: string; nickname?: string; amount: number }[]
  ) => void;
};

export const usePlanStore = create<PlanState & PlanActions>()(
  devtools(
    immer((set) => ({
      chosenPlan: {
        id: "",
        nickname: undefined,
        amount: 0,
      },

      setChosenPlan: (planId, plans) =>
        set((state) => {
          const chosenPlan = plans.find(({ id }) => id === planId) || {
            id: "",
            nickname: undefined,
            amount: 0,
          };

          setChosenPlan(chosenPlan);

          state.chosenPlan = chosenPlan;
        }),
    }))
  )
);
