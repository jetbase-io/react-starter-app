import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'

type ConfirmQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<string, Error, string, unknown>
}

export const useConfirm = (): ConfirmQueryReturnType => {
  const setIsConfirmed = useUserStore(state => state.setIsAuthenticated)

  const { isPending, mutate } = useMutation({
    mutationFn: User.confirm,
    onSuccess: async message => {
      toast.success(message)

      setIsConfirmed(true)
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
