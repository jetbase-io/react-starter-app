import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import User from '../../services/api/User'
import type {
  ActivateSubscriptionPayloadT,
  ActivateSubscriptionResponseT,
} from '../../services/api/User/types'

type ActivateSubscriptionQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<
    ActivateSubscriptionResponseT,
    Error,
    ActivateSubscriptionPayloadT,
    unknown
  >
}

export const useActivateSubscription =
  (): ActivateSubscriptionQueryReturnType => {
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
