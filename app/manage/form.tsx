'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { exportToExcel, formatCurrency } from '@/lib/excel'
import { Icons } from '@/components/ui/icons'

export default function DashboardPage() {
  const [period, setPeriod] = useState('week')

  // Dữ liệu mẫu cho biểu đồ
  const userActivityData = [
    { date: '2024-01', users: 120, courses: 15 },
    { date: '2024-02', users: 150, courses: 18 },
    { date: '2024-03', users: 180, courses: 22 },
    { date: '2024-04', users: 220, courses: 25 },
    { date: '2024-05', users: 280, courses: 30 },
    { date: '2024-06', users: 310, courses: 35 }
  ]

  const revenueData = [
    { date: '2024-01', revenue: 1200000 },
    { date: '2024-02', revenue: 1500000 },
    { date: '2024-03', revenue: 1800000 },
    { date: '2024-04', revenue: 2200000 },
    { date: '2024-05', revenue: 2800000 },
    { date: '2024-06', revenue: 3100000 }
  ]

  const reviewsData = [
    { rating: '5 sao', count: 120 },
    { rating: '4 sao', count: 80 },
    { rating: '3 sao', count: 40 },
    { rating: '2 sao', count: 15 },
    { rating: '1 sao', count: 5 }
  ]

  const recentPayments = [
    { id: 'PAY-001', user: 'Nguyễn Văn A', course: 'JavaScript Cơ Bản', amount: '599.000đ', date: '15/06/2024' },
    { id: 'PAY-002', user: 'Trần Thị B', course: 'React Advanced', amount: '799.000đ', date: '14/06/2024' },
    { id: 'PAY-003', user: 'Lê Văn C', course: 'Python for Data Science', amount: '899.000đ', date: '13/06/2024' },
    { id: 'PAY-004', user: 'Phạm Thị D', course: 'UI/UX Design', amount: '699.000đ', date: '12/06/2024' }
  ]

  // Handle export to Excel
  const handleExportExcel = () => {
    const revenueColumns = [
      { key: 'date', header: 'Tháng' },
      {
        key: 'revenue',
        header: 'Doanh thu',
        format: (value: number) => formatCurrency(value)
      },
      {
        key: 'growth',
        header: 'Tăng trưởng',
        format: (value: number) => `${value.toFixed(1)}%`
      }
    ]

    const revenueExportData = revenueData.map((data, index) => {
      const prevRevenue = index > 0 ? revenueData[index - 1].revenue : data.revenue
      const growth = ((data.revenue - prevRevenue) / prevRevenue) * 100

      return {
        date: new Date(data.date).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
        revenue: data.revenue,
        growth
      }
    })

    exportToExcel({
      filename: 'Bao_cao_doanh_thu',
      sheetName: 'Doanh thu',
      data: revenueExportData,
      columns: revenueColumns
    })
  }

  return (
    <div className='w-full p-3 sm:p-4 lg:p-6 max-w-[1400px] mx-auto'>
      {/* Header buttons */}
      <div className='flex justify-end mb-4 sm:mb-6'>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
          <Button
            variant='outline'
            className='bg-gray-800 border-purple-500 hover:bg-purple-700 text-white w-full sm:w-auto text-xs sm:text-sm'
            onClick={handleExportExcel}
          >
            <Icons.Download className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
            <span>Xuất Excel</span>
          </Button>
          <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
            <Icons.Eye className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
            <span>Xem chi tiết</span>
          </Button>
        </div>
      </div>

      {/* Main stats grid */}
      <div className='flex flex-col gap-4 sm:gap-6'>
        {/* Charts Section */}
        <Tabs defaultValue='overview' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 bg-gray-800 rounded-lg mb-4 sm:mb-6'>
            <TabsTrigger
              value='overview'
              className='text-white data-[state=active]:bg-purple-600 transition-all duration-200 text-xs sm:text-sm py-2'
            >
              <Icons.Activity className='w-4 h-4 mr-1 sm:mr-2' />
              <span className='hidden sm:inline'>Tổng quan</span>
              <span className='sm:hidden'>Tổng</span>
            </TabsTrigger>
            <TabsTrigger
              value='revenue'
              className='text-white data-[state=active]:bg-purple-600 transition-all duration-200 text-xs sm:text-sm py-2'
            >
              <Icons.BarChart2 className='w-4 h-4 mr-1 sm:mr-2' />
              <span className='hidden sm:inline'>Doanh thu</span>
              <span className='sm:hidden'>Doanh</span>
            </TabsTrigger>
            <TabsTrigger
              value='reviews'
              className='text-white data-[state=active]:bg-purple-600 transition-all duration-200 text-xs sm:text-sm py-2'
            >
              <Icons.Star className='w-4 h-4 mr-1 sm:mr-2' />
              <span className='hidden sm:inline'>Đánh giá</span>
              <span className='sm:hidden'>Đánh</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6'>
              <Card className='bg-gray-900 border-gray-700 shadow-xl'>
                <CardHeader className='p-4 sm:p-6'>
                  <CardTitle className='text-lg sm:text-xl text-purple-400'>Người dùng & Khóa học</CardTitle>
                  <CardDescription className='text-xs sm:text-sm text-gray-400'>
                    Số lượng người dùng và khóa học theo tháng
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-4 sm:p-6 pt-0'>
                  <div className='h-60 sm:h-80'>
                    <ChartContainer
                      config={{
                        users: {
                          label: 'Người dùng',
                          color: 'hsl(var(--chart-1))'
                        },
                        courses: {
                          label: 'Khóa học',
                          color: 'hsl(var(--chart-2))'
                        }
                      }}
                    >
                      <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={userActivityData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                          <XAxis
                            dataKey='date'
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                              const date = new Date(value)
                              return date.toLocaleDateString('vi-VN', { month: 'short' })
                            }}
                          />
                          <YAxis
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                          />
                          <Line
                            type='monotone'
                            dataKey='users'
                            stroke='var(--color-users)'
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line
                            type='monotone'
                            dataKey='courses'
                            stroke='var(--color-courses)'
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-gray-900 border-gray-700 shadow-xl'>
                <CardHeader className='p-4 sm:p-6'>
                  <CardTitle className='text-lg sm:text-xl text-purple-400'>Thanh toán gần đây</CardTitle>
                  <CardDescription className='text-xs sm:text-sm text-gray-400'>
                    Các giao dịch thanh toán mới nhất
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-4 sm:p-6 pt-0'>
                  {/* Responsive table with horizontal scroll on mobile */}
                  <div className='overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0'>
                    <table className='w-full min-w-[500px]'>
                      <thead>
                        <tr className='border-b border-gray-700'>
                          <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                            ID
                          </th>
                          <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                            Người dùng
                          </th>
                          <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                            Khóa học
                          </th>
                          <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                            Số tiền
                          </th>
                          <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                            Ngày
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPayments.map((payment, index) => (
                          <tr key={index} className='border-b border-gray-800 hover:bg-gray-800/50'>
                            <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm'>{payment.id}</td>
                            <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm'>{payment.user}</td>
                            <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm'>{payment.course}</td>
                            <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-purple-400 font-medium'>
                              {payment.amount}
                            </td>
                            <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-400'>
                              {payment.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='mt-4 flex justify-center'>
                    <Button
                      variant='outline'
                      className='bg-gray-800 border-purple-500 hover:bg-purple-700 text-white text-xs sm:text-sm'
                    >
                      Xem tất cả giao dịch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='revenue'>
            <div className='flex flex-col gap-3 sm:gap-4 md:gap-6'>
              {/* Stats Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                <Card className='bg-gray-800/50 border-gray-700'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-purple-900/50 p-2 rounded-lg'>
                        <Icons.CreditCard className='w-5 h-5 text-purple-400' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-400'>Tổng giao dịch</p>
                        <p className='text-xl font-bold text-white'>1,245</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='bg-gray-800/50 border-gray-700'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-purple-900/50 p-2 rounded-lg'>
                        <Icons.Calendar className='w-5 h-5 text-purple-400' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-400'>Trung bình/ngày</p>
                        <p className='text-xl font-bold text-white'>42</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='bg-gray-800/50 border-gray-700'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-purple-900/50 p-2 rounded-lg'>
                        <Icons.Award className='w-5 h-5 text-purple-400' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-400'>Khóa học bán chạy</p>
                        <p className='text-xl font-bold text-white'>React Pro</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Chart Card */}
              <Card className='bg-gray-900 border-gray-700'>
                <CardHeader className='p-3 sm:p-4 border-b border-gray-800'>
                  <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4'>
                    <div>
                      <CardTitle className='text-lg text-purple-400'>Doanh thu theo tháng</CardTitle>
                      <CardDescription className='text-sm text-gray-400'>
                        Tổng doanh thu từ các khóa học
                      </CardDescription>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant={period === 'week' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setPeriod('week')}
                        className={period === 'week' ? 'bg-purple-600' : 'bg-gray-800'}
                      >
                        Tuần
                      </Button>
                      <Button
                        variant={period === 'month' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setPeriod('month')}
                        className={period === 'month' ? 'bg-purple-600' : 'bg-gray-800'}
                      >
                        Tháng
                      </Button>
                      <Button
                        variant={period === 'year' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setPeriod('year')}
                        className={period === 'year' ? 'bg-purple-600' : 'bg-gray-800'}
                      >
                        Năm
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='p-3 sm:p-4'>
                  {/* Chart Section */}
                  <div className='mb-4 sm:mb-6'>
                    <div className='h-[250px] sm:h-[280px]'>
                      <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={revenueData}>
                          <XAxis
                            dataKey='date'
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `T${new Date(value).getMonth() + 1}`}
                          />
                          <YAxis
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                          />
                          <Bar dataKey='revenue' fill='#3b82f6' radius={[4, 4, 0, 0]} maxBarSize={40} />
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className='bg-gray-800 border border-gray-700 p-2 rounded-lg shadow-lg'>
                                    <p className='text-sm text-gray-300'>
                                      {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                        maximumFractionDigits: 0
                                      }).format(Number(payload[0].value))}
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Revenue Table */}
                  <div className='border-t border-gray-800 pt-3 sm:pt-4'>
                    <div className='overflow-x-auto -mx-3 sm:mx-0'>
                      <table className='w-full min-w-[600px]'>
                        <thead>
                          <tr>
                            <th className='text-left py-2 px-2 text-gray-400 font-medium text-sm'>Tháng</th>
                            <th className='text-right py-2 px-2 text-gray-400 font-medium text-sm'>Doanh thu</th>
                            <th className='text-right py-2 px-2 text-gray-400 font-medium text-sm'>Tăng trưởng</th>
                          </tr>
                        </thead>
                        <tbody className='text-sm'>
                          {revenueData.map((data, index) => {
                            const prevRevenue = index > 0 ? revenueData[index - 1].revenue : data.revenue
                            const growth = ((data.revenue - prevRevenue) / prevRevenue) * 100

                            return (
                              <tr key={index} className='border-b border-gray-800'>
                                <td className='py-2 px-2'>
                                  {new Date(data.date).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                                </td>
                                <td className='py-2 px-2 text-right text-purple-400 font-medium'>
                                  {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                    maximumFractionDigits: 0
                                  }).format(data.revenue)}
                                </td>
                                <td className='py-2 px-2 text-right'>
                                  <span
                                    className={`inline-flex items-center ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                  >
                                    <Icons.TrendingUp className='w-3 h-3 mr-1' />
                                    {growth.toFixed(1)}%
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='reviews'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6'>
              <Card className='bg-gray-900 border-gray-700 shadow-xl'>
                <CardHeader className='p-4 sm:p-6'>
                  <CardTitle className='text-lg sm:text-xl text-purple-400'>Phân bố đánh giá</CardTitle>
                  <CardDescription className='text-xs sm:text-sm text-gray-400'>
                    Số lượng đánh giá theo số sao
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-4 sm:p-6 pt-0'>
                  <div className='h-60 sm:h-80'>
                    <ChartContainer
                      config={{
                        count: {
                          label: 'Số lượng',
                          color: 'hsl(var(--chart-1))'
                        }
                      }}
                    >
                      <ResponsiveContainer width='100%' height='100%'>
                        <BarChart
                          data={reviewsData}
                          layout='vertical'
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis type='number' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                            dataKey='rating'
                            type='category'
                            stroke='#888888'
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Bar dataKey='count' fill='var(--color-count)' radius={[0, 4, 4, 0]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-gray-900 border-gray-700 shadow-xl'>
                <CardHeader className='p-4 sm:p-6'>
                  <CardTitle className='text-lg sm:text-xl text-purple-400'>Đánh giá gần đây</CardTitle>
                  <CardDescription className='text-xs sm:text-sm text-gray-400'>
                    Các đánh giá mới nhất từ học viên
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-4 sm:p-6 pt-0'>
                  <div className='space-y-3 sm:space-y-4'>
                    {[
                      {
                        user: 'Nguyễn Văn A',
                        course: 'JavaScript Cơ Bản',
                        rating: 5,
                        comment: 'Khóa học rất hay và dễ hiểu. Giảng viên giảng dạy rất tận tâm.'
                      },
                      {
                        user: 'Trần Thị B',
                        course: 'React Advanced',
                        rating: 4,
                        comment: 'Nội dung phong phú, tuy nhiên cần bổ sung thêm bài tập thực hành.'
                      },
                      {
                        user: 'Lê Văn C',
                        course: 'Python for Data Science',
                        rating: 5,
                        comment: 'Tuyệt vời! Đã giúp tôi hiểu rõ về Data Science.'
                      }
                    ].map((review, index) => (
                      <div key={index} className='p-3 sm:p-4 bg-gray-800 rounded-lg'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h4 className='font-medium text-sm sm:text-base'>{review.user}</h4>
                            <p className='text-xs sm:text-sm text-gray-400'>{review.course}</p>
                          </div>
                          <div className='flex'>
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Icons.Star
                                  key={i}
                                  className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className='mt-2 text-xs sm:text-sm text-gray-300'>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  <div className='mt-4 flex justify-center'>
                    <Button
                      variant='outline'
                      className='bg-gray-800 border-purple-500 hover:bg-purple-700 text-white text-xs sm:text-sm'
                    >
                      Xem tất cả đánh giá
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-xs sm:text-sm text-gray-400'>Tổng người dùng</p>
                  <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mt-1'>1,245</h3>
                  <p className='text-xs sm:text-sm text-green-500 mt-1 flex items-center'>
                    <Icons.TrendingUp className='w-3 h-3 sm:w-4 sm:h-4 mr-1' /> +12.5%
                  </p>
                </div>
                <div className='bg-purple-900/50 p-2 sm:p-3 rounded-lg'>
                  <Icons.Users className='w-6 h-6 sm:w-8 sm:h-8 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-xs sm:text-sm text-gray-400'>Tổng khóa học</p>
                  <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mt-1'>78</h3>
                  <p className='text-xs sm:text-sm text-green-500 mt-1 flex items-center'>
                    <Icons.TrendingUp className='w-3 h-3 sm:w-4 sm:h-4 mr-1' /> +8.3%
                  </p>
                </div>
                <div className='bg-purple-900/50 p-2 sm:p-3 rounded-lg'>
                  <Icons.BookOpen className='w-6 h-6 sm:w-8 sm:h-8 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-xs sm:text-sm text-gray-400'>Tổng doanh thu</p>
                  <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mt-1'>45.8M</h3>
                  <p className='text-xs sm:text-sm text-green-500 mt-1 flex items-center'>
                    <Icons.TrendingUp className='w-3 h-3 sm:w-4 sm:h-4 mr-1' /> +15.2%
                  </p>
                </div>
                <div className='bg-purple-900/50 p-2 sm:p-3 rounded-lg'>
                  <Icons.DollarSign className='w-6 h-6 sm:w-8 sm:h-8 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-700 shadow-xl'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-xs sm:text-sm text-gray-400'>Đánh giá trung bình</p>
                  <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mt-1'>4.7</h3>
                  <p className='text-xs sm:text-sm text-green-500 mt-1 flex items-center'>
                    <Icons.TrendingUp className='w-3 h-3 sm:w-4 sm:h-4 mr-1' /> +0.3
                  </p>
                </div>
                <div className='bg-purple-900/50 p-2 sm:p-3 rounded-lg'>
                  <Icons.Star className='w-6 h-6 sm:w-8 sm:h-8 text-purple-400' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
