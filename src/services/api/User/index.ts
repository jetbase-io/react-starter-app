import { getRefreshToken } from '../../../helpers/user'
import {
  ACTIVATE_SUBSCRIPTION_URL,
  CHECK_SUBSCRIPTION_URL,
  CONFIRMATION_URL,
  DETACH_PAYMENT_METHODS,
  FULL_SIGN_OUT_URL,
  GET_PAYMENT_METHODS_URL,
  RESET_PASSWORD_URL,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  SIGN_UP_URL,
  UPDATE_USERNAME,
  UPDATE_USER_AVATAR,
} from '../../../store/constants/api-contstants'
import http from '../../../store/http/http-common'
import type {
  ActivateSubscriptionPayloadT,
  ActivateSubscriptionResponseT,
  CheckSubscriptionResponseT,
  DetachPaymentMethodPayloadT,
  PaymentMethodsT,
  ResetPasswordPayloadT,
  SignInPayloadT,
  SignInResponseT,
  SignUpPayloadT,
  UpdateUsernameResponseT,
  UserT,
} from './types'

class User {
  async get(id: string): Promise<UserT> {
    const result = await http.get<UserT>(`${UPDATE_USERNAME}${id}`)

    return result.data
  }

  async signUp(credentials: SignUpPayloadT): Promise<string | null> {
    const result = await http.post(SIGN_UP_URL, credentials)

    const responseText = result.request?.responseText
    const response = responseText?.length ? JSON.parse(responseText) : null

    if (result.request.status === 201) {
      return response?.message
    }

    if (response?.message) {
      throw new Error(response?.message?.toString())
    }

    throw new Error('Sign up failed')
  }

  async signIn(
    credentials: SignInPayloadT,
  ): Promise<SignInResponseT | undefined> {
    const result = await http.post(SIGN_IN_URL, credentials)

    if (result.request.status === 201) {
      return {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      }
    }

    const responseText = result.request?.responseText

    if (responseText?.length) {
      const response = JSON.parse(responseText)

      throw new Error(response?.message)
    }

    throw new Error('Sign in failed')
  }

  async signOut(): Promise<void> {
    http.post(SIGN_OUT_URL, {
      refreshToken: getRefreshToken(),
    })
  }

  async fullSignOut(): Promise<void> {
    http.post(FULL_SIGN_OUT_URL)
  }

  async updateUsername(username: string): Promise<string | undefined> {
    const result = await http.put<UpdateUsernameResponseT>(UPDATE_USERNAME, {
      username,
    })

    if (result.request.status === 400) {
      throw new Error('User with that username already exists!')
    }

    return result.data.username
  }

  async updateUserAvatar(avatar: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', avatar, avatar.name)

    const result = await http.post(UPDATE_USER_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (result.request.status === 400) {
      throw new Error('Profile picture is not updated!')
    }
  }

  async resetPassword(passwords: ResetPasswordPayloadT): Promise<void> {
    const result = await http.post(RESET_PASSWORD_URL, passwords)

    if (result.request.status === 400) {
      throw new Error('Password does not match')
    }
  }

  async getPaymentMethods(): Promise<PaymentMethodsT[]> {
    const res = await http.get<PaymentMethodsT[]>(GET_PAYMENT_METHODS_URL)

    return res.data
  }

  async detachPaymentMethod({
    paymentMethods,
    paymentMethodId,
  }: DetachPaymentMethodPayloadT): Promise<PaymentMethodsT[]> {
    const res = await http.post(DETACH_PAYMENT_METHODS, {
      paymentMethodId,
    })

    if (res.data) {
      const newArr = paymentMethods.filter(pM => {
        return pM.id !== paymentMethodId
      })

      return newArr
    }

    return []
  }

  async activateSubscription({
    paymentMethodId,
    priceId,
  }: ActivateSubscriptionPayloadT): Promise<ActivateSubscriptionResponseT> {
    const { data } = await http.post(ACTIVATE_SUBSCRIPTION_URL, {
      paymentMethod: paymentMethodId,
      priceId,
    })

    return data
  }

  async confirm(token: string) {
    const result = await http.patch(CONFIRMATION_URL, { token })
    const responseText = result.request?.responseText
    const response = responseText?.length ? JSON.parse(responseText) : null

    if (result.request.status === 200) {
      return response?.message
    }

    throw new Error(response?.message?.toString())
  }

  async checkSubscription(): Promise<CheckSubscriptionResponseT> {
    const { data } = await http.get(CHECK_SUBSCRIPTION_URL)

    return data
  }
}

export default new User()
