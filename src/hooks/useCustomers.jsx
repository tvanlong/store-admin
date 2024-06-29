import { useQuery } from '@tanstack/react-query'
import usersApi from '~/apis/users.api'

export const useCustomers = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['customers'],
    queryFn: usersApi.getAllCustomers
  })
}
