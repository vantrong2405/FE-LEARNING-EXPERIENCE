import courseApiRequest from '@/apiRequest/course'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCourseQuery = (page: number, limit: number, p0?: { enabled: boolean }) => {
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
export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: courseApiRequest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course']
      })
    }
  })
}
