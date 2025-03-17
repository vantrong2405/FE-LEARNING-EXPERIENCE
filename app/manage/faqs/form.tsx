'use client'

import { useState } from 'react'
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { exportToExcel } from '@/lib/excel'
import { FAQ } from '@/models/faq.type'
import { Icons } from '@/components/ui/icons'

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: 'Làm thế nào để đăng ký khóa học?',
    answer:
      'Để đăng ký khóa học, bạn cần tạo tài khoản trên hệ thống, sau đó chọn khóa học mong muốn và tiến hành thanh toán. Sau khi thanh toán thành công, bạn sẽ được cấp quyền truy cập vào khóa học ngay lập tức.',
    category: 'Đăng ký & Thanh toán',
    course: null,
    isPublished: true,
    order: 1
  },
  {
    id: 2,
    question: 'Các phương thức thanh toán được chấp nhận?',
    answer:
      'Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau bao gồm thẻ tín dụng/ghi nợ (Visa, Mastercard), chuyển khoản ngân hàng, và các ví điện tử phổ biến như MoMo, ZaloPay, VNPay.',
    category: 'Đăng ký & Thanh toán',
    course: null,
    isPublished: true,
    order: 2
  },
  {
    id: 3,
    question: 'Tôi có thể yêu cầu hoàn tiền không?',
    answer:
      'Có, chúng tôi có chính sách hoàn tiền trong vòng 7 ngày kể từ ngày đăng ký khóa học nếu bạn không hài lòng với nội dung. Tuy nhiên, bạn chỉ có thể yêu cầu hoàn tiền nếu đã hoàn thành dưới 20% khóa học.',
    category: 'Đăng ký & Thanh toán',
    course: null,
    isPublished: true,
    order: 3
  },
  {
    id: 4,
    question: 'Tôi có thể truy cập khóa học trong bao lâu?',
    answer:
      'Sau khi đăng ký, bạn sẽ có quyền truy cập vĩnh viễn vào khóa học. Điều này có nghĩa là bạn có thể học theo tốc độ của riêng mình và quay lại xem lại nội dung bất cứ khi nào bạn muốn.',
    category: 'Truy cập khóa học',
    course: null,
    isPublished: true,
    order: 1
  },
  {
    id: 5,
    question: 'Làm thế nào để tải xuống tài liệu khóa học?',
    answer:
      'Các tài liệu khóa học có thể được tải xuống trực tiếp từ trang nội dung khóa học. Bên cạnh mỗi bài giảng có tài liệu đính kèm, bạn sẽ thấy biểu tượng tải xuống. Nhấp vào đó để lưu tài liệu về máy tính của bạn.',
    category: 'Truy cập khóa học',
    course: null,
    isPublished: true,
    order: 2
  },
  {
    id: 6,
    question: 'Tôi có thể học trên thiết bị di động không?',
    answer:
      'Có, nền tảng của chúng tôi hoàn toàn tương thích với các thiết bị di động. Bạn có thể truy cập và học các khóa học trên điện thoại thông minh hoặc máy tính bảng thông qua trình duyệt web hoặc ứng dụng di động của chúng tôi.',
    category: 'Truy cập khóa học',
    course: null,
    isPublished: true,
    order: 3
  },
  {
    id: 7,
    question: 'Tôi cần có kiến thức nền tảng gì để học JavaScript Cơ Bản?',
    answer:
      'Khóa học JavaScript Cơ Bản được thiết kế cho người mới bắt đầu, vì vậy bạn không cần kiến thức lập trình trước đó. Tuy nhiên, hiểu biết cơ bản về HTML và CSS sẽ giúp bạn tiếp thu nội dung dễ dàng hơn.',
    category: 'Nội dung khóa học',
    course: {
      id: 201,
      title: 'JavaScript Cơ Bản'
    },
    isPublished: true,
    order: 1
  },
  {
    id: 8,
    question: 'React Advanced có phù hợp với người mới học React không?',
    answer:
      'Khóa học React Advanced được thiết kế cho những người đã có kiến thức cơ bản về React. Bạn nên hoàn thành khóa học React Cơ Bản hoặc có ít nhất 3-6 tháng kinh nghiệm làm việc với React trước khi tham gia khóa học này.',
    category: 'Nội dung khóa học',
    course: {
      id: 202,
      title: 'React Advanced'
    },
    isPublished: true,
    order: 1
  },
  {
    id: 9,
    question: 'Tôi có nhận được chứng chỉ sau khi hoàn thành khóa học không?',
    answer:
      'Có, sau khi hoàn thành tất cả các bài học và bài tập trong khóa học, bạn sẽ nhận được chứng chỉ hoàn thành. Chứng chỉ này có thể được tải xuống, chia sẻ trên LinkedIn hoặc in ra để sử dụng trong hồ sơ xin việc của bạn.',
    category: 'Chứng chỉ',
    course: null,
    isPublished: true,
    order: 1
  },
  {
    id: 10,
    question: 'Làm thế nào để liên hệ với giảng viên nếu tôi có thắc mắc?',
    answer:
      'Bạn có thể liên hệ với giảng viên thông qua hệ thống nhắn tin nội bộ của khóa học. Ngoài ra, mỗi bài giảng đều có phần bình luận nơi bạn có thể đặt câu hỏi và nhận phản hồi từ giảng viên hoặc các học viên khác.',
    category: 'Hỗ trợ',
    course: null,
    isPublished: true,
    order: 1
  }
]

// Get unique categories
const uniqueCategories = [...new Set(faqs.map((faq) => faq.category))]

// Get unique courses
const uniqueCourses = [...new Set(faqs.filter((faq) => faq.course !== null).map((faq) => faq.course!.id))].map(
  (courseId) => {
    const course = faqs.find((faq) => faq.course && faq.course.id === courseId)?.course
    return { id: courseId, title: course ? course.title : 'Unknown' }
  }
)

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [isAddFAQOpen, setIsAddFAQOpen] = useState(false)
  const [isEditFAQOpen, setIsEditFAQOpen] = useState(false)
  const [currentFAQ, setCurrentFAQ] = useState<FAQ | null>(null)
  const [selectedFAQs, setSelectedFAQs] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const faqsPerPage = 5

  // Filter FAQs based on search term, category, and course
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesCourse =
      selectedCourse === 'all' ||
      (selectedCourse === 'general' && faq.course === null) ||
      (faq.course && faq.course.id.toString() === selectedCourse)

    return matchesSearch && matchesCategory && matchesCourse
  })

  // Pagination
  const indexOfLastFAQ = currentPage * faqsPerPage
  const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage
  const currentFAQs = filteredFAQs.slice(indexOfFirstFAQ, indexOfLastFAQ)
  const totalPages = Math.ceil(filteredFAQs.length / faqsPerPage)

  // Handle edit FAQ

  const handleEditFAQ = (faq: any) => {
    setCurrentFAQ(faq)
    setIsEditFAQOpen(true)
  }

  // Handle checkbox selection

  const handleSelectFAQ = (faqId: number) => {
    if (selectedFAQs.includes(faqId)) {
      setSelectedFAQs(selectedFAQs.filter((id) => id !== faqId))
    } else {
      setSelectedFAQs([...selectedFAQs, faqId])
    }
  }

  const handleSelectAll = () => {
    if (selectedFAQs.length === currentFAQs.length) {
      setSelectedFAQs([])
    } else {
      setSelectedFAQs(currentFAQs.map((faq) => faq.id))
    }
  }

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã FAQ' },
      { key: 'question', header: 'Câu hỏi' },
      { key: 'answer', header: 'Câu trả lời' },
      { key: 'category', header: 'Danh mục' },
      { key: 'status', header: 'Trạng thái' },
      { key: 'createdAt', header: 'Ngày tạo' },
      { key: 'updatedAt', header: 'Ngày cập nhật' }
    ]

    exportToExcel({
      filename: 'Danh_sach_FAQ',
      sheetName: 'FAQ',
      data: filteredFAQs,
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
              <Icons.Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
            <Dialog open={isAddFAQOpen} onOpenChange={setIsAddFAQOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Icons.Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                  <span>Thêm FAQ</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Thêm Câu Hỏi Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>
                    Điền thông tin để tạo câu hỏi thường gặp mới
                  </DialogDescription>
                </DialogHeader>

                <div className='space-y-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='question' className='text-white'>
                      Câu hỏi
                    </Label>
                    <Input
                      id='question'
                      placeholder='Nhập câu hỏi'
                      className='bg-gray-800 border-gray-700 text-white'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='answer' className='text-white'>
                      Câu trả lời
                    </Label>
                    <Textarea
                      id='answer'
                      placeholder='Nhập câu trả lời chi tiết'
                      className='bg-gray-800 border-gray-700 text-white'
                      rows={5}
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='category' className='text-white'>
                        Danh mục
                      </Label>
                      <Select>
                        <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn danh mục' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {uniqueCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value='new'>+ Tạo danh mục mới</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='course' className='text-white'>
                        Khóa học (tùy chọn)
                      </Label>
                      <Select>
                        <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn khóa học' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          <SelectItem value='null'>Không liên quan đến khóa học cụ thể</SelectItem>
                          {uniqueCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox id='published' defaultChecked />
                    <Label htmlFor='published' className='text-white'>
                      Xuất bản ngay
                    </Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddFAQOpen(false)}
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    Hủy
                  </Button>
                  <Button className='bg-purple-600 hover:bg-purple-700'>Thêm câu hỏi</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Tổng số FAQ</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{faqs.length}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.HelpCircle className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Số danh mục</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{uniqueCategories.length}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.BookOpen className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>FAQ đã xuất bản</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{faqs.filter((faq) => faq.isPublished).length}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.Eye className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400'>Lọc danh sách câu hỏi theo các tiêu chí</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Icons.Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo câu hỏi, câu trả lời...'
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
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    <SelectItem value='general'>Câu hỏi chung</SelectItem>
                    {uniqueCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
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
                <CardTitle className='text-xl text-purple-400'>Danh sách câu hỏi thường gặp</CardTitle>
                <CardDescription className='text-gray-400'>{filteredFAQs.length} câu hỏi được tìm thấy</CardDescription>
              </div>
              {selectedFAQs.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>Đã chọn {selectedFAQs.length} câu hỏi</span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <Icons.Eye className='h-4 w-4 mr-1' /> Xuất bản
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <Icons.EyeOff className='h-4 w-4 mr-1' /> Ẩn
                  </Button>
                  <Button variant='destructive' size='sm'>
                    <Icons.Trash2 className='h-4 w-4 mr-1' /> Xóa
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-800'>
                      <th className='text-left py-3 px-4'>
                        <Checkbox
                          checked={selectedFAQs.length === currentFAQs.length && currentFAQs.length > 0}
                          onCheckedChange={handleSelectAll}
                          className='border-gray-600'
                        />
                      </th>
                      <th className='text-left py-3 px-4 text-gray-400 font-medium'>Câu hỏi</th>
                      <th className='text-left py-3 px-4 text-gray-400 font-medium'>Danh mục</th>
                      <th className='text-left py-3 px-4 text-gray-400 font-medium'>Khóa học</th>
                      <th className='text-left py-3 px-4 text-gray-400 font-medium'>Trạng thái</th>
                      <th className='text-left py-3 px-4 text-gray-400 font-medium'>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFAQs.map((faq) => (
                      <tr key={faq.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                        <td className='py-3 px-4'>
                          <Checkbox
                            checked={selectedFAQs.includes(faq.id)}
                            onCheckedChange={() => handleSelectFAQ(faq.id)}
                            className='border-gray-600'
                          />
                        </td>
                        <td className='py-3 px-4'>
                          <div className='font-medium truncate max-w-[300px]'>{faq.question}</div>
                        </td>
                        <td className='py-3 px-4'>
                          <Badge className='bg-gray-800 text-gray-300'>{faq.category}</Badge>
                        </td>
                        <td className='py-3 px-4'>
                          {faq.course ? (
                            <Badge className='bg-purple-900/30 text-purple-400'>{faq.course.title}</Badge>
                          ) : (
                            <span className='text-gray-500'>Chung</span>
                          )}
                        </td>
                        <td className='py-3 px-4'>
                          <Badge
                            className={
                              faq.isPublished
                                ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                                : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                            }
                          >
                            {faq.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
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
                                <Icons.MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-gray-800 border-gray-700 text-white'>
                              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                              <DropdownMenuSeparator className='bg-gray-700' />
                              <DropdownMenuItem
                                className='hover:bg-gray-700 cursor-pointer'
                                onClick={() => handleEditFAQ(faq)}
                              >
                                <Icons.Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                                {faq.isPublished ? (
                                  <>
                                    <Icons.EyeOff className='h-4 w-4 mr-2' /> Ẩn
                                  </>
                                ) : (
                                  <>
                                    <Icons.Eye className='h-4 w-4 mr-2' /> Xuất bản
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className='bg-gray-700' />
                              <DropdownMenuItem className='text-red-500 hover:bg-gray-700 cursor-pointer'>
                                <Icons.Trash2 className='h-4 w-4 mr-2' /> Xóa
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
                  Hiển thị {indexOfFirstFAQ + 1}-{Math.min(indexOfLastFAQ, filteredFAQs.length)} trong số{' '}
                  {filteredFAQs.length} câu hỏi
                </div>
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <Icons.ChevronLeft className='h-4 w-4' />
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
                    <Icons.ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview FAQ Section */}
        <Card className='bg-gray-900 border-gray-700 shadow-xl mt-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Xem trước FAQ</CardTitle>
            <CardDescription className='text-gray-400'>Xem trước cách hiển thị FAQ trên trang web</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {uniqueCategories.map((category, index) => {
                const categoryFaqs = faqs.filter((faq) => faq.category === category && faq.isPublished)
                if (categoryFaqs.length === 0) return null

                return (
                  <AccordionItem key={index} value={`category-${index}`} className='border-b border-gray-800'>
                    <AccordionTrigger className='text-lg font-medium text-purple-400 hover:text-purple-300 py-4'>
                      {category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Accordion type='single' collapsible className='w-full'>
                        {categoryFaqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`faq-${faq.id}`} className='border-b border-gray-700'>
                            <AccordionTrigger className='text-white hover:text-purple-300 py-3'>
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className='text-gray-300 pb-4'>{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>

        {/* Edit FAQ Dialog */}
        {currentFAQ && (
          <Dialog open={isEditFAQOpen} onOpenChange={setIsEditFAQOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Câu Hỏi</DialogTitle>
                <DialogDescription className='text-gray-400'>Chỉnh sửa nội dung câu hỏi thường gặp</DialogDescription>
              </DialogHeader>

              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-question' className='text-white'>
                    Câu hỏi
                  </Label>
                  <Input
                    id='edit-question'
                    defaultValue={currentFAQ.question}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='edit-answer' className='text-white'>
                    Câu trả lời
                  </Label>
                  <Textarea
                    id='edit-answer'
                    defaultValue={currentFAQ.answer}
                    className='bg-gray-800 border-gray-700 text-white'
                    rows={5}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='edit-category' className='text-white'>
                      Danh mục
                    </Label>
                    <Select defaultValue={currentFAQ.category}>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn danh mục' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        {uniqueCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                        <SelectItem value='new'>+ Tạo danh mục mới</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-course' className='text-white'>
                      Khóa học (tùy chọn)
                    </Label>
                    <Select defaultValue={currentFAQ.course ? currentFAQ.course.id.toString() : 'null'}>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn khóa học' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='null'>Không liên quan đến khóa học cụ thể</SelectItem>
                        {uniqueCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='edit-order' className='text-white'>
                    Thứ tự hiển thị
                  </Label>
                  <Input
                    id='edit-order'
                    type='number'
                    defaultValue={currentFAQ.order}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>

                <div className='flex items-center space-x-2'></div>

                <div className='flex items-center space-x-2'>
                  <Checkbox id='edit-published' defaultChecked={currentFAQ.isPublished} />
                  <Label htmlFor='edit-published' className='text-white'>
                    Xuất bản
                  </Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant='outline'
                  onClick={() => setIsEditFAQOpen(false)}
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
