import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'
import type { SignUpPayloadT } from '../../services/api/User/types'

type SignUpQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<string | null, Error, SignUpPayloadT, unknown>
}

export const useSignUp = (): SignUpQueryReturnType => {
  const setIsSignedUp = useUserStore(state => state.setIsSignedUp)

  const { isPending, mutate } = useMutation({
    mutationFn: User.signUp,
    onSuccess: message => {
      toast.success(message)

      setIsSignedUp(true)
    },
    onError: ({ message }) => {
      toast.error(message?.toString())
    },
  })

  return {
    isPending,
    mutate,
  }
}
