import { useMutation } from '@tanstack/react-query'

import User from '../../services/api/User'
import { useUserStore } from '../../store/useUserStore'

export const useFullSignOut = () => {
  const logOutUser = useUserStore(state => state.logOutUser)

  const { isPending, mutate } = useMutation({
    mutationFn: User.fullSignOut,
    onSuccess: () => {
      logOutUser()
    },
  })

  return {
    isPending,
    mutate,
  }
}
