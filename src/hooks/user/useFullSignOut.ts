import { useMutation } from "@tanstack/react-query";
import { useTypedDispatch } from "../useTypedDispatch";
import User from "../../services/api/User";

export const useFullSignOut = () => {
  const dispatch = useTypedDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: User.fullSignOut,
    onSuccess: () => {
      dispatch.user.logOutUser();
    },
  });

  return {
    isPending,
    mutate,
  };
};
