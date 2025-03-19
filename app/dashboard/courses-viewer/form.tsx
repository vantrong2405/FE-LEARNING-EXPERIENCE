'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useGetCourseQuery } from '@/queries/useCourse'
import { Icons } from '@/components/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { pathURL } from '@/constants/path'

const CourseViewer = () => {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const searchParams = useSearchParams()
  const courseId = searchParams.get('id')
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)

  const getCourse = useGetCourseQuery(courseId as string)
  const course = getCourse.data?.payload.data

  const handleVideoSelect = (videoUrl: string) => {
    console.log('Selected video URL:', videoUrl)
    setCurrentVideoUrl(videoUrl)

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load()
        videoRef.current.play().catch()
      }
    }, 100)
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white'>
      {/* Main Content (Left Side) */}
      <div className='flex-1 p-4 lg:p-8 overflow-y-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Button
            onClick={() => router.push(pathURL.courses_detail(courseId as string))}
            variant='ghost'
            className='text-gray-300 hover:text-white'
          >
            <Icons.ChevronLeft className='mr-2 h-5 w-5' />
            Back to Course Details
          </Button>
        </div>
        <h1 className='text-2xl lg:text-3xl font-bold mb-6'>{course?.title}</h1>
        <div className='aspect-video bg-gray-800 mb-8 rounded-lg overflow-hidden shadow-lg'>
          <video key={currentVideoUrl} ref={videoRef} className='w-full h-full' controls poster={course?.bannerUrl}>
            <source src={currentVideoUrl as string} type='video/mp4' />
          </video>
        </div>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8'>
          <div className='flex items-center space-x-4 mb-4 lg:mb-0'>
            {course?.instructor.avatarUrl && (
              <Image
                src={course.instructor.avatarUrl}
                alt={course.instructor.name || 'Instructor'}
                width={64}
                height={64}
                className='rounded-full h-10 w-10'
              />
            )}

            <div>
              <h2 className='text-xl lg:text-2xl font-semibold'>{course?.lessons[currentLesson].title}</h2>
              <p className='text-gray-400'>Instructor: {course?.instructor.name}</p>
            </div>
          </div>
          <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Mark as Completed</Button>
        </div>
        <Card className='bg-gray-800 border-purple-500 mb-8'>
          <CardContent className='p-6'>
            <p className='text-base lg:text-lg text-gray-300'>
              This lesson covers the fundamentals of [topic]. You'll learn about [key points] and how to apply them in
              real-world scenarios. By the end of this lesson, you'll be able to [learning objectives].
            </p>
          </CardContent>
        </Card>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <Card className='bg-gray-800 border-purple-500'>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>Course Resources</h3>
              <ul className='space-y-3 text-base lg:text-lg text-gray-300'>
                <li className='flex items-center'>
                  <span className='mr-2'>📄</span> Lesson slides (PDF)
                </li>
                <li className='flex items-center'>
                  <span className='mr-2'>💻</span> Code examples
                </li>
                <li className='flex items-center'>
                  <span className='mr-2'>📚</span> Additional reading materials
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className='bg-gray-800 border-purple-500'>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>Next Up</h3>
              {course?.lessons[currentLesson + 1] ? (
                <>
                  <p className='text-base lg:text-lg text-gray-300 mb-4'>{course.lessons[currentLesson + 1].title}</p>
                  <Button
                    className='w-full bg-purple-600 hover:bg-purple-700 text-white text-base lg:text-lg'
                    onClick={() => setCurrentLesson((prev) => prev + 1)}
                  >
                    Start Next Lesson
                  </Button>
                </>
              ) : (
                <p className='text-gray-400'>No more lessons available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lessons Section (Below Main Content) */}
      <div className='w-full lg:w-1/3 bg-gray-800 p-4 lg:p-6 border-t lg:border-l border-purple-500 overflow-hidden'>
        <h3 className='text-xl font-semibold mb-4'>Course Content</h3>
        <ScrollArea className='h-[calc(100vh-300px)] lg:h-[calc(100vh-200px)] overflow-y-auto'>
          <Accordion type='single' collapsible className='w-full'>
            {course?.lessons.map((section, sectionIndex) => (
              <AccordionItem
                key={sectionIndex}
                value={`section-${sectionIndex}`}
                className='border-b border-purple-500'
              >
                <AccordionTrigger className='text-lg hover:text-purple-400'>{section.title}</AccordionTrigger>
                <AccordionContent>
                  {section.videos.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className={`flex items-center justify-between p-3 rounded text-base cursor-pointer ${
                        currentLesson === lessonIndex ? 'bg-purple-600 text-white' : 'hover:bg-gray-700'
                      }`}
                      onClick={() => handleVideoSelect(lesson.videoUrl)}
                    >
                      <div className='flex items-center'>
                        <Icons.PlayCircle className='w-5 h-5 mr-3 text-gray-400 flex-shrink-0' />
                        <span>{lesson.title}</span>
                      </div>
                      <span className='text-sm text-gray-400 ml-2 flex-shrink-0'>{lesson.duration}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </div>
  )
}

export default CourseViewer
