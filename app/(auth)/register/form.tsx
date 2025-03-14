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
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, handleErrorApi } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useRegisterMutation } from '@/queries/useAuth'
import { useForm } from 'react-hook-form'
import { RegisterBody, RegisterBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export default function FormRegister() {
  const router = useRouter()

  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  if (accessToken && refreshToken) {
    router.back()
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)
  const registerMutation = useRegisterMutation()

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: undefined,
      role: undefined
    }
  })

  const handleSubmit = (body: RegisterBodyType) => {
    if (body.password !== body.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }

    registerMutation.mutate(body, {
      onSuccess: (data) => {
        form.reset()
        toast.success(data.payload.data.message)
      },
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
                {...form.register('name')}
                className={`pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.name ? 'border-red-500' : ''}`}
                placeholder='Enter your full name'
              />
            </div>
            {form.formState.errors.name && <p className='text-red-500 text-sm'>{form.formState.errors.name.message}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='relative'>
              <Icons.Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='email'
                {...form.register('email')}
                className={`pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.email ? 'border-red-500' : ''}`}
                placeholder='Enter your email'
                type='email'
              />
            </div>
            {form.formState.errors.email && (
              <p className='text-red-500 text-sm'>{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label>Date Of Birth</Label>
            <div className='relative'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'dark:bg-gray-700 border-gray-600 placeholder-gray-400 w-full pl-3 text-left font-normal',
                      form.formState.errors.dateOfBirth && 'border-red-500',
                      !form.watch('dateOfBirth') && 'text-muted-foreground'
                    )}
                  >
                    {form.watch('dateOfBirth') ? (
                      format(new Date(form.watch('dateOfBirth')), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={form.watch('dateOfBirth') || new Date()}
                    onSelect={(date) => form.setValue('dateOfBirth', date || new Date())}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {form.formState.errors.dateOfBirth && (
              <p className='text-red-500 text-sm'>{form.formState.errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Icons.Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='password'
                {...form.register('password')}
                className={`pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.password ? 'border-red-500' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a password'
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
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <div className='relative'>
              <Icons.Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='confirmPassword'
                {...form.register('confirmPassword')}
                className={`pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.confirmPassword ? 'border-red-500' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
              />
              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showConfirmPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className='text-red-500 text-sm'>{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='roleId'>Select Role</Label>
            <Select onValueChange={(value) => form.setValue('role', String(value))}>
              <SelectTrigger
                className={`w-full dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.confirmPassword ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder='Select Role ' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value='User'>User</SelectItem>
                  <SelectItem value='Instructor'>Intructer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {form.formState.errors.role && <p className='text-red-500 text-sm'>{form.formState.errors.role.message}</p>}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            onClick={() => form.handleSubmit(handleSubmit)()}
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 '
          >
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
