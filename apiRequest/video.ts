import http from '@/lib/http'
import { VideoResponseType, VideoResType, VideoTypeBody } from '@/schemaValidator/video.schema'

const videoApiRequest = {
  getVideoByLessonId: (limit: number, page: number, id: string) =>
    http.get<VideoResType>(`video/lesson/${id}?limit=${limit}&page=${page}`),
  addVideo: (body: VideoTypeBody) => http.post<VideoResponseType>('video', body),
  delete: (id: string) => http.delete(`video/${id}`)
}

export default videoApiRequest
