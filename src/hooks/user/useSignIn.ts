import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import User from '../../services/api/User'
import { setUserTokensToLocalStorage } from '../../helpers/user'
import { useUserStore } from '../../store/useUserStore'

export const useSignIn = () => {
  const setIsAuthenticated = useUserStore(state => state.setIsAuthenticated)
  const setSubscription = useUserStore(state => state.setSubscription)

  const { isPending, mutate } = useMutation({
    mutationFn: User.signIn,
    onSuccess: async data => {
      setIsAuthenticated(true)

      if (data) {
        setUserTokensToLocalStorage(data.accessToken, data.refreshToken)

        const subscription = await User.checkSubscription()

        setSubscription(subscription)
      }
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
