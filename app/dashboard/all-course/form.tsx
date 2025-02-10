import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png'
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
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png'
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
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EpJNu9CU0HsswhZUgf8c6eAiGOJNRn.png'
  }
]

export default function FormDashboardCourse() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Khóa học phổ biến nhất</h1>
          <p className='text-gray-400 mt-2'>
            Những khóa học được học viên lựa chọn nhiều nhất, đảm bảo chất lượng và hiệu quả vượt trội.
          </p>
        </div>
        <Link href='/dashboard/courses' className='text-purple-500 hover:text-purple-400 transition-colors'>
          Xem thêm →
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course, index) => (
          <Card key={index} className='bg-gray-900 border-gray-800 overflow-hidden'>
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
                  <span>👤</span>
                  <span>{course.instructor}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span>📚</span>
                  <span>{course.lessons}</span>
                  <span>•</span>
                  <span>⏱️</span>
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
    </div>
  )
}
