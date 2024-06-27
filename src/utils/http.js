import axios from 'axios'
import { toast } from 'sonner'
import config from '~/constants/config'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'

/*
- Áp dụng Singleton Pattern để tạo một instance duy nhất của Http class
- Có thể sử dụng ở bất kỳ đâu trong ứng dụng mà không cần phải tạo một instance mới mỗi khi cần sử dụng
*/

class Http {
  instance
  #accessToken
  #refreshToken
  constructor() {
    this.#accessToken = getAccessTokenFromLS()
    this.#refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      withCredentials: true, // Sử dụng cookie để gửi request qua CORS (Cross-Origin Resource Sharing)
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
          config.headers.authorization = this.#accessToken
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
          const data = response.data
          const user = data.data
          if (user.role === 'admin' || user.role === 'staff') {
            this.#accessToken = data.access_token
            this.#refreshToken = data.refresh_token
            setAccessTokenToLS(this.#accessToken)
            setRefreshTokenToLS(this.#refreshToken)
            setProfileToLS(data.data)
          }
        } else if (url.includes('signout')) {
          this.#accessToken = ''
          this.#refreshToken = ''
          clearLS()
        }
        return response
      },
      async (error) => {
        const originalRequest = error.config
        const { url } = originalRequest
        if (
          // Nếu lỗi là do token hết hạn và không phải request gọi API refresh token thì thực hiện refresh token
          error.response.status === 500 &&
          error.response.data.message === 'jwt expired' &&
          !url.includes('refresh-token')
        ) {
          const new_access_token = await this.#handleRefreshToken()

          // Cập nhật access token trong request gốc và thực hiện lại request
          originalRequest.headers.Authorization = new_access_token
          return this.instance(originalRequest)
        }

        clearLS()
        this.#accessToken = ''
        this.#refreshToken = ''
        toast.error(error.response.data.message || 'Có lỗi xảy ra!')

        return Promise.reject(error)
      }
    )
  }

  #handleRefreshToken = async () => {
    return this.instance
      .post('/api/auth/refresh-token', {
        refresh_token: this.#refreshToken
      })
      .then((response) => {
        const { access_token, refresh_token } = response.data
        this.#accessToken = access_token
        this.#refreshToken = refresh_token
        setAccessTokenToLS(this.#accessToken)
        setRefreshTokenToLS(this.#refreshToken)
        return access_token
      })
      .catch((error) => {
        this.#accessToken = ''
        this.#refreshToken = ''
        clearLS()
        throw error
      })
  }
}

const http = new Http().instance

export default http
