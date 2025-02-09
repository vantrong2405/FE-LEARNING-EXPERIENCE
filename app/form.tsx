import FeaturedCourses from '@/components/homepage/FeaturedCourses'
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Statistics from '@/components/homepage/Statistics'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <Header />
      <main className='relative z-10 pt-16'>
        <Hero />
        <Statistics />
        <FeaturedCourses />
      </main>
      <Footer />
    </div>
  )
}
