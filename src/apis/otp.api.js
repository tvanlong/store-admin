import http from '~/utils/http'

const otpApi = {
  changeEmail: (id, data) => http.post(`/api/otps/change-email/${id}`, data),
  verifyEmail: (id, data) => http.patch(`/api/otps/verify-email/${id}`, data)
}

export default otpApi
