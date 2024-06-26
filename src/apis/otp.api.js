import http from '~/utils/http'

export const changeEmail = (id, data) => http.post(`/api/otps/change-email/${id}`, data)

export const verifyEmail = (id, data) => http.patch(`/api/otps/verify-email/${id}`, data)
