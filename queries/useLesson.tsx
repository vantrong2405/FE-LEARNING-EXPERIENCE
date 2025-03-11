import lessonApiRequest from '@/apiRequest/lesson'
import { useQuery } from '@tanstack/react-query'

export const useLessonByIdQuery = (limit: number, page: number, id: string) => {
  return useQuery({
    queryKey: ['lesson', page, limit, id],
    queryFn: () => lessonApiRequest.getLessonByCourseId(page, limit, id)
  })
}
