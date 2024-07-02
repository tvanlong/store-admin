import http from '~/utils/http'

const categoriesApi = {
  getAllCategories: (params) => http.get('/api/categories', { params }),
  getCategoryById: (id) => http.get(`/api/categories/${id}`),
  createCategory: (category) => http.post('/api/categories', category),
  updateCategory: (id, category) => http.put(`/api/categories/${id}`, category),
  deleteCategory: (id) => http.delete(`/api/categories/${id}`)
}

export default categoriesApi
