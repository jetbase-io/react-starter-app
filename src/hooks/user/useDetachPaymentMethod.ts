import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import User from '../../api/User'
import { CacheKeys } from '../../common/constants/cacheKeys'
import type {
  DetachPaymentMethodPayloadT,
  PaymentMethodsT,
} from '../../api/User/types'

type DetachPaymentQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<
    PaymentMethodsT[],
    Error,
    DetachPaymentMethodPayloadT,
    unknown
  >
}

export const useDetachPaymentMethod = (): DetachPaymentQueryReturnType => {
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: User.detachPaymentMethod,
    onSuccess: paymentMethods => {
      queryClient.setQueryData<PaymentMethodsT[]>(
        [CacheKeys.PAYMENT_METHODS],
        paymentMethods,
      )

      toast.success('Card was detached successfully!')
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })

  return {
    isPending,
    mutate,
  }
}
