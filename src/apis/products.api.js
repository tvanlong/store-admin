import http from '~/utils/http'

export const getAllProducts = (page, limit = 2) =>
  http.get('/api/products', {
    params: {
      _page: page,
      _limit: limit
    }
  })

export const getProduct = (id) => http.get(`/api/products/${id}`)

export const addProduct = (data) => http.post('/api/products', data)

export const updateProduct = (id, data) => http.put(`/api/products/${id}`, data)

export const deleteProduct = (id) => http.delete(`/api/products/${id}`)
