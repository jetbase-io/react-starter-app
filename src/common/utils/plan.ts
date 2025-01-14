import { empyChoosenPlan } from '../constants'
import type { IPlan } from '../types/plan.types'

export const setChosenPlan = (chosenPlan: {}) => {
  localStorage.setItem('chosenPlan', JSON.stringify(chosenPlan))
}

export const getChosenPlan = (): IPlan => {
  const res: IPlan | null = JSON.parse(localStorage.getItem('chosenPlan') || '')

  return res ?? empyChoosenPlan
}
