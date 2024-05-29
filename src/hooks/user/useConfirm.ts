import { useMutation } from "@tanstack/react-query";
import { useTypedDispatch } from "../useTypedDispatch";
import User from "../../services/api/User";
import { toast } from "react-toastify";

export const useConfirm = () => {
  const dispatch = useTypedDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: User.confirm,
    onSuccess: async (message) => {
      toast.success(message);

      dispatch.user.setIsConfirmed(true);
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
