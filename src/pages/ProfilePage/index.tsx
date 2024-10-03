import { Link } from 'react-router-dom'
import { getAccessToken, parseJwt } from '../../helpers/user'
import {
  PROFILE_ROUTE_UPDATE_USERNAME,
  PROFILE_ROUTE_UPDATE_USER_AVATAR,
  RESET_PASSWORD_ROUTE,
} from '../../store/constants/route-constants'

import { useFullSignOut } from '../../hooks/user/useFullSignOut'
import { useUser } from '../../hooks/user/useUser'

const ProfilePage = () => {
  const { mutate: fullSignOut } = useFullSignOut()
  const userToken = parseJwt(getAccessToken() || '')
  const { user } = useUser(userToken.id)

  return (
    <section className="relative py-16">
      <div className="container px-4 mx-auto">
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-xl">
          <div className="px-6">
            <div className="mt-12 text-center">
              <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-800">
                {user?.username || 'User'}
              </h3>
              <div className="mt-0 mb-2 text-sm font-bold leading-normal text-gray-500">
                {user?.email || 'user@mail.com'}
              </div>
              <div className="mt-10">
                <Link
                  to={PROFILE_ROUTE_UPDATE_USERNAME}
                  className="mr-10 font-normal text-pink-500"
                >
                  Change Username
                </Link>
                <Link
                  to={PROFILE_ROUTE_UPDATE_USER_AVATAR}
                  className="mr-10 font-normal text-pink-500"
                >
                  Change Profile Picture
                </Link>
                <Link
                  to={RESET_PASSWORD_ROUTE}
                  className="mr-10 font-normal text-pink-500"
                >
                  Reset Password
                </Link>
                <span
                  onClick={() => fullSignOut()}
                  className="font-normal text-pink-500 cursor-pointer"
                >
                  Full Sign Out
                </span>
              </div>
            </div>
            <div className="py-10 mt-10 text-center border-t border-gray-300">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 lg:w-9/12">
                  <p className="mb-4 text-lg leading-relaxed text-gray-800">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi laborum perspiciatis quidem labore quam eligendi
                    suscipit, quaerat obcaecati similique aut repellendus ab
                    veniam provident odit odio esse vero earum facilis!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
