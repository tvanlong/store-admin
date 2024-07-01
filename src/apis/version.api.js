import http from '~/utils/http'

const versionApi = {
  getAllVersions: (params) => http.get('/api/versions', { params }),
  getAllAccessories: (params) => http.get('/api/versions/accessory', { params }),
  getVersionById: (id) => http.get(`/api/versions/${id}`),
  createVersion: (data) => http.post('/api/versions', data),
  updateVersion: (id, data) => http.put(`/api/versions/${id}`, data),
  softDeleteVersion: (id) => http.delete(`/api/versions/soft-delete/${id}`),
  getListDeletedVersions: (params) => http.get('/api/versions/trash-versions', { params }),
  restoreDeletedVersion: (id) => http.patch(`/api/versions/restore-deleted/${id}`),
  deleteVersion: (id) => http.delete(`/api/versions/${id}`)
}

export default versionApi
