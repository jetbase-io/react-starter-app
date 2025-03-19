import {
  FORGOT_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
} from '../../common/constants/route-constants'

import { SignInPageRouter } from './router'
import type { SignInPageLinkItem } from './router'
import { useSignInInteractor } from './interactor'

const links: SignInPageLinkItem[] = [
  { to: SIGN_UP_ROUTE, text: `Don't have an account?` },
  { to: FORGOT_PASSWORD_ROUTE, text: `Forgot password?` },
]

const SignInPage = () => {
  const interactor = useSignInInteractor()

  return <SignInPageRouter interactor={interactor} links={links} />
}

export default SignInPage
