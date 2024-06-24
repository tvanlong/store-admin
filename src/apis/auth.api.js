import http from '~/utils/http'

export const signIn = (data) => http.post('/api/auth/signin', data)

export const signOut = () => http.post('/api/auth/signout-admin')

export const signOutStaff = () => http.post('/api/auth/signout-staff')
