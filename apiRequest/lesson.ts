import http from '@/lib/http'
import { LessonResType } from '@/schemaValidator/lesson.schema'

const lessonApiRequest = {
  getLessonByCourseId: (limit: number, page: number, id: string) =>
    http.get<LessonResType>(`lesson/course/${id}?limit=${limit}&page=${page}`)
}

export default lessonApiRequest
