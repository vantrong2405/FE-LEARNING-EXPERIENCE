'use client'

import { useState } from 'react'
import {
  Star,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Flag,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { exportToExcel } from '@/lib/excel'

// Sample review data
const reviews = [
  {
    id: 1,
    student: {
      id: 101,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 201,
      title: 'JavaScript Cơ Bản',
      instructor: 'Nguyễn Văn A',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 5,
    title: 'Khóa học tuyệt vời!',
    content:
      'Tôi đã học được rất nhiều từ khóa học này. Giảng viên giải thích rất rõ ràng và dễ hiểu. Các bài tập thực hành rất hữu ích.',
    date: '2023-07-10',
    status: 'approved',
    helpful: 12,
    unhelpful: 2,
    reported: false
  },
  {
    id: 2,
    student: {
      id: 102,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 202,
      title: 'React Advanced',
      instructor: 'Trần Thị B',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 4,
    title: 'Khóa học hay nhưng hơi khó',
    content:
      'Nội dung khóa học rất hay và cập nhật. Tuy nhiên, một số phần hơi khó đối với người mới bắt đầu. Cần có thêm giải thích chi tiết hơn.',
    date: '2023-07-05',
    status: 'approved',
    helpful: 8,
    unhelpful: 1,
    reported: false
  },
  {
    id: 3,
    student: {
      id: 103,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 203,
      title: 'Python for Data Science',
      instructor: 'Lê Văn C',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 2,
    title: 'Không như mong đợi',
    content:
      'Khóa học không đi sâu vào phân tích dữ liệu như tôi mong đợi. Nhiều phần quá cơ bản và không có giá trị thực tế.',
    date: '2023-06-28',
    status: 'approved',
    helpful: 3,
    unhelpful: 7,
    reported: true
  },
  {
    id: 4,
    student: {
      id: 104,
      name: 'Phạm Thị D',
      email: 'phamthid@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 204,
      title: 'UI/UX Design',
      instructor: 'Phạm Thị D',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 5,
    title: 'Tuyệt vời cho người mới bắt đầu',
    content:
      'Khóa học này rất phù hợp cho người mới bắt đầu về UI/UX. Các bài giảng rõ ràng và có nhiều ví dụ thực tế. Tôi đã học được rất nhiều kỹ năng mới.',
    date: '2023-07-02',
    status: 'approved',
    helpful: 15,
    unhelpful: 0,
    reported: false
  },
  {
    id: 5,
    student: {
      id: 105,
      name: 'Hoàng Văn E',
      email: 'hoangvane@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 205,
      title: 'Mobile App Development with Flutter',
      instructor: 'Hoàng Văn E',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 3,
    title: 'Khóa học ở mức trung bình',
    content:
      'Khóa học có một số điểm tốt nhưng cũng có nhiều hạn chế. Giảng viên đôi khi giải thích không rõ ràng và thiếu các ví dụ thực tế.',
    date: '2023-06-25',
    status: 'approved',
    helpful: 5,
    unhelpful: 4,
    reported: false
  },
  {
    id: 6,
    student: {
      id: 106,
      name: 'Vũ Thị F',
      email: 'vuthif@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 206,
      title: 'Machine Learning Fundamentals',
      instructor: 'Ngô Thị H',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 1,
    title: 'Rất thất vọng',
    content:
      'Nội dung khóa học không như mô tả. Nhiều phần quá cơ bản và không đi vào thực tế. Tôi không khuyên ai học khóa này cả.',
    date: '2023-07-08',
    status: 'pending',
    helpful: 1,
    unhelpful: 9,
    reported: true
  },
  {
    id: 7,
    student: {
      id: 107,
      name: 'Đặng Văn G',
      email: 'dangvang@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 201,
      title: 'JavaScript Cơ Bản',
      instructor: 'Nguyễn Văn A',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    rating: 4,
    title: 'Khóa học rất hữu ích',
    content:
      'Tôi đã học được nhiều kiến thức mới từ khóa học này. Giảng viên giải thích rõ ràng và có nhiều ví dụ thực tế.',
    date: '2023-07-12',
    status: 'pending',
    helpful: 0,
    unhelpful: 0,
    reported: false
  }
]

// Rating distribution data
const ratingDistribution = [
  { rating: 5, count: reviews.filter((r) => r.rating === 5).length },
  { rating: 4, count: reviews.filter((r) => r.rating === 4).length },
  { rating: 3, count: reviews.filter((r) => r.rating === 3).length },
  { rating: 2, count: reviews.filter((r) => r.rating === 2).length },
  { rating: 1, count: reviews.filter((r) => r.rating === 1).length }
]

// Course rating data
const courseRatingData = [
  { name: 'JavaScript Cơ Bản', rating: 4.5 },
  { name: 'React Advanced', rating: 4.0 },
  { name: 'Python for Data Science', rating: 2.0 },
  { name: 'UI/UX Design', rating: 5.0 },
  { name: 'Mobile App Development', rating: 3.0 },
  { name: 'Machine Learning', rating: 1.0 }
]

// Monthly reviews data
const monthlyReviewsData = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 19 },
  { month: 'Mar', count: 25 },
  { month: 'Apr', count: 18 },
  { month: 'May', count: 22 },
  { month: 'Jun', count: 30 },
  { month: 'Jul', count: 15 }
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState<Review | null>(null)
  const [selectedReviews, setSelectedReviews] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 5

  // Filter reviews based on search term, course, rating, and status
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || review.course.id.toString() === selectedCourse
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus

    return matchesSearch && matchesCourse && matchesRating && matchesStatus
  })

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)

  // Handle edit review
  interface Review {
    id: number
    student: Student
    course: Course
    rating: number
    title: string
    content: string
    date: string
    status: string
    helpful: number
    unhelpful: number
    reported: boolean
  }

  const handleEditReview = (review: Review) => {
    setCurrentReview(review)
    setIsEditReviewOpen(true)
  }

  // Handle checkbox selection
  interface Student {
    id: number
    name: string
    email: string
    avatar: string
  }

  interface Course {
    id: number
    title: string
    instructor: string
    thumbnail: string
  }

  interface Review {
    id: number
    student: Student
    course: Course
    rating: number
    title: string
    content: string
    date: string
    status: string
    helpful: number
    unhelpful: number
    reported: boolean
  }

  const handleSelectReview = (reviewId: number) => {
    if (selectedReviews.includes(reviewId)) {
      setSelectedReviews(selectedReviews.filter((id) => id !== reviewId))
    } else {
      setSelectedReviews([...selectedReviews, reviewId])
    }
  }

  const handleSelectAll = () => {
    if (selectedReviews.length === currentReviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(currentReviews.map((review) => review.id))
    }
  }

  // Get unique courses for filter
  const uniqueCourses = [...new Set(reviews.map((review) => review.course.id))].map((courseId) => {
    const course = reviews.find((review) => review.course.id === courseId)?.course
    return course ? { id: courseId, title: course.title } : { id: courseId, title: 'Unknown Course' }
  })

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  // Colors for charts
  const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe']

  // Render stars for rating
  interface RenderStarsProps {
    rating: number
  }

  const renderStars = ({ rating }: RenderStarsProps) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} />
      ))
  }

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã đánh giá' },
      { key: 'student_name', header: 'Học viên' },
      { key: 'student_email', header: 'Email' },
      { key: 'course_title', header: 'Khóa học' },
      { key: 'rating', header: 'Đánh giá' },
      { key: 'title', header: 'Tiêu đề' },
      { key: 'content', header: 'Nội dung' },
      { key: 'helpful', header: 'Hữu ích' },
      { key: 'unhelpful', header: 'Không hữu ích' },
      { key: 'date', header: 'Ngày đánh giá' },
      { key: 'status', header: 'Trạng thái' }
    ]

    const exportData = filteredReviews.map((review) => ({
      id: review.id,
      student_name: review.student.name,
      student_email: review.student.email,
      course_title: review.course.title,
      rating: review.rating,
      title: review.title,
      content: review.content,
      helpful: review.helpful,
      unhelpful: review.unhelpful,
      date: review.date,
      status: review.status === 'approved' ? 'Đã duyệt' : review.status === 'rejected' ? 'Đã từ chối' : 'Chờ duyệt'
    }))

    exportToExcel({
      filename: 'Danh_sach_danh_gia',
      sheetName: 'Đánh giá',
      data: exportData,
      columns: columns
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0D0A25] to-[#1A1744] text-white p-6'>
      <div className='max-w-9xl mx-auto'>
        <div className='flex items-center justify-end mb-6'>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
            <Button
              variant='outline'
              className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto text-xs sm:text-sm'
              onClick={handleExportExcel}
            >
              <Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          {/* Stats Cards */}
          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Tổng đánh giá</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{reviews.length}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Star className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Đánh giá trung bình</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{averageRating.toFixed(1)}</h3>
                  <div className='flex mt-1'>{renderStars({ rating: Math.round(averageRating) })}</div>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Star className='h-6 w-6 text-purple-400 fill-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Đánh giá chờ duyệt</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>
                    {reviews.filter((r) => r.status === 'pending').length}
                  </h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Clock className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Đánh giá bị báo cáo</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{reviews.filter((r) => r.reported).length}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Flag className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-xl text-purple-400'>Phân bố đánh giá</CardTitle>
              <CardDescription className='text-gray-400'>Số lượng đánh giá theo số sao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    layout='vertical'
                    data={ratingDistribution}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                    <XAxis type='number' stroke='#6b7280' />
                    <YAxis
                      dataKey='rating'
                      type='category'
                      stroke='#6b7280'
                      tickFormatter={(value) => `${value} sao`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelStyle={{ color: '#f9fafb' }}
                      formatter={(value) => [`${value} đánh giá`, '']}
                    />
                    <Bar dataKey='count' fill='#8b5cf6' radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-xl text-purple-400'>Đánh giá theo khóa học</CardTitle>
              <CardDescription className='text-gray-400'>Điểm đánh giá trung bình của các khóa học</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={courseRatingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                    <XAxis dataKey='name' stroke='#6b7280' />
                    <YAxis stroke='#6b7280' domain={[0, 5]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelStyle={{ color: '#f9fafb' }}
                      formatter={(value) => [`${value} sao`, 'Đánh giá']}
                    />
                    <Bar dataKey='rating' fill='#8b5cf6' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-xl text-purple-400'>Đánh giá theo tháng</CardTitle>
              <CardDescription className='text-gray-400'>Số lượng đánh giá theo tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={monthlyReviewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id='colorReviews' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#8b5cf6' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#8b5cf6' stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                    <XAxis dataKey='month' stroke='#6b7280' />
                    <YAxis stroke='#6b7280' />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelStyle={{ color: '#f9fafb' }}
                      formatter={(value) => [`${value} đánh giá`, '']}
                    />
                    <Area type='monotone' dataKey='count' stroke='#8b5cf6' fillOpacity={1} fill='url(#colorReviews)' />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400'>Lọc danh sách đánh giá theo các tiêu chí</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo tên, nội dung...'
                    className='pl-8 bg-gray-800 border-gray-700 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='course' className='text-white mb-2 block'>
                  Khóa học
                </Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn khóa học' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả khóa học</SelectItem>
                    {uniqueCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='rating' className='text-white mb-2 block'>
                  Đánh giá
                </Label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn đánh giá' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả đánh giá</SelectItem>
                    <SelectItem value='5'>5 sao</SelectItem>
                    <SelectItem value='4'>4 sao</SelectItem>
                    <SelectItem value='3'>3 sao</SelectItem>
                    <SelectItem value='2'>2 sao</SelectItem>
                    <SelectItem value='1'>1 sao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='status' className='text-white mb-2 block'>
                  Trạng thái
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn trạng thái' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                    <SelectItem value='approved'>Đã duyệt</SelectItem>
                    <SelectItem value='pending'>Chờ duyệt</SelectItem>
                    <SelectItem value='rejected'>Đã từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gray-900 border-gray-700 shadow-xl'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-xl text-purple-400'>Danh sách đánh giá</CardTitle>
                <CardDescription className='text-gray-400'>
                  {filteredReviews.length} đánh giá được tìm thấy
                </CardDescription>
              </div>
              {selectedReviews.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>Đã chọn {selectedReviews.length} đánh giá</span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <CheckCircle className='h-4 w-4 mr-1' /> Duyệt
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <XCircle className='h-4 w-4 mr-1' /> Từ chối
                  </Button>
                  <Button variant='destructive' size='sm'>
                    <Trash2 className='h-4 w-4 mr-1' /> Xóa
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {currentReviews.map((review) => (
                <div key={review.id} className='bg-gray-800 rounded-lg p-4 border border-gray-700'>
                  <div className='flex items-start'>
                    <Checkbox
                      checked={selectedReviews.includes(review.id)}
                      onCheckedChange={() => handleSelectReview(review.id)}
                      className='mt-1 mr-3 border-gray-600'
                    />
                    <div className='flex-1'>
                      <div className='flex justify-between items-start'>
                        <div className='flex items-center'>
                          <img
                            src={review.student.avatar || '/placeholder.svg'}
                            alt={review.student.name}
                            className='w-8 h-8 rounded-full object-cover mr-3'
                          />
                          <div>
                            <div className='font-medium'>{review.student.name}</div>
                            <div className='text-xs text-gray-400'>{review.date}</div>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Badge
                            className={
                              review.status === 'approved'
                                ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                                : review.status === 'rejected'
                                  ? 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                                  : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                            }
                          >
                            {review.status === 'approved'
                              ? 'Đã duyệt'
                              : review.status === 'rejected'
                                ? 'Đã từ chối'
                                : 'Chờ duyệt'}
                          </Badge>
                          {review.reported && (
                            <Badge className='bg-red-900/30 text-red-500 hover:bg-red-900/40'>Bị báo cáo</Badge>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700'
                              >
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-gray-800 border-gray-700 text-white'>
                              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                              <DropdownMenuSeparator className='bg-gray-700' />
                              <DropdownMenuItem
                                className='hover:bg-gray-700 cursor-pointer'
                                onClick={() => handleEditReview(review)}
                              >
                                <Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                              </DropdownMenuItem>
                              {review.status !== 'approved' && (
                                <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                                  <CheckCircle className='h-4 w-4 mr-2' /> Duyệt
                                </DropdownMenuItem>
                              )}
                              {review.status !== 'rejected' && (
                                <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                                  <XCircle className='h-4 w-4 mr-2' /> Từ chối
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className='bg-gray-700' />
                              <DropdownMenuItem className='text-red-500 hover:bg-gray-700 cursor-pointer'>
                                <Trash2 className='h-4 w-4 mr-2' /> Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className='mt-2'>
                        <div className='flex items-center mb-1'>
                          <div className='flex mr-2'>{renderStars({ rating: review.rating })}</div>
                          <span className='font-medium'>{review.title}</span>
                        </div>
                        <p className='text-gray-300 text-sm'>{review.content}</p>
                      </div>

                      <div className='mt-3 flex items-center justify-between'>
                        <div className='flex items-center text-sm text-gray-400'>
                          <div className='flex items-center mr-4'>
                            <ThumbsUp className='h-4 w-4 mr-1' />
                            <span>{review.helpful}</span>
                          </div>
                          <div className='flex items-center'>
                            <ThumbsDown className='h-4 w-4 mr-1' />
                            <span>{review.unhelpful}</span>
                          </div>
                        </div>
                        <div className='text-sm text-gray-400'>Khóa học: {review.course.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-between mt-6'>
              <div className='text-sm text-gray-400'>
                Hiển thị {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, filteredReviews.length)} trong số{' '}
                {filteredReviews.length} đánh giá
              </div>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Review Dialog */}
        {currentReview && (
          <Dialog open={isEditReviewOpen} onOpenChange={setIsEditReviewOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Đánh Giá</DialogTitle>
                <DialogDescription className='text-gray-400'>Chỉnh sửa nội dung đánh giá</DialogDescription>
              </DialogHeader>

              <div className='space-y-4 mt-4'>
                <div className='flex items-center'>
                  <img
                    src={currentReview.student.avatar || '/placeholder.svg'}
                    alt={currentReview.student.name}
                    className='w-10 h-10 rounded-full object-cover mr-3'
                  />
                  <div>
                    <div className='font-medium'>{currentReview.student.name}</div>
                    <div className='text-xs text-gray-400'>{currentReview.date}</div>
                  </div>
                </div>

                <div>
                  <Label htmlFor='edit-rating' className='text-white mb-2 block'>
                    Đánh giá
                  </Label>
                  <Select defaultValue={currentReview.rating.toString()}>
                    <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                      <SelectValue placeholder='Chọn đánh giá' />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                      <SelectItem value='5'>5 sao</SelectItem>
                      <SelectItem value='4'>4 sao</SelectItem>
                      <SelectItem value='3'>3 sao</SelectItem>
                      <SelectItem value='2'>2 sao</SelectItem>
                      <SelectItem value='1'>1 sao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='edit-title' className='text-white mb-2 block'>
                    Tiêu đề
                  </Label>
                  <Input
                    id='edit-title'
                    defaultValue={currentReview.title}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>

                <div>
                  <Label htmlFor='edit-content' className='text-white mb-2 block'>
                    Nội dung
                  </Label>
                  <Textarea
                    id='edit-content'
                    defaultValue={currentReview.content}
                    rows={5}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>

                <div>
                  <Label htmlFor='edit-status' className='text-white mb-2 block'>
                    Trạng thái
                  </Label>
                  <Select defaultValue={currentReview.status}>
                    <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                      <SelectValue placeholder='Chọn trạng thái' />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                      <SelectItem value='approved'>Đã duyệt</SelectItem>
                      <SelectItem value='pending'>Chờ duyệt</SelectItem>
                      <SelectItem value='rejected'>Đã từ chối</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className='mt-6'>
                <Button
                  variant='outline'
                  onClick={() => setIsEditReviewOpen(false)}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  Hủy
                </Button>
                <Button className='bg-purple-600 hover:bg-purple-700'>Lưu thay đổi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
