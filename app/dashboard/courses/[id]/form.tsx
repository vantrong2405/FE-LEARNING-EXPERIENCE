'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Star, Clock, Users, PlayCircle, FileText, Download, Globe, CheckCircle, Coffee, Award } from 'lucide-react'
import Carousel from '@/components/courses/related-courses'
import { weeksAgo } from '@/lib/utils'
import { useCourseQuery, useGetCourseQuery, useSearchCourseQuery } from '@/queries/useCourse'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { pagination } from '@/constants/pagination-config'
import Link from 'next/link'
import { pathURL } from '@/constants/path'

const placeholderImage =
  'https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap-online-education-platform-e-learning-platform-online-teaching-concept_335657-795.jpg'

export default function CoursePage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { id } = useParams()
  const courseId = id as string

  const getCourse = useGetCourseQuery(courseId)
  const course = getCourse.data?.payload.data
  const courseQuery = useCourseQuery(3, pagination.PAGE)
  const courses = courseQuery.data?.payload.data.data ?? []

  const handleVideoSelect = (videoUrl: string) => {
    setSelectedVideo(videoUrl)
    if (videoRef.current) {
      videoRef.current.src = videoUrl
      videoRef.current.load()
      videoRef.current.play()
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 dark:bg-[#0D0A25]'>
      {/* Course Header */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
        <div className='lg:col-span-2'>
          <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>{course?.title}</h1>
          <p className='text-xl text-gray-700 dark:text-gray-300 mb-6'>{course?.description}</p>
          <div className='flex flex-wrap items-center gap-6 mb-6'>
            <div className='flex items-center'>
              <Star className='w-6 h-6 text-yellow-400' />
              <span className='ml-2 text-2xl font-semibold text-gray-900 dark:text-white'>{course?.rating}</span>
              <span className='ml-2 text-gray-700 dark:text-gray-300'>({course?.totalReviews} ratings)</span>
            </div>
            <span className='text-gray-700 dark:text-gray-300 text-lg'> {course?.totalReviews} students enrolled</span>
            <Badge variant='secondary' className='text-lg px-3 py-1 bg-purple-400 text-white'>
              Bestseller
            </Badge>
            <Badge variant='secondary' className='text-lg px-3 py-1 bg-gray-700 text-white'>
              {weeksAgo(course?.updatedAt ?? '')}
            </Badge>
          </div>
          <div className='flex items-center gap-4 mb-6'>
            <Image
              src={course?.instructor.avatarUrl || '/placeholder.svg'}
              alt='John Doe'
              width={60}
              height={60}
              className='rounded-full h-11 w-11'
            />
            <div>
              <span className='font-semibold text-xl text-gray-900 dark:text-white'>
                Created by {course?.instructor.name}
              </span>
              <p className='text-gray-700 dark:text-gray-300'>{course?.instructor.bio}</p>
            </div>
          </div>
          {/* create video ... demo */}
          <div className='rounded-xl overflow-hidden border border-gray-400 mb-6'>
            <video ref={videoRef} className='w-full aspect-video' controls poster={course?.bannerUrl}>
              <source src={selectedVideo as string} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <Card className='lg:col-span-1 dark:bg-gray-800 border-gray-300 dark:border-gray-700 mt-1'>
          <CardContent className='p-6'>
            <Image
              src={course?.thumbnailUrl || '/placeholder.svg'}
              alt='Course Thumbnail'
              width={400}
              height={225}
              className='rounded-lg mb-6 mx-auto'
            />
            <div className='text-4xl font-bold mb-6 text-purple-400'>${course?.price}</div>
            <Button className='w-full text-lg py-6 mb-6 bg-purple-400 hover:bg-purple-700 text-white'>
              Enroll Now
            </Button>
            <div className='text-center text-gray-700 dark:text-gray-300 mb-6'>30-Day Money-Back Guarantee</div>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <Clock className='w-6 h-6 mr-3 text-purple-400' />
                <span className='text-lg text-gray-900 dark:text-white'>
                  {course?.videoHours} hours of video content
                </span>
              </div>
              <div className='flex items-center'>
                <FileText className='w-6 h-6 mr-3 text-purple-400' />
                <span className='text-lg text-gray-900 dark:text-white'>125 articles and resources</span>
              </div>
              <div className='flex items-center'>
                <Download className='w-6 h-6 mr-3 text-purple-400' />
                <span className='text-lg text-gray-900 dark:text-white'>Downloadable source code</span>
              </div>
              <div className='flex items-center'>
                <Globe className='w-6 h-6 mr-3 text-purple-400' />
                <span className='text-lg text-gray-900 dark:text-white'>Full lifetime access</span>
              </div>
              <div className='flex items-center'>
                <Award className='w-6 h-6 mr-3 text-purple-400' />
                <span className='text-lg text-gray-900 dark:text-white'>
                  {course?.certificate}Certificate of completion
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Content */}
      <Tabs defaultValue='overview' className='mb-12'>
        <TabsList className='grid w-full grid-cols-5 bg-gray-800 dark:bg-gray-900'>
          <TabsTrigger value='overview' className='dark:text-white data-[state=active]:bg-purple-400'>
            Overview
          </TabsTrigger>
          <TabsTrigger value='curriculum' className='dark:text-white data-[state=active]:bg-purple-400'>
            Curriculum
          </TabsTrigger>
          <TabsTrigger value='instructor' className='dark:text-white data-[state=active]:bg-purple-400'>
            Instructor
          </TabsTrigger>
          <TabsTrigger value='reviews' className='dark:text-white data-[state=active]:bg-purple-400'>
            Reviews
          </TabsTrigger>
          <TabsTrigger value='faq' className='dark:text-white data-[state=active]:bg-purple-400'>
            FAQ
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-6'>
              <h2 className='text-3xl font-semibold mb-6 text-gray-900 dark:text-white'>Course Overview</h2>
              <p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>{course?.courseOverview}</p>
              <h3 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>What you'll learn</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
                {[
                  'Master React for building dynamic user interfaces',
                  'Develop robust back-end systems with Node.js and Express',
                  'Work with databases using MongoDB and Mongoose',
                  'Implement authentication and authorization',
                  'Create and consume RESTful APIs',
                  'Deploy full-stack applications to cloud platforms',
                  'Optimize performance and security in web applications',
                  'Implement real-time features with WebSockets'
                ].map((item, index) => (
                  <div key={index} className='flex items-start'>
                    <CheckCircle className='w-6 h-6 mr-2 text-purple-400 flex-shrink-0' />
                    <span className='text-lg text-gray-700 dark:text-gray-300'>{item}</span>
                  </div>
                ))}
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>Course Features</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <Card className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                  <CardContent className='p-4 flex flex-col items-center text-center'>
                    <PlayCircle className='w-12 h-12 text-purple-400 mb-2' />
                    <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                      {course?.videoHours} Hours of Video
                    </h4>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Comprehensive video lessons covering all aspects of full-stack development
                    </p>
                  </CardContent>
                </Card>
                <Card className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                  <CardContent className='p-4 flex flex-col items-center text-center'>
                    <FileText className='w-12 h-12 text-purple-400 mb-2' />
                    <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                      {course?.articlesCount} Articles & Resources
                    </h4>
                    <p className='text-gray-700 dark:text-gray-300'>
                      In-depth written materials to supplement video content
                    </p>
                  </CardContent>
                </Card>
                <Card className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                  <CardContent className='p-4 flex flex-col items-center text-center'>
                    <Coffee className='w-12 h-12 text-purple-400 mb-2' />
                    <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                      {course?.downloadableResources} Dowload
                    </h4>
                    <p className='text-gray-700 dark:text-gray-300'>source, docoment...</p>
                  </CardContent>
                </Card>
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>Requirements</h3>
              <ul className='list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300'>
                <li className='text-lg'>{course?.requirements}</li>
                <li className='text-lg'>Familiarity with programming concepts</li>
                <li className='text-lg'>A computer with internet access</li>
                <li className='text-lg'>Enthusiasm to learn and dedication to practice</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='curriculum'>
          <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-6'>
              <h2 className='text-3xl font-semibold mb-6 text-gray-900 dark:text-white'>Course Curriculum</h2>
              <Accordion type='single' collapsible className='w-full'>
                {course?.lessons.map((lesson, index) => (
                  <AccordionItem
                    value={`lesson-${lesson.id}`}
                    key={lesson.id}
                    className='border-gray-300 dark:border-gray-700'
                  >
                    <AccordionTrigger className='text-xl font-semibold text-gray-900 dark:text-white hover:text-purple-400'>
                      {lesson.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className='space-y-2'>
                        {lesson.videos.map((video) => (
                          <li key={video.id} className='flex items-center'>
                            <PlayCircle className='w-5 h-5 mr-2 text-purple-400' />
                            <button
                              onClick={() => handleVideoSelect(video.videoUrl)}
                              rel='noopener noreferrer'
                              className='text-lg text-gray-700 dark:text-gray-300 hover:text-purple-400'
                            >
                              {lesson.title} - {Math.floor(video.duration / 60)}:{video.duration % 60} min
                            </button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='instructor'>
          <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-6'>
              <h2 className='text-3xl font-semibold mb-6 text-gray-900 dark:text-white'>Meet Your Instructor</h2>
              <div className='flex flex-col md:flex-row items-start gap-8'>
                <Image
                  src={placeholderImage || '/placeholder.svg'}
                  alt='John Doe'
                  width={200}
                  height={200}
                  className='rounded-lg'
                />
                <div>
                  <h3 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white'>
                    {course?.instructor.name}
                  </h3>
                  <p className='text-xl text-gray-700 dark:text-gray-300 mb-4'>{course?.instructor.bio}</p>
                  <div className='flex items-center space-x-6 mb-4'>
                    <div className='flex items-center'>
                      <Star className='w-6 h-6 text-yellow-400' />
                      <span className='ml-2 text-lg font-semibold text-gray-900 dark:text-white'>
                        {course?.rating} Instructor Rating
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Users className='w-6 h-6 mr-2 text-purple-400' />
                      <span className='text-lg text-gray-700 dark:text-gray-300'>{course?.totalReviews} Students</span>
                    </div>
                    <div className='flex items-center'>
                      <PlayCircle className='w-6 h-6 mr-2 text-purple-400' />
                      <span className='text-lg text-gray-700 dark:text-gray-300'>
                        {course?.downloadableResources} Courses
                      </span>
                    </div>
                  </div>
                  <p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>{course?.instructor.bio}</p>
                  <p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>{course?.instructor.bio}</p>
                  <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Areas of Expertise:</h4>
                  <ul className='list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300'>
                    <li className='text-lg'>Front-end development with React and Redux</li>
                    <li className='text-lg'>Back-end systems with Node.js and Express</li>
                    <li className='text-lg'>Database design and management (SQL and NoSQL)</li>
                    <li className='text-lg'>RESTful API development</li>
                    <li className='text-lg'>Cloud deployment and DevOps practices</li>
                    <li className='text-lg'>Web application security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reviews'>
          <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-6'>
              <h2 className='text-3xl font-semibold mb-6 text-gray-900 dark:text-white'>Student Reviews</h2>
              <div className='flex flex-col md:flex-row items-center md:items-start gap-8 mb-8'>
                <div className='text-center md:text-left'>
                  <div className='text-5xl font-bold mb-2 text-gray-900 dark:text-white'>{course?.rating}</div>
                  <div className='flex items-center justify-center md:justify-start'>
                    <Star className='w-6 h-6 text-yellow-400' />
                    <Star className='w-6 h-6 text-yellow-400' />
                    <Star className='w-6 h-6 text-yellow-400' />
                    <Star className='w-6 h-6 text-yellow-400' />
                    <Star className='w-6 h-6 text-yellow-400' />
                  </div>
                  <div className='text-lg text-gray-700 dark:text-gray-300 mt-2'>Course Rating</div>
                </div>
                <div className='flex-1'>
                  <div className='space-y-2'>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className='flex items-center'>
                        <span className='w-20 text-lg text-gray-700 dark:text-gray-300'>{rating} stars</span>
                        <Progress value={rating === 5 ? 85 : rating === 4 ? 12 : 1} className='h-4 flex-1' />
                        <span className='w-20 text-lg text-right text-gray-700 dark:text-gray-300'>
                          {rating === 5 ? '85%' : rating === 4 ? '12%' : '1%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='space-y-6'>
                {course?.reviews.map((review, index) => (
                  <Card key={index} className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                    <CardContent className='p-6'>
                      <div className='flex items-center mb-2'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-500'}`}
                          />
                        ))}
                        <span className='ml-2 text-lg font-semibold text-gray-900 dark:text-white'>
                          {review.userId}
                        </span>
                        <span className='ml-auto text-sm text-gray-400'>{weeksAgo(review.createdAt)}</span>
                      </div>
                      <p className='text-lg text-gray-700 dark:text-gray-300'>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='faq'>
          <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-6'>
              <h2 className='text-3xl font-semibold mb-6 text-gray-900 dark:text-white'>Frequently Asked Questions</h2>
              <Accordion type='single' collapsible className='w-full'>
                {[
                  {
                    question: 'Is this course suitable for beginners?',
                    answer:
                      "While this course covers advanced topics, it's designed to be accessible for beginners with basic knowledge of HTML, CSS, and JavaScript. We start with fundamentals and progressively move to more complex concepts, making it suitable for both beginners and intermediate developers looking to enhance their skills."
                  },
                  {
                    question: 'How long do I have access to the course?',
                    answer:
                      'Once you enroll, you have lifetime access to the course content. This includes all videos, articles, and any future updates we make to the curriculum. You can learn at your own pace and revisit the material whenever you need a refresher.'
                  },
                  {
                    question: 'Is there a certificate upon completion?',
                    answer:
                      'Yes, upon completing the course, you will receive a certificate of completion. This certificate can be added to your resume or LinkedIn profile to showcase your newly acquired full-stack development skills.'
                  },
                  {
                    question: "What if I'm not satisfied with the course?",
                    answer:
                      "We offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason, you can request a full refund within the first 30 days of your purchase, no questions asked."
                  },
                  {
                    question: 'Do you offer support if I get stuck?',
                    answer:
                      'We have a dedicated Q&A section for each lesson where you can ask questions and get help from the instructor or community. We also offer email support for any technical issues you might encounter.'
                  }
                ].map((faq, index) => (
                  <AccordionItem
                    value={`faq-${index + 1}`}
                    key={index}
                    className='border-gray-300 dark:border-gray-700'
                  >
                    <AccordionTrigger className='text-xl text-gray-900 dark:text-white hover:text-purple-400'>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className='text-lg text-gray-700 dark:text-gray-300'>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Courses */}
      <h2 className='text-3xl font-semibold mb-6 text-gray-900 dark:text-white'>Related Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        {courses.map((course, index) => (
          <Card key={index} className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-4'>
              <Carousel images={[course.bannerUrl]} />
              <Link href={pathURL.courses_detail(course.id)}>
                <h3 className='text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white'>{course.title}</h3>
              </Link>

              <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>{course.description}</p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Star className='w-4 h-4 text-yellow-400' />
                  <span className='ml-1 text-sm font-semibold text-gray-900 dark:text-white'>{course.rating}</span>
                  <span className='ml-1 text-sm text-gray-400'>({course.totalReviews.toLocaleString()} students)</span>
                </div>
                <span className='text-lg font-bold text-purple-400'>${course.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
