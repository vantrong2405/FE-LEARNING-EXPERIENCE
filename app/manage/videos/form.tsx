'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  Video,
  X
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
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { exportToExcel } from '@/lib/excel'

// Mock data for videos
const mockVideos = [
  {
    id: '1',
    title: 'Giới thiệu JavaScript',
    lessonId: '1',
    lessonTitle: 'Giới thiệu JavaScript',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 1,
    description: 'Video giới thiệu về ngôn ngữ lập trình JavaScript và lịch sử phát triển.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 720, // seconds
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-16T14:30:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Biến và Kiểu dữ liệu cơ bản',
    lessonId: '2',
    lessonTitle: 'Biến và Kiểu dữ liệu',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 1,
    description: 'Video hướng dẫn về biến và các kiểu dữ liệu cơ bản trong JavaScript.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 840, // seconds
    createdAt: '2024-05-15T11:00:00Z',
    updatedAt: '2024-05-16T15:30:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Kiểu dữ liệu nâng cao',
    lessonId: '2',
    lessonTitle: 'Biến và Kiểu dữ liệu',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 2,
    description: 'Video hướng dẫn về các kiểu dữ liệu nâng cao trong JavaScript.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 960, // seconds
    createdAt: '2024-05-15T12:00:00Z',
    updatedAt: '2024-05-16T16:30:00Z',
    status: 'draft'
  },
  {
    id: '4',
    title: 'Giới thiệu về React Components',
    lessonId: '3',
    lessonTitle: 'Components và Props',
    courseId: '2',
    courseName: 'React Advanced',
    order: 1,
    description: 'Video giới thiệu về React Components và cách sử dụng.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 1080, // seconds
    createdAt: '2024-05-16T09:00:00Z',
    updatedAt: '2024-05-17T10:30:00Z',
    status: 'published'
  },
  {
    id: '5',
    title: 'Truyền dữ liệu với Props',
    lessonId: '3',
    lessonTitle: 'Components và Props',
    courseId: '2',
    courseName: 'React Advanced',
    order: 2,
    description: 'Video hướng dẫn cách truyền dữ liệu giữa các components với Props.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 1200, // seconds
    createdAt: '2024-05-16T10:00:00Z',
    updatedAt: '2024-05-17T11:30:00Z',
    status: 'published'
  },
  {
    id: '6',
    title: 'Hooks trong React',
    lessonId: '5',
    lessonTitle: 'Hooks cơ bản',
    courseId: '2',
    courseName: 'React Advanced',
    order: 1,
    description: 'Video hướng dẫn về các hooks cơ bản trong React.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 1500, // seconds
    createdAt: '2024-05-16T11:00:00Z',
    updatedAt: '2024-05-17T12:30:00Z',
    status: 'draft'
  },
  {
    id: '7',
    title: 'Giới thiệu Python',
    lessonId: '6',
    lessonTitle: 'Giới thiệu Python',
    courseId: '3',
    courseName: 'Python for Data Science',
    order: 1,
    description: 'Video giới thiệu về ngôn ngữ lập trình Python.',
    url: 'https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1',
    duration: 1320, // seconds
    createdAt: '2024-05-17T09:00:00Z',
    updatedAt: '2024-05-18T10:30:00Z',
    status: 'published'
  }
]

// Mock data for courses
const mockCourses = [
  { id: '1', name: 'JavaScript Cơ Bản' },
  { id: '2', name: 'React Advanced' },
  { id: '3', name: 'Python for Data Science' },
  { id: '4', name: 'UI/UX Design' }
]

// Mock data for lessons
const mockLessons = [
  { id: '1', title: 'Giới thiệu JavaScript', courseId: '1' },
  { id: '2', title: 'Biến và Kiểu dữ liệu', courseId: '1' },
  { id: '3', title: 'Components và Props', courseId: '2' },
  { id: '4', title: 'State và Lifecycle', courseId: '2' },
  { id: '5', title: 'Hooks cơ bản', courseId: '2' },
  { id: '6', title: 'Giới thiệu Python', courseId: '3' },
  { id: '7', title: 'NumPy và Pandas', courseId: '3' }
]

interface VideoType {
  id: string
  title: string
  lessonId: string
  lessonTitle: string
  courseId: string
  courseName: string
  order: number
  description: string
  url: string
  duration: number
  createdAt: string
  updatedAt: string
  status: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoType[]>(mockVideos)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [selectedLesson, setSelectedLesson] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false)
  const [isEditVideoOpen, setIsEditVideoOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null)
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredLessons, setFilteredLessons] = useState(mockLessons)
  const videosPerPage = 5

  // Filter videos based on search, course, lesson, and status
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || video.courseId === selectedCourse
    const matchesLesson = selectedLesson === 'all' || video.lessonId === selectedLesson
    const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus

    return matchesSearch && matchesCourse && matchesLesson && matchesStatus
  })

  // Pagination
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    courseId: '',
    lessonId: '',
    order: 1,
    description: '',
    url: '',
    duration: 0,
    status: 'draft'
  })

  // Update lessons dropdown when course changes
  useEffect(() => {
    if (selectedCourse === 'all') {
      setFilteredLessons(mockLessons)
    } else {
      const lessonsForCourse = mockLessons.filter((lesson) => lesson.courseId === selectedCourse)
      setFilteredLessons(lessonsForCourse)
      if (selectedLesson !== 'all' && !lessonsForCourse.some((lesson) => lesson.id === selectedLesson)) {
        setSelectedLesson('all')
      }
    }
  }, [selectedCourse, selectedLesson])

  // Handle edit video
  const handleEditVideo = (video: VideoType) => {
    setCurrentVideo(video)
    setFormData({
      id: video.id,
      title: video.title,
      courseId: video.courseId,
      lessonId: video.lessonId,
      order: video.order,
      description: video.description,
      url: video.url,
      duration: video.duration,
      status: video.status
    })

    // Update filtered lessons for the selected course
    const lessonsForCourse = mockLessons.filter((lesson) => lesson.courseId === video.courseId)
    setFilteredLessons(lessonsForCourse)

    setIsEditVideoOpen(true)
  }

  // Handle add new video
  const handleAddVideo = () => {
    setCurrentVideo(null)
    setFormData({
      id: '',
      title: '',
      courseId: '',
      lessonId: '',
      order: 1,
      description: '',
      url: '',
      duration: 0,
      status: 'draft'
    })
    setIsAddVideoOpen(true)
  }

  // Handle preview video
  const handlePreviewVideo = (url: string) => {
    setPreviewUrl(url)
    setIsPreviewOpen(true)
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update lessons dropdown when course changes in form
    if (name === 'courseId') {
      const lessonsForCourse = mockLessons.filter((lesson) => lesson.courseId === value)
      setFilteredLessons(lessonsForCourse)
      // Reset lesson selection
      setFormData((prev) => ({ ...prev, lessonId: '' }))
    }
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const now = new Date().toISOString()

    if (currentVideo) {
      // Update existing video
      const updatedVideos = videos.map((video) =>
        video.id === currentVideo.id
          ? {
              ...video,
              title: formData.title,
              courseId: formData.courseId,
              courseName: mockCourses.find((c) => c.id === formData.courseId)?.name || '',
              lessonId: formData.lessonId,
              lessonTitle: mockLessons.find((l) => l.id === formData.lessonId)?.title || '',
              order: Number(formData.order),
              description: formData.description,
              url: formData.url,
              duration: Number(formData.duration),
              status: formData.status,
              updatedAt: now
            }
          : video
      )
      setVideos(updatedVideos)
      setIsEditVideoOpen(false)
    } else {
      // Add new video
      const newVideo: VideoType = {
        id: Date.now().toString(),
        title: formData.title,
        courseId: formData.courseId,
        courseName: mockCourses.find((c) => c.id === formData.courseId)?.name || '',
        lessonId: formData.lessonId,
        lessonTitle: mockLessons.find((l) => l.id === formData.lessonId)?.title || '',
        order: Number(formData.order),
        description: formData.description,
        url: formData.url,
        duration: Number(formData.duration),
        status: formData.status,
        createdAt: now,
        updatedAt: now
      }
      setVideos([...videos, newVideo])
      setIsAddVideoOpen(false)
    }
  }

  // Handle delete video
  const handleDeleteVideo = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa video này?')) {
      const updatedVideos = videos.filter((video) => video.id !== id)
      setVideos(updatedVideos)
    }
  }

  // Handle checkbox selection
  const handleSelectVideo = (videoId: string) => {
    if (selectedVideos.includes(videoId)) {
      setSelectedVideos(selectedVideos.filter((id) => id !== videoId))
    } else {
      setSelectedVideos([...selectedVideos, videoId])
    }
  }

  const handleSelectAll = () => {
    if (selectedVideos.length === currentVideos.length) {
      setSelectedVideos([])
    } else {
      setSelectedVideos(currentVideos.map((video) => video.id))
    }
  }

  // Handle bulk actions
  const handleBulkPublish = () => {
    const updatedVideos = videos.map((video) =>
      selectedVideos.includes(video.id) ? { ...video, status: 'published', updatedAt: new Date().toISOString() } : video
    )
    setVideos(updatedVideos)
    setSelectedVideos([])
  }

  const handleBulkDraft = () => {
    const updatedVideos = videos.map((video) =>
      selectedVideos.includes(video.id) ? { ...video, status: 'draft', updatedAt: new Date().toISOString() } : video
    )
    setVideos(updatedVideos)
    setSelectedVideos([])
  }

  const handleBulkDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedVideos.length} video đã chọn?`)) {
      const updatedVideos = videos.filter((video) => !selectedVideos.includes(video.id))
      setVideos(updatedVideos)
      setSelectedVideos([])
    }
  }

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã video' },
      { key: 'title', header: 'Tiêu đề video' },
      { key: 'lessonTitle', header: 'Bài học' },
      { key: 'courseName', header: 'Khóa học' },
      { key: 'order', header: 'Thứ tự' },
      { key: 'duration', header: 'Thời lượng' },
      { key: 'status', header: 'Trạng thái' },
      { key: 'createdAt', header: 'Ngày tạo' },
      { key: 'updatedAt', header: 'Cập nhật lần cuối' }
    ]

    const exportData = filteredVideos.map((video) => ({
      ...video,
      duration: formatDuration(video.duration),
      status: video.status === 'published' ? 'Đã xuất bản' : 'Bản nháp',
      createdAt: formatDate(video.createdAt),
      updatedAt: formatDate(video.updatedAt)
    }))

    exportToExcel({
      filename: 'Danh_sach_video',
      sheetName: 'Video',
      data: exportData,
      columns: columns
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0D0A25] to-[#1A1744] text-white p-3 sm:p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section - Responsive */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-purple-400'>Quản lý Video</h1>
            <p className='text-gray-400 mt-1'>Quản lý tất cả các video trong bài học</p>
          </div>

          {/* Desktop Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto sm:ml-auto'>
            <Button
              variant='outline'
              className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto text-xs sm:text-sm'
              onClick={handleExportExcel}
            >
              <Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
            <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                  <span>Thêm Video</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Thêm Video Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>
                    Điền thông tin để thêm video mới vào bài học
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='title' className='text-white'>
                        Tiêu đề video
                      </Label>
                      <Input
                        id='title'
                        name='title'
                        placeholder='Nhập tiêu đề video'
                        className='bg-gray-800 border-gray-700 text-white'
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='courseId' className='text-white'>
                        Khóa học
                      </Label>
                      <Select
                        name='courseId'
                        value={formData.courseId}
                        onValueChange={(value) => handleSelectChange('courseId', value)}
                        required
                      >
                        <SelectTrigger id='courseId' className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn khóa học' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {mockCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='lessonId' className='text-white'>
                        Bài học
                      </Label>
                      <Select
                        name='lessonId'
                        value={formData.lessonId}
                        onValueChange={(value) => handleSelectChange('lessonId', value)}
                        required
                        disabled={!formData.courseId}
                      >
                        <SelectTrigger id='lessonId' className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder={formData.courseId ? 'Chọn bài học' : 'Chọn khóa học trước'} />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {filteredLessons.map((lesson) => (
                            <SelectItem key={lesson.id} value={lesson.id}>
                              {lesson.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='description' className='text-white'>
                        Mô tả video
                      </Label>
                      <Textarea
                        id='description'
                        name='description'
                        placeholder='Nhập mô tả chi tiết của video'
                        className='bg-gray-800 border-gray-700 text-white min-h-[120px]'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='url' className='text-white'>
                        URL video
                      </Label>
                      <Input
                        id='url'
                        name='url'
                        type='url'
                        placeholder='https://www.youtube.com/watch?v=MVMoBwPdbiI&list=RDMVMoBwPdbiI&start_radio=1'
                        className='bg-gray-800 border-gray-700 text-white'
                        value={formData.url}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='order' className='text-white'>
                        Thứ tự video
                      </Label>
                      <Input
                        id='order'
                        name='order'
                        type='number'
                        min='1'
                        className='bg-gray-800 border-gray-700 text-white'
                        value={formData.order}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='duration' className='text-white'>
                        Thời lượng (giây)
                      </Label>
                      <Input
                        id='duration'
                        name='duration'
                        type='number'
                        min='1'
                        className='bg-gray-800 border-gray-700 text-white'
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='status' className='text-white'>
                        Trạng thái
                      </Label>
                      <Select
                        name='status'
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange('status', value)}
                      >
                        <SelectTrigger id='status' className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          <SelectItem value='draft'>Bản nháp</SelectItem>
                          <SelectItem value='published'>Đã xuất bản</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setIsAddVideoOpen(false)}
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto'
                    >
                      Hủy
                    </Button>
                    <Button type='submit' className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto'>
                      Thêm video
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filter Card - Responsive */}
        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader className='p-4 sm:p-6'>
            <CardTitle className='text-lg sm:text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400 text-xs sm:text-sm'>
              Lọc danh sách video theo các tiêu chí
            </CardDescription>
          </CardHeader>
          <CardContent className='p-4 sm:p-6 pt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block text-sm'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo tiêu đề, bài học...'
                    className='pl-8 bg-gray-800 border-gray-700 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='course' className='text-white mb-2 block text-sm'>
                  Khóa học
                </Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn khóa học' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả khóa học</SelectItem>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='lesson' className='text-white mb-2 block text-sm'>
                  Bài học
                </Label>
                <Select value={selectedLesson} onValueChange={setSelectedLesson}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn bài học' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả bài học</SelectItem>
                    {filteredLessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='status' className='text-white mb-2 block text-sm'>
                  Trạng thái
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn trạng thái' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                    <SelectItem value='published'>Đã xuất bản</SelectItem>
                    <SelectItem value='draft'>Bản nháp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos List Card - Responsive */}
        <Card className='bg-gray-900 border-gray-700 shadow-xl'>
          <CardHeader className='p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
              <div>
                <CardTitle className='text-lg sm:text-xl text-purple-400'>Danh sách video</CardTitle>
                <CardDescription className='text-gray-400 text-xs sm:text-sm'>
                  {filteredVideos.length} video được tìm thấy
                </CardDescription>
              </div>
              {selectedVideos.length > 0 && (
                <div className='flex flex-wrap items-center gap-2 w-full sm:w-auto'>
                  <span className='text-xs sm:text-sm text-gray-400'>Đã chọn {selectedVideos.length} video</span>
                  <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-xs'
                      onClick={handleBulkPublish}
                    >
                      <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Xuất bản
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-xs'
                      onClick={handleBulkDraft}
                    >
                      <XCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Bản nháp
                    </Button>
                    <Button variant='destructive' size='sm' className='text-xs' onClick={handleBulkDelete}>
                      <Trash2 className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Xóa
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className='p-4 sm:p-6 pt-0'>
            {/* Responsive Table with Horizontal Scroll */}
            <div className='overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0'>
              <table className='w-full min-w-[800px]'>
                <thead>
                  <tr className='border-b border-gray-800'>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4'>
                      <Checkbox
                        checked={selectedVideos.length === currentVideos.length && currentVideos.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Tiêu đề video
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Bài học
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Khóa học
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Thời lượng
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Trạng thái
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentVideos.length > 0 ? (
                    currentVideos.map((video) => (
                      <tr key={video.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <Checkbox
                            checked={selectedVideos.includes(video.id)}
                            onCheckedChange={() => handleSelectVideo(video.id)}
                            className='border-gray-600'
                          />
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 sm:mr-3'>
                              <Video className='h-3 w-3 sm:h-4 sm:w-4 text-white' />
                            </div>
                            <div>
                              <div className='font-medium text-xs sm:text-sm'>{video.title}</div>
                              <div className='text-xs text-gray-400'>Tạo: {formatDate(video.createdAt)}</div>
                            </div>
                          </div>
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>
                          {video.lessonTitle}
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>
                          {video.courseName}
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>
                          {formatDuration(video.duration)}
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <Badge
                            className={`text-xs ${
                              video.status === 'published'
                                ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                                : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                            }`}
                          >
                            {video.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                          </Badge>
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <div className='flex items-center gap-1'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7 sm:h-8 sm:w-8 text-green-400 hover:text-white hover:bg-gray-800'
                              onClick={() => handlePreviewVideo(video.url)}
                            >
                              <Play className='h-4 w-4' />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-white hover:bg-gray-800'
                                >
                                  <MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className='bg-gray-800 border-gray-700 text-white'>
                                <DropdownMenuLabel className='text-xs sm:text-sm'>Hành động</DropdownMenuLabel>
                                <DropdownMenuSeparator className='bg-gray-700' />
                                <DropdownMenuItem
                                  className='hover:bg-gray-700 cursor-pointer text-xs sm:text-sm'
                                  onClick={() => handleEditVideo(video)}
                                >
                                  <Edit className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer text-xs sm:text-sm'>
                                  {video.status === 'published' ? (
                                    <>
                                      <XCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Chuyển bản nháp
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Xuất bản
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='bg-gray-700' />
                                <DropdownMenuItem
                                  className='text-red-500 hover:bg-gray-700 cursor-pointer text-xs sm:text-sm'
                                  onClick={() => handleDeleteVideo(video.id)}
                                >
                                  <Trash2 className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className='text-center py-6 text-gray-400'>
                        Không tìm thấy video nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Responsive Pagination */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
              <div className='text-xs sm:text-sm text-gray-400 order-2 sm:order-1'>
                Hiển thị {indexOfFirstVideo + 1}-{Math.min(indexOfLastVideo, filteredVideos.length)} trong số{' '}
                {filteredVideos.length} video
              </div>
              <div className='flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white h-8 w-8 sm:h-9 sm:w-9'
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className={`text-xs ${
                      currentPage === page
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white h-8 w-8 sm:h-9 sm:w-9'
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Video Dialog - Responsive */}
        {currentVideo && (
          <Dialog open={isEditVideoOpen} onOpenChange={setIsEditVideoOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Video</DialogTitle>
                <DialogDescription className='text-gray-400 text-sm'>Cập nhật thông tin video</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='edit-title' className='text-white text-sm'>
                      Tiêu đề video
                    </Label>
                    <Input
                      id='edit-title'
                      name='title'
                      value={formData.title}
                      onChange={handleInputChange}
                      className='bg-gray-800 border-gray-700 text-white'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-courseId' className='text-white text-sm'>
                      Khóa học
                    </Label>
                    <Select value={formData.courseId} onValueChange={(value) => handleSelectChange('courseId', value)}>
                      <SelectTrigger id='edit-courseId' className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn khóa học' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        {mockCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-lessonId' className='text-white text-sm'>
                      Bài học
                    </Label>
                    <Select value={formData.lessonId} onValueChange={(value) => handleSelectChange('lessonId', value)}>
                      <SelectTrigger id='edit-lessonId' className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn bài học' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        {filteredLessons.map((lesson) => (
                          <SelectItem key={lesson.id} value={lesson.id}>
                            {lesson.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='edit-description' className='text-white text-sm'>
                      Mô tả video
                    </Label>
                    <Textarea
                      id='edit-description'
                      name='description'
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      className='bg-gray-800 border-gray-700 text-white'
                      required
                    />
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='edit-url' className='text-white text-sm'>
                      URL video
                    </Label>
                    <Input
                      id='edit-url'
                      name='url'
                      type='url'
                      value={formData.url}
                      onChange={handleInputChange}
                      className='bg-gray-800 border-gray-700 text-white'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-order' className='text-white text-sm'>
                      Thứ tự video
                    </Label>
                    <Input
                      id='edit-order'
                      name='order'
                      type='number'
                      min='1'
                      value={formData.order}
                      onChange={handleInputChange}
                      className='bg-gray-800 border-gray-700 text-white'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-duration' className='text-white text-sm'>
                      Thời lượng (giây)
                    </Label>
                    <Input
                      id='edit-duration'
                      name='duration'
                      type='number'
                      min='1'
                      value={formData.duration}
                      onChange={handleInputChange}
                      className='bg-gray-800 border-gray-700 text-white'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-status' className='text-white text-sm'>
                      Trạng thái
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                      <SelectTrigger id='edit-status' className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='draft'>Bản nháp</SelectItem>
                        <SelectItem value='published'>Đã xuất bản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsEditVideoOpen(false)}
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto'
                  >
                    Hủy
                  </Button>
                  <Button type='submit' className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto'>
                    Lưu thay đổi
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Video Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-4xl'>
            <DialogHeader>
              <DialogTitle className='text-xl text-purple-400'>Xem trước video</DialogTitle>
            </DialogHeader>

            <div className='aspect-video w-full bg-black rounded-md overflow-hidden'>
              <iframe
                src={previewUrl.replace('watch?v=', 'embed/')}
                className='w-full h-full'
                allowFullScreen
                title='Video preview'
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
