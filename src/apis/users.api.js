import http from '~/utils/http'

const usersApi = {
  getAllCustomers: (params) => http.get('/api/users/customers', { params }),
  getAllStaffs: (params) => http.get('/api/users/staffs', { params }),
  getStaff: (id) => http.get(`/api/users/staffs/${id}`),
  createStaff: (data) => http.post('/api/users/staffs', data),
  updateStaff: (id, data) => http.patch(`/api/users/staffs/${id}`, data),
  softDeleteStaff: (id) => http.delete(`/api/users/staffs/soft-delete/${id}`),
  getListDeletedStaffs: () => http.get('/api/users/trash-staffs'),
  restoreDeletedStaff: (id) => http.patch(`/api/users/staffs/restore-deleted/${id}`),
  deleteStaff: (id) => http.delete(`/api/users/staffs/${id}`),
  updateProfile: (id, data) => http.patch(`/api/users/update-profile/${id}`, data),
  changePassword: (id, data) => http.patch(`/api/users/change-password/${id}`, data)
}

export default usersApi
