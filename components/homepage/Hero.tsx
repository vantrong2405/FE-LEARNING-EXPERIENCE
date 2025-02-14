import { Button } from '@/components/ui/button'
import { pathURL } from '@/constants/path'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='container mx-auto px-4 py-16 md:py-24'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='md:w-2/3 animate-fade-in-up'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight'>
            <span className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text'>
              Unlock Your Potential
            </span>
            <br />
            <span>Learn Anything, Anytime</span>
          </h1>
          <p className='dark:text-gray-300 mb-6 text-lg md:text-xl leading-relaxed'>
            Discover a world of knowledge with our cutting-edge online learning platform. Enhance your skills and
            achieve your goals with expert-led courses.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link href={pathURL.login}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold'
              >
                Get Started
              </Button>
            </Link>
            <Link href={pathURL.dashboard_courses}>
              <Button size='lg' variant='secondary'>
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className='md:w-1/3 relative animate-fade-in-up animation-delay-300'>
          <div className='relative w-2/3 mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-l from-purple-500 via-pink-500 to-red-500 rounded-2xl filter blur-3xl opacity-30'></div>
            <Image
              src='https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg'
              alt='Online Learning'
              width={500}
              height={350}
              className='mt-12 rounded-2xl shadow-2xl relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
