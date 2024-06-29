import http from '~/utils/http'

const usersApi = {
  getAllCustomers: () => http.get('/api/users/customers'),
  getAllStaffs: () => http.get('/api/users/staffs'),
  getStaff: (id) => http.get(`/api/users/staffs/${id}`),
  createStaff: (data) => http.post('/api/users/staffs', data),
  updateStaff: (id, data) => http.patch(`/api/users/staffs/${id}`, data),
  deleteStaff: (id) => http.delete(`/api/users/staffs/${id}`),
  updateProfile: (id, data) => http.patch(`/api/users/update-profile/${id}`, data),
  changePassword: (id, data) => http.patch(`/api/users/change-password/${id}`, data)
}

export default usersApi
