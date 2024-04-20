import axios from 'axios'
import config from '~/constants/config'
import { getAccessTokenFromCookie } from './auth'

/*
- Áp dụng Singleton Pattern để tạo một instance duy nhất của Http class
- Có thể sử dụng ở bất kỳ đâu trong ứng dụng mà không cần phải tạo một instance mới mỗi khi cần sử dụng
*/

class Http {
  instance
  #accessToken
  constructor() {
    this.#accessToken = getAccessTokenFromCookie()
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.#accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.#accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url.includes('signin')) {
          this.#accessToken = response.data.access_token
        } else if (url.includes('signout')) {
          this.#accessToken = ''
        }
        return response
      },
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === 500 && error.response.data.message === 'jwt expired' && !originalRequest._retry) {
          originalRequest._retry = true
          const access_token = await this.#handleRefreshToken()
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return this.instance(originalRequest)
        }
        return Promise.reject(error)
      }
    )
  }

  #handleRefreshToken = async () => {
    return this.instance
      .post('/api/auth/refresh-token')
      .then((response) => {
        const { access_token } = response.data
        this.#accessToken = access_token
        return access_token
      })
      .catch((error) => {
        this.#accessToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
