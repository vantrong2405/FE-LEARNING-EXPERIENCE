import http from '@/lib/http'
import { CoursesResType, GetCourseResType } from '@/schemaValidator/course.schema'

const courseApiRequest = {
  list: (limit: number, page: number) =>
    http.get<GetCourseResType>(`course?limit=${limit}&page=${page}`, {
      next: { tags: ['course'] }
    }),
  getCourse: (id: string) => http.get<CoursesResType>(`course/${id}`),
  courseSearch: (limit: number, page: number, query: string) =>
    http.get<GetCourseResType>(`course/search?query=${query}&page=${page}&limit=${limit}`),
  delete: (id: string) => http.delete(`course/${id}`)
}

export default courseApiRequest
