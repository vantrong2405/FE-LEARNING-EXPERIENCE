import http from '@/lib/http'
import {
  LoginBodyType,
  LoginResType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterRes,
  VerifyBodyType,
  VerifyResType
} from '@/schemaValidator/auth.schema'

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number
    payload: RefreshTokenResType
  }> | null,
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),

  register: (body: RegisterBodyType) => http.post<RegisterRes>('auth/register', body),
  verifyEmail: (body: VerifyBodyType) => http.post<VerifyResType>('auth/verify-email', body)
}
export default authApiRequest
