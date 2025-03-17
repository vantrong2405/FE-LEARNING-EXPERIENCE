'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import { pathURL } from '@/constants/path'
import { useLoginMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  handleErrorApi,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { LoginBody, LoginBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { getOauthGoogleUrlQuery } from '@/queries/useLoginOathGoogle'

export default function FormLogin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  if (accessToken && refreshToken) {
    router.back()
  }

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

        if (access_token && refresh_token) {
          setAccessTokenToLocalStorage(access_token)
          setRefreshTokenToLocalStorage(refresh_token)
        }
        router.push(pathURL.home)
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

  const gogleOauthUrl = getOauthGoogleUrlQuery()

  return (
    <div className='min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Form Login */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Icons.GraduationCap className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-500 dark:text-transparent bg-clip-text'>
            Welcome back to ELearn
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Enter your credentials to access your account
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
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500'
          >
            Sign In
          </Button>
          <Link href={gogleOauthUrl}>
            <Button variant='secondary' className='w-full flex items-center'>
              <Icons.Globe className='mr-2' />
              Sign in with Google
            </Button>
          </Link>

          <div className='text-sm text-center text-gray-400'>
            Don't have an account?{' '}
            <Link href={pathURL.register} className='text-purple-400 hover:text-purple-300'>
              Sign up
            </Link>
          </div>
          <Link href={pathURL.forgot_password} className='text-sm text-center text-purple-400 hover:text-purple-300'>
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
