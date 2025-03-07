import { TokenPayload } from '@/lib/jwt.types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'
import { EntityError, HttpError } from '@/lib/http'
import { toast } from 'sonner'
import { UseFormSetError } from 'react-hook-form'
import { differenceInDays, differenceInWeeks, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  console.log('Lỗi nhận được:', error)

  if (error instanceof EntityError && Array.isArray(error.payload.error)) {
    error.payload.error.forEach((item: { field: string; message: string }) => {
      setError?.(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else if (error instanceof HttpError && error.payload?.message) {
    toast.error(error.payload.message, {
      duration: duration ?? 5000
    })
  } else {
    toast.error('Đã xảy ra lỗi, vui lòng thử lại!', {
      duration: duration ?? 5000
    })
  }
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

export const wrapServerApi = async <T>(fn: () => Promise<T>) => {
  let result = null
  try {
    result = await fn()
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
  return result
}

export const weeksAgo = (dateString: string) => {
  const date = parseISO(dateString)
  const daysAgo = differenceInDays(new Date(), date)
  return `${daysAgo} ngày trước`
}
