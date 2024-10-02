/* eslint-disable no-param-reassign */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { setChosenPlan } from '../helpers/plan'
import type { IPlan } from '../types/plan.types'

type PlanState = {
  chosenPlan: IPlan
}

type PlanActions = {
  setChosenPlan: (planId: string, plans: IPlan[]) => void
}

export const usePlanStore = create<PlanState & PlanActions>()(
  devtools(
    immer(set => ({
      chosenPlan: {
        id: '',
        nickname: undefined,
        amount: 0,
      },

      setChosenPlan: (planId, plans) =>
        set(state => {
          const chosenPlan = plans.find(({ id }) => id === planId) || {
            id: '',
            nickname: undefined,
            amount: 0,
          }

          setChosenPlan(chosenPlan)

          state.chosenPlan = chosenPlan
        }),
    })),
  ),
)
