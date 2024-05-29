import { useMutation } from "@tanstack/react-query";
import User from "../../services/api/User";
import { toast } from "react-toastify";
import { useTypedDispatch } from "../useTypedDispatch";

export const useSignUp = () => {
  const dispatch = useTypedDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: User.signUp,
    onSuccess: (message) => {
      toast.success(message);

      dispatch.user.setIsSignedUp(true);
    },
    onError: ({ message }) => {
      toast.error(message?.toString());
    },
  });

  return {
    isPending,
    mutate,
  };
};
