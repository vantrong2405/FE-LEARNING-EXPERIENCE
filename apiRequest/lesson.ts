import http from '@/lib/http'
import { LessonBodyType, LessonResponseType, LessonResType } from '@/schemaValidator/lesson.schema'

const lessonApiRequest = {
  getLessonByCourseId: (limit: number, page: number, id: string) =>
    http.get<LessonResType>(`lesson/course/${id}?limit=${limit}&page=${page}`),
  addLesson: (body: LessonBodyType) => http.post<LessonResponseType>('lesson', body),
  delete: (id: string) => http.delete(`lesson/${id}`)
}

export default lessonApiRequest
