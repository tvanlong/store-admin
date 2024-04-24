import http from '~/utils/http'

export const getAllCategories = () => http.get('/api/categories')

export const getCategoryById = (id) => http.get(`/api/categories/${id}`)

export const createCategory = (category) => http.post('/api/categories', category)

export const updateCategory = (id, category) => http.put(`/api/categories/${id}`, category)

export const deleteCategory = (id) => http.delete(`/api/categories/${id}`)
