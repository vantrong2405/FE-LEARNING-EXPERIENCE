'use client'

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
  RefreshCw,
  Image,
  Upload,
  DollarSign,
  Eye,
  EyeOff,
  Star
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { exportToExcel, formatCurrency } from '@/lib/excel'

// Sample course data
const courses = [
  {
    id: 1,
    title: 'JavaScript Cơ Bản',
    instructor: 'Nguyễn Văn A',
    price: 599000,
    status: 'published',
    students: 120,
    rating: 4.7,
    created: '2023-01-15',
    category: 'Web Development',
    thumbnail: '/placeholder.svg?height=80&width=120'
  },
  {
    id: 2,
    title: 'React Advanced',
    instructor: 'Trần Thị B',
    price: 799000,
    status: 'published',
    students: 85,
    rating: 4.8,
    created: '2023-02-20',
    category: 'Web Development',
    thumbnail: '/placeholder.svg?height=80&width=120'
  },
  {
    id: 3,
    title: 'Python for Data Science',
    instructor: 'Lê Văn C',
    price: 899000,
    status: 'draft',
    students: 0,
    rating: 0,
    created: '2023-06-10',
    category: 'Data Science',
    thumbnail: '/placeholder.svg?height=80&width=120'
  },
  {
    id: 4,
    title: 'UI/UX Design',
    instructor: 'Phạm Thị D',
    price: 699000,
    status: 'published',
    students: 65,
    rating: 4.5,
    created: '2023-03-05',
    category: 'Design',
    thumbnail: '/placeholder.svg?height=80&width=120'
  },
  {
    id: 5,
    title: 'Mobile App Development with Flutter',
    instructor: 'Hoàng Văn E',
    price: 899000,
    status: 'published',
    students: 45,
    rating: 4.6,
    created: '2023-04-15',
    category: 'Mobile Development',
    thumbnail: '/placeholder.svg?height=80&width=120'
  },
  {
    id: 6,
    title: 'Machine Learning Fundamentals',
    instructor: 'Ngô Thị H',
    price: 999000,
    status: 'draft',
    students: 0,
    rating: 0,
    created: '2023-07-01',
    category: 'Data Science',
    thumbnail: '/placeholder.svg?height=80&width=120'
  }
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentTab, setCurrentTab] = useState('basic')
  const coursesPerPage = 5

  // Filter courses based on search term, category, and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  // Handle edit course
  interface Course {
    id: number
    title: string
    instructor: string
    price: number
    status: string
    students: number
    rating: number
    created: string
    category: string
    thumbnail: string
  }

  interface HandleEditCourse {
    (course: Course): void
  }

  const handleEditCourse: HandleEditCourse = (course) => {
    setCurrentCourse(course)
    setIsEditCourseOpen(true)
  }

  // Handle checkbox selection
  interface HandleSelectCourse {
    (courseId: number): void
  }

  const handleSelectCourse: HandleSelectCourse = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  const handleSelectAll = () => {
    if (selectedCourses.length === currentCourses.length) {
      setSelectedCourses([])
    } else {
      setSelectedCourses(currentCourses.map((course) => course.id))
    }
  }

  // Format price
  interface FormatPrice {
    (price: number): string
  }

  const formatPrice: FormatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã khóa học' },
      { key: 'title', header: 'Tên khóa học' },
      { key: 'instructor', header: 'Giảng viên' },
      {
        key: 'price',
        header: 'Giá',
        format: (value: number) => formatCurrency(value)
      },
      { key: 'category', header: 'Danh mục' },
      { key: 'students', header: 'Số học viên' },
      {
        key: 'rating',
        header: 'Đánh giá',
        format: (value: number) => value.toFixed(1)
      },
      { key: 'created', header: 'Ngày tạo' }
    ]

    exportToExcel({
      filename: 'Danh_sach_khoa_hoc',
      sheetName: 'Khóa học',
      data: filteredCourses,
      columns
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
            <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                  <span>Thêm Khóa Học</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Thêm Khóa Học Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>Điền thông tin để tạo khóa học mới</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue='basic' className='mt-4' onValueChange={setCurrentTab}>
                  <TabsList className='bg-gray-800 mb-4'>
                    <TabsTrigger value='basic' className='text-white data-[state=active]:bg-purple-600'>
                      Thông tin cơ bản
                    </TabsTrigger>
                    <TabsTrigger value='content' className='text-white data-[state=active]:bg-purple-600'>
                      Nội dung
                    </TabsTrigger>
                    <TabsTrigger value='pricing' className='text-white data-[state=active]:bg-purple-600'>
                      Giá & Khuyến mãi
                    </TabsTrigger>
                    <TabsTrigger value='media' className='text-white data-[state=active]:bg-purple-600'>
                      Hình ảnh & Video
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value='basic'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='title' className='text-white'>
                          Tên khóa học
                        </Label>
                        <Input
                          id='title'
                          placeholder='Nhập tên khóa học'
                          className='bg-gray-800 border-gray-700 text-white'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='category' className='text-white'>
                          Danh mục
                        </Label>
                        <Select>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Chọn danh mục' />
                          </SelectTrigger>
                          <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                            <SelectItem value='web-development'>Web Development</SelectItem>
                            <SelectItem value='mobile-development'>Mobile Development</SelectItem>
                            <SelectItem value='data-science'>Data Science</SelectItem>
                            <SelectItem value='design'>Design</SelectItem>
                            <SelectItem value='marketing'>Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2 md:col-span-2'>
                        <Label htmlFor='short-description' className='text-white'>
                          Mô tả ngắn
                        </Label>
                        <Textarea
                          id='short-description'
                          placeholder='Mô tả ngắn gọn về khóa học (hiển thị ở trang danh sách)'
                          className='bg-gray-800 border-gray-700 text-white'
                          rows={2}
                        />
                      </div>
                      <div className='space-y-2 md:col-span-2'>
                        <Label htmlFor='full-description' className='text-white'>
                          Mô tả chi tiết
                        </Label>
                        <Textarea
                          id='full-description'
                          placeholder='Mô tả đầy đủ về khóa học'
                          className='bg-gray-800 border-gray-700 text-white'
                          rows={5}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='instructor' className='text-white'>
                          Giảng viên
                        </Label>
                        <Select>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Chọn giảng viên' />
                          </SelectTrigger>
                          <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                            <SelectItem value='instructor-1'>Nguyễn Văn A</SelectItem>
                            <SelectItem value='instructor-2'>Trần Thị B</SelectItem>
                            <SelectItem value='instructor-3'>Lê Văn C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='level' className='text-white'>
                          Cấp độ
                        </Label>
                        <Select>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Chọn cấp độ' />
                          </SelectTrigger>
                          <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                            <SelectItem value='beginner'>Người mới bắt đầu</SelectItem>
                            <SelectItem value='intermediate'>Trung cấp</SelectItem>
                            <SelectItem value='advanced'>Nâng cao</SelectItem>
                            <SelectItem value='all-levels'>Tất cả cấp độ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='duration' className='text-white'>
                          Thời lượng (giờ)
                        </Label>
                        <Input
                          id='duration'
                          type='number'
                          placeholder='Ví dụ: 10'
                          className='bg-gray-800 border-gray-700 text-white'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='language' className='text-white'>
                          Ngôn ngữ
                        </Label>
                        <Select>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Chọn ngôn ngữ' />
                          </SelectTrigger>
                          <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                            <SelectItem value='vietnamese'>Tiếng Việt</SelectItem>
                            <SelectItem value='english'>Tiếng Anh</SelectItem>
                            <SelectItem value='both'>Song ngữ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='content'>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <Label className='text-white'>Mục tiêu khóa học</Label>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Input placeholder='Mục tiêu 1' className='bg-gray-800 border-gray-700 text-white' />
                            <Button
                              variant='ghost'
                              size='icon'
                              className='text-gray-400 hover:text-white hover:bg-gray-800'
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Input placeholder='Mục tiêu 2' className='bg-gray-800 border-gray-700 text-white' />
                            <Button
                              variant='ghost'
                              size='icon'
                              className='text-gray-400 hover:text-white hover:bg-gray-800'
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                          >
                            <Plus className='h-4 w-4 mr-2' /> Thêm mục tiêu
                          </Button>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label className='text-white'>Yêu cầu trước khi học</Label>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Input placeholder='Yêu cầu 1' className='bg-gray-800 border-gray-700 text-white' />
                            <Button
                              variant='ghost'
                              size='icon'
                              className='text-gray-400 hover:text-white hover:bg-gray-800'
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                          >
                            <Plus className='h-4 w-4 mr-2' /> Thêm yêu cầu
                          </Button>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label className='text-white'>Nội dung khóa học</Label>
                        <div className='space-y-4'>
                          <div className='bg-gray-800 p-4 rounded-md'>
                            <div className='flex justify-between items-center mb-2'>
                              <Input placeholder='Tên phần 1' className='bg-gray-700 border-gray-600 text-white' />
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-gray-400 hover:text-white hover:bg-gray-700'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                            <div className='space-y-2 pl-4'>
                              <div className='flex items-center gap-2'>
                                <Input placeholder='Tên bài học 1' className='bg-gray-700 border-gray-600 text-white' />
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='text-gray-400 hover:text-white hover:bg-gray-700'
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              </div>
                              <Button
                                variant='outline'
                                size='sm'
                                className='bg-gray-700 border-gray-600 hover:bg-gray-600 text-white'
                              >
                                <Plus className='h-4 w-4 mr-2' /> Thêm bài học
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                          >
                            <Plus className='h-4 w-4 mr-2' /> Thêm phần mới
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='pricing'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='price' className='text-white'>
                          Giá khóa học (VND)
                        </Label>
                        <div className='relative'>
                          <DollarSign className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                          <Input
                            id='price'
                            type='number'
                            placeholder='Ví dụ: 599000'
                            className='pl-8 bg-gray-800 border-gray-700 text-white'
                          />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='sale-price' className='text-white'>
                          Giá khuyến mãi (VND)
                        </Label>
                        <div className='relative'>
                          <DollarSign className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                          <Input
                            id='sale-price'
                            type='number'
                            placeholder='Để trống nếu không có khuyến mãi'
                            className='pl-8 bg-gray-800 border-gray-700 text-white'
                          />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <Label htmlFor='has-promotion' className='text-white'>
                            Có khuyến mãi
                          </Label>
                          <Switch id='has-promotion' />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='promotion-end' className='text-white'>
                          Ngày kết thúc khuyến mãi
                        </Label>
                        <Input id='promotion-end' type='date' className='bg-gray-800 border-gray-700 text-white' />
                      </div>

                      <div className='md:col-span-2 space-y-2'>
                        <Label className='text-white'>Các gói khóa học</Label>
                        <div className='space-y-4'>
                          <div className='bg-gray-800 p-4 rounded-md'>
                            <div className='flex justify-between items-center mb-2'>
                              <Input
                                placeholder='Tên gói (VD: Cơ bản)'
                                className='bg-gray-700 border-gray-600 text-white'
                              />
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-gray-400 hover:text-white hover:bg-gray-700'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-2'>
                              <div className='relative'>
                                <DollarSign className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                                <Input
                                  placeholder='Giá gói'
                                  type='number'
                                  className='pl-8 bg-gray-700 border-gray-600 text-white'
                                />
                              </div>
                              <Input
                                placeholder='Thời gian truy cập (VD: 6 tháng)'
                                className='bg-gray-700 border-gray-600 text-white'
                              />
                            </div>
                            <Textarea
                              placeholder='Mô tả gói'
                              className='bg-gray-700 border-gray-600 text-white mt-2'
                              rows={2}
                            />
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                          >
                            <Plus className='h-4 w-4 mr-2' /> Thêm gói mới
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='media'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label className='text-white'>Ảnh thu nhỏ khóa học</Label>
                        <div className='border-2 border-dashed border-gray-700 rounded-md p-4 text-center'>
                          <div className='flex flex-col items-center'>
                            <Image className='h-8 w-8 text-gray-400 mb-2' />
                            <p className='text-sm text-gray-400 mb-2'>Kéo thả hoặc nhấp để tải lên</p>
                            <p className='text-xs text-gray-500'>PNG, JPG hoặc GIF (Tối đa 2MB)</p>
                            <Button
                              variant='outline'
                              size='sm'
                              className='mt-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            >
                              <Upload className='h-4 w-4 mr-2' /> Chọn tệp
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label className='text-white'>Ảnh bìa khóa học</Label>
                        <div className='border-2 border-dashed border-gray-700 rounded-md p-4 text-center'>
                          <div className='flex flex-col items-center'>
                            <Image className='h-8 w-8 text-gray-400 mb-2' />
                            <p className='text-sm text-gray-400 mb-2'>Kéo thả hoặc nhấp để tải lên</p>
                            <p className='text-xs text-gray-500'>PNG, JPG hoặc GIF (Tối đa 2MB)</p>
                            <Button
                              variant='outline'
                              size='sm'
                              className='mt-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            >
                              <Upload className='h-4 w-4 mr-2' /> Chọn tệp
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className='md:col-span-2 space-y-2'>
                        <Label className='text-white'>Video giới thiệu</Label>
                        <div className='border-2 border-dashed border-gray-700 rounded-md p-4 text-center'>
                          <div className='flex flex-col items-center'>
                            <Upload className='h-8 w-8 text-gray-400 mb-2' />
                            <p className='text-sm text-gray-400 mb-2'>Tải lên video giới thiệu khóa học</p>
                            <p className='text-xs text-gray-500'>MP4 hoặc WebM (Tối đa 50MB)</p>
                            <Button
                              variant='outline'
                              size='sm'
                              className='mt-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            >
                              <Upload className='h-4 w-4 mr-2' /> Chọn tệp
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className='md:col-span-2 space-y-2'>
                        <Label htmlFor='youtube-url' className='text-white'>
                          Hoặc nhập URL YouTube
                        </Label>
                        <Input
                          id='youtube-url'
                          placeholder='https://www.youtube.com/watch?v=...'
                          className='bg-gray-800 border-gray-700 text-white'
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter className='mt-6'>
                  <div className='flex items-center mr-auto'>
                    <Switch id='publish-course' />
                    <Label htmlFor='publish-course' className='ml-2 text-white'>
                      Xuất bản ngay
                    </Label>
                  </div>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddCourseOpen(false)}
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    Hủy
                  </Button>
                  <Button className='bg-purple-600 hover:bg-purple-700'>Tạo khóa học</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400'>Lọc danh sách khóa học theo các tiêu chí</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo tên khóa học, giảng viên...'
                    className='pl-8 bg-gray-800 border-gray-700 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='category' className='text-white mb-2 block'>
                  Danh mục
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn danh mục' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả danh mục</SelectItem>
                    <SelectItem value='Web Development'>Web Development</SelectItem>
                    <SelectItem value='Mobile Development'>Mobile Development</SelectItem>
                    <SelectItem value='Data Science'>Data Science</SelectItem>
                    <SelectItem value='Design'>Design</SelectItem>
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
                    <SelectItem value='published'>Đã xuất bản</SelectItem>
                    <SelectItem value='draft'>Bản nháp</SelectItem>
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
                <CardTitle className='text-xl text-purple-400'>Danh sách khóa học</CardTitle>
                <CardDescription className='text-gray-400'>
                  {filteredCourses.length} khóa học được tìm thấy
                </CardDescription>
              </div>
              {selectedCourses.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>Đã chọn {selectedCourses.length} khóa học</span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <CheckCircle className='h-4 w-4 mr-1' /> Xuất bản
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <XCircle className='h-4 w-4 mr-1' /> Ẩn
                  </Button>
                  <Button variant='destructive' size='sm'>
                    <Trash2 className='h-4 w-4 mr-1' /> Xóa
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-gray-800'>
                    <th className='text-left py-3 px-4'>
                      <Checkbox
                        checked={selectedCourses.length === currentCourses.length && currentCourses.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Khóa học</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Giảng viên</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Giá</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Học viên</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Đánh giá</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Trạng thái</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course) => (
                    <tr key={course.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                      <td className='py-3 px-4'>
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => handleSelectCourse(course.id)}
                          className='border-gray-600'
                        />
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <img
                            src={course.thumbnail || '/placeholder.svg'}
                            alt={course.title}
                            className='w-12 h-8 object-cover rounded mr-3'
                          />
                          <div>
                            <div className='font-medium'>{course.title}</div>
                            <div className='text-xs text-gray-400'>Tạo: {course.created}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-gray-300'>{course.instructor}</td>
                      <td className='py-3 px-4 text-purple-400 font-medium'>{formatPrice(course.price)}</td>
                      <td className='py-3 px-4 text-gray-300'>{course.students}</td>
                      <td className='py-3 px-4'>
                        {course.rating > 0 ? (
                          <div className='flex items-center'>
                            <span className='mr-1'>{course.rating}</span>
                            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                          </div>
                        ) : (
                          <span className='text-gray-500'>N/A</span>
                        )}
                      </td>
                      <td className='py-3 px-4'>
                        <Badge
                          className={
                            course.status === 'published'
                              ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                              : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                          }
                        >
                          {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </Badge>
                      </td>
                      <td className='py-3 px-4'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800'
                            >
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='bg-gray-800 border-gray-700 text-white'>
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuSeparator className='bg-gray-700' />
                            <DropdownMenuItem
                              className='hover:bg-gray-700 cursor-pointer'
                              onClick={() => handleEditCourse(course)}
                            >
                              <Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              <Eye className='h-4 w-4 mr-2' /> Xem trước
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              {course.status === 'published' ? (
                                <>
                                  <EyeOff className='h-4 w-4 mr-2' /> Ẩn khóa học
                                </>
                              ) : (
                                <>
                                  <CheckCircle className='h-4 w-4 mr-2' /> Xuất bản
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-gray-700' />
                            <DropdownMenuItem className='text-red-500 hover:bg-gray-700 cursor-pointer'>
                              <Trash2 className='h-4 w-4 mr-2' /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-between mt-6'>
              <div className='text-sm text-gray-400'>
                Hiển thị {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} trong số{' '}
                {filteredCourses.length} khóa học
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

        {/* Edit Course Dialog */}
        {currentCourse && (
          <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Khóa Học</DialogTitle>
                <DialogDescription className='text-gray-400'>Cập nhật thông tin khóa học</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue='basic' className='mt-4'>
                <TabsList className='bg-gray-800 mb-4'>
                  <TabsTrigger value='basic' className='text-white data-[state=active]:bg-purple-600'>
                    Thông tin cơ bản
                  </TabsTrigger>
                  <TabsTrigger value='content' className='text-white data-[state=active]:bg-purple-600'>
                    Nội dung
                  </TabsTrigger>
                  <TabsTrigger value='pricing' className='text-white data-[state=active]:bg-purple-600'>
                    Giá & Khuyến mãi
                  </TabsTrigger>
                  <TabsTrigger value='media' className='text-white data-[state=active]:bg-purple-600'>
                    Hình ảnh & Video
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='basic'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-title' className='text-white'>
                        Tên khóa học
                      </Label>
                      <Input
                        id='edit-title'
                        defaultValue={currentCourse.title}
                        className='bg-gray-800 border-gray-700 text-white'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-category' className='text-white'>
                        Danh mục
                      </Label>
                      <Select defaultValue={currentCourse.category.toLowerCase().replace(/\s+/g, '-')}>
                        <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn danh mục' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          <SelectItem value='web-development'>Web Development</SelectItem>
                          <SelectItem value='mobile-development'>Mobile Development</SelectItem>
                          <SelectItem value='data-science'>Data Science</SelectItem>
                          <SelectItem value='design'>Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='edit-description' className='text-white'>
                        Mô tả
                      </Label>
                      <Textarea
                        id='edit-description'
                        placeholder='Mô tả khóa học'
                        className='bg-gray-800 border-gray-700 text-white'
                        rows={5}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='pricing'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-price' className='text-white'>
                        Giá khóa học (VND)
                      </Label>
                      <div className='relative'>
                        <DollarSign className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                        <Input
                          id='edit-price'
                          type='number'
                          defaultValue={currentCourse.price}
                          className='pl-8 bg-gray-800 border-gray-700 text-white'
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-status' className='text-white'>
                        Trạng thái
                      </Label>
                      <Select defaultValue={currentCourse.status}>
                        <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          <SelectItem value='published'>Đã xuất bản</SelectItem>
                          <SelectItem value='draft'>Bản nháp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className='mt-6'>
                <Button
                  variant='outline'
                  onClick={() => setIsEditCourseOpen(false)}
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
