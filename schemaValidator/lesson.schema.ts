import { z } from 'zod'

const InstructorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  username: z.string(),
  avatarUrl: z.string().url(),
  bio: z.string(),
  gender: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().url(),
  bannerUrl: z.string().url(),
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  instructor: InstructorSchema,
  category: CategorySchema
})

const VideoSchema = z.object({
  id: z.string().uuid(),
  lessonId: z.string().uuid(),
  courseId: z.string().uuid(),
  orderLesson: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  videoUrl: z.string().url(),
  duration: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const LessonSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  order: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  course: CourseSchema,
  videos: z.array(VideoSchema)
})

const PaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})

const ResponseSchema = z.object({
  data: z.object({
    data: z.array(LessonSchema),
    pagination: PaginationSchema
  }),
  statusCode: z.number()
})

export type LessonResType = z.infer<typeof ResponseSchema>

export const lessonBody = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  courseId: z.string(),
  order: z.number().int().min(1, 'Order must be a positive integer'),
  isPublished: z.boolean()
})

export type LessonBodyType = z.infer<typeof lessonBody>

const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().url(),
  bannerUrl: z.string().url(),
  instructorId: z.string().uuid(),
  categoryId: z.string().uuid(),
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
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
  levelId: z.string().uuid()
})

const dataSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  order: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  course: courseSchema,
  videos: z.array(z.unknown())
})

export const apiResponseSchema = z.object({
  data: dataSchema,
  statusCode: z.number()
})

export type LessonResponseType = z.infer<typeof apiResponseSchema>
