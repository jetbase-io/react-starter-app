import User from "../../services/api/User";
import { CacheKeys } from "../../constants/cacheKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentMethods = () => {
  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.PAYMENT_METHODS],
    queryFn: User.getPaymentMethods,
  });

  return { isLoading, paymentMethods: data || [] };
};
