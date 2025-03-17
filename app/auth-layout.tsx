'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from '@/lib/utils'
import { pathURL } from '@/constants/path'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter() // Sử dụng useRouter để thực hiện redirect

  useEffect(() => {
    const access_token = searchParams?.get('access_token')
    const refresh_token = searchParams?.get('refresh_token')
    console.log('🚀 ~ useEffect ~ access_token:', access_token)
    console.log('🚀 ~ useEffect ~ refresh_token:', refresh_token)

    if (access_token && refresh_token) {
      setAccessTokenToLocalStorage(access_token)
      setRefreshTokenToLocalStorage(refresh_token)
      router.push(pathURL.home)
    }
  }, [pathname, searchParams, router])

  return <>{children}</>
}
