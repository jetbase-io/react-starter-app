import { useMutation } from "@tanstack/react-query";
import { useTypedDispatch } from "../useTypedDispatch";
import User from "../../services/api/User";
import { toast } from "react-toastify";
import { setUserTokensToLocalStorage } from "../../helpers/user";

export const useSignIn = () => {
  const dispatch = useTypedDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: User.signIn,
    onSuccess: async (data) => {
      dispatch.user.setIsAuthenticated({ isAuthenticated: true });

      if (data) {
        dispatch.user.setTokens(data);

        setUserTokensToLocalStorage(data.accessToken, data.refreshToken);

        const subscription = await User.checkSubscription();

        dispatch.user.setSubscription(subscription);
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    isPending,
    mutate,
  };
};
