import { useQuery } from '@tanstack/react-query'
import ordersApi from '~/apis/orders.api'

export const useOrders = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['orders'],
    queryFn: ordersApi.getAllOrders
  })
}
