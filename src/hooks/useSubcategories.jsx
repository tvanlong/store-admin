import { useQuery } from '@tanstack/react-query'
import subcategoriesApi from '~/apis/subcategories.api'

export const useSubcategories = (options = {}) => {
  return useQuery({
    ...options,
    queryKey: ['subcategories'],
    queryFn: subcategoriesApi.getAllSubcategories
  })
}
