import FeaturedCourses from '@/components/homepage/FeaturedCourses'
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Statistics from '@/components/homepage/Statistics'
import Testimonials from '@/components/homepage/Testimonials'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <div className='relative z-10'>
        <Header />
        <main>
          <Hero />
          <Statistics />
          <FeaturedCourses />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </div>
  )
}
