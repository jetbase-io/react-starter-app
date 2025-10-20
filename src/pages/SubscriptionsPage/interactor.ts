import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { CacheKeys } from '../../constants/cacheKeys'
import { PaymentApi } from '../../services/api/Payment'
import type {
  CreateListSubscriptions,
  SubscriptionProduct,
} from '../../services/api/Payment/types'

export const useSubscriptionsInteractor = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const [addonSelected, setAddonSelected] =
    useState<SubscriptionProduct | null>(null)

  const { isPending: isLoadingSubscriptions, data } = useQuery({
    queryKey: [CacheKeys.SUBSCRIPTIONS],
    queryFn: () => PaymentApi.getSubscriptions(),
    enabled: isAuthenticated,
  })

  const { mutateAsync } = useMutation({
    mutationFn: (params: CreateListSubscriptions) =>
      PaymentApi.createCheckout(params),
  })

  const subscribeHandler = useCallback(
    async (priceId: string, seats: number): Promise<void> => {
      const subscriptions: { priceId: string; count: number }[] = [
        { priceId, count: seats },
      ]

      if (addonSelected) {
        subscriptions.push({ priceId: addonSelected.price_id, count: 1 })
      }

      const res = await mutateAsync({
        subscriptions,
        redirectCancel: window.origin,
        redirectSuccess: window.origin,
      })

      window.location.assign(res.checkoutUrl)
    },
    [addonSelected, mutateAsync],
  )

  const onChangeSelectedAddon = (
    addon: SubscriptionProduct,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      setAddonSelected(addon)
    } else {
      setAddonSelected(null)
    }
  }

  return {
    subscriptions: data ? data.subscriptions : [],
    addons: data ? data.addons : [],
    isLoading: isLoadingSubscriptions,
    subscribeHandler,
    onChangeSelectedAddon,
    selectedAddonId: addonSelected?.id,
  }
}
