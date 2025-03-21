import videoApiRequest from '@/apiRequest/video'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useVideoByIdQuery = (limit: number, page: number, id: string) => {
  return useQuery({
    queryKey: ['video', page, limit, id],
    queryFn: () => videoApiRequest.getVideoByLessonId(page, limit, id)
  })
}
export const useAddVideoMutation = () => {
  return useMutation({
    mutationFn: videoApiRequest.addVideo
  })
}
export const useDeleteVideoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: videoApiRequest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['video']
      })
    }
  })
}
