'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { pathURL } from '@/constants/path'
import { GraduationCap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FormEmailVerificationSuccess() {
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

      {/* Form Email Verification Success */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <GraduationCap className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r from-purple-400 to-pink-500 dark:text-transparent dark:bg-clip-text'>
            Email Verified Successfully!
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Thank you for verifying your email address. Your account is now fully activated.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-center'>
            <CheckCircle className='h-16 w-16 text-green-500 animate-bounce' />
          </div>
          <p className='text-center text-gray-500 dark:text-gray-300'>
            You can now access all features of ELearn. Start exploring courses and begin your learning journey!
          </p>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Link href={pathURL.login} className='w-full'>
            <Button className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 '>
              Log In to Your Account
            </Button>
          </Link>
          <Link href={pathURL.home} className='w-full'>
            <Button variant='outline' className='w-full text-purple-400 border-purple-400 hover:dark:bg-purple-400/10'>
              Return to Homepage
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
