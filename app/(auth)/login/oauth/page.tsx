'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, Suspense } from 'react'
import { toast } from 'sonner'

export default function OauthPage() {
  const count = useRef(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('access_token')
  const refreshToken = searchParams.get('refresh_token')
  const message = searchParams.get('message')

  useEffect(() => {
    if (accessToken && refreshToken) {
      if (count.current === 0) {
        router.push('/')
        count.current++
      }
    } else {
      if (count.current === 0) {
        setTimeout(() => {
          toast.error(message)
        })
        count.current++
      }
    }
  }, [accessToken, refreshToken, router, message])

  return <Suspense fallback={<div>Loading...</div>}>{/* Nội dung khác nếu cần */}</Suspense>
}
