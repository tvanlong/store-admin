import http from '~/utils/http'

export const getAllCustomers = () => http.get('/api/users/customers')
