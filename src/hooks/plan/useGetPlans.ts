import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from '../../common/constants/cacheKeys'
import { useUserStore } from '../../store/useUserStore'
import type { IPlan } from '../../common/types/plan.types'
import Plan from '../../api/Plan'

type GetPlansQueryReturnType = {
  isLoading: boolean
  plans: IPlan[]
}

export const useGetPlans = (): GetPlansQueryReturnType => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.PLANS],
    queryFn: Plan.getAll,
    enabled: isAuthenticated,
  })

  return { isLoading, plans: data ?? [] }
}
