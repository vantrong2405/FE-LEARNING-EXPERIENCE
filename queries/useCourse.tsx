import courseApiRequest from '@/apiRequest/course'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
export const useSearchCourseQuery = (
  limit: number,
  page: number,
  query: string,
  categoryId?: string,
  levelId?: string
) => {
  return useQuery({
    queryKey: ['course', page, limit, query, categoryId, levelId],
    queryFn: () => courseApiRequest.courseSearch(limit, page, query, categoryId, levelId),
    enabled: !!query || !!categoryId || !!levelId
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
export const useAddCourseMutation = () => {
  return useMutation({
    mutationFn: courseApiRequest.addCouse
  })
}
