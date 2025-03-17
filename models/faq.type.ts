import { CourseSummary } from './user.type'

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  course?: CourseSummary
  isPublished: boolean
  order: number
}
