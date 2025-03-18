import http from '@/lib/http'
import { UploadFileResType } from '@/schemaValidator/media.schema'

export const mediaApiRequest = {
  upload: (formData: FormData) => http.post<UploadFileResType>('media/upload-image', formData)
}
