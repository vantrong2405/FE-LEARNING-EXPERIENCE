export interface User {
  id: number
  username: string
  name: string
  email: string
  password: string
  avatarUrl: string | null
  bio: string | null
  gender: string | null
  roleId: number
  email_verify_token: string | null
  forgot_password_token: string | null
  verify: number
  dateOfBirth: Date
  createdAt: Date
  updatedAt: Date
}
