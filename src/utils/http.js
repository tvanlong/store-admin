import axios from 'axios'
import config from '~/constants/config'

/*
- Áp dụng Singleton Pattern để tạo một instance duy nhất của Http class
- Có thể sử dụng ở bất kỳ đâu trong ứng dụng mà không cần phải tạo một instance mới mỗi khi cần sử dụng
*/

class Http {
  instance
  constructor() {
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
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
