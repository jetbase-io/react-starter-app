import { useFullSignOut } from '../../hooks/user/useFullSignOut'
import { getAccessToken, parseJwt } from '../../common/utils/user'
import { useUser } from '../../hooks/user/useUser'
import type { UserT } from '../../api/User/types'

export interface ProfilePageInteractor {
  user?: UserT
  signOut: () => void
}

export const useProfilePageInteractor = (): ProfilePageInteractor => {
  const { mutate: fullSignOut } = useFullSignOut()
  const userToken = parseJwt(getAccessToken() || '')
  const { user } = useUser(userToken?.id)

  return {
    user,
    signOut: fullSignOut,
  }
}
