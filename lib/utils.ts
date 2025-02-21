import { TokenPayload } from '@/lib/jwt.types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('access_token') : null
}
export const getRefreshTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('refresh_token') : null
}
export const setAccessTokenToLocalStorage = (value: string) => {
  return isBrowser && localStorage.setItem('access_token', value)
}
export const setRefreshTokenToLocalStorage = (value: string) => {
  return isBrowser && localStorage.setItem('refresh_token', value)
}

export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('access_token')
  isBrowser && localStorage.removeItem('refresh_token')
}

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload
}
