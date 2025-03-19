import type { ProfilePageInteractor } from './interactor'
import { ProfileLink } from './components/ProfileLink'

export interface IProfileLinkItem {
  text: string
  to?: string | null
  onClick?: () => any
}

export interface ProfilePageRouterProps {
  interactor: ProfilePageInteractor
  links: IProfileLinkItem[]
}

export const ProfilePageRouter = ({
  interactor,
  links,
}: ProfilePageRouterProps) => {
  const { user, signOut } = interactor

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
                {links.map((item, idx) => {
                  return (
                    <ProfileLink to={item.to} key={idx}>
                      {item.text}
                    </ProfileLink>
                  )
                })}
                <ProfileLink onClick={signOut}>Full Sign Out</ProfileLink>
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
