import http from '../../../store/http/http-common'
import type {
  CreateListSubscriptions,
  CreateSubscriptionCheckoutSessionResponse,
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

  static async createCheckout(
    params: CreateListSubscriptions,
  ): Promise<CreateSubscriptionCheckoutSessionResponse> {
    const res = await http.post<CreateSubscriptionCheckoutSessionResponse>(
      `${this.paymentRoute}/checkout`,
      params,
    )

    return res.data
  }
}
