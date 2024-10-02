import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from '../../constants/cacheKeys'
import Plan from '../../services/api/Plan'
import { useUserStore } from '../../store/useUserStore'

export const useGetPlans = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.PLANS],
    queryFn: Plan.getAll,
    enabled: isAuthenticated,
  })

  return { isLoading, plans: data ?? [] }
}
