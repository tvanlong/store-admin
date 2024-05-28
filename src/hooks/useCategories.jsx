import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '~/apis/categories.api'

export const useCategories = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['categories'],
    queryFn: getAllCategories
  })
}
