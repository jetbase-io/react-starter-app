import http from '../../../store/http/http-common'
import type { SubscriptionProduct } from './types'

export class PaymentApi {
  static async getSubscriptions(): Promise<SubscriptionProduct[]> {
    const { data } = await http.get<SubscriptionProduct[]>(
      'payment-perseat/products',
    )

    return data
  }
}
