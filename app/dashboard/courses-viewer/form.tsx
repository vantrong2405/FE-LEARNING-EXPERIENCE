'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PlayCircle, CheckCircle, ChevronLeft, BookOpen, Clock, Users, Star, Github, Menu } from 'lucide-react'
import { useLessonByIdQuery } from '@/queries/useLesson'
import { pagination } from '@/constants/pagination-config'
import { useCourseQuery } from '@/queries/useCourse'

const CourseViewer = () => {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const courseListQuery = useCourseQuery(pagination.LIMIT, pagination.PAGE)
  const courseIds = courseListQuery.data?.payload.data?.data.map((course) => course.id) || []
  //const lessonByIdQuery = useLessonByIdQuery(pagination.LIMIT, pagination.PAGE,courseIds)

  const course = {
    title: 'Mastering Full-Stack Web Development: React, Node.js, and Beyond',
    instructor: 'John Doe',
    totalLessons: 40,
    completedLessons: 15,
    rating: 4.8,
    students: 12345,
    lastUpdated: 'June 2023',
    repositoryUrl: 'https://github.com/example/fullstack-course',
    sections: [
      {
        title: 'Section 1: Introduction to Full-Stack Development',
        lessons: [
          { title: '1.1 Course Overview and Setup', duration: '10:15', completed: true },
          { title: '1.2 Understanding the Full-Stack Architecture', duration: '15:30', completed: true },
          { title: '1.3 Setting Up Your Development Environment', duration: '20:45', completed: false }
        ]
      },
      {
        title: 'Section 2: Front-End Development with React',
        lessons: [
          { title: '2.1 React Fundamentals and JSX', duration: '25:10', completed: false },
          { title: '2.2 Components and Props', duration: '18:55', completed: false },
          { title: '2.3 State Management and Hooks', duration: '30:20', completed: false }
        ]
      },
      {
        title: 'Section 3: Back-End Development with Node.js',
        lessons: [
          { title: '3.1 Introduction to Node.js and Express', duration: '22:40', completed: false },
          { title: '3.2 RESTful API Design and Implementation', duration: '28:15', completed: false },
          { title: '3.3 Working with Databases: MongoDB and Mongoose', duration: '35:50', completed: false }
        ]
      }
    ]
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white'>
      {/* Main Content (Left Side) */}
      <div className='flex-1 p-4 lg:p-8 overflow-y-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Button variant='ghost' className='text-gray-300 hover:text-white'>
            <ChevronLeft className='mr-2 h-5 w-5' />
            Back to Course Details
          </Button>
        </div>
        <h1 className='text-2xl lg:text-3xl font-bold mb-6'>{course.title}</h1>
        <div className='aspect-video bg-gray-800 mb-8 rounded-lg overflow-hidden shadow-lg'>
          <video
            className='w-full h-full'
            controls
            poster='https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap-online-education-platform-e-learning-platform-online-teaching-concept_335657-795.jpg'
          >
            <source src='/assets/videos/video.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8'>
          <div className='flex items-center space-x-4 mb-4 lg:mb-0'>
            <Image
              src='/placeholder.svg?height=64&width=64'
              alt={course.instructor}
              width={64}
              height={64}
              className='rounded-full'
            />
            <div>
              <h2 className='text-xl lg:text-2xl font-semibold'>{course.sections[0].lessons[currentLesson].title}</h2>
              <p className='text-gray-400'>Instructor: {course.instructor}</p>
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
              {course.sections[0].lessons[currentLesson + 1] ? (
                <>
                  <p className='text-base lg:text-lg text-gray-300 mb-4'>
                    {course.sections[0].lessons[currentLesson + 1].title}
                  </p>
                  <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white text-base lg:text-lg'>
                    Start Next Lesson
                  </Button>
                </>
              ) : (
                <p className='text-base lg:text-lg text-gray-300'>Congratulations! You've completed this section.</p>
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
            {course.sections.map((section, sectionIndex) => (
              <AccordionItem
                key={sectionIndex}
                value={`section-${sectionIndex}`}
                className='border-b border-purple-500'
              >
                <AccordionTrigger className='text-lg hover:text-purple-400'>{section.title}</AccordionTrigger>
                <AccordionContent>
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className={`flex items-center justify-between p-3 rounded text-base cursor-pointer ${
                        currentLesson === lessonIndex ? 'bg-purple-600 text-white' : 'hover:bg-gray-700'
                      }`}
                      onClick={() => setCurrentLesson(lessonIndex)}
                    >
                      <div className='flex items-center'>
                        {lesson.completed ? (
                          <CheckCircle className='w-5 h-5 mr-3 text-green-400 flex-shrink-0' />
                        ) : (
                          <PlayCircle className='w-5 h-5 mr-3 text-gray-400 flex-shrink-0' />
                        )}
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
