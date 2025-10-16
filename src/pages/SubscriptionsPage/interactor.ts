import { useMutation, useQuery } from '@tanstack/react-query'
import { useUserStore } from '../../store/useUserStore'
import { CacheKeys } from '../../constants/cacheKeys'
import { PaymentApi } from '../../services/api/Payment'
import type { CreateListSubscriptions } from '../../services/api/Payment/types'

export const useSubscriptionsInteractor = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  const { isPending: isLoadingSubscriptions, data } = useQuery({
    queryKey: [CacheKeys.SUBSCRIPTIONS],
    queryFn: () => PaymentApi.getSubscriptions(),
    enabled: isAuthenticated,
  })

  const { mutateAsync } = useMutation({
    mutationFn: (params: CreateListSubscriptions) =>
      PaymentApi.createCheckout(params),
  })

  const subscribeHandler = async (
    priceId: string,
    seats: number,
  ): Promise<void> => {
    const res = await mutateAsync({
      subscriptions: [{ priceId, count: seats }],
      redirect_origin: window.origin,
    })

    window.location.assign(res.checkoutUrl)
  }

  return {
    subscriptions: data
      ? data.sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10))
      : [],
    isLoading: isLoadingSubscriptions,
    subscribeHandler,
  }
}
