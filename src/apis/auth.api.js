import http from '~/utils/http'

export const signIn = (data) => http.post('/api/auth/signin', data)
