import { Role, TokenType } from '@/constants/type'

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType]
export type RoleType = (typeof Role)[keyof typeof Role]
export interface TokenPayload {
  userId: number
  iat: number
  exp: number
  role: RoleType
}
