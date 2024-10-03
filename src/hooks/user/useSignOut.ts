import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'

import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'

type SignOutQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<void, Error, void, unknown>
}

export const useSignOut = (): SignOutQueryReturnType => {
  const logOutUser = useUserStore(state => state.logOutUser)

  const { isPending, mutate } = useMutation({
    mutationFn: User.signOut,
    onSuccess: () => {
      logOutUser()
    },
  })

  return {
    isPending,
    mutate,
  }
}
