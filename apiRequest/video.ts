import http from '@/lib/http'
import { VideoResType } from '@/schemaValidator/video.schema'

const videoApiRequest = {
  getVideoByLessonId: (limit: number, page: number, id: string) =>
    http.get<VideoResType>(`video/lesson/${id}?limit=${limit}&page=${page}`)
}

export default videoApiRequest
