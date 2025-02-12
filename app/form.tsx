'use client'

import Contributors from '@/components/homepage/Contributors'
import FeaturedCourses from '@/components/homepage/FeaturedCourses'
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Statistics from '@/components/homepage/Statistics'
import Testimonials from '@/components/homepage/Testimonials'
import { useState } from 'react'

export default function HomePage() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <div className='relative z-10'>
        <Header />
        <main>
          <Hero />
          <Statistics />
          <FeaturedCourses />
          <Testimonials />
          <Contributors />
        </main>
        <Footer />
      </div>
      <div className='p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'>
        <h1 className='text-2xl font-bold mb-4 truncate'>Form Title That Might Be Very Long and Needs Truncation</h1>
        <form>
          <div className='mb-4'>
            <label htmlFor='input' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Input Label
            </label>
            <input
              id='input'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='mt-1 block w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500'
            />
          </div>
          <button type='submit' className='bg-purple-600 hover:bg-purple-700 text-white'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
