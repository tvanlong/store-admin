import http from '~/utils/http'

export const getAllSubcategories = () => http.get('/api/subcategories')
