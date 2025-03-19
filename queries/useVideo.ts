import videoApiRequest from '@/apiRequest/video'
import { useQuery } from '@tanstack/react-query'

export const useVideoByIdQuery = (limit: number, page: number, id: string) => {
  return useQuery({
    queryKey: ['video', page, limit, id],
    queryFn: () => videoApiRequest.getVideoByLessonId(page, limit, id)
  })
}
