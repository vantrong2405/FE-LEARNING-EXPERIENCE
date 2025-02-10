import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Book, Clock, GraduationCap, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const courses = [
  {
    title: 'Nền tảng tiếng Anh cho người mới bắt đầu',
    category: 'Ngoại Ngữ',
    badge: '+2',
    instructor: 'Hannah Pham',
    lessons: '97 Bài học',
    duration: '14 giờ 56 phút',
    price: '399,000',
    originalPrice: '749,000',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 65
  },
  {
    title: 'Bí quyết trở thành người đứng đầu',
    category: 'Phát Triển Bản Thân',
    badge: '+1',
    instructor: 'Lê Thiên Dương',
    lessons: '27 Bài học',
    duration: '2 giờ 32 phút',
    price: '399,000',
    originalPrice: '799,000',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 40
  },
  {
    title: 'Làm Mọi Thứ Với Photoshop - Thiết Kế Đồ Họa Thực Tiễn',
    category: 'Thiết Kế',
    badge: '+3',
    instructor: 'Lê Xuân Tiến',
    lessons: '88 Bài học',
    duration: '13 giờ 45 phút',
    price: '199,000',
    originalPrice: '749,000',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 80
  }
]

const stats = [
  { title: 'Tổng số khóa học', value: '5,500+', icon: Book, color: 'text-blue-500' },
  { title: 'Học viên đã đăng ký', value: '4,500,000+', icon: Users, color: 'text-green-500' },
  { title: 'Giờ học đã hoàn thành', value: '2,000,000+', icon: Clock, color: 'text-yellow-500' },
  { title: 'Chứng chỉ đã cấp', value: '1,000,000+', icon: GraduationCap, color: 'text-purple-500' }
]

export default function FormDashboardCourse() {
  return (
    <div className='space-y-12'>
      <section className='space-y-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Tổng quan khóa học</h1>
            <p className='text-gray-400 mt-2'>Theo dõi tiến độ học tập và khám phá các khóa học mới</p>
          </div>
          <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Khám phá khóa học mới</Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((stat, index) => (
            <Card key={index} className='bg-gray-800 border-gray-700'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>{stat.title}</p>
                    <h3 className='text-2xl font-bold text-white mt-2'>{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace('text', 'bg')}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Khóa học đang học</h2>
          <Link href='/dashboard/my-courses' className='text-purple-500 hover:text-purple-400 transition-colors'>
            Xem tất cả khóa học của tôi →
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {courses.map((course, index) => (
            <Card
              key={index}
              className='bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader className='p-0'>
                <div className='relative'>
                  <Image
                    src={course.image || '/placeholder.svg'}
                    alt={course.title}
                    width={400}
                    height={200}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute top-2 left-2 flex gap-2'>
                    <Badge className='bg-white/20 text-white backdrop-blur-sm'>{course.category}</Badge>
                    <Badge className='bg-purple-500 text-white'>{course.badge}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-4'>
                <h3 className='text-lg font-semibold text-white mb-2 line-clamp-2'>{course.title}</h3>
                <div className='space-y-2 text-sm text-gray-400'>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span>{course.instructor}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Book className='h-4 w-4' />
                    <span>{course.lessons}</span>
                    <span>•</span>
                    <Clock className='h-4 w-4' />
                    <span>{course.duration}</span>
                  </div>
                  <div className='pt-2'>
                    <div className='flex justify-between items-center mb-1'>
                      <span className='text-sm font-medium text-white'>Tiến độ</span>
                      <span className='text-sm font-medium text-white'>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className='h-2' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='space-y-8'>
        <h2 className='text-2xl font-bold text-white'>Khóa học phổ biến nhất</h2>
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='bg-gray-800 text-gray-400'>
            <TabsTrigger value='all'>Tất cả</TabsTrigger>
            <TabsTrigger value='design'>Thiết kế</TabsTrigger>
            <TabsTrigger value='development'>Lập trình</TabsTrigger>
            <TabsTrigger value='business'>Kinh doanh</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {courses.map((course, index) => (
                <Card
                  key={index}
                  className='bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'
                >
                  <CardHeader className='p-0'>
                    <div className='relative'>
                      <Image
                        src={course.image || '/placeholder.svg'}
                        alt={course.title}
                        width={400}
                        height={200}
                        className='w-full h-48 object-cover'
                      />
                      <div className='absolute top-2 left-2 flex gap-2'>
                        <Badge className='bg-white/20 text-white backdrop-blur-sm'>{course.category}</Badge>
                        <Badge className='bg-purple-500 text-white'>{course.badge}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-4'>
                    <h3 className='text-lg font-semibold text-white mb-2 line-clamp-2'>{course.title}</h3>
                    <div className='space-y-2 text-sm text-gray-400'>
                      <div className='flex items-center gap-2'>
                        <Users className='h-4 w-4' />
                        <span>{course.instructor}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Book className='h-4 w-4' />
                        <span>{course.lessons}</span>
                        <span>•</span>
                        <Clock className='h-4 w-4' />
                        <span>{course.duration}</span>
                      </div>
                      <div className='flex items-center gap-2 pt-2'>
                        <span className='text-white font-bold'>đ{course.price}</span>
                        <span className='text-gray-500 line-through'>đ{course.originalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* Add similar TabsContent for other categories */}
        </Tabs>
      </section>

      <section className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Xu hướng học tập</h2>
          <Button variant='outline' className='text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white'>
            <TrendingUp className='mr-2 h-4 w-4' />
            Xem báo cáo chi tiết
          </Button>
        </div>
        <Card className='bg-gray-800 border-gray-700'>
          <CardContent className='p-6'>
            <div className='h-64 flex items-center justify-center text-gray-500'>
              [Placeholder for learning trend chart]
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
