import { useQuery } from '@tanstack/react-query'
import User from '../../api/User'
import { CacheKeys } from '../../common/constants/cacheKeys'
import type { PaymentMethodsT } from '../../api/User/types'

type GetPaymentMethodsQueryReturnType = {
  isLoading: boolean
  paymentMethods: PaymentMethodsT[]
}

export const useGetPaymentMethods = (): GetPaymentMethodsQueryReturnType => {
  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.PAYMENT_METHODS],
    queryFn: User.getPaymentMethods,
  })

  return { isLoading, paymentMethods: data || [] }
}
