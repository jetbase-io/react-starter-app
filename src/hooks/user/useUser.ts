import User from "../../services/api/User";
import { CacheKeys } from "../../constants/cacheKeys";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id: string) => {
  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.USER],
    queryFn: async () => User.get(id),
    enabled: !!id,
  });

  return { isLoading, user: data };
};
