export type SubscriptionProduct = {
  id: string
  name: string
  description?: string
  image?: string
  pros: string[]
  price: string
  currency: string
  price_id: string
}

export type ListProductsResponse = {
  subscriptions: SubscriptionProduct[]
  addons: SubscriptionProduct[]
}

export type CreateSubscription = {
  priceId: string
  count: number
}

export type CreateListSubscriptions = {
  subscriptions: CreateSubscription[]
  redirectSuccess: string
  redirectCancel: string
}

export type CreateSubscriptionCheckoutSessionResponse = {
  checkoutUrl: string
}
