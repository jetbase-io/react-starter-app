export const cleanUserTokensFromLocalStorage = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const setUserTokensToLocalStorage = (
  accessToken: string,
  refreshToken: string,
) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getIsAuthenticated = () => !!localStorage.getItem('accessToken')

export const getAccessToken = () => localStorage.getItem('accessToken')

export const getRefreshToken = () => localStorage.getItem('refreshToken')

export const parseJwt = (token: string) => {
  try {
    if (!token?.length) return null

    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
