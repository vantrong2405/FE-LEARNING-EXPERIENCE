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

export const videoSchema = z.object({
  lessonId: z.string().uuid(),
  courseId: z.string().uuid(),
  orderLesson: z.number().int().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string(),
  duration: z.number().int().positive()
})

export type VideoTypeBody = z.infer<typeof videoSchema>

export const lessonSchema = z.object({
  id: z.string().uuid(),
  lessonId: z.string().uuid(),
  courseId: z.string().uuid(),
  orderLesson: z.number().int().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string(),
  duration: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lesson: z.object({
    id: z.string().uuid(),
    courseId: z.string().uuid(),
    title: z.string().min(1),
    content: z.string().min(1),
    order: z.number().int().min(1),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
})

export const apiResponseSchema = z.object({
  data: lessonSchema,
  statusCode: z.number().int()
})

export type VideoResponseType = z.infer<typeof apiResponseSchema>
