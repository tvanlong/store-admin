import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '~/apis/orders.api'

export const useOrders = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['orders'],
    queryFn: getAllOrders
  })
}
