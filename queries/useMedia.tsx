import { mediaApiRequest } from '@/apiRequest/media'
import { useMutation } from '@tanstack/react-query'

export const useUploadMediaMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequest.upload
  })
}

export const useUploadVideoMediaMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequest.upload_video
  })
}
