import { useMutation } from "@tanstack/react-query";
import { useTypedDispatch } from "../useTypedDispatch";
import User from "../../services/api/User";

export const useSignOut = () => {
  const dispatch = useTypedDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: User.signOut,
    onSuccess: () => {
      dispatch.user.logOutUser();
    },
  });

  return {
    isPending,
    mutate,
  };
};
