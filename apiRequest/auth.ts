import http from '@/lib/http'
import { LoginBodyType, LoginResType, RefreshTokenResType } from '@/schemaValidator/auth.schema'

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number
    payload: RefreshTokenResType
  }> | null,
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('api/auth/login', body, {
      baseUrl: ''
    })
}
export default authApiRequest
