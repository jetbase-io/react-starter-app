import type { AxiosRequestConfig } from 'axios'

import axios from 'axios'

import {
  cleanUserTokensFromLocalStorage,
  getAccessToken,
  getRefreshToken,
  setUserTokensToLocalStorage,
} from '../../helpers/user'
import { REFRESH_TOKEN_URL } from '../constants/api-contstants'
import { useUserStore } from '../useUserStore'

const baseURL = import.meta.env.VITE_API_URL

const http = axios.create({ baseURL })

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken = getAccessToken()

    const localConfig: AxiosRequestConfig = { ...config }

    localConfig.headers = config.headers ?? {}

    if (accessToken) {
      localConfig.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : ''
    }

    return localConfig
  },
  error => error,
)

let refresh = false

http.interceptors.response.use(
  resp => resp,
  async error => {
    if (error?.response?.status === 401 && !refresh) {
      refresh = true
      try {
        const response = await axios.post(
          `${baseURL}${REFRESH_TOKEN_URL}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getRefreshToken()}`,
            },
          },
        )
        setUserTokensToLocalStorage(
          response.data.accessToken,
          response.data.refreshToken,
        )
        const headers = {
          ...error.config.headers,
          Authorization: `Bearer ${response.data.accessToken}`,
        }

        if (response.data.accessToken?.length) refresh = false

        return await http.request({ ...error.config, headers })
      } catch (er) {
        cleanUserTokensFromLocalStorage()
        useUserStore.setState({ isAuthenticated: false })
      }
    }

    refresh = false

    return error
  },
)

export default http
