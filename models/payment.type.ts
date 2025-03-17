import { Course } from './course.type'
import { Student } from './user.type'

export interface PaymentDetails {
  cardLast4?: string
  cardBrand?: string
  expiryDate?: string
  bankName?: string
  accountLast4?: string
  walletProvider?: string
  accountEmail?: string
  errorMessage?: string
}

export interface Payment {
  id: string
  student: Student
  course: Course
  amount: number
  date: string
  method: string
  status: string
  transactionId?: string
  invoiceNumber?: string
  paymentDetails?: PaymentDetails
}
