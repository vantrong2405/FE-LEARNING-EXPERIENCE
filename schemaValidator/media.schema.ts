import { z } from 'zod'

export const uploadFileResponseSchema = z.object({
  data: z.object({
    fileName: z.string().min(1, 'File name is required'),
    url: z.string().url('Invalid URL format'),
    mimetype: z.string().min(1, 'MIME type is required'),
    size: z.number().min(1, 'Size must be greater than 0')
  }),
  statusCode: z.literal(201)
})

export type UploadFileResType = z.infer<typeof uploadFileResponseSchema>
