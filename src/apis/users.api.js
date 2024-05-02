import http from '~/utils/http'

export const getAllCustomers = () => http.get('/api/users/customers')

export const getAllStaffs = () => http.get('/api/users/staffs')
