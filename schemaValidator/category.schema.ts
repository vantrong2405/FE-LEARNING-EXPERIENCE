import { z } from 'zod'

// Schema cho Instructor
export const InstructorSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  roleId: z.number(),
  verify: z.number(),
  status_account: z.number(),
  dateOfBirth: z.string(),
  avatarUrl: z.string().nullable(),
  bio: z.string().nullable(),
  gender: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
})

// Schema cho Course
export const CourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  instructor: InstructorSchema
})

// Schema cho Category
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  courses: z.array(CourseSchema)
})

// Schema cho Response API
export const GetCategoryRes = z.object({
  statusCode: z.number(),
  data: z.object({
    data: z.array(CategorySchema)
  })
})

// Export Type
export type GetCategoryResType = z.infer<typeof GetCategoryRes>
export type CategoryType = z.infer<typeof CategorySchema>
export type CourseType = z.infer<typeof CourseSchema>
export type InstructorType = z.infer<typeof InstructorSchema>
