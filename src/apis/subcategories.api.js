import http from '~/utils/http'

const subcategoriesApi = {
  getAllSubcategories: (params) => http.get('/api/subcategories', { params }),
  createSubcategory: (data) => http.post('/api/subcategories', data),
  getSubcategory: (id) => http.get(`/api/subcategories/${id}`),
  updateSubcategory: (id, data) => http.put(`/api/subcategories/${id}`, data),
  deleteSubcategory: (id) => http.delete(`/api/subcategories/${id}`)
}

export default subcategoriesApi
