import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'

export const useSignUp = () => {
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
