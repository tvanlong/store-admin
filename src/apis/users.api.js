import http from '~/utils/http'

export const getAllCustomers = () => http.get('/api/users/customers')

export const getAllStaffs = () => http.get('/api/users/staffs')

export const getStaff = (id) => http.get(`/api/users/staffs/${id}`)

export const createStaff = (data) => http.post('/api/users/staffs', data)

export const updateStaff = (id, data) => http.patch(`/api/users/staffs/${id}`, data)

export const deleteStaff = (id) => http.delete(`/api/users/staffs/${id}`)
