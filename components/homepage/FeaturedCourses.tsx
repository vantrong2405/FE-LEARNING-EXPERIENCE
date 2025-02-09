import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const courses = [
  {
    title: 'Data Analysis Mastery',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    badge: 'Bestseller',
    description: 'Unlock the power of data with real-world projects and advanced techniques.'
  },
  {
    title: 'Advanced Excel Skills',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    badge: 'New',
    description: 'Become an Excel wizard with advanced formulas and data modeling.'
  },
  {
    title: 'Business Law Fundamentals',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    badge: 'Popular',
    description: 'Navigate the legal landscape of business with confidence.'
  },
  {
    title: 'Agile Project Management',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    badge: 'Trending',
    description: 'Master Agile methodologies and lead high-performing teams.'
  }
]

export default function FeaturedCourses() {
  return (
    <div className='bg-gray-900 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4 text-center text-white'>Featured Course Bundles</h2>
        <p className='text-gray-400 mb-12 text-center max-w-2xl mx-auto text-lg'>
          Accelerate your career with our carefully curated course bundles. Save time and money while mastering
          in-demand skills.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {courses.map((course, index) => (
            <Card
              key={index}
              className='bg-gray-800 border-gray-700 overflow-hidden transform hover:scale-105 transition-transform duration-300'
            >
              <CardHeader className='p-0'>
                <div className='relative'>
                  <Image
                    src={course.image || '/placeholder.svg'}
                    alt={course.title}
                    width={300}
                    height={200}
                    className='w-full h-48 object-cover'
                  />
                  <Badge className='absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-3 py-1'>
                    {course.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                <CardTitle className='text-xl mb-3 text-white'>{course.title}</CardTitle>
                <p className='text-gray-400 text-sm mb-4'>{course.description}</p>
              </CardContent>
              <CardFooter className='bg-gray-800 border-t border-gray-700 p-4'>
                <Button
                  variant='secondary'
                  className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
