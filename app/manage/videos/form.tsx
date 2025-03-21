'use client'

import type React from 'react'

import { useEffect, useMemo, useState } from 'react'
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
import { Icons } from '@/components/ui/icons'
import { useAddVideoMutation, useDeleteVideoMutation } from '@/queries/useVideo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { videoSchema, VideoTypeBody } from '@/schemaValidator/video.schema'
import { useUploadVideoMediaMutation } from '@/queries/useMedia'
import { toast } from 'sonner'
import { handleErrorApi } from '@/lib/utils'
import { useCourseQuery } from '@/queries/useCourse'
import { pagination } from '@/constants/pagination-config'
import { useLessonByIdQuery } from '@/queries/useLesson'
import { LessonType } from '@/app/manage/lessons/form'

// Mock data for videos

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

type VideoType = {
  id: string
  lessonId: string
  courseId: string
  orderLesson: number
  title: string
  description: string | null
  videoUrl: string
  duration: number
  createdAt: string
  updatedAt: string
}

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('')
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
  const [file, setFile] = useState<File | null>(null)
  const videosPerPage = 5

  const courseQuery = useCourseQuery(pagination.LIMIT, pagination.PAGE)
  const courseList = useMemo(() => {
    return (
      courseQuery.data?.payload.data.data.map((course) => ({
        id: course.id,
        title: course.title
      })) || []
    )
  }, [courseQuery.data])
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (courseList.length > 0) {
      setSelectedCourse(String(courseList[0].id))
    }
  }, [courseList])
  const lessonByIdQuery = useLessonByIdQuery(pagination.PAGE, pagination.LIMIT, selectedCourse as string)

  const data = lessonByIdQuery.data?.payload.data.data || []
  const video = data.flatMap((lesson) => lesson.videos)
  const [videos, setVideos] = useState(video)

  useEffect(() => {
    const video = data.flatMap((lesson) => lesson.videos)
    if (JSON.stringify(video) !== JSON.stringify(videos)) {
      setVideos(video)
    }
  }, [data])

  const [lessons, setLessons] = useState<LessonType[]>([])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setLessons((prevLessons) => {
        return JSON.stringify(prevLessons) !== JSON.stringify(data) ? data : prevLessons
      })
    }
  }, [data])

  const addVideoMutation = useAddVideoMutation()
  const uploadVideoMediaMutation = useUploadVideoMediaMutation()

  const form = useForm<VideoTypeBody>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      courseId: '',
      description: '',
      duration: undefined,
      lessonId: '',
      orderLesson: undefined,
      title: '',
      videoUrl: ''
    }
  })

  {
    Object.keys(form.formState.errors).length > 0 && (
      <p className='text-red-500 text-sm'>Có lỗi trong form, vui lòng kiểm tra lại.</p>
    )
  }

  const onSubmit = async (values: VideoTypeBody) => {
    if (addVideoMutation.isPending) return

    try {
      let videoUrl = values.videoUrl

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const uploadResponse = await uploadVideoMediaMutation.mutateAsync(formData)

        if (!uploadResponse?.payload?.data?.url) {
          throw new Error('Upload failed: No valid URL received')
        }

        videoUrl = uploadResponse.payload.data.url
      }

      const body: VideoTypeBody = {
        ...values,
        videoUrl
      }

      await addVideoMutation.mutateAsync(body)

      toast.success('create video success')
      setIsAddVideoOpen(false)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  const { mutateAsync } = useDeleteVideoMutation()
  const deleteVideo = async (id: string) => {
    if (id) {
      try {
        await mutateAsync(id)

        toast.success('Delete Video Successfully')
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }

  // Filter videos based on search, course, lesson, and status
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || video.courseId === selectedCourse
    const matchesLesson = selectedLesson === 'all' || video.lessonId === selectedLesson
    const matchesStatus = selectedStatus === 'all' || video.id === selectedStatus

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
      order: video.orderLesson,
      description: video.description || '',
      url: video.videoUrl,
      duration: video.duration,
      status: video.id
    })

    // Update filtered lessons for the selected course
    const lessonsForCourse = mockLessons.filter((lesson) => lesson.courseId === video.courseId)
    setFilteredLessons(lessonsForCourse)

    setIsEditVideoOpen(true)
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
        lessonId: formData.lessonId,
        orderLesson: Number(formData.order),
        description: formData.description,
        videoUrl: formData.url,
        duration: Number(formData.duration),
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile || null)
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
              <Icons.Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
            <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Icons.Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
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
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='title' className='text-white'>
                        Tiêu đề bài học
                      </Label>
                      <Input
                        {...form.register('title')}
                        id='title'
                        placeholder='Nhập tiêu đề bài học'
                        className={`bg-gray-800 border text-white ${form.formState.errors.title ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.title && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='courseId' className='text-white'>
                        Khóa học
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          setSelectedCourse(value)
                          form.setValue('courseId', value)
                        }}
                      >
                        <SelectTrigger
                          id='courseId'
                          className={`bg-gray-800 border text-white 
                                              ${form.formState.errors.courseId ? 'border-red-500' : 'border-gray-700'}`}
                        >
                          <SelectValue placeholder='Chọn khóa học' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {courseList.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.courseId && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.courseId.message}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='lessonId' className='text-white'>
                        Bài học
                      </Label>
                      <Select onValueChange={(value) => form.setValue('lessonId', value)}>
                        <SelectTrigger
                          id='lessonId'
                          className={`bg-gray-800 border text-white 
                                              ${form.formState.errors.courseId ? 'border-red-500' : 'border-gray-700'}`}
                        >
                          <SelectValue placeholder='Chọn khóa học' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {lessons.map((lesson) => (
                            <SelectItem key={lesson.id} value={lesson.id}>
                              {lesson.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.courseId && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.courseId.message}</p>
                      )}
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='description' className='text-white'>
                        Mô tả video
                      </Label>
                      <Textarea
                        {...form.register('description')}
                        id='description'
                        placeholder='Nhập mô tả video'
                        className={`bg-gray-800 border text-white ${form.formState.errors.description ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.description && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.description.message}</p>
                      )}
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='videoUrl' className='text-white'>
                        Upload Video
                      </Label>
                      <Input
                        type='file'
                        accept='video/*'
                        className='bg-gray-800 border-gray-700 text-white'
                        onChange={handleFileChange}
                      />

                      {file && <p className='text-white'>File selected: {file.name}</p>}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='orderLesson' className='text-white'>
                        Thứ tự video
                      </Label>
                      <Input
                        {...form.register('orderLesson', { valueAsNumber: true })}
                        id='orderLesson'
                        type='number'
                        min='1'
                        className={`bg-gray-800 border text-white ${form.formState.errors.orderLesson ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.orderLesson && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.orderLesson.message}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='duration' className='text-white'>
                        Thời lượng (giây)
                      </Label>
                      <Input
                        {...form.register('duration', { valueAsNumber: true })}
                        id='duration'
                        type='number'
                        min='1'
                        className={`bg-gray-800 border text-white ${form.formState.errors.duration ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.duration && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.duration.message}</p>
                      )}
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
                  <Icons.Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
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
                    {courseList.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
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
                      <Icons.CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Xuất bản
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-xs'
                      onClick={handleBulkDraft}
                    >
                      <Icons.XCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Bản nháp
                    </Button>
                    <Button variant='destructive' size='sm' className='text-xs' onClick={handleBulkDelete}>
                      <Icons.Trash2 className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Xóa
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className='p-4 sm:p-6 pt-0'>
            <div className='overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0'>
              <table className='w-full min-w-[800px] border-collapse'>
                <thead>
                  <tr className='border-b border-gray-700 bg-gray-900 text-white'>
                    <th className='py-3 px-4 w-12 text-center'>
                      <Checkbox
                        checked={selectedVideos.length === currentVideos.length && currentVideos.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='py-3 px-4 w-1/3 text-left text-sm font-medium text-gray-300'>Tiêu đề video</th>
                    <th className='py-3 px-4 w-1/4 text-left text-sm font-medium text-gray-300'>Bài học</th>
                    <th className='py-3 px-4 w-1/6 text-center text-sm font-medium text-gray-300'>Thời lượng</th>
                    <th className='py-3 px-4 w-1/6 text-center text-sm font-medium text-gray-300'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentVideos.length > 0 ? (
                    currentVideos.map((video) => (
                      <tr key={video.id} className='border-b border-gray-700 hover:bg-gray-800'>
                        <td className='py-3 px-4 text-center'>
                          <Checkbox
                            checked={selectedVideos.includes(video.id)}
                            onCheckedChange={() => handleSelectVideo(video.id)}
                            className='border-gray-600'
                          />
                        </td>
                        <td className='py-3 px-4 flex items-center space-x-3'>
                          <div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center'>
                            <Icons.Video className='w-4 h-4 text-white' />
                          </div>
                          <div>
                            <div className='text-sm font-medium'>{video.title}</div>
                            <div className='text-xs text-gray-400'>Tạo: {formatDate(video.createdAt)}</div>
                          </div>
                        </td>
                        <td className='py-3 px-4 text-sm text-gray-300'>{video.title}</td>
                        <td className='py-3 px-4 text-sm text-center text-gray-300'>
                          {formatDuration(video.duration)}
                        </td>
                        <td className='py-3 px-4 text-center'>
                          <div className='flex items-center justify-center space-x-2'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 text-green-400 hover:text-white hover:bg-gray-800'
                              onClick={() => handlePreviewVideo(video.videoUrl)}
                            >
                              <Icons.Play className='h-4 w-4' />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800'
                                >
                                  <Icons.MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className='bg-gray-800 border-gray-700 text-white'>
                                <DropdownMenuLabel className='text-sm'>Hành động</DropdownMenuLabel>
                                <DropdownMenuSeparator className='bg-gray-700' />
                                <DropdownMenuItem
                                  className='hover:bg-gray-700 cursor-pointer text-sm'
                                  onClick={() => handleEditVideo(video)}
                                >
                                  <Icons.Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='bg-gray-700' />
                                <DropdownMenuItem
                                  className='text-red-500 hover:bg-gray-700 cursor-pointer text-sm'
                                  onClick={() => deleteVideo(video.id)}
                                >
                                  <Icons.Trash2 className='h-4 w-4 mr-2' /> Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='text-center py-6 text-gray-400'>
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
              <div className='flex items-center space-x-2 order-1 sm:order-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white h-9 w-9'
                >
                  <Icons.ChevronLeft className='h-4 w-4' />
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
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white h-9 w-9'
                >
                  <Icons.ChevronRight className='h-4 w-4' />
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
