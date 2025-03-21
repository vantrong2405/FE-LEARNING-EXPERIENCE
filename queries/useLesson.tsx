import lessonApiRequest from '@/apiRequest/lesson'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useLessonByIdQuery = (limit: number, page: number, id: string) => {
  return useQuery({
    queryKey: ['lesson', page, limit, id],
    queryFn: () => lessonApiRequest.getLessonByCourseId(page, limit, id)
  })
}
export const useAddLessonMutation = () => {
  return useMutation({
    mutationFn: lessonApiRequest.addLesson
  })
}
export const useDeleteLessonMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: lessonApiRequest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lesson']
      })
    }
  })
}
