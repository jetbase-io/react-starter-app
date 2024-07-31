import { useQuery } from '@tanstack/react-query'
import User from '../../services/api/User'
import { CacheKeys } from '../../constants/cacheKeys'

export const useUser = (id: string) => {
  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.USER, id],
    queryFn: async () => User.get(id),
    enabled: !!id,
  })

  return { isLoading, user: data }
}
