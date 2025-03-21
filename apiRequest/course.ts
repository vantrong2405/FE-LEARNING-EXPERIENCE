import http from '@/lib/http'
import { CoursesBody, CoursesResType, CreateCourseResType, GetCourseResType } from '@/schemaValidator/course.schema'

const courseApiRequest = {
  list: (limit: number, page: number) =>
    http.get<GetCourseResType>(`course?limit=${limit}&page=${page}`, {
      next: { tags: ['course'] }
    }),
  getCourse: (id: string) => http.get<CoursesResType>(`course/${id}`),
  courseSearch: (limit: number, page: number, query: string, categoryId?: string, levelId?: string) => {
    const params = new URLSearchParams({ query, page: page.toString(), limit: limit.toString() })
    if (categoryId) params.append('categoryId', categoryId)
    if (levelId) params.append('levelId', levelId)

    return http.get<GetCourseResType>(`course?${params.toString()}`)
  },

  delete: (id: string) => http.delete(`course/${id}`),
  addCouse: (body: CoursesBody) => http.post<CreateCourseResType>(`course`, body)
}

export default courseApiRequest
