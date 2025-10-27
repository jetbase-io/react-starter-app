import http from '../../../store/http/http-common'
import type {
  CreateCustomerPortalSessionParams,
  CreateCustomerPortalSessionResponse,
  CreateListSubscriptions,
  CreateSubscriptionCheckoutSessionResponse,
  CustomerActiveSubscriptionResponse,
  ListProductsResponse,
} from './types'

export class PaymentApi {
  private static readonly paymentRoute: string = 'payment-perseat'

  static async getSubscriptions(): Promise<ListProductsResponse> {
    const { data } = await http.get<ListProductsResponse>(
      `${this.paymentRoute}/products`,
    )

    return data
  }

  static async getUserActiveSubscription(): Promise<CustomerActiveSubscriptionResponse> {
    const { data } = await http.get<CustomerActiveSubscriptionResponse>(
      `${this.paymentRoute}/active-subscription`,
    )

    return data
  }

  static async createCheckout(
    params: CreateListSubscriptions,
  ): Promise<CreateSubscriptionCheckoutSessionResponse> {
    const res = await http.post<CreateSubscriptionCheckoutSessionResponse>(
      `${this.paymentRoute}/checkout`,
      params,
    )

    return res.data
  }

  static async createPortal(
    params: CreateCustomerPortalSessionParams,
  ): Promise<CreateCustomerPortalSessionResponse> {
    const res = await http.post<CreateCustomerPortalSessionResponse>(
      `${this.paymentRoute}/portal`,
      params,
    )

    return res.data
  }
}
