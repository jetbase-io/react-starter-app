import { useQuery } from '@tanstack/react-query'
import User from '../../services/api/User'
import { CacheKeys } from '../../constants/cacheKeys'
import type { UserT } from '../../services/api/User/types'

type UserQueryReturnType = {
  isLoading: boolean
  user?: UserT
}

export const useUser = (id?: string): UserQueryReturnType => {
  const { isLoading, data } = useQuery({
    queryKey: [CacheKeys.USER, id],
    queryFn: async () => {
      if (id) {
        return User.get(id)
      }

      return undefined
    },
    enabled: !!id,
  })

  return { isLoading, user: data }
}
