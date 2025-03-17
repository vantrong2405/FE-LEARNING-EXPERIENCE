import { Course } from './course.type'
import { Student } from './user.type'

export interface Review {
  id: string
  student: Student
  course: Course
  rating: number
  title: string
  content: string
  date: string
  status: string
  helpful: number
  unhelpful: number
  reported: boolean
}
