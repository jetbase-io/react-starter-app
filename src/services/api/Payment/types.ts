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

export type CreateSubscription = {
  priceId: string
  count: number
}

export type CreateListSubscriptions = {
  subscriptions: CreateSubscription[]
  redirect_origin: string
}

export type CreateSubscriptionCheckoutSessionResponse = {
  checkoutUrl: string
}
