import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../../store/useUserStore'
import { CacheKeys } from '../../constants/cacheKeys'
import { PaymentApi } from '../../services/api/Payment'

export const useSubscriptionsInteractor = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  const { isLoading: isLoadingSubscriptions, data } = useQuery({
    queryKey: [CacheKeys.SUBSCRIPTIONS],
    queryFn: () => PaymentApi.getSubscriptions(),
    enabled: isAuthenticated,
  })

  return { subscriptions: data ?? [], isLoading: isLoadingSubscriptions }
}
