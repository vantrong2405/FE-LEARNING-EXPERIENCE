import { z } from 'zod'

export const LessonSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  order: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const VideoLessonSchema = z.object({
  id: z.string().uuid(),
  lessonId: z.string().uuid(),
  courseId: z.string().uuid(),
  orderLesson: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  videoUrl: z.string().url(),
  duration: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lesson: LessonSchema
})

export const VideoResponseSchema = z.object({
  data: z.array(VideoLessonSchema),
  statusCode: z.number()
})

export type VideoResType = z.infer<typeof VideoResponseSchema>
