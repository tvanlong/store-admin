import http from '~/utils/http'

const authApi = {
  signIn: (data) => http.post('/api/auth/signin', data),
  signOut: () => http.post('/api/auth/signout')
}

export default authApi
