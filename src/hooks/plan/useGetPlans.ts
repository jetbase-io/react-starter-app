import { CacheKeys } from "../../constants/cacheKeys";
import { useQuery } from "@tanstack/react-query";
import Plan from "../../services/api/Plan";
import { useTypedSelector } from "../useTypeSelector";

export const useGetPlans = () => {
  const isAuthenticated = useTypedSelector(
    (state) => state.user.isAuthenticated
  );

  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.PLANS],
    queryFn: Plan.getAll,
    enabled: isAuthenticated,
  });

  return { isLoading, plans: data };
};
