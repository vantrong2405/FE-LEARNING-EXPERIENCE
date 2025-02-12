'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Book, Clock, Filter, Search, Star, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image'

const courses = [
  {
    title: 'Nền tảng tiếng Anh cho người mới bắt đầu',
    category: 'Ngoại Ngữ',
    badge: 'Bestseller',
    instructor: 'Hannah Pham',
    lessons: '97 Bài học',
    duration: '14 giờ 56 phút',
    price: 399000,
    originalPrice: 749000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 65,
    rating: 4.8,
    students: 12500
  },
  {
    title: 'Bí quyết trở thành người đứng đầu',
    category: 'Phát Triển Bản Thân',
    badge: 'Mới',
    instructor: 'Lê Thiên Dương',
    lessons: '27 Bài học',
    duration: '2 giờ 32 phút',
    price: 399000,
    originalPrice: 799000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 40,
    rating: 4.6,
    students: 8300
  },
  {
    title: 'Làm Mọi Thứ Với Photoshop - Thiết Kế Đồ Họa Thực Tiễn',
    category: 'Thiết Kế',
    badge: 'Hot',
    instructor: 'Lê Xuân Tiến',
    lessons: '88 Bài học',
    duration: '13 giờ 45 phút',
    price: 199000,
    originalPrice: 749000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 80,
    rating: 4.9,
    students: 15700
  },
  {
    title: 'Lập Trình Web Fullstack với React và Node.js',
    category: 'Lập Trình',
    badge: 'Trending',
    instructor: 'Nguyễn Văn Cường',
    lessons: '120 Bài học',
    duration: '25 giờ 30 phút',
    price: 599000,
    originalPrice: 999000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 55,
    rating: 4.7,
    students: 10200
  },
  {
    title: 'Marketing Số Cho Doanh Nghiệp Vừa và Nhỏ',
    category: 'Marketing',
    badge: 'Phổ biến',
    instructor: 'Trần Thị Mai',
    lessons: '45 Bài học',
    duration: '8 giờ 15 phút',
    price: 299000,
    originalPrice: 599000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 70,
    rating: 4.5,
    students: 9800
  },
  {
    title: 'Khóa Học Đầu Tư Chứng Khoán Cơ Bản',
    category: 'Tài Chính',
    badge: 'Cập nhật',
    instructor: 'Phạm Minh Tuấn',
    lessons: '60 Bài học',
    duration: '10 giờ 45 phút',
    price: 499000,
    originalPrice: 899000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png',
    progress: 30,
    rating: 4.6,
    students: 7500
  }
]

const categories = ['Tất cả', 'Ngoại Ngữ', 'Phát Triển Bản Thân', 'Thiết Kế', 'Lập Trình', 'Marketing', 'Tài Chính']

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const categoryMatch = selectedCategory === 'Tất cả' || course.category === selectedCategory
      const priceMatch = course.price >= priceRange[0] && course.price <= priceRange[1]
      const searchMatch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && priceMatch && searchMatch
    })
    setFilteredCourses(filtered)
  }, [selectedCategory, priceRange, searchQuery])

  return (
    <div className='container mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900'>
      <section className='space-y-4'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>Khám Phá Khóa Học</h1>
        <p className='text-xl text-gray-700 dark:text-gray-400'>
          Nâng cao kỹ năng của bạn với các khóa học chất lượng cao từ các chuyên gia hàng đầu
        </p>
      </section>

      <section className='space-y-4'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400' />
            <Input
              type='search'
              placeholder='Tìm kiếm khóa học...'
              className='pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='w-full md:w-auto flex flex-col items-start space-y-2'>
            <label htmlFor='price-range' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Giá: {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
            </label>
            <Slider
              id='price-range'
              min={0}
              max={1000000}
              step={50000}
              value={priceRange}
              onValueChange={setPriceRange}
              className='w-full md:w-[300px]'
            />
          </div>
          <Button className='w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white'>
            <Filter className='mr-2 h-4 w-4' /> Lọc Khóa Học
          </Button>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Danh Mục Phổ Biến</h2>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category === selectedCategory ? 'default' : 'outline'}
              className={
                category === selectedCategory
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      <section className='space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Khóa Học Nổi Bật</h2>
          <Button
            variant='link'
            className='text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300'
          >
            Xem tất cả
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCourses.slice(0, 3).map((course, index) => (
            <Card
              key={index}
              className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'
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
                  <Badge className='absolute top-2 left-2 bg-purple-500 text-white'>{course.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                  {course.title}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{course.category}</p>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Users className='h-4 w-4' />
                  <span>{course.instructor}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Book className='h-4 w-4' />
                  <span>{course.lessons}</span>
                  <span>•</span>
                  <Clock className='h-4 w-4' />
                  <span>{course.duration}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-yellow-500 mb-2'>
                  <Star className='h-4 w-4 fill-current' />
                  <span>{course.rating}</span>
                  <span className='text-gray-600 dark:text-gray-400'>
                    ({course.students.toLocaleString()} học viên)
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-100 dark:bg-gray-750 border-t border-gray-300 dark:border-gray-700'>
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <span className='text-lg font-bold text-gray-900 dark:text-white'>
                      {course.price.toLocaleString()}đ
                    </span>
                    <span className='text-sm text-gray-600 dark:text-gray-400 line-through ml-2'>
                      {course.originalPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Xem Chi Tiết</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Tất Cả Khóa Học</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCourses.map((course, index) => (
            <Card
              key={index}
              className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'
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
                  <Badge className='absolute top-2 left-2 bg-purple-500 text-white'>{course.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                  {course.title}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{course.category}</p>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Users className='h-4 w-4' />
                  <span>{course.instructor}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Book className='h-4 w-4' />
                  <span>{course.lessons}</span>
                  <span>•</span>
                  <Clock className='h-4 w-4' />
                  <span>{course.duration}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-yellow-500 mb-2'>
                  <Star className='h-4 w-4 fill-current' />
                  <span>{course.rating}</span>
                  <span className='text-gray-600 dark:text-gray-400'>
                    ({course.students.toLocaleString()} học viên)
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-100 dark:bg-gray-750 border-t border-gray-300 dark:border-gray-700'>
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <span className='text-lg font-bold text-gray-900 dark:text-white'>
                      {course.price.toLocaleString()}đ
                    </span>
                    <span className='text-sm text-gray-600 dark:text-gray-400 line-through ml-2'>
                      {course.originalPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Xem Chi Tiết</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Xu Hướng Học Tập</h2>
        <Card className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Top Danh Mục Được Quan Tâm</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>Dựa trên số lượng đăng ký trong 30 ngày qua</p>
              </div>
              <Button
                variant='outline'
                className='text-purple-600 border-purple-600 hover:bg-purple-600/10 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-400/10'
              >
                <TrendingUp className='mr-2 h-4 w-4' />
                Xem báo cáo chi tiết
              </Button>
            </div>
            <div className='space-y-4'>
              {['Lập Trình', 'Ngoại Ngữ', 'Marketing', 'Thiết Kế', 'Tài Chính'].map((category, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      {index + 1}
                    </div>
                    <span className='text-gray-900 dark:text-white'>{category}</span>
                  </div>
                  <Progress value={100 - index * 15} className='w-1/3' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Đăng Ký Nhận Thông Tin</h2>
        <Card className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  Nhận Thông Tin Khóa Học Mới
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Đăng ký để nhận thông báo về các khóa học mới và ưu đãi đặc biệt.
                </p>
              </div>
              <div className='flex-1 w-full'>
                <div className='flex gap-2'>
                  <Input
                    type='email'
                    placeholder='Nhập email của bạn'
                    className='flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500'
                  />
                  <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Đăng Ký</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
