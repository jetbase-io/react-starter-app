export type SignUpPayloadT = {
  email: string
  password: string
  username: string
}

export type SignInPayloadT = {
  username: string
  password: string
}

export type SignInResponseT = {
  accessToken: string
  refreshToken: string
}

export type UpdateUsernameResponseT = {
  username: string
}

export type ResetPasswordPayloadT = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type DetachPaymentMethodPayloadT = {
  paymentMethods: PaymentMethodsT[]
  paymentMethodId: string
}

export type PaymentMethodsT = {
  id: string
  card: {
    brand: string
    last4: string
  }
}

export type UserT = {
  id: string
  username: string
  avatar: null
  created_at: string
  customerStripeId?: null
  email: string
  roles: string
}

export type ActivateSubscriptionPayloadT = {
  paymentMethodId?: string
  priceId: string
}

export type ActivateSubscriptionResponseT = {
  clientSecret: string
  status: string
  nickname: string | null
}

export type CheckSubscriptionResponseT = {
  nickname: string
  status: string
}
