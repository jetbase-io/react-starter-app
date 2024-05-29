import { useMutation } from "@tanstack/react-query";
import User from "../../services/api/User";
import { toast } from "react-toastify";
import history from "../../helpers/history";
import { HOME_ROUTE } from "../../store/constants/route-constants";

export const useUpdateUserAvatar = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: User.updateUserAvatar,
    onSuccess: () => {
      toast.success(`User Profile picture is updated!`);

      history.push(HOME_ROUTE);
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
