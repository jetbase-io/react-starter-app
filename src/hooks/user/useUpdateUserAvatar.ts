import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import User from '../../services/api/User'
import history from '../../helpers/history'
import { HOME_ROUTE } from '../../store/constants/route-constants'

type UpdateUserAvatarQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<void, Error, File, unknown>
}

export const useUpdateUserAvatar = (): UpdateUserAvatarQueryReturnType => {
  const { isPending, mutate } = useMutation({
    mutationFn: User.updateUserAvatar,
    onSuccess: () => {
      toast.success(`User Profile picture is updated!`)

      history.push(HOME_ROUTE)
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
