'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import { pathURL } from '@/constants/path'
import { useResetMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import { ResetPasswordBody, ResetPasswordBodyType } from '@/schemaValidator/auth.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { handleErrorApi } from '@/lib/utils'

export default function FormResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(ResetPasswordBody),
    defaultValues: {
      forgot_password_token: '',
      new_password: '',
      confirm_password: ''
    }
  })
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)
  const resetPaswordMutation = useResetMutation()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlToken = new URLSearchParams(window.location.search).get('token')
      setToken(urlToken)
    }
  }, [])

  const handleSubmit = async (body: ResetPasswordBodyType) => {
    if (!token) {
      toast.error('Invalid or missing reset token.')
      return
    }

    if (resetPaswordMutation.isPending) return

    if (body.new_password !== body.confirm_password) {
      form.setError('confirm_password', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }

    resetPaswordMutation.mutate(
      { ...body, forgot_password_token: token },
      {
        onSuccess: () => {
          toast.success('Password reset successfully.')
          router.push(pathURL.login)
        },
        onError: (error) => {
          handleErrorApi({
            error,
            setError: form.setError
          })
        }
      }
    )
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
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 dark:bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>

      {/* Reset Password Form */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Icons.Key className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r from-purple-400 to-pink-500 dark:text-transparent dark:bg-clip-text'>
            Reset Your Password
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='newPassword'>New Password</Label>
            <div className='relative'>
              <Icons.Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='newPassword'
                type={showNewPassword ? 'text' : 'password'}
                {...form.register('new_password')}
                placeholder='Enter your new password'
                className={`pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.new_password ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={toggleNewPasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showNewPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.new_password && (
              <p className='text-red-500 text-sm'>{form.formState.errors.new_password.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
            <div className='relative'>
              <Icons.Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                {...form.register('confirm_password')}
                placeholder='Confirm your new password'
                className={`pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.confirm_password ? 'border-red-500' : ''}`}
              />

              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showConfirmPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.confirm_password && (
              <p className='text-red-500 text-sm'>{form.formState.errors.confirm_password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          >
            Reset Password
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Remember your password?{' '}
            <Link href={pathURL.login} className='text-purple-400 hover:text-purple-300'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
