import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_BACKEND_END_POINT: z.string(),
  NEXT_PUBLIC_URL: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_BACKEND_END_POINT: process.env.NEXT_PUBLIC_BACKEND_END_POINT, //http://localhost:4000
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL //http://localhost:3000
})

if (!configProject.success) {
  console.error(configProject.error.errors)
  throw new Error('các khai báo biến môi trường không hợp lệ')
}

const envConfig = configProject.data
export default envConfig
