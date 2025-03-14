'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import { pathURL } from '@/constants/path'
import { useForm } from 'react-hook-form'
import { LoginBody, LoginBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import {
  decodeToken,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  handleErrorApi,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from '@/lib/utils'
import { toast } from 'sonner'

export default function AdminLogin() {
  const router = useRouter()

  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  if (accessToken && refreshToken) {
    router.back()
  }
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const loginMutation = useLoginMutation()

  const handleLogin = (body: LoginBodyType) => {
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        const access_token = data.payload.data.accessToken
        const refresh_token = data.payload.data.refreshToken
        const token = decodeToken(access_token)
        if (token.role === 'User') {
          toast.warning('You dont have permission to log in here!')
          router.push(pathURL.login)
          return
        }

        if (access_token && refresh_token) {
          setAccessTokenToLocalStorage(access_token)
          setRefreshTokenToLocalStorage(refresh_token)
        }
        router.push(pathURL.manage)
      },
      onError: (error) => {
        handleErrorApi({
          error,
          setError: form.setError
        })
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      form.handleSubmit(handleLogin)()
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className='min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Floating particles effect */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 rounded-full bg-blue-500 opacity-50'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 dark:bg-[url('/admin-bg-pattern.svg')] opacity-5 z-0"></div>

      {/* Admin Login Form */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Icons.ShieldCheck className='h-12 w-12 text-blue-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r dark:from-blue-400 dark:to-green-500 dark:text-transparent bg-clip-text'>
            ELearn Admin Portal
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='Enter your email'
              type='email'
              {...form.register('email')}
              className={`dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.email ? 'border-red-500' : ''}`}
              onKeyDown={handleKeyDown}
            />
            {form.formState.errors.email && (
              <p className='text-red-500 text-sm'>{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                {...form.register('password')}
                className={`dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.password ? 'border-red-500' : ''}`}
                onKeyDown={handleKeyDown}
              />

              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className='text-red-500 text-sm'>{form.formState.errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            onClick={() => form.handleSubmit(handleLogin)()}
            className='w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
          >
            Sign In to Admin
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Not an admin?{' '}
            <Link href={pathURL.login} className='text-blue-400 hover:text-blue-300'>
              Go to user login
            </Link>
          </div>
          <Link href={pathURL.forgot_password} className='text-sm text-center text-blue-400 hover:text-blue-300'>
            Forgot admin password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
