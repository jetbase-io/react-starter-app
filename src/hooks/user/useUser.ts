import { useQuery } from '@tanstack/react-query'
import User from '../../api/User'
import { CacheKeys } from '../../common/constants/cacheKeys'
import type { UserT } from '../../api/User/types'

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
