import axios from 'axios'
import config from '~/constants/config'
import { removeLocalStorage, setIsSignedIn, setUserDataIntoLocalStorage } from './auth'

/*
- Áp dụng Singleton Pattern để tạo một instance duy nhất của Http class
- Có thể sử dụng ở bất kỳ đâu trong ứng dụng mà không cần phải tạo một instance mới mỗi khi cần sử dụng
*/

class Http {
  instance
  constructor() {
    this.instance = axios.create({
      withCredentials: true, // Sử dụng cookie để gửi request qua CORS (Cross-Origin Resource Sharing)
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
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
        if (url.includes('signin') && response.data.data.role === 'admin') {
          setIsSignedIn(true)
          setUserDataIntoLocalStorage(response.data.data)
        } else if (url.includes('signout')) {
          removeLocalStorage()
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
          const response = await this.#handleRefreshToken()
          const newAccessToken = response.data.access_token
          // Cập nhật access token trong request gốc và thực hiện lại request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return this.instance(originalRequest)
        }
        return Promise.reject(error)
      }
    )
  }

  #handleRefreshToken = async () => {
    return this.instance.post('/api/auth/refresh-token')
  }
}

const http = new Http().instance

export default http
