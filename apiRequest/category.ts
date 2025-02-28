import http from '@/lib/http'
import { GetCategoryResType } from '@/schemaValidator/category.schema'

const categoryApiRequest = {
  list: (limit: number, page: number) =>
    http.get<GetCategoryResType>(`category?limit=${limit}&page=${page}`, { next: { tags: ['category'] } })
}
export default categoryApiRequest
