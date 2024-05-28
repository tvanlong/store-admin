import { useQuery } from '@tanstack/react-query'
import { getAllSubcategories } from '~/apis/subcategories.api'

export const useSubcategories = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  })
}
