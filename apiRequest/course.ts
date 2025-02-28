import http from '@/lib/http'
import { GetCourseResType } from '@/schemaValidator/course.schema'

const courseApiRequest = {
  list: (limit: number, page: number) =>
    http.get<GetCourseResType>(`course?limit=${limit}&page=${page}`, {
      next: { tags: ['course'] }
    })
}

export default courseApiRequest
