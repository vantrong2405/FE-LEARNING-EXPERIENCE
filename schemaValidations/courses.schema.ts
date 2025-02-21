import z from 'zod'

export const CreateCourseBody = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(10000),
  price: z.coerce.number().positive(),
  instructor_id: z.number()
})

export type CreateCourseBodyType = z.TypeOf<typeof CreateCourseBody>

export const CourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  instructor_id: z.number(),
  created_at: z.date()
})

export type CourseType = z.TypeOf<typeof CourseSchema>

export const CourseRes = z.object({
  data: CourseSchema,
  message: z.string()
})

export type CourseResType = z.TypeOf<typeof CourseRes>

export const CourseListRes = z.object({
  data: z.array(CourseSchema),
  message: z.string()
})

export type CourseListResType = z.TypeOf<typeof CourseListRes>

export const UpdateCourseBody = CreateCourseBody.partial()
export type UpdateCourseBodyType = z.TypeOf<typeof UpdateCourseBody>

export const CourseParams = z.object({
  id: z.coerce.number()
})
export type CourseParamsType = z.TypeOf<typeof CourseParams>
