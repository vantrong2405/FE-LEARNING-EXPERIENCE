import courseApiRequest from '@/apiRequest/course'
import { useQuery } from '@tanstack/react-query'

export const useCourseQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['course', page, limit],
    queryFn: () => courseApiRequest.list(page, limit)
  })
}
