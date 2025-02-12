'use client'

import Contributors from '@/components/homepage/Contributors'
import FeaturedCourses from '@/components/homepage/FeaturedCourses'
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Statistics from '@/components/homepage/Statistics'
import Testimonials from '@/components/homepage/Testimonials'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
    </div>
  )
}
