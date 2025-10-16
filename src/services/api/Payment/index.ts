import http from '../../../store/http/http-common'
import type {
  CreateListSubscriptions,
  CreateSubscriptionCheckoutSessionResponse,
  SubscriptionProduct,
} from './types'

export class PaymentApi {
  private static readonly paymentRoute: string = 'payment-perseat'

  static async getSubscriptions(): Promise<SubscriptionProduct[]> {
    const { data } = await http.get<SubscriptionProduct[]>(
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
