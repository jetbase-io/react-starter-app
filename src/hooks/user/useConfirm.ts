import { useMutation } from "@tanstack/react-query";

import User from "../../services/api/User";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/useUserStore";

export const useConfirm = () => {
  const setIsConfirmed = useUserStore((state) => state.setIsAuthenticated);

  const { isPending, mutate } = useMutation({
    mutationFn: User.confirm,
    onSuccess: async (message) => {
      toast.success(message);

      setIsConfirmed(true);
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
