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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import type { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { exportToExcel, formatCurrency, formatPaymentStatus } from '@/lib/excel'
import { Payment } from '@/models/payment.type'
import { Icons } from '@/components/ui/icons'

// Sample payment data
const payments = [
  {
    id: 'PAY-001',
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
    amount: 599000,
    date: '2023-07-15',
    method: 'Credit Card',
    status: 'completed',
    transactionId: 'TXN123456789',
    invoiceNumber: 'INV-2023-001',
    paymentDetails: {
      cardLast4: '4242',
      cardBrand: 'Visa',
      expiryDate: '05/25'
    }
  },
  {
    id: 'PAY-002',
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
    amount: 799000,
    date: '2023-07-14',
    method: 'Bank Transfer',
    status: 'completed',
    transactionId: 'TXN987654321',
    invoiceNumber: 'INV-2023-002',
    paymentDetails: {
      bankName: 'VietcomBank',
      accountLast4: '6789'
    }
  },
  {
    id: 'PAY-003',
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
    amount: 899000,
    date: '2023-07-13',
    method: 'E-wallet',
    status: 'completed',
    transactionId: 'TXN456789123',
    invoiceNumber: 'INV-2023-003',
    paymentDetails: {
      walletProvider: 'MoMo',
      accountEmail: 'levanc@example.com'
    }
  },
  {
    id: 'PAY-004',
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
    amount: 699000,
    date: '2023-07-12',
    method: 'Credit Card',
    status: 'completed',
    transactionId: 'TXN789123456',
    invoiceNumber: 'INV-2023-004',
    paymentDetails: {
      cardLast4: '1234',
      cardBrand: 'Mastercard',
      expiryDate: '09/24'
    }
  },
  {
    id: 'PAY-005',
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
    amount: 899000,
    date: '2023-07-10',
    method: 'Bank Transfer',
    status: 'completed',
    transactionId: 'TXN321654987',
    invoiceNumber: 'INV-2023-005',
    paymentDetails: {
      bankName: 'BIDV',
      accountLast4: '4321'
    }
  },
  {
    id: 'PAY-006',
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
    amount: 999000,
    date: '2023-07-08',
    method: 'E-wallet',
    status: 'pending',
    transactionId: 'TXN654987321',
    invoiceNumber: 'INV-2023-006',
    paymentDetails: {
      walletProvider: 'ZaloPay',
      accountEmail: 'vuthif@example.com'
    }
  },
  {
    id: 'PAY-007',
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
    amount: 599000,
    date: '2023-07-05',
    method: 'Credit Card',
    status: 'failed',
    transactionId: 'TXN987321654',
    invoiceNumber: 'INV-2023-007',
    paymentDetails: {
      cardLast4: '5678',
      cardBrand: 'Visa',
      expiryDate: '12/23',
      errorMessage: 'Insufficient funds'
    }
  }
]

// Payment method distribution data
const paymentMethodData = [
  { name: 'Credit Card', value: payments.filter((p) => p.method === 'Credit Card').length },
  { name: 'Bank Transfer', value: payments.filter((p) => p.method === 'Bank Transfer').length },
  { name: 'E-wallet', value: payments.filter((p) => p.method === 'E-wallet').length }
]

// Payment status distribution data
const paymentStatusData = [
  { name: 'Completed', value: payments.filter((p) => p.status === 'completed').length },
  { name: 'Pending', value: payments.filter((p) => p.status === 'pending').length },
  { name: 'Failed', value: payments.filter((p) => p.status === 'failed').length }
]

// Daily revenue data
const dailyRevenueData = [
  { date: '2023-07-05', revenue: 599000 },
  { date: '2023-07-08', revenue: 999000 },
  { date: '2023-07-10', revenue: 899000 },
  { date: '2023-07-12', revenue: 699000 },
  { date: '2023-07-13', revenue: 899000 },
  { date: '2023-07-14', revenue: 799000 },
  { date: '2023-07-15', revenue: 599000 }
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<any | null>(null)
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date()
  })
  const paymentsPerPage = 5

  // Filter payments based on search term, method, and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = selectedMethod === 'all' || payment.method === selectedMethod
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus

    // Filter by date range if set
    let matchesDate = true
    if (date?.from && date?.to) {
      const paymentDate = new Date(payment.date)
      matchesDate = paymentDate >= date.from && paymentDate <= date.to
    }

    return matchesSearch && matchesMethod && matchesStatus && matchesDate
  })

  // Pagination
  const indexOfLastPayment = currentPage * paymentsPerPage
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment)
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage)

  // Handle view details
  const handleViewDetails = (payment: any) => {
    setCurrentPayment(payment)
    setIsViewDetailsOpen(true)
  }

  // Handle checkbox selection
  const handleSelectPayment = (paymentId: string) => {
    if (selectedPayments.includes(paymentId)) {
      setSelectedPayments(selectedPayments.filter((id) => id !== paymentId))
    } else {
      setSelectedPayments([...selectedPayments, paymentId])
    }
  }

  const handleSelectAll = () => {
    if (selectedPayments.length === currentPayments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(currentPayments.map((payment) => payment.id))
    }
  }

  // Format price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  // Calculate total revenue
  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0)

  // Colors for charts
  const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe']

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã thanh toán' },
      { key: 'student.name', header: 'Học viên' },
      { key: 'student.email', header: 'Email' },
      { key: 'course.title', header: 'Khóa học' },
      {
        key: 'amount',
        header: 'Số tiền',
        format: (value: number) => formatCurrency(value)
      },
      { key: 'date', header: 'Ngày thanh toán' },
      { key: 'method', header: 'Phương thức' },
      {
        key: 'status',
        header: 'Trạng thái',
        format: (value: string) => formatPaymentStatus(value)
      },
      { key: 'transactionId', header: 'Mã giao dịch' },
      { key: 'invoiceNumber', header: 'Số hóa đơn' }
    ]

    // Transform nested data for export
    const exportData = filteredPayments.map((payment) => ({
      ...payment,
      'student.name': payment.student.name,
      'student.email': payment.student.email,
      'course.title': payment.course.title
    }))

    exportToExcel({
      filename: 'Danh_sach_thanh_toan',
      sheetName: 'Thanh toán',
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
              <Icons.Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
            <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Icons.Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                  <span>Tạo Thanh Toán</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Tạo Thanh Toán Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>
                    Điền thông tin để tạo giao dịch thanh toán mới
                  </DialogDescription>
                </DialogHeader>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='student' className='text-white'>
                      Học viên
                    </Label>
                    <Select>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn học viên' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='101'>Nguyễn Văn A</SelectItem>
                        <SelectItem value='102'>Trần Thị B</SelectItem>
                        <SelectItem value='103'>Lê Văn C</SelectItem>
                        <SelectItem value='104'>Phạm Thị D</SelectItem>
                        <SelectItem value='105'>Hoàng Văn E</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='course' className='text-white'>
                      Khóa học
                    </Label>
                    <Select>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn khóa học' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='201'>JavaScript Cơ Bản</SelectItem>
                        <SelectItem value='202'>React Advanced</SelectItem>
                        <SelectItem value='203'>Python for Data Science</SelectItem>
                        <SelectItem value='204'>UI/UX Design</SelectItem>
                        <SelectItem value='205'>Mobile App Development with Flutter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='amount' className='text-white'>
                      Số tiền (VND)
                    </Label>
                    <div className='relative'>
                      <Icons.DollarSign className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                      <Input
                        id='amount'
                        type='number'
                        placeholder='Ví dụ: 599000'
                        className='pl-8 bg-gray-800 border-gray-700 text-white'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='payment-date' className='text-white'>
                      Ngày thanh toán
                    </Label>
                    <div className='relative'>
                      <Icons.Calendar className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                      <Input id='payment-date' type='date' className='pl-8 bg-gray-800 border-gray-700 text-white' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='payment-method' className='text-white'>
                      Phương thức thanh toán
                    </Label>
                    <Select>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn phương thức' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='credit-card'>Credit Card</SelectItem>
                        <SelectItem value='bank-transfer'>Bank Transfer</SelectItem>
                        <SelectItem value='e-wallet'>E-wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='payment-status' className='text-white'>
                      Trạng thái
                    </Label>
                    <Select defaultValue='completed'>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='completed'>Hoàn thành</SelectItem>
                        <SelectItem value='pending'>Đang xử lý</SelectItem>
                        <SelectItem value='failed'>Thất bại</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='col-span-2 space-y-2'>
                    <Label htmlFor='transaction-id' className='text-white'>
                      Mã giao dịch
                    </Label>
                    <Input
                      id='transaction-id'
                      placeholder='Nhập mã giao dịch'
                      className='bg-gray-800 border-gray-700 text-white'
                    />
                  </div>

                  <div className='col-span-2 space-y-2'>
                    <Label htmlFor='notes' className='text-white'>
                      Ghi chú
                    </Label>
                    <Textarea
                      id='notes'
                      placeholder='Ghi chú về giao dịch thanh toán'
                      className='bg-gray-800 border-gray-700 text-white'
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddPaymentOpen(false)}
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    Hủy
                  </Button>
                  <Button className='bg-purple-600 hover:bg-purple-700'>Tạo thanh toán</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          {/* Stats Cards */}
          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Tổng doanh thu</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{formatPrice(totalRevenue)}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.DollarSign className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Tổng giao dịch</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>{payments.length}</h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.Receipt className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Giao dịch thành công</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>
                    {payments.filter((p) => p.status === 'completed').length}
                  </h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.CheckCircle className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-400'>Giao dịch đang xử lý</p>
                  <h3 className='text-2xl font-bold text-white mt-1'>
                    {payments.filter((p) => p.status === 'pending').length}
                  </h3>
                </div>
                <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Icons.RotateCcw className='h-6 w-6 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-xl text-purple-400'>Phương thức thanh toán</CardTitle>
              <CardDescription className='text-gray-400'>Phân bố theo phương thức thanh toán</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <RePieChart>
                    <Pie
                      data={paymentMethodData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={80}
                      fill='#8884d8'
                      dataKey='value'
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelStyle={{ color: '#f9fafb' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-xl text-purple-400'>Trạng thái thanh toán</CardTitle>
              <CardDescription className='text-gray-400'>Phân bố theo trạng thái thanh toán</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <RePieChart>
                    <Pie
                      data={paymentStatusData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={80}
                      fill='#8884d8'
                      dataKey='value'
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.name === 'Completed' ? '#10b981' : entry.name === 'Pending' ? '#f59e0b' : '#ef4444'
                          }
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelStyle={{ color: '#f9fafb' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-xl text-purple-400'>Doanh thu theo ngày</CardTitle>
              <CardDescription className='text-gray-400'>Doanh thu trong 7 ngày gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={dailyRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                    <XAxis
                      dataKey='date'
                      stroke='#6b7280'
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getDate()}/${date.getMonth() + 1}`
                      }}
                    />
                    <YAxis stroke='#6b7280' tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelStyle={{ color: '#f9fafb' }}
                      formatter={(value) => [formatPrice(Number(value)), 'Doanh thu']}
                    />
                    <Bar dataKey='revenue' fill='#8b5cf6' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400'>Lọc danh sách thanh toán theo các tiêu chí</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Icons.Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo tên, email, mã...'
                    className='pl-8 bg-gray-800 border-gray-700 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='method' className='text-white mb-2 block'>
                  Phương thức
                </Label>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn phương thức' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả phương thức</SelectItem>
                    <SelectItem value='Credit Card'>Credit Card</SelectItem>
                    <SelectItem value='Bank Transfer'>Bank Transfer</SelectItem>
                    <SelectItem value='E-wallet'>E-wallet</SelectItem>
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
                    <SelectItem value='completed'>Hoàn thành</SelectItem>
                    <SelectItem value='pending'>Đang xử lý</SelectItem>
                    <SelectItem value='failed'>Thất bại</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-white mb-2 block'>Khoảng thời gian</Label>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gray-900 border-gray-700 shadow-xl'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-xl text-purple-400'>Danh sách thanh toán</CardTitle>
                <CardDescription className='text-gray-400'>
                  {filteredPayments.length} thanh toán được tìm thấy
                </CardDescription>
              </div>
              {selectedPayments.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>Đã chọn {selectedPayments.length} thanh toán</span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <Icons.FileText className='h-4 w-4 mr-1' /> Xuất hóa đơn
                  </Button>
                  <Button variant='destructive' size='sm'>
                    <Icons.Trash2 className='h-4 w-4 mr-1' /> Xóa
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
                        checked={selectedPayments.length === currentPayments.length && currentPayments.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Mã thanh toán</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Học viên</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Khóa học</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Số tiền</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Ngày</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Phương thức</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Trạng thái</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((payment) => (
                    <tr key={payment.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                      <td className='py-3 px-4'>
                        <Checkbox
                          checked={selectedPayments.includes(payment.id)}
                          onCheckedChange={() => handleSelectPayment(payment.id)}
                          className='border-gray-600'
                        />
                      </td>
                      <td className='py-3 px-4 font-medium'>{payment.id}</td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <img
                            src={payment.student.avatar || '/placeholder.svg'}
                            alt={payment.student.name}
                            className='w-8 h-8 rounded-full object-cover mr-3'
                          />
                          <div>
                            <div className='font-medium'>{payment.student.name}</div>
                            <div className='text-xs text-gray-400'>{payment.student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <img
                            src={payment.course.thumbnail || '/placeholder.svg'}
                            alt={payment.course.title}
                            className='w-10 h-7 rounded object-cover mr-3'
                          />
                          <div className='truncate max-w-[150px]'>{payment.course.title}</div>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-purple-400 font-medium'>{formatPrice(payment.amount)}</td>
                      <td className='py-3 px-4 text-gray-300'>{payment.date}</td>
                      <td className='py-3 px-4'>
                        <Badge className='bg-gray-800 text-gray-300'>{payment.method}</Badge>
                      </td>
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
                              onClick={() => handleViewDetails(payment)}
                            >
                              <Icons.Eye className='h-4 w-4 mr-2' /> Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              <Icons.FileText className='h-4 w-4 mr-2' /> Xuất hóa đơn
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              <Icons.Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
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
                Hiển thị {indexOfFirstPayment + 1}-{Math.min(indexOfLastPayment, filteredPayments.length)} trong số{' '}
                {filteredPayments.length} thanh toán
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
          </CardContent>
        </Card>

        {/* View Payment Details Dialog */}
        {currentPayment && (
          <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-3xl'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chi tiết thanh toán</DialogTitle>
                <DialogDescription className='text-gray-400'>
                  Thông tin chi tiết về giao dịch thanh toán
                </DialogDescription>
              </DialogHeader>

              <div className='space-y-6 mt-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='text-lg font-medium'>Mã thanh toán: {currentPayment.id}</h3>
                    <p className='text-sm text-gray-400'>Hóa đơn: {currentPayment.invoiceNumber}</p>
                  </div>
                  <Badge
                    className={
                      currentPayment.status === 'completed'
                        ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                        : currentPayment.status === 'pending'
                          ? 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                          : 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                    }
                  >
                    {currentPayment.status === 'completed'
                      ? 'Hoàn thành'
                      : currentPayment.status === 'pending'
                        ? 'Đang xử lý'
                        : 'Thất bại'}
                  </Badge>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <h4 className='text-sm text-gray-400 mb-3'>Thông tin học viên</h4>
                    <div className='flex items-center mb-4'>
                      <img
                        src={currentPayment.student.avatar || '/placeholder.svg'}
                        alt={currentPayment.student.name}
                        className='w-12 h-12 rounded-full object-cover mr-4'
                      />
                      <div>
                        <h5 className='font-medium'>{currentPayment.student.name}</h5>
                        <p className='text-sm text-gray-400'>{currentPayment.student.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gray-800 rounded-lg p-4'>
                    <h4 className='text-sm text-gray-400 mb-3'>Thông tin khóa học</h4>
                    <div className='flex items-center'>
                      <img
                        src={currentPayment.course.thumbnail || '/placeholder.svg'}
                        alt={currentPayment.course.title}
                        className='w-16 h-12 rounded object-cover mr-4'
                      />
                      <div>
                        <h5 className='font-medium'>{currentPayment.course.title}</h5>
                        <p className='text-sm text-gray-400'>Giảng viên: {currentPayment.course.instructor}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800 rounded-lg p-4'>
                  <h4 className='text-sm text-gray-400 mb-3'>Thông tin thanh toán</h4>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <p className='text-sm text-gray-400'>Số tiền</p>
                      <p className='text-lg font-medium text-purple-400'>{formatPrice(currentPayment.amount)}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Ngày thanh toán</p>
                      <p className='text-base'>{currentPayment.date}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Phương thức</p>
                      <p className='text-base'>{currentPayment.method}</p>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800 rounded-lg p-4'>
                  <h4 className='text-sm text-gray-400 mb-3'>Chi tiết giao dịch</h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Mã giao dịch:</span>
                      <span>{currentPayment.transactionId}</span>
                    </div>

                    {currentPayment.method === 'Credit Card' && (
                      <>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Loại thẻ:</span>
                          <span>{currentPayment.paymentDetails.cardBrand}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Số thẻ:</span>
                          <span>**** **** **** {currentPayment.paymentDetails.cardLast4}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Hết hạn:</span>
                          <span>{currentPayment.paymentDetails.expiryDate}</span>
                        </div>
                      </>
                    )}

                    {currentPayment.method === 'Bank Transfer' && (
                      <>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Ngân hàng:</span>
                          <span>{currentPayment.paymentDetails.bankName}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Số tài khoản:</span>
                          <span>**** {currentPayment.paymentDetails.accountLast4}</span>
                        </div>
                      </>
                    )}

                    {currentPayment.method === 'E-wallet' && (
                      <>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Ví điện tử:</span>
                          <span>{currentPayment.paymentDetails.walletProvider}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-400'>Email:</span>
                          <span>{currentPayment.paymentDetails.accountEmail}</span>
                        </div>
                      </>
                    )}

                    {currentPayment.status === 'failed' && (
                      <div className='flex justify-between text-red-500'>
                        <span>Lỗi:</span>
                        <span>{currentPayment.paymentDetails.errorMessage}</span>
                      </div>
                    )}
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
                  <Icons.FileText className='h-4 w-4 mr-2' /> Xuất hóa đơn
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
