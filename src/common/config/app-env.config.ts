import { checkIsNotEmptyValues } from '../utils/checkIsNotEmptyValues'

export type AppEnvConfig = {
  api_url: string
  stripe_public_key: string
}

const getEnvVariables = (): AppEnvConfig => {
  const baseURL: string | undefined = import.meta.env.VITE_API_URL
  const stripePubKey: string | undefined = import.meta.env
    .VITE_STRIPE_PUBLIC_KEY

  const appEnv: AppEnvConfig = {
    api_url: baseURL,
    stripe_public_key: stripePubKey,
  }

  // validate env variables here
  const res = checkIsNotEmptyValues(appEnv, ['api_url', 'stripe_public_key'])

  return res
}

export const appEnvConfig = getEnvVariables()
