import { useQuery } from '@tanstack/react-query'
import { getAllCustomers } from '~/apis/users.api'

export const useCustomers = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['customers'],
    queryFn: getAllCustomers
  })
}
