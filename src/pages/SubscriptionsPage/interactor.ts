import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { CacheKeys } from '../../constants/cacheKeys'
import { PaymentApi } from '../../services/api/Payment'
import {
  SubscriptionStatus,
  type CreateCustomerPortalSessionParams,
  type CreateListSubscriptions,
  type SubscriptionProduct,
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

  const { isPending: isLoadingUserSub, data: userSub } = useQuery({
    queryKey: [CacheKeys.USER, CacheKeys.SUBSCRIPTIONS],
    queryFn: () => PaymentApi.getUserActiveSubscription(),
    enabled: isAuthenticated && !!data,
  })

  const { mutateAsync } = useMutation({
    mutationFn: (params: CreateListSubscriptions) =>
      PaymentApi.createCheckout(params),
  })

  const { mutateAsync: createCustomerPortal } = useMutation({
    mutationFn: (params: CreateCustomerPortalSessionParams) =>
      PaymentApi.createPortal(params),
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

  const navigateToPortal = useCallback(async (): Promise<void> => {
    const res = await createCustomerPortal({
      return_url: window.location.href,
    })

    window.location.assign(res.url)
  }, [createCustomerPortal])

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
    isLoading: isLoadingSubscriptions || isLoadingUserSub,
    activeSub:
      userSub && userSub.status === SubscriptionStatus.ACTIVE
        ? userSub
        : undefined,
    subscribeHandler,
    onChangeSelectedAddon,
    selectedAddonId: addonSelected?.id,
    navigateToPortal,
    anySubActive:
      userSub && userSub.status === SubscriptionStatus.ACTIVE
        ? userSub.productIds.some(v =>
            data?.subscriptions.map(s => s.id).includes(v),
          )
        : false,
  }
}
