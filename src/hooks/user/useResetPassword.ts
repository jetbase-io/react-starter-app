import { useMutation } from "@tanstack/react-query";

import User from "../../services/api/User";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/useUserStore";

export const useResetPassword = () => {
  const logOutUser = useUserStore((state) => state.logOutUser);

  const { isPending, mutate } = useMutation({
    mutationFn: User.resetPassword,
    onSuccess: async () => {
      toast.success("Password updated!");

      logOutUser();
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
