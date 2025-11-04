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

export type CreateCustomerPortalSessionResponse = {
  url: string
  return_url: string
}

export type CreateCustomerPortalSessionParams = {
  return_url: string
}

export enum SubscriptionStatus {
  INVOICE_PENDING = 'INVOICE_PENDING',
  PAUSED = 'PAUSED',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
}

export type CustomerActiveSubscriptionResponse = {
  productIds: string[]
  quantity: number
  isAddonEnabled: boolean
  expDate: Date
  status: SubscriptionStatus
}
