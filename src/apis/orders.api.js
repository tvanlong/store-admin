import http from '~/utils/http'

const ordersApi = {
  getAllOrders: (params) => http.get('/api/orders', { params }),
  updateStatusOrder: (userId, orderId, data) => http.patch(`/api/orders/${userId}/${orderId}`, data)
}

export default ordersApi
