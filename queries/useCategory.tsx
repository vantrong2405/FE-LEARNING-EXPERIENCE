import categoryApiRequest from '@/apiRequest/category'
import { useQuery } from '@tanstack/react-query'

export const useCategoryListQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['category', page, limit],
    queryFn: () => categoryApiRequest.list(page, limit)
  })
}
