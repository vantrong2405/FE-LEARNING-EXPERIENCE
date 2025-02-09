'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <Card className='w-full max-w-md z-10 bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <GraduationCap className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text'>
            Welcome back to EduMall
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-gray-200'>
              Email
            </Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='email'
                placeholder='Enter your email'
                type='email'
                className='pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-gray-200'>
              Password
            </Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                className='pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'>
            Sign In
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Don't have an account?{' '}
            <Link href='#' className='text-purple-400 hover:text-purple-300'>
              Sign up
            </Link>
          </div>
          <Link href='#' className='text-sm text-center text-purple-400 hover:text-purple-300'>
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
