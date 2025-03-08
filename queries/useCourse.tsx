import courseApiRequest from '@/apiRequest/course'
import { useQuery } from '@tanstack/react-query'

export const useCourseQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['course', page, limit],
    queryFn: () => courseApiRequest.list(page, limit)
  })
}
export const useGetCourseQuery = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApiRequest.getCourse(id)
  })
}
export const useSearchCourseQuery = (limit: number, page: number, query: string) => {
  return useQuery({
    queryKey: ['course', page, limit, query],
    queryFn: () => courseApiRequest.courseSearch(page, limit, query)
  })
}
