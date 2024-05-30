import { create } from "zustand";
import { devtools } from "zustand/middleware";
import history from "../helpers/history";
import {
  cleanUserTokensFromLocalStorage,
  getIsAuthenticated,
} from "../helpers/user";
import { immer } from "zustand/middleware/immer";

import { SIGN_IN_ROUTE } from "./constants/route-constants";
import { STRIPE_INACTIVE_STATUS } from "./constants/stripe-constants";

type UserState = {
  isAuthenticated: boolean;
  isSignedUp: boolean;
  isConfirmed: boolean;
  subscription: { nickname: string; status: string };
};

type UserActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsSignedUp: (isSuccessful: boolean) => void;
  setIsConfirmed: (isSuccessful: boolean) => void;
  setSubscription: (subscription: { nickname: string; status: string }) => void;
  logOutUser: () => void;
};

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    immer((set) => ({
      isAuthenticated: getIsAuthenticated(),
      isSignedUp: false,
      isConfirmed: false,
      subscription: { nickname: "", status: STRIPE_INACTIVE_STATUS },

      setIsAuthenticated: (isAuthenticated) =>
        set((state) => {
          state.isAuthenticated = isAuthenticated;
        }),

      setIsSignedUp: (isSuccessful) =>
        set((state) => {
          state.isSignedUp = isSuccessful;
        }),

      setIsConfirmed: (isSuccessful) =>
        set((state) => {
          state.isConfirmed = isSuccessful;
        }),

      setSubscription: (subscription) =>
        set((state) => {
          state.subscription = subscription;
        }),

      logOutUser: () => {
        set((state) => {
          state.isAuthenticated = false;
        });
        cleanUserTokensFromLocalStorage();
        history.push(SIGN_IN_ROUTE);
      },
    }))
  )
);
