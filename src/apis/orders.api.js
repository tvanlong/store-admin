import http from '~/utils/http'

export const getAllOrders = () => http.get('/api/orders')
