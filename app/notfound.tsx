'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Icons } from '@/components/ui/icons'

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Hiệu ứng đốm bay bay */}
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

      {/* Nội dung trang 404 */}
      <div className='text-center z-10'>
        <Icons.AlertTriangle className='h-24 w-24 text-yellow-500 mx-auto animate-bounce' />
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mt-4'>404 - Page Not Found</h1>
        <p className='text-gray-600 dark:text-gray-300 mt-2'>Oops! The page you are looking for doesn’t exist.</p>
        <div className='mt-6'>
          <Link href='/'>
            <Button className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 '>
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
