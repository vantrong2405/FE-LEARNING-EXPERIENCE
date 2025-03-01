'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import { pathURL } from '@/constants/path'
import { useForgotPasswordMutation } from '@/queries/useAuth'
import { ForgotPasswordBody, ForgotPasswordBodyType } from '@/schemaValidator/auth.schema'

import { handleErrorApi } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function FormForgotPassword() {
  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordBody),
    defaultValues: {
      email: ''
    }
  })
  const forgotPasswordMutation = useForgotPasswordMutation()
  const handleSubmit = async (body: ForgotPasswordBodyType) => {
    await forgotPasswordMutation.mutateAsync(body, {
      onSuccess: () => {},
      onError: (error) => {
        handleErrorApi({
          error,
          setError: form.setError
        })
      }
    })
  }
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
      <div className="fixed inset-0 dark:bg-[url('/dark:bg-pattern.svg')] opacity-5 z-0"></div>

      {/* Form Forgot Password */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Icons.GraduationCap className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r from-purple-400 to-pink-500 dark:text-transparent dark:bg-clip-text'>
            Forgot Your Password?
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Enter your email and we'll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='relative'>
              <Icons.Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='email'
                placeholder='Enter your email'
                type='email'
                className={`pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${
                  form.formState.errors.email && 'border-red-500'
                }`}
                {...form.register('email')}
              />
            </div>
            {form.formState.errors.email && (
              <p className='text-red-500 text-sm'>{form.formState.errors.email.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            onClick={() => form.handleSubmit(handleSubmit)()}
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 '
          >
            Send Reset Link
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Remember your password?{' '}
            <Link href={pathURL.login} className='text-purple-400 hover:text-purple-300'>
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
