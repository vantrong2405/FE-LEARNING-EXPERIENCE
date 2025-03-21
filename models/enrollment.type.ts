import { Course } from './course.type'
import { Payment } from './payment.type'
import { Student } from './user.type'

export interface Enrollment {
  id: string
  student: Student
  course: Course
  enrollmentDate: string
  expiryDate: string
  progress: number
  status: string
  payments: Payment[]
  lastAccess: string
}
