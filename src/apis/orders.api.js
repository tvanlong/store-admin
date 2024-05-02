import http from '~/utils/http'

export const getAllOrders = () => http.get('/api/orders')

export const updateStatusOrder = (userId, orderId, data) => http.patch(`/api/orders/${userId}/${orderId}`, data)
