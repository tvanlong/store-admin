import http from '~/utils/http'

export const getAllVersions = (params) => http.get('/api/versions', { params })

export const getVersionById = (id) => http.get(`/api/versions/${id}`)

export const createVersion = (data) => http.post('/api/versions', data)

export const updateVersion = (id, data) => http.put(`/api/versions/${id}`, data)

export const deleteVersion = (id) => http.delete(`/api/versions/${id}`)
