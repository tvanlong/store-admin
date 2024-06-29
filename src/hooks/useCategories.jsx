import { useQuery } from '@tanstack/react-query'
import categoriesApi from '~/apis/categories.api'

export const useCategories = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['categories'],
    queryFn: categoriesApi.getAllCategories
  })
}
