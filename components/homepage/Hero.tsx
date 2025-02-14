import { Button } from '@/components/ui/button'
import { pathURL } from '@/constants/path'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='mx-auto px-4 py-24 md:py-32 lg:py-40'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
        <div className='lg:w-1/2 animate-fade-in-up'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text'>
              Unlock Your Potential
            </span>
            <br />
            <span>Learn Anything, Anytime</span>
          </h1>
          <p className='dark:text-gray-300 mb-8 text-lg md:text-xl leading-relaxed'>
            Discover a world of knowledge with our cutting-edge online learning platform. Enhance your skills and
            achieve your goals with expert-led courses tailored to your needs.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link href={pathURL.login}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold w-full sm:w-auto'
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
        </div>
        <div className='lg:w-1/2 relative animate-fade-in-up animation-delay-300'>
          <div className='relative w-full max-w-lg mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl filter blur-3xl opacity-30'></div>
            <Image
              src='https://cdn.pixabay.com/photo/2020/09/25/10/10/education-5600987_640.png'
              alt='Online Learning'
              width={600}
              height={400}
              className='rounded-2xl shadow-2xl relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
