import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useCourseQuery } from '@/queries/useCourse'
import { pagination } from '@/constants/pagination-config'
import { pathURL } from '@/constants/path'

export default function FeaturedCourses() {
  const courseQuery = useCourseQuery(4, pagination.PAGE)
  const courses = courseQuery.data?.payload.data.data ?? []
  console.log('🚀 ~ FeaturedCourses ~ courses:', courses)

  return (
    <div className='dark:bg-gray-900 py-24'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6 text-center animate-fade-in-up'>Featured Course Bundles</h2>
        <p className='dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto text-lg animate-fade-in-up animation-delay-150'>
          Accelerate your career with our carefully curated course bundles. Save time and money while mastering
          in-demand skills.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {courses.map((course, index) => (
            <div key={index} className='animate-fade-in-up' style={{ animationDelay: `${index * 100}ms` }}>
              <Card className='dark:bg-gray-800 dark:border-gray-700 overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <CardHeader className='p-0'>
                  <div className='relative'>
                    <Image
                      src={course.bannerUrl || '/placeholder.svg'}
                      alt={course.title}
                      width={400}
                      height={225}
                      className='w-full h-48 object-cover'
                    />
                    <Badge className='absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 font-semibold px-3 py-1'>
                      {'Hot trend'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='p-6'>
                  <CardTitle className='text-xl mb-3 truncate'>{course.title}</CardTitle>
                  <p className='text-gray-400 text-sm mb-4'>{course.description}</p>
                </CardContent>
                <CardFooter className='dark:bg-gray-800 border-t dark:border-gray-700 p-4'>
                  <Link href={pathURL.courses_detail(course.id)} className='w-full'>
                    <Button
                      variant='secondary'
                      className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
