import levelApiRequest from '@/apiRequest/level'
import { useQuery } from '@tanstack/react-query'

export const useLevelListQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['level', page, limit],
    queryFn: () => levelApiRequest.list(page, limit)
  })
}
