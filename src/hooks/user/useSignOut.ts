import { useMutation } from '@tanstack/react-query'

import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'

export const useSignOut = () => {
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
