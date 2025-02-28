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

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <div className='min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none z-0'>
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 rounded-full bg-pink-500 opacity-50'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 dark:bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>

      {/* Form Register */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Icons.GraduationCap className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r from-purple-400 to-pink-500 dark:text-transparent dark:bg-clip-text'>
            Create your ELearn account
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>Join our community of learners today</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <div className='relative'>
              <Icons.User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='name'
                placeholder='Enter your full name'
                className='pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='relative'>
              <Icons.Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='email'
                placeholder='Enter your email'
                type='email'
                className='pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Icons.Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a password'
                className='pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <div className='relative'>
              <Icons.Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
                className='pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400'
              />
              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showConfirmPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 '>
            Create Account
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Already have an account?{' '}
            <Link href={pathURL.login} className='text-purple-400 hover:text-purple-300'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
