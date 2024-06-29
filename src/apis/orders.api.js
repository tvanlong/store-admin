import http from '~/utils/http'

const ordersApi = {
  getAllOrders: () => http.get('/api/orders'),
  updateStatusOrder: (userId, orderId, data) => http.patch(`/api/orders/${userId}/${orderId}`, data)
}

export default ordersApi
