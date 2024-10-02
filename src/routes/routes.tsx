import React from 'react'

import {
  BillingPage,
  HomePage,
  ProfilePage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
  UpdateUserAvatarPage,
  UpdateUsernamePage,
} from '../pages'
import ConfirmationPage from '../pages/ConfirmationPage'
import ContactUsPage from '../pages/CountactUs'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import PlansPage from '../pages/PlansPage'
import {
  BILLING_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  PROFILE_ROUTE,
  PROFILE_ROUTE_UPDATE_USER_AVATAR,
  PROFILE_ROUTE_UPDATE_USERNAME,
  RESET_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  CONTACT_US_ROUTE,
  PLANS_ROUTE,
  CONFIRMATION_ROUTE,
} from '../store/constants/route-constants'

export interface Page {
  id: number
  path: string
  title: string
  element: React.ReactElement
}

// public routes

const routes: Page[] = [
  {
    id: 1,
    path: CONTACT_US_ROUTE,
    title: 'ContactUsPage',
    element: <ContactUsPage />,
  },
]

// public routes that can't be accessed by authorized user

export const publicOnlyRoutes: Page[] = [
  {
    id: 1,
    path: SIGN_UP_ROUTE,
    title: 'SignUpPage',
    element: <SignUpPage />,
  },
  {
    id: 2,
    path: SIGN_IN_ROUTE,
    title: 'SignInPage',
    element: <SignInPage />,
  },
  {
    id: 3,
    path: FORGOT_PASSWORD_ROUTE,
    title: 'ForgotPassword',
    element: <ForgotPasswordPage />,
  },

  {
    id: 4,
    path: CONFIRMATION_ROUTE,
    title: 'ConfirmationPage',
    element: <ConfirmationPage />,
  },
]

// private routes that can't be accessed by non-authorized user

export const privateRoutes: Page[] = [
  {
    id: 1,
    path: '/',
    title: 'HomePage',
    element: <HomePage />,
  },
  {
    id: 2,
    path: RESET_PASSWORD_ROUTE,
    title: 'ResetPasswordPage',
    element: <ResetPasswordPage />,
  },
  {
    id: 3,
    path: BILLING_ROUTE,
    title: 'BillingPage',
    element: <BillingPage />,
  },
  {
    id: 4,
    path: PROFILE_ROUTE,
    title: 'ProfilePage',
    element: <ProfilePage />,
  },
  {
    id: 5,
    path: PROFILE_ROUTE_UPDATE_USERNAME,
    title: 'UpdateUsernamePage',
    element: <UpdateUsernamePage />,
  },
  {
    id: 6,
    path: PROFILE_ROUTE_UPDATE_USER_AVATAR,
    title: 'UpdateUserAvatarPage',
    element: <UpdateUserAvatarPage />,
  },
  {
    id: 7,
    path: PLANS_ROUTE,
    title: 'PlansPage',
    element: <PlansPage />,
  },
]

export default routes
