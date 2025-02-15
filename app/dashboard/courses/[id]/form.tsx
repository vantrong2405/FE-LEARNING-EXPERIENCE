import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Star, Clock, Users, PlayCircle, FileText, Download, Globe, CheckCircle, Coffee, Award } from 'lucide-react'
import Carousel from '@/components/courses/related-courses'

const placeholderImage =
  'https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap-online-education-platform-e-learning-platform-online-teaching-concept_335657-795.jpg'

const CourseDetail = () => {
  return (
    <div className='container mx-auto px-4 py-8 dark:bg-[#0D0A25]'>
      {/* Course Header */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
        <div className='lg:col-span-2'>
          <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
            Mastering Full-Stack Web Development: React, Node.js, and Beyond
          </h1>
          <p className='text-xl text-gray-700 dark:text-gray-300 mb-6'>
            Embark on a comprehensive journey through modern web development. This course covers everything from
            front-end mastery with React to back-end expertise with Node.js, preparing you for a successful career in
            full-stack development.
          </p>
          <div className='flex flex-wrap items-center gap-6 mb-6'>
            <div className='flex items-center'>
              <Star className='w-6 h-6 text-yellow-400' />
              <span className='ml-2 text-2xl font-semibold text-gray-900 dark:text-white'>4.9</span>
              <span className='ml-2 text-gray-700 dark:text-gray-300'>(3,245 ratings)</span>
            </div>
            <span className='text-gray-700 dark:text-gray-300 text-lg'>23,456 students enrolled</span>
            <Badge variant='secondary' className='text-lg px-3 py-1 bg-purple-400 text-white'>
              Bestseller
            </Badge>
            <Badge variant='secondary' className='text-lg px-3 py-1 bg-gray-700 text-white'>
              Updated 1 week ago
            </Badge>
          </div>
          <div className='flex items-center gap-4 mb-6'>
            <Image
              src={placeholderImage || '/placeholder.svg'}
              alt='John Doe'
              width={60}
              height={60}
              className='rounded-full'
            />
            <div>
              <span className='font-semibold text-xl text-gray-900 dark:text-white'>Created by John Doe</span>
              <p className='text-gray-700 dark:text-gray-300'>Senior Full-Stack Developer & Educator</p>
            </div>
          </div>
          {/* create video ... demo */}
          <div className='rounded-xl overflow-hidden  border border-gray-400'>
            <video
              className='w-full aspect-video'
              controls
              poster='https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap-online-education-platform-e-learning-platform-online-teaching-concept_335657-795.jpg'
            >
              <source src='/assets/videos/video.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <Card className='lg:col-span-1 dark:bg-gray-800 border-gray-300 dark:border-gray-700 mt-1'>
          <CardContent className='p-6'>
            <Image
              src={placeholderImage || '/placeholder.svg'}
              alt='Course Thumbnail'
              width={400}
              height={225}
              className='rounded-lg mb-6 mx-auto'
            />
            <div className='text-4xl font-bold mb-6 text-purple-400'>$129.99</div>
            <Button className='w-full text-lg py-6 mb-6 bg-purple-400 hover:bg-purple-700 text-white'>
              Enroll Now
            </Button>
            <div className='text-center text-gray-700 dark:text-gray-300 mb-6'>30-Day Money-Back Guarantee</div>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <Clock className='w-6 h-6 mr-3 text-purple-400' />
                <span className='text-lg text-gray-900 dark:text-white'>40 hours of video content</span>
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
                <span className='text-lg text-gray-900 dark:text-white'>Certificate of completion</span>
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
              <p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>
                This comprehensive course is designed to take you from a beginner to an advanced level in full-stack web
                development. You'll gain hands-on experience with the latest technologies and best practices in the
                industry.
              </p>
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
                    <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>40+ Hours of Video</h4>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Comprehensive video lessons covering all aspects of full-stack development
                    </p>
                  </CardContent>
                </Card>
                <Card className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                  <CardContent className='p-4 flex flex-col items-center text-center'>
                    <FileText className='w-12 h-12 text-purple-400 mb-2' />
                    <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                      125+ Articles & Resources
                    </h4>
                    <p className='text-gray-700 dark:text-gray-300'>
                      In-depth written materials to supplement video content
                    </p>
                  </CardContent>
                </Card>
                <Card className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                  <CardContent className='p-4 flex flex-col items-center text-center'>
                    <Coffee className='w-12 h-12 text-purple-400 mb-2' />
                    <h4 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>20 Coding Challenges</h4>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Practice your skills with real-world coding challenges
                    </p>
                  </CardContent>
                </Card>
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>Requirements</h3>
              <ul className='list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300'>
                <li className='text-lg'>Basic understanding of HTML, CSS, and JavaScript</li>
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
                {[
                  {
                    title: 'Section 1: Introduction to Full-Stack Development',
                    lessons: [
                      '1.1 Course Overview and Setup',
                      '1.2 Understanding the Full-Stack Architecture',
                      '1.3 Setting Up Your Development Environment'
                    ]
                  },
                  {
                    title: 'Section 2: Front-End Development with React',
                    lessons: [
                      '2.1 React Fundamentals and JSX',
                      '2.2 Components and Props',
                      '2.3 State Management and Hooks',
                      '2.4 Routing in React Applications'
                    ]
                  },
                  {
                    title: 'Section 3: Back-End Development with Node.js',
                    lessons: [
                      '3.1 Introduction to Node.js and Express',
                      '3.2 RESTful API Design and Implementation',
                      '3.3 Working with Databases: MongoDB and Mongoose',
                      '3.4 Authentication and Authorization'
                    ]
                  },
                  {
                    title: 'Section 4: Full-Stack Integration',
                    lessons: [
                      '4.1 Connecting React Front-End to Node.js Back-End',
                      '4.2 State Management in Full-Stack Applications',
                      '4.3 Handling File Uploads and Storage',
                      '4.4 Real-Time Features with WebSockets'
                    ]
                  },
                  {
                    title: 'Section 5: Deployment and Best Practices',
                    lessons: [
                      '5.1 Preparing Your Application for Production',
                      '5.2 Deployment to Cloud Platforms',
                      '5.3 Performance Optimization Techniques',
                      '5.4 Security Best Practices in Full-Stack Applications'
                    ]
                  }
                ].map((section, index) => (
                  <AccordionItem
                    value={`section-${index + 1}`}
                    key={index}
                    className='border-gray-300 dark:border-gray-700'
                  >
                    <AccordionTrigger className='text-xl font-semibold text-gray-900 dark:text-white hover:text-purple-400'>
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className='space-y-2'>
                        {section.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className='flex items-center'>
                            <PlayCircle className='w-5 h-5 mr-2 text-purple-400' />
                            <span className='text-lg text-gray-700 dark:text-gray-300'>{lesson}</span>
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
                  <h3 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white'>John Doe</h3>
                  <p className='text-xl text-gray-700 dark:text-gray-300 mb-4'>
                    Senior Full-Stack Developer and Educator
                  </p>
                  <div className='flex items-center space-x-6 mb-4'>
                    <div className='flex items-center'>
                      <Star className='w-6 h-6 text-yellow-400' />
                      <span className='ml-2 text-lg font-semibold text-gray-900 dark:text-white'>
                        4.9 Instructor Rating
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Users className='w-6 h-6 mr-2 text-purple-400' />
                      <span className='text-lg text-gray-700 dark:text-gray-300'>67,890 Students</span>
                    </div>
                    <div className='flex items-center'>
                      <PlayCircle className='w-6 h-6 mr-2 text-purple-400' />
                      <span className='text-lg text-gray-700 dark:text-gray-300'>20 Courses</span>
                    </div>
                  </div>
                  <p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>
                    John Doe is a seasoned full-stack developer with over 15 years of experience in the tech industry.
                    He has worked with Fortune 500 companies and cutting-edge startups, helping them build scalable and
                    efficient web applications. John's passion for teaching has led him to create comprehensive online
                    courses that have helped thousands of students launch their careers in web development.
                  </p>
                  <p className='text-lg mb-6 text-gray-700 dark:text-gray-300'>
                    With expertise in React, Node.js, and various other modern web technologies, John brings real-world
                    insights and best practices to his courses. His teaching style combines theoretical knowledge with
                    practical, hands-on exercises, ensuring that students not only understand concepts but can apply
                    them in real-world scenarios.
                  </p>
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
                  <div className='text-5xl font-bold mb-2 text-gray-900 dark:text-white'>4.9</div>
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
                {[
                  {
                    name: 'Sarah Johnson',
                    rating: 5,
                    date: '2 weeks ago',
                    comment:
                      "This course exceeded my expectations! John's teaching style is clear and engaging. I've learned so much about full-stack development and feel confident in building my own projects now. The practical exercises and real-world examples were particularly helpful."
                  },
                  {
                    name: 'Michael Chen',
                    rating: 5,
                    date: '1 month ago',
                    comment:
                      "An excellent course that covers all aspects of full-stack development. The curriculum is well-structured, and the instructor's explanations are thorough. I especially appreciated the sections on state management and API integration. Highly recommended for anyone looking to become a proficient full-stack developer."
                  },
                  {
                    name: 'Emily Rodriguez',
                    rating: 4,
                    date: '3 weeks ago',
                    comment:
                      "Great course overall. The content is comprehensive and up-to-date. My only suggestion would be to include more advanced topics on database optimization and serverless architectures. Otherwise, it's an excellent resource for aspiring full-stack developers."
                  }
                ].map((review, index) => (
                  <Card key={index} className='dark:bg-gray-700 border-gray-300 dark:border-gray-600'>
                    <CardContent className='p-6'>
                      <div className='flex items-center mb-2'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-500'}`}
                          />
                        ))}
                        <span className='ml-2 text-lg font-semibold text-gray-900 dark:text-white'>{review.name}</span>
                        <span className='ml-auto text-sm text-gray-400'>{review.date}</span>
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
        {[
          {
            title: 'Advanced React Patterns and Performance Optimization',
            description: 'Master advanced React concepts and learn to build high-performance applications',
            rating: 4.8,
            students: 12345,
            price: 89.99,
            images: [
              'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
              'https://images.unsplash.com/photo-1519125323398-675f0ddb6308'
            ]
          },
          {
            title: 'Node.js Microservices: From Zero to Hero',
            description: 'Learn to build scalable microservices architectures with Node.js and Docker',
            rating: 4.7,
            students: 8901,
            price: 99.99,
            images: [
              'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
              'https://images.unsplash.com/photo-1516321497487-e288fb19713f',
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
            ]
          },
          {
            title: 'Full-Stack TypeScript: Next.js, NestJS, and PostgreSQL',
            description: 'Build modern, type-safe applications with TypeScript across the entire stack',
            rating: 4.9,
            students: 6789,
            price: 109.99,
            images: [
              'https://images.unsplash.com/photo-1517433456452-f9633a875f6f',
              'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0',
              'https://images.unsplash.com/photo-1517511620798-cec17d428bc0'
            ]
          }
        ].map((course, index) => (
          <Card key={index} className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <CardContent className='p-4'>
              <Carousel images={course.images} />
              <h3 className='text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white'>{course.title}</h3>
              <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>{course.description}</p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Star className='w-4 h-4 text-yellow-400' />
                  <span className='ml-1 text-sm font-semibold text-gray-900 dark:text-white'>{course.rating}</span>
                  <span className='ml-1 text-sm text-gray-400'>({course.students.toLocaleString()} students)</span>
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

export default CourseDetail
