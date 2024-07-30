import { useMutation } from "@tanstack/react-query";

import User from "../../services/api/User";
import { toast } from "react-toastify";

export const useActivateSubscription = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: User.activateSubscription,
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    isPending,
    mutate,
  };
};
