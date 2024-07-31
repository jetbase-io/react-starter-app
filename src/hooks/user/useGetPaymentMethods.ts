import { useQuery } from '@tanstack/react-query'
import User from '../../services/api/User'
import { CacheKeys } from '../../constants/cacheKeys'

export const useGetPaymentMethods = () => {
  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.PAYMENT_METHODS],
    queryFn: User.getPaymentMethods,
  })

  return { isLoading, paymentMethods: data || [] }
}
