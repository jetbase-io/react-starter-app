import { useMutation } from "@tanstack/react-query";
import { useTypedDispatch } from "../useTypedDispatch";
import User from "../../services/api/User";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  const dispatch = useTypedDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: User.resetPassword,
    onSuccess: async () => {
      toast.success("Password updated!");

      dispatch.user.logOutUser();
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
