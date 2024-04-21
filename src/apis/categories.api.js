import http from '~/utils/http'

export const getAllCategories = () => http.get('/api/categories')
