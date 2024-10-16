import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
  cleanUserTokensFromLocalStorage,
  getIsAuthenticated,
} from '../helpers/user'

import { STRIPE_INACTIVE_STATUS } from './constants/stripe-constants'

type UserState = {
  isAuthenticated: boolean
  isSignedUp: boolean
  isConfirmed: boolean
  subscription: { nickname: string; status: string }
}

type UserActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsSignedUp: (isSuccessful: boolean) => void
  setIsConfirmed: (isSuccessful: boolean) => void
  setSubscription: (subscription: { nickname: string; status: string }) => void
  logOutUser: () => void
}

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    immer(set => ({
      isAuthenticated: getIsAuthenticated(),
      isSignedUp: false,
      isConfirmed: false,
      subscription: { nickname: '', status: STRIPE_INACTIVE_STATUS },

      setIsAuthenticated: isAuthenticated =>
        set(() => ({
          isAuthenticated,
        })),

      setIsSignedUp: isSuccessful =>
        set(() => ({
          isSignedUp: isSuccessful,
        })),

      setIsConfirmed: isSuccessful =>
        set(() => ({
          isConfirmed: isSuccessful,
        })),

      setSubscription: subscription =>
        set(() => ({
          subscription,
        })),

      logOutUser: () => {
        set(state => {
          cleanUserTokensFromLocalStorage()

          return { ...state, isAuthenticated: false }
        })
      },
    })),
  ),
)
