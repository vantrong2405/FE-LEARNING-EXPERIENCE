import { Button } from '@/components/ui/button'
import { pathURL } from '@/constants/path'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className='container mx-auto px-4 py-16 md:py-24 lg:py-32 xl:py-40'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20'>
        <motion.div
          className='lg:w-1/2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text'>
              Unlock Your Potential
            </span>
            <br />
            <span className='text-gray-900 dark:text-white'>Learn Anything, Anytime</span>
          </h1>
          <p className='text-gray-700 dark:text-gray-300 mb-8 text-lg md:text-xl leading-relaxed max-w-2xl'>
            Discover a world of knowledge with our cutting-edge online learning platform. Enhance your skills and
            achieve your goals with expert-led courses tailored to your needs.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link href={pathURL.login}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold w-full sm:w-auto text-white'
              >
                Get Started
              </Button>
            </Link>
            <Link href={pathURL.dashboard_courses}>
              <Button size='lg' variant='outline' className='w-full sm:w-auto'>
                Explore Courses
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className='lg:w-1/2 relative'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='relative w-full max-w-lg mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl filter blur-3xl opacity-30 animate-pulse'></div>
            <Image
              src='https://cdn.pixabay.com/photo/2020/09/25/10/10/education-5600987_640.png'
              alt='Online Learning'
              width={600}
              height={400}
              className='rounded-2xl shadow-2xl relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-300'
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
