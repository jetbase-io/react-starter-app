import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import User from '../../services/api/User'

export const useActivateSubscription = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: User.activateSubscription,
    onError: ({ message }) => {
      toast.error(message)
    },
  })

  return {
    isPending,
    mutate,
  }
}
