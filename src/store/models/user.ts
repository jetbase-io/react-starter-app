import { createModel } from "@rematch/core";

import history from "../../helpers/history";
import {
  cleanUserTokensFromLocalStorage,
  getAccessToken,
  getIsAuthenticated,
  getRefreshToken,
} from "../../helpers/user";

import { SIGN_IN_ROUTE } from "../constants/route-constants";
import { STRIPE_INACTIVE_STATUS } from "../constants/stripe-constants";

import type { RootModel } from "./index";

type UserState = {
  isAuthenticated: boolean;
  isSignedUp: boolean;
  isConfirmed: boolean;
  accessToken: "";
  refreshToken: "";
  subscription: { nickname: string; status: string };
};

export const user = createModel<RootModel>()({
  state: {
    isAuthenticated: getIsAuthenticated(),
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    isSignedUp: false,
    isConfirmed: false,
    subscription: { nickname: "", status: STRIPE_INACTIVE_STATUS },
  } as UserState,
  reducers: {
    setIsAuthenticated(state, { isAuthenticated }) {
      return {
        ...state,
        isAuthenticated,
      } as UserState;
    },

    setIsSignedUp(state, isSuccessful) {
      return {
        ...state,
        isSignedUp: isSuccessful,
      };
    },

    setIsConfirmed(state, isSuccessful) {
      return {
        ...state,
        isConfirmed: isSuccessful,
      };
    },

    setTokens(state, { accessToken, refreshToken }) {
      return {
        ...state,
        accessToken,
        refreshToken,
      };
    },

    setSubscription(state, subscription) {
      return {
        ...state,
        subscription,
      };
    },
  },
  effects: (dispatch) => ({
    logOutUser() {
      dispatch.user.setIsAuthenticated({ isAuthenticated: false });
      cleanUserTokensFromLocalStorage();
      history.push(SIGN_IN_ROUTE);
    },
  }),
});
