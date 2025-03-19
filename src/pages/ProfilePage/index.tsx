import { ProfilePageRouter } from './router'
import type { IProfileLinkItem } from './router'
import { useProfilePageInteractor } from './interactor'
import {
  PROFILE_ROUTE_UPDATE_USER_AVATAR,
  PROFILE_ROUTE_UPDATE_USERNAME,
  RESET_PASSWORD_ROUTE,
} from '../../common/constants/route-constants'

const links: IProfileLinkItem[] = [
  { to: PROFILE_ROUTE_UPDATE_USERNAME, text: 'Change Username' },
  { to: PROFILE_ROUTE_UPDATE_USER_AVATAR, text: 'Change Profile Picture' },
  { to: RESET_PASSWORD_ROUTE, text: 'Reset Password' },
]

const ProfilePage = () => {
  const interactor = useProfilePageInteractor()

  return <ProfilePageRouter interactor={interactor} links={links} />
}

export default ProfilePage
