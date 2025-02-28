import http from '@/lib/http'
import { GetLevelResType } from '@/schemaValidator/level.schema'

const levelApiRequest = {
  list: (limit: number, page: number) =>
    http.get<GetLevelResType>(`level?limit=${limit}&page=${page}`, { next: { tags: ['level'] } })
}
export default levelApiRequest
