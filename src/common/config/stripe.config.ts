import { loadStripe } from '@stripe/stripe-js'
import type { Stripe } from '@stripe/stripe-js'
import { appEnvConfig } from './app-env.config'

export const stripe: Promise<Stripe | null> = loadStripe(
  appEnvConfig.stripe_public_key,
)
