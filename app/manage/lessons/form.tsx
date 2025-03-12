'use client'

import type React from 'react'

import { useState } from 'react'
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
  FileText
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

// Mock data for lessons
const mockLessons = [
  {
    id: '1',
    title: 'Giới thiệu JavaScript',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 1,
    content: 'Giới thiệu về ngôn ngữ lập trình JavaScript và lịch sử phát triển.',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-16T14:30:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Biến và Kiểu dữ liệu',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 2,
    content: 'Tìm hiểu về biến và các kiểu dữ liệu trong JavaScript.',
    createdAt: '2024-05-15T11:00:00Z',
    updatedAt: '2024-05-16T15:30:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Components và Props',
    courseId: '2',
    courseName: 'React Advanced',
    order: 1,
    content: 'Tìm hiểu về React Components và cách truyền dữ liệu qua Props.',
    createdAt: '2024-05-16T09:00:00Z',
    updatedAt: '2024-05-17T10:30:00Z',
    status: 'draft'
  },
  {
    id: '4',
    title: 'State và Lifecycle',
    courseId: '2',
    courseName: 'React Advanced',
    order: 2,
    content: 'Tìm hiểu về State và vòng đời của một Component trong React.',
    createdAt: '2024-05-16T10:00:00Z',
    updatedAt: '2024-05-17T11:30:00Z',
    status: 'published'
  },
  {
    id: '5',
    title: 'Hooks cơ bản',
    courseId: '2',
    courseName: 'React Advanced',
    order: 3,
    content: 'Tìm hiểu về các Hooks cơ bản trong React như useState, useEffect.',
    createdAt: '2024-05-16T11:00:00Z',
    updatedAt: '2024-05-17T12:30:00Z',
    status: 'published'
  },
  {
    id: '6',
    title: 'Giới thiệu Python',
    courseId: '3',
    courseName: 'Python for Data Science',
    order: 1,
    content: 'Giới thiệu về ngôn ngữ lập trình Python và ứng dụng trong Data Science.',
    createdAt: '2024-05-17T09:00:00Z',
    updatedAt: '2024-05-18T10:30:00Z',
    status: 'published'
  },
  {
    id: '7',
    title: 'NumPy và Pandas',
    courseId: '3',
    courseName: 'Python for Data Science',
    order: 2,
    content: 'Tìm hiểu về thư viện NumPy và Pandas trong Python.',
    createdAt: '2024-05-17T10:00:00Z',
    updatedAt: '2024-05-18T11:30:00Z',
    status: 'draft'
  }
]

// Mock data for courses
const mockCourses = [
  { id: '1', name: 'JavaScript Cơ Bản' },
  { id: '2', name: 'React Advanced' },
  { id: '3', name: 'Python for Data Science' },
  { id: '4', name: 'UI/UX Design' }
]

interface Lesson {
  id: string
  title: string
  courseId: string
  courseName: string
  order: number
  content: string
  createdAt: string
  updatedAt: string
  status: string
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [selectedLessons, setSelectedLessons] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const lessonsPerPage = 5

  // Filter lessons based on search, course, and status
  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || lesson.courseId === selectedCourse
    const matchesStatus = selectedStatus === 'all' || lesson.status === selectedStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  // Pagination
  const indexOfLastLesson = currentPage * lessonsPerPage
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage
  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson)
  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage)

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    courseId: '',
    order: 1,
    content: '',
    status: 'draft',
    file: null as File | null
  })

  // Handle edit lesson
  const handleEditLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    setFormData({
      id: lesson.id,
      title: lesson.title,
      courseId: lesson.courseId,
      order: lesson.order,
      content: lesson.content,
      status: lesson.status,
      file: null
    })
    setIsEditLessonOpen(true)
  }

  // Handle add new lesson
  const handleAddLesson = () => {
    setCurrentLesson(null)
    setFormData({
      id: '',
      title: '',
      courseId: '',
      order: 1,
      content: '',
      status: 'draft',
      file: null
    })
    setIsAddLessonOpen(true)
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const now = new Date().toISOString()

    if (currentLesson) {
      // Update existing lesson
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === currentLesson.id
          ? {
              ...lesson,
              title: formData.title,
              courseId: formData.courseId,
              courseName: mockCourses.find((c) => c.id === formData.courseId)?.name || '',
              order: Number(formData.order),
              content: formData.content,
              status: formData.status,
              updatedAt: now
            }
          : lesson
      )
      setLessons(updatedLessons)
      setIsEditLessonOpen(false)
    } else {
      // Add new lesson
      const newLesson: Lesson = {
        id: Date.now().toString(),
        title: formData.title,
        courseId: formData.courseId,
        courseName: mockCourses.find((c) => c.id === formData.courseId)?.name || '',
        order: Number(formData.order),
        content: formData.content,
        status: formData.status,
        createdAt: now,
        updatedAt: now
      }
      setLessons([...lessons, newLesson])
      setIsAddLessonOpen(false)
    }
  }

  // Handle delete lesson
  const handleDeleteLesson = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
      const updatedLessons = lessons.filter((lesson) => lesson.id !== id)
      setLessons(updatedLessons)
    }
  }

  // Handle checkbox selection
  const handleSelectLesson = (lessonId: string) => {
    if (selectedLessons.includes(lessonId)) {
      setSelectedLessons(selectedLessons.filter((id) => id !== lessonId))
    } else {
      setSelectedLessons([...selectedLessons, lessonId])
    }
  }

  const handleSelectAll = () => {
    if (selectedLessons.length === currentLessons.length) {
      setSelectedLessons([])
    } else {
      setSelectedLessons(currentLessons.map((lesson) => lesson.id))
    }
  }

  // Handle bulk actions
  const handleBulkPublish = () => {
    const updatedLessons = lessons.map((lesson) =>
      selectedLessons.includes(lesson.id)
        ? { ...lesson, status: 'published', updatedAt: new Date().toISOString() }
        : lesson
    )
    setLessons(updatedLessons)
    setSelectedLessons([])
  }

  const handleBulkDraft = () => {
    const updatedLessons = lessons.map((lesson) =>
      selectedLessons.includes(lesson.id) ? { ...lesson, status: 'draft', updatedAt: new Date().toISOString() } : lesson
    )
    setLessons(updatedLessons)
    setSelectedLessons([])
  }

  const handleBulkDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedLessons.length} bài học đã chọn?`)) {
      const updatedLessons = lessons.filter((lesson) => !selectedLessons.includes(lesson.id))
      setLessons(updatedLessons)
      setSelectedLessons([])
    }
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
      { key: 'id', header: 'Mã bài học' },
      { key: 'title', header: 'Tiêu đề bài học' },
      { key: 'courseName', header: 'Khóa học' },
      { key: 'order', header: 'Thứ tự' },
      { key: 'status', header: 'Trạng thái' },
      { key: 'createdAt', header: 'Ngày tạo' },
      { key: 'updatedAt', header: 'Cập nhật lần cuối' }
    ]

    const exportData = filteredLessons.map((lesson) => ({
      ...lesson,
      status: lesson.status === 'published' ? 'Đã xuất bản' : 'Bản nháp',
      createdAt: formatDate(lesson.createdAt),
      updatedAt: formatDate(lesson.updatedAt)
    }))

    exportToExcel({
      filename: 'Danh_sach_bai_hoc',
      sheetName: 'Bài học',
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
            <h1 className='text-2xl font-bold text-purple-400'>Quản lý Bài Học</h1>
            <p className='text-gray-400 mt-1'>Quản lý tất cả các bài học trong khóa học</p>
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
            <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                  <span>Thêm Bài Học</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Thêm Bài Học Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>
                    Điền thông tin để thêm bài học mới vào khóa học
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='title' className='text-white'>
                        Tiêu đề bài học
                      </Label>
                      <Input
                        id='title'
                        name='title'
                        placeholder='Nhập tiêu đề bài học'
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
                      <Label htmlFor='order' className='text-white'>
                        Thứ tự bài học
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

                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='content' className='text-white'>
                        Nội dung bài học
                      </Label>
                      <Textarea
                        id='content'
                        name='content'
                        placeholder='Nhập nội dung chi tiết của bài học'
                        className='bg-gray-800 border-gray-700 text-white min-h-[120px]'
                        value={formData.content}
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

                    <div className='space-y-2'>
                      <Label htmlFor='file' className='text-white'>
                        Tài liệu bài học
                      </Label>
                      <Input
                        id='file'
                        name='file'
                        type='file'
                        className='bg-gray-800 border-gray-700 text-white'
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setIsAddLessonOpen(false)}
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto'
                    >
                      Hủy
                    </Button>
                    <Button type='submit' className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto'>
                      Thêm bài học
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
              Lọc danh sách bài học theo các tiêu chí
            </CardDescription>
          </CardHeader>
          <CardContent className='p-4 sm:p-6 pt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block text-sm'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo tiêu đề, khóa học...'
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

        {/* Lessons List Card - Responsive */}
        <Card className='bg-gray-900 border-gray-700 shadow-xl'>
          <CardHeader className='p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
              <div>
                <CardTitle className='text-lg sm:text-xl text-purple-400'>Danh sách bài học</CardTitle>
                <CardDescription className='text-gray-400 text-xs sm:text-sm'>
                  {filteredLessons.length} bài học được tìm thấy
                </CardDescription>
              </div>
              {selectedLessons.length > 0 && (
                <div className='flex flex-wrap items-center gap-2 w-full sm:w-auto'>
                  <span className='text-xs sm:text-sm text-gray-400'>Đã chọn {selectedLessons.length} bài học</span>
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
                        checked={selectedLessons.length === currentLessons.length && currentLessons.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Tiêu đề bài học
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Khóa học
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Thứ tự
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Trạng thái
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Cập nhật lần cuối
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLessons.length > 0 ? (
                    currentLessons.map((lesson) => (
                      <tr key={lesson.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <Checkbox
                            checked={selectedLessons.includes(lesson.id)}
                            onCheckedChange={() => handleSelectLesson(lesson.id)}
                            className='border-gray-600'
                          />
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 sm:mr-3'>
                              <FileText className='h-3 w-3 sm:h-4 sm:w-4 text-white' />
                            </div>
                            <div>
                              <div className='font-medium text-xs sm:text-sm'>{lesson.title}</div>
                              <div className='text-xs text-gray-400'>Tạo: {formatDate(lesson.createdAt)}</div>
                            </div>
                          </div>
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>
                          {lesson.courseName}
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>{lesson.order}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
                          <Badge
                            className={`text-xs ${
                              lesson.status === 'published'
                                ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                                : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                            }`}
                          >
                            {lesson.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                          </Badge>
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>
                          {formatDate(lesson.updatedAt)}
                        </td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4'>
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
                                onClick={() => handleEditLesson(lesson)}
                              >
                                <Edit className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer text-xs sm:text-sm'>
                                {lesson.status === 'published' ? (
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
                                onClick={() => handleDeleteLesson(lesson.id)}
                              >
                                <Trash2 className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className='text-center py-6 text-gray-400'>
                        Không tìm thấy bài học nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Responsive Pagination */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
              <div className='text-xs sm:text-sm text-gray-400 order-2 sm:order-1'>
                Hiển thị {indexOfFirstLesson + 1}-{Math.min(indexOfLastLesson, filteredLessons.length)} trong số{' '}
                {filteredLessons.length} bài học
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

        {/* Edit Lesson Dialog - Responsive */}
        {currentLesson && (
          <Dialog open={isEditLessonOpen} onOpenChange={setIsEditLessonOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Bài Học</DialogTitle>
                <DialogDescription className='text-gray-400 text-sm'>Cập nhật thông tin bài học</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='edit-title' className='text-white text-sm'>
                      Tiêu đề bài học
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
                    <Label htmlFor='edit-order' className='text-white text-sm'>
                      Thứ tự bài học
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

                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='edit-content' className='text-white text-sm'>
                      Nội dung bài học
                    </Label>
                    <Textarea
                      id='edit-content'
                      name='content'
                      rows={5}
                      value={formData.content}
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

                  <div className='space-y-2'>
                    <Label htmlFor='edit-file' className='text-white text-sm'>
                      Tài liệu bài học
                    </Label>
                    <Input
                      id='edit-file'
                      name='file'
                      type='file'
                      className='bg-gray-800 border-gray-700 text-white'
                      onChange={handleFileChange}
                    />
                    {currentLesson.id && (
                      <p className='text-xs text-gray-400 mt-1'>Để trống nếu không muốn thay đổi tài liệu</p>
                    )}
                  </div>
                </div>

                <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsEditLessonOpen(false)}
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
      </div>
    </div>
  )
}
