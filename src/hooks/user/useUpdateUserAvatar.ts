import { useMutation } from '@tanstack/react-query'
import type { UseMutateFunction } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import User from '../../services/api/User'
import { HOME_ROUTE } from '../../store/constants/route-constants'

type UpdateUserAvatarQueryReturnType = {
  isPending: boolean
  mutate: UseMutateFunction<void, Error, File, unknown>
}

export const useUpdateUserAvatar = (): UpdateUserAvatarQueryReturnType => {
  const navigate = useNavigate()
  const { isPending, mutate } = useMutation({
    mutationFn: User.updateUserAvatar,
    onSuccess: () => {
      toast.success(`User Profile picture is updated!`)

      navigate(HOME_ROUTE)
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
