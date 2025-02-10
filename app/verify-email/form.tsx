import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FormEmailVerificationSuccess() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <Card className='w-full max-w-md z-10 bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <GraduationCap className='h-12 w-12 text-purple-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text'>
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
          <p className='text-center text-gray-300'>
            You can now access all features of EduMall. Start exploring courses and begin your learning journey!
          </p>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Link href='/login' className='w-full'>
            <Button className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'>
              Log In to Your Account
            </Button>
          </Link>
          <Link href='/' className='w-full'>
            <Button variant='outline' className='w-full text-purple-400 border-purple-400 hover:bg-purple-400/10'>
              Return to Homepage
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
