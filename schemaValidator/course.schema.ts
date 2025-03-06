import { z } from 'zod'

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
  bio: z.string(),
  gender: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const CourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().url(),
  bannerUrl: z.string().url(),
  instructorId: z.number(),
  categoryId: z.number(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  rating: z.number(),
  totalReviews: z.number(),
  moneyBackGuarantee: z.boolean(),
  videoHours: z.number(),
  articlesCount: z.number(),
  downloadableResources: z.number(),
  lifetimeAccess: z.boolean(),
  certificate: z.boolean(),
  courseOverview: z.string(),
  learningObjectives: z.string(),
  courseFeatures: z.string(),
  requirements: z.string(),
  levelId: z.number(),
  instructor: InstructorSchema,
  enrollments: z.array(z.unknown()),
  category: CategorySchema
})

export const GetCourseRes = z.object({
  statusCode: z.number(),
  data: z.object({
    data: z.array(CourseSchema)
  })
})

// Export Type
export type GetCourseResType = z.infer<typeof GetCourseRes>
export type CourseType = z.infer<typeof CourseSchema>
export type InstructorType = z.infer<typeof InstructorSchema>
export type CategoryType = z.infer<typeof CategorySchema>
