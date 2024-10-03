import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import User from '../../services/api/User'
import { HOME_ROUTE } from '../../store/constants/route-constants'
import { CacheKeys } from '../../constants/cacheKeys'
import type { UserT } from '../../services/api/User/types'
import { defaultUserData } from './constants'

type UpdateUsernameQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<string | undefined, Error, string, unknown>
}

export const useUpdateUsername = (): UpdateUsernameQueryReturnType => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isPending, mutate } = useMutation({
    mutationFn: User.updateUsername,
    onSuccess: username => {
      if (username) {
        toast.success(`Username is updated! Your new username is: ${username}`)

        queryClient.setQueryData<UserT>([CacheKeys.USER], user =>
          user ? { ...user, username } : { ...defaultUserData, username },
        )
      }

      navigate(HOME_ROUTE)
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
