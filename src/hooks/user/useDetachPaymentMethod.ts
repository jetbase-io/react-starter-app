import { useMutation, useQueryClient } from "@tanstack/react-query";

import User from "../../services/api/User";
import { toast } from "react-toastify";
import { CacheKeys } from "../../constants/cacheKeys";
import { PaymentMethodsT } from "../../services/api/User/types";

export const useDetachPaymentMethod = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: User.detachPaymentMethod,
    onSuccess: (paymentMethods) => {
      queryClient.setQueryData<PaymentMethodsT[]>(
        [CacheKeys.PAYMENT_METHODS],
        paymentMethods
      );

      toast.success("Card was detached successfully!");
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
