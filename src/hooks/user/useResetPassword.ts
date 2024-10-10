import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'
import type { ResetPasswordPayloadT } from '../../services/api/User/types'

type ResetPasswordQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<void, Error, ResetPasswordPayloadT, unknown>
}

export const useResetPassword = (): ResetPasswordQueryReturnType => {
  const logOutUser = useUserStore(state => state.logOutUser)

  const { isPending, mutate } = useMutation({
    mutationFn: User.resetPassword,
    onSuccess: async () => {
      toast.success('Password updated!')

      logOutUser()
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
