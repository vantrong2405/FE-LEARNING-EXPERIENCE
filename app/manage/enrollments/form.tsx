'use client'

import { useState } from 'react'
import {
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Eye
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
import { exportToExcel, formatCurrency } from '@/lib/excel'
import { Enrollment } from '@/models/enrollment.type'

// Sample enrollment data
const enrollments = [
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
    enrollmentDate: '2023-05-15',
    expiryDate: '2024-05-15',
    progress: 65,
    status: 'active',
    payments: [
      {
        id: 1001,
        amount: 599000,
        date: '2023-05-15',
        method: 'Credit Card',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-14'
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
    enrollmentDate: '2023-04-20',
    expiryDate: '2024-04-20',
    progress: 42,
    status: 'active',
    payments: [
      {
        id: 1002,
        amount: 799000,
        date: '2023-04-20',
        method: 'Bank Transfer',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-13'
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
    enrollmentDate: '2023-06-10',
    expiryDate: '2024-06-10',
    progress: 15,
    status: 'inactive',
    payments: [
      {
        id: 1003,
        amount: 899000,
        date: '2023-06-10',
        method: 'E-wallet',
        status: 'completed'
      }
    ],
    lastAccess: '2023-06-25'
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
    enrollmentDate: '2023-03-05',
    expiryDate: '2024-03-05',
    progress: 88,
    status: 'active',
    payments: [
      {
        id: 1004,
        amount: 699000,
        date: '2023-03-05',
        method: 'Credit Card',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-12'
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
    enrollmentDate: '2023-02-15',
    expiryDate: '2024-02-15',
    progress: 75,
    status: 'active',
    payments: [
      {
        id: 1005,
        amount: 899000,
        date: '2023-02-15',
        method: 'Bank Transfer',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-10'
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
    enrollmentDate: '2023-07-01',
    expiryDate: '2024-07-01',
    progress: 5,
    status: 'pending',
    payments: [
      {
        id: 1006,
        amount: 999000,
        date: '2023-07-01',
        method: 'E-wallet',
        status: 'pending'
      }
    ],
    lastAccess: 'Never'
  }
]

export default function EnrollmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [currentEnrollment, setCurrentEnrollment] = useState<(typeof enrollments)[0] | null>(null)
  const [selectedEnrollments, setSelectedEnrollments] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const enrollmentsPerPage = 5

  // Filter enrollments based on search term, course, and status
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || enrollment.course.id.toString() === selectedCourse
    const matchesStatus = selectedStatus === 'all' || enrollment.status === selectedStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  // Pagination
  const indexOfLastEnrollment = currentPage * enrollmentsPerPage
  const indexOfFirstEnrollment = indexOfLastEnrollment - enrollmentsPerPage
  const currentEnrollments = filteredEnrollments.slice(indexOfFirstEnrollment, indexOfLastEnrollment)
  const totalPages = Math.ceil(filteredEnrollments.length / enrollmentsPerPage)

  // Handle view details

  const handleViewDetails = (enrollment: any) => {
    setCurrentEnrollment(enrollment)
    setIsViewDetailsOpen(true)
  }

  const handleSelectEnrollment = (enrollmentId: number): void => {
    if (selectedEnrollments.includes(enrollmentId)) {
      setSelectedEnrollments(selectedEnrollments.filter((id) => id !== enrollmentId))
    } else {
      setSelectedEnrollments([...selectedEnrollments, enrollmentId])
    }
  }

  const handleSelectAll = () => {
    if (selectedEnrollments.length === currentEnrollments.length) {
      setSelectedEnrollments([])
    } else {
      setSelectedEnrollments(currentEnrollments.map((enrollment) => enrollment.id))
    }
  }

  // Format price
  interface FormatPrice {
    (price: number): string
  }

  const formatPrice: FormatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  // Get unique courses for filter
  const uniqueCourses = [...new Set(enrollments.map((enrollment) => enrollment.course.id))].map((courseId) => {
    const enrollment = enrollments.find((enrollment) => enrollment.course.id === courseId)
    const course = enrollment ? enrollment.course : { id: courseId, title: 'Unknown Course' }
    return { id: courseId, title: course.title }
  })

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã ghi danh' },
      { key: 'student.name', header: 'Học viên' },
      { key: 'student.email', header: 'Email' },
      { key: 'course.title', header: 'Khóa học' },
      { key: 'enrollmentDate', header: 'Ngày ghi danh' },
      { key: 'status', header: 'Trạng thái' },
      { key: 'progress', header: 'Tiến độ' },
      { key: 'completionDate', header: 'Ngày hoàn thành' }
    ]

    // Transform nested data for export
    const exportData = filteredEnrollments.map((enrollment) => ({
      ...enrollment,
      'student.name': enrollment.student.name,
      'student.email': enrollment.student.email,
      'course.title': enrollment.course.title
    }))

    exportToExcel({
      filename: 'Danh_sach_ghi_danh',
      sheetName: 'Ghi danh',
      data: exportData,
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
          </div>
        </div>

        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400'>Lọc danh sách đăng ký theo các tiêu chí</CardDescription>
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
                    placeholder='Tìm theo tên học viên, email, khóa học...'
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
                <Label htmlFor='status' className='text-white mb-2 block'>
                  Trạng thái
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn trạng thái' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                    <SelectItem value='active'>Đang học</SelectItem>
                    <SelectItem value='inactive'>Tạm dừng</SelectItem>
                    <SelectItem value='pending'>Chờ xác nhận</SelectItem>
                    <SelectItem value='completed'>Đã hoàn thành</SelectItem>
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
                <CardTitle className='text-xl text-purple-400'>Danh sách đăng ký khóa học</CardTitle>
                <CardDescription className='text-gray-400'>
                  {filteredEnrollments.length} đăng ký được tìm thấy
                </CardDescription>
              </div>
              {selectedEnrollments.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>Đã chọn {selectedEnrollments.length} đăng ký</span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <CheckCircle className='h-4 w-4 mr-1' /> Kích hoạt
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <XCircle className='h-4 w-4 mr-1' /> Tạm dừng
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
                        checked={
                          selectedEnrollments.length === currentEnrollments.length && currentEnrollments.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Học viên</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Khóa học</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Ngày đăng ký</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Tiến độ</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Trạng thái</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEnrollments.map((enrollment) => (
                    <tr key={enrollment.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                      <td className='py-3 px-4'>
                        <Checkbox
                          checked={selectedEnrollments.includes(enrollment.id)}
                          onCheckedChange={() => handleSelectEnrollment(enrollment.id)}
                          className='border-gray-600'
                        />
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <img
                            src={enrollment.student.avatar || '/placeholder.svg'}
                            alt={enrollment.student.name}
                            className='w-8 h-8 rounded-full object-cover mr-3'
                          />
                          <div>
                            <div className='font-medium'>{enrollment.student.name}</div>
                            <div className='text-xs text-gray-400'>{enrollment.student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <img
                            src={enrollment.course.thumbnail || '/placeholder.svg'}
                            alt={enrollment.course.title}
                            className='w-10 h-7 rounded object-cover mr-3'
                          />
                          <div>
                            <div className='font-medium'>{enrollment.course.title}</div>
                            <div className='text-xs text-gray-400'>Giảng viên: {enrollment.course.instructor}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='text-gray-300'>{enrollment.enrollmentDate}</div>
                        <div className='text-xs text-gray-400'>Hết hạn: {enrollment.expiryDate}</div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <div className='w-full bg-gray-700 rounded-full h-2.5 mr-2'>
                            <div
                              className='bg-purple-600 h-2.5 rounded-full'
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                          <span className='text-sm'>{enrollment.progress}%</span>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <Badge
                          className={
                            enrollment.status === 'active'
                              ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                              : enrollment.status === 'inactive'
                                ? 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                                : enrollment.status === 'pending'
                                  ? 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                                  : 'bg-blue-900/30 text-blue-500 hover:bg-blue-900/40'
                          }
                        >
                          {enrollment.status === 'active'
                            ? 'Đang học'
                            : enrollment.status === 'inactive'
                              ? 'Tạm dừng'
                              : enrollment.status === 'pending'
                                ? 'Chờ xác nhận'
                                : 'Đã hoàn thành'}
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
                              onClick={() => handleViewDetails(enrollment)}
                            >
                              <Eye className='h-4 w-4 mr-2' /> Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              <Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              {enrollment.status === 'active' ? (
                                <>
                                  <XCircle className='h-4 w-4 mr-2' /> Tạm dừng
                                </>
                              ) : (
                                <>
                                  <CheckCircle className='h-4 w-4 mr-2' /> Kích hoạt
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
                Hiển thị {indexOfFirstEnrollment + 1}-{Math.min(indexOfLastEnrollment, filteredEnrollments.length)}{' '}
                trong số {filteredEnrollments.length} đăng ký
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

        {/* View Enrollment Details Dialog */}
        {currentEnrollment && (
          <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chi tiết đăng ký khóa học</DialogTitle>
                <DialogDescription className='text-gray-400'>
                  Thông tin chi tiết về đăng ký và thanh toán
                </DialogDescription>
              </DialogHeader>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
                <div>
                  <h3 className='text-lg font-medium text-purple-400 mb-3'>Thông tin học viên</h3>
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <div className='flex items-center mb-4'>
                      <img
                        src={currentEnrollment.student.avatar || '/placeholder.svg'}
                        alt={currentEnrollment.student.name}
                        className='w-12 h-12 rounded-full object-cover mr-4'
                      />
                      <div>
                        <h4 className='font-medium'>{currentEnrollment.student.name}</h4>
                        <p className='text-sm text-gray-400'>{currentEnrollment.student.email}</p>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>ID học viên:</span>
                        <span>{currentEnrollment.student.id}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Truy cập gần nhất:</span>
                        <span>{currentEnrollment.lastAccess}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-medium text-purple-400 mb-3'>Thông tin khóa học</h3>
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <div className='flex items-center mb-4'>
                      <img
                        src={currentEnrollment.course.thumbnail || '/placeholder.svg'}
                        alt={currentEnrollment.course.title}
                        className='w-16 h-12 rounded object-cover mr-4'
                      />
                      <div>
                        <h4 className='font-medium'>{currentEnrollment.course.title}</h4>
                        <p className='text-sm text-gray-400'>Giảng viên: {currentEnrollment.course.instructor}</p>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>ID khóa học:</span>
                        <span>{currentEnrollment.course.id}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Tiến độ học tập:</span>
                        <span>{currentEnrollment.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='md:col-span-2'>
                  <h3 className='text-lg font-medium text-purple-400 mb-3'>Thông tin đăng ký</h3>
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <h4 className='text-sm text-gray-400 mb-1'>Ngày đăng ký</h4>
                        <div className='flex items-center'>
                          <Calendar className='h-4 w-4 mr-2 text-purple-400' />
                          <span>{currentEnrollment.enrollmentDate}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className='text-sm text-gray-400 mb-1'>Ngày hết hạn</h4>
                        <div className='flex items-center'>
                          <Calendar className='h-4 w-4 mr-2 text-purple-400' />
                          <span>{currentEnrollment.expiryDate}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className='text-sm text-gray-400 mb-1'>Trạng thái</h4>
                        <Badge
                          className={
                            currentEnrollment.status === 'active'
                              ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                              : currentEnrollment.status === 'inactive'
                                ? 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                                : currentEnrollment.status === 'pending'
                                  ? 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                                  : 'bg-blue-900/30 text-blue-500 hover:bg-blue-900/40'
                          }
                        >
                          {currentEnrollment.status === 'active'
                            ? 'Đang học'
                            : currentEnrollment.status === 'inactive'
                              ? 'Tạm dừng'
                              : currentEnrollment.status === 'pending'
                                ? 'Chờ xác nhận'
                                : 'Đã hoàn thành'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='md:col-span-2'>
                  <h3 className='text-lg font-medium text-purple-400 mb-3'>Lịch sử thanh toán</h3>
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <table className='w-full'>
                      <thead>
                        <tr className='border-b border-gray-700'>
                          <th className='text-left py-2 px-4 text-gray-400 font-medium'>Mã thanh toán</th>
                          <th className='text-left py-2 px-4 text-gray-400 font-medium'>Ngày thanh toán</th>
                          <th className='text-left py-2 px-4 text-gray-400 font-medium'>Số tiền</th>
                          <th className='text-left py-2 px-4 text-gray-400 font-medium'>Phương thức</th>
                          <th className='text-left py-2 px-4 text-gray-400 font-medium'>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEnrollment.payments.map((payment) => (
                          <tr key={payment.id} className='border-b border-gray-700'>
                            <td className='py-3 px-4'>{payment.id}</td>
                            <td className='py-3 px-4'>{payment.date}</td>
                            <td className='py-3 px-4 text-purple-400'>{formatPrice(payment.amount)}</td>
                            <td className='py-3 px-4'>{payment.method}</td>
                            <td className='py-3 px-4'>
                              <Badge
                                className={
                                  payment.status === 'completed'
                                    ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                                    : payment.status === 'pending'
                                      ? 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                                      : 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                                }
                              >
                                {payment.status === 'completed'
                                  ? 'Hoàn thành'
                                  : payment.status === 'pending'
                                    ? 'Đang xử lý'
                                    : 'Thất bại'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <DialogFooter className='mt-6'>
                <Button
                  variant='outline'
                  onClick={() => setIsViewDetailsOpen(false)}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  Đóng
                </Button>
                <Button className='bg-purple-600 hover:bg-purple-700'>
                  <Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
