import { z } from 'zod'

// Schema cho Course (dành cho Level)
export const CourseSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string()
})

// Schema cho Level
export const LevelSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  courses: z.array(CourseSummarySchema)
})

// Schema cho Response API
export const GetLevelRes = z.object({
  statusCode: z.number(),
  data: z.object({
    data: z.array(LevelSchema)
  })
})

// Export Type
export type GetLevelResType = z.infer<typeof GetLevelRes>
export type LevelType = z.infer<typeof LevelSchema>
export type CourseSummaryType = z.infer<typeof CourseSummarySchema>
