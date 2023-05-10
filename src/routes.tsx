import React from "react";

import {
  BillingPage,
  HomePage,
  ProfilePage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
  UpdateUserAvatarPage,
  UpdateUsernamePage,
} from "./pages";
import ContactUsPage from "./pages/CountactUs";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PlansPage from "./pages/PlansPage";
import ConfirmationPage from "./pages/ConfirmationPage";
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
} from "./store/constants/route-constants";

interface Page {
  id: number;
  path: string;
  title: string;
  element: React.ReactElement;
}

const routes: Page[] = [
  {
    id: 1,
    path: "/",
    title: "HomePage",
    element: <HomePage />,
  },
  {
    id: 2,
    path: SIGN_UP_ROUTE,
    title: "SignUpPage",
    element: <SignUpPage />,
  },
  {
    id: 3,
    path: SIGN_IN_ROUTE,
    title: "SignInPage",
    element: <SignInPage />,
  },
  {
    id: 4,
    path: RESET_PASSWORD_ROUTE,
    title: "ResetPasswordPage",
    element: <ResetPasswordPage />,
  },
  {
    id: 5,
    path: BILLING_ROUTE,
    title: "BillingPage",
    element: <BillingPage />,
  },
  {
    id: 6,
    path: PROFILE_ROUTE,
    title: "ProfilePage",
    element: <ProfilePage />,
  },
  {
    id: 7,
    path: PROFILE_ROUTE_UPDATE_USERNAME,
    title: "UpdateUsernamePage",
    element: <UpdateUsernamePage />,
  },
  {
    id: 8,
    path: PROFILE_ROUTE_UPDATE_USER_AVATAR,
    title: "UpdateUserAvatarPage",
    element: <UpdateUserAvatarPage />,
  },
  {
    id: 9,
    path: FORGOT_PASSWORD_ROUTE,
    title: "ForgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    id: 10,
    path: CONTACT_US_ROUTE,
    title: "ContactUsPage",
    element: <ContactUsPage />,
  },
  {
    id: 11,
    path: PLANS_ROUTE,
    title: "PlansPage",
    element: <PlansPage />,
  },
  {
    id: 12,
    path: CONFIRMATION_ROUTE,
    title: "ConfirmationPage",
    element: <ConfirmationPage />,
  },
];

export default routes;
