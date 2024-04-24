import http from '~/utils/http'

export const getAllSubcategories = () => http.get('/api/subcategories')

export const createSubcategory = (data) => http.post('/api/subcategories', data)

export const getSubcategory = (id) => http.get(`/api/subcategories/${id}`)

export const updateSubcategory = (id, data) => http.put(`/api/subcategories/${id}`, data)

export const deleteSubcategory = (id) => http.delete(`/api/subcategories/${id}`)
