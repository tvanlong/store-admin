import http from '~/utils/http'

const productsApi = {
  getAllProducts: (params) => http.get('/api/products', { params }),
  getProduct: (id) => http.get(`/api/products/${id}`),
  addProduct: (data) => http.post('/api/products', data),
  updateProduct: (id, data) => http.put(`/api/products/${id}`, data),
  deleteProduct: (id) => http.delete(`/api/products/${id}`)
}

export default productsApi
