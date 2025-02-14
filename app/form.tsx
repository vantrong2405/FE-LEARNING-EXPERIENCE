'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Features from '@/components/homepage/Features'
import FeaturedCourses from '@/components/homepage/FeaturedCourses'
import Testimonials from '@/components/homepage/Testimonials'
import Pricing from '@/components/homepage/Pricing'
import FAQ from '@/components/homepage/FAQ'
import Contributors from '@/components/homepage/Contributors'
import Footer from '@/components/homepage/Footer'
import Newsletter from '@/components/homepage/NewsLetter'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <div className='relative z-10'>
        <Header />
        <main>
          <section id='home'>
            <Hero />
          </section>
          <section id='features'>
            <Features />
          </section>
          <section id='courses'>
            <FeaturedCourses />
          </section>
          <section id='testimonials'>
            <Testimonials />
          </section>
          <section id='pricing'>
            <Pricing />
          </section>
          <section id='faq'>
            <FAQ />
          </section>
          <Newsletter />
          <Contributors />
        </main>
        <Footer />
      </div>
    </div>
  )
}
