import http from '@/lib/http'
import {
  ForgotPasswordBodyType,
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterRes,
  ResetPasswordBodyType,
  VerifyBodyType,
  VerifyEmailPasswordBodyType,
  VerifyResType
} from '@/schemaValidator/auth.schema'

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number
    payload: RefreshTokenResType
  }> | null,
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),

  register: (body: RegisterBodyType) => http.post<RegisterRes>('auth/register', body),
  verifyEmail: (body: VerifyBodyType) => http.post<VerifyResType>('auth/verify-email', body),
  logout: (body: LogoutBodyType) => http.post('auth/logout', body),
  forgotPassword: (body: ForgotPasswordBodyType) => http.post('auth/forgot-password', body),
  verifyEmailPassword: (body: VerifyEmailPasswordBodyType) => http.post('auth/verify-forgot-password', body),
  resetPassword: (body: ResetPasswordBodyType) => http.post('auth/reset-password', body)
}
export default authApiRequest
