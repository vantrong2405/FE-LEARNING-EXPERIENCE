import { z } from 'zod'

export const InstructorSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
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
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().url(),
  bannerUrl: z.string().url(),
  instructorId: z.string(),
  categoryId: z.string(),
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
  levelId: z.string(),
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

export const CreateCourseBody = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(10000),
  price: z.coerce.number().positive(),
  instructor_id: z.string()
})

export type CreateCourseBodyType = z.TypeOf<typeof CreateCourseBody>

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
  id: z.coerce.string()
})
export type CourseParamsType = z.TypeOf<typeof CourseParams>

const VideoSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  videoUrl: z.string().url(),
  duration: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})

const LessonSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string(),
  content: z.string(),
  order: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  videos: z.array(VideoSchema)
})

const ReviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

const CoursesSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().url(),
  bannerUrl: z.string().url(),
  instructorId: z.string(),
  categoryId: z.string(),
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
  levelId: z.string(),
  instructor: InstructorSchema,
  enrollments: z.array(z.unknown()),
  category: CategorySchema,
  lessons: z.array(LessonSchema),
  reviews: z.array(ReviewSchema),
  payments: z.array(z.unknown())
})

const CourseResSchema = z.object({
  data: CoursesSchema,
  statusCode: z.number()
})

export type CoursesResType = z.TypeOf<typeof CourseResSchema>
