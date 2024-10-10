import type { UserT } from '../services/api/User/types'

export const cleanUserTokensFromLocalStorage = (): void => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const setUserTokensToLocalStorage = (
  accessToken: string,
  refreshToken: string,
): void => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getIsAuthenticated = (): boolean =>
  !!localStorage.getItem('accessToken')

export const getAccessToken = (): string | null =>
  localStorage.getItem('accessToken')

export const getRefreshToken = (): string | null =>
  localStorage.getItem('refreshToken')

export const parseJwt = (token: string): Pick<UserT, 'id'> | null => {
  try {
    if (!token?.length) return null

    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
