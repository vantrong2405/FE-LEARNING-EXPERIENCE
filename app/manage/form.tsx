'use client'

import { useState } from 'react'
import {
  Users,
  BookOpen,
  CreditCard,
  Star,
  BarChart3,
  PieChart,
  TrendingUp,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Settings,
  Home,
  Layers,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Sample data for charts
  const userGrowthData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 800 },
    { month: 'Apr', users: 1000 },
    { month: 'May', users: 1200 },
    { month: 'Jun', users: 1500 }
  ]

  const courseData = [
    { name: 'Web Dev', value: 35 },
    { name: 'Mobile', value: 25 },
    { name: 'Data Science', value: 20 },
    { name: 'Design', value: 15 },
    { name: 'Other', value: 5 }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 7500 },
    { month: 'Mar', revenue: 10000 },
    { month: 'Apr', revenue: 12500 },
    { month: 'May', revenue: 15000 },
    { month: 'Jun', revenue: 20000 }
  ]

  const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe']

  const recentUsers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', date: '2023-07-15', status: 'active' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', date: '2023-07-14', status: 'active' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', date: '2023-07-13', status: 'inactive' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', date: '2023-07-12', status: 'active' }
  ]

  const recentPayments = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      course: 'Web Development',
      amount: '1,200,000 VND',
      date: '2023-07-15',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      course: 'Mobile App Development',
      amount: '1,500,000 VND',
      date: '2023-07-14',
      status: 'completed'
    },
    { id: 3, user: 'Lê Văn C', course: 'Data Science', amount: '2,000,000 VND', date: '2023-07-13', status: 'pending' },
    {
      id: 4,
      user: 'Phạm Thị D',
      course: 'UI/UX Design',
      amount: '1,800,000 VND',
      date: '2023-07-12',
      status: 'completed'
    }
  ]

  return (
    <div className='flex h-screen bg-gradient-to-br from-[#0D0A25] to-[#1A1744] text-white'>
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 transition-all duration-300 ease-in-out fixed h-full z-10`}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-800'>
          {sidebarOpen && <h2 className='text-xl font-bold text-purple-400'>EduAdmin</h2>}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-gray-400 hover:text-white hover:bg-gray-800'
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        <nav className='mt-6 px-4'>
          <div className='space-y-4'>
            <Button variant='ghost' className='w-full justify-start text-purple-400 hover:bg-gray-800 hover:text-white'>
              <Home className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Dashboard'}
            </Button>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <Users className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Users'}
            </Button>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <BookOpen className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Courses'}
            </Button>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <CreditCard className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Payments'}
            </Button>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <Star className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Reviews'}
            </Button>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <MessageSquare className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Messages'}
            </Button>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <Settings className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Settings'}
            </Button>
          </div>
          <div className='absolute bottom-4 w-full left-0 px-4'>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <LogOut className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Logout'}
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out overflow-auto`}
      >
        {/* Header */}
        <header className='bg-gray-900 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md'>
          <div className='flex items-center'>
            <h1 className='text-xl font-bold text-purple-400'>Dashboard</h1>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
              <Input
                type='search'
                placeholder='Search...'
                className='w-64 pl-8 bg-gray-800 border-gray-700 focus:border-purple-500 text-white'
              />
            </div>
            <Button variant='outline' size='icon' className='relative bg-gray-800 border-gray-700 hover:bg-gray-700'>
              <Bell className='h-5 w-5 text-gray-400' />
              <span className='absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                3
              </span>
            </Button>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center'>
                <span className='font-semibold'>VT</span>
              </div>
              {sidebarOpen && <span className='text-sm font-medium'>Văn Trọng</span>}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
            {/* Stats Cards */}
            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>Total Users</p>
                    <h3 className='text-2xl font-bold text-white mt-1'>1,543</h3>
                    <p className='text-sm text-green-500 mt-1 flex items-center'>
                      <TrendingUp className='h-4 w-4 mr-1' /> +12.5%
                    </p>
                  </div>
                  <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                    <Users className='h-6 w-6 text-purple-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>Total Courses</p>
                    <h3 className='text-2xl font-bold text-white mt-1'>42</h3>
                    <p className='text-sm text-green-500 mt-1 flex items-center'>
                      <TrendingUp className='h-4 w-4 mr-1' /> +8.2%
                    </p>
                  </div>
                  <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                    <BookOpen className='h-6 w-6 text-purple-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>Total Revenue</p>
                    <h3 className='text-2xl font-bold text-white mt-1'>₫75.2M</h3>
                    <p className='text-sm text-green-500 mt-1 flex items-center'>
                      <TrendingUp className='h-4 w-4 mr-1' /> +18.3%
                    </p>
                  </div>
                  <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                    <CreditCard className='h-6 w-6 text-purple-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>Total Reviews</p>
                    <h3 className='text-2xl font-bold text-white mt-1'>856</h3>
                    <p className='text-sm text-green-500 mt-1 flex items-center'>
                      <TrendingUp className='h-4 w-4 mr-1' /> +5.7%
                    </p>
                  </div>
                  <div className='h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center'>
                    <Star className='h-6 w-6 text-purple-400' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-xl text-purple-400'>User Growth</CardTitle>
                <CardDescription className='text-gray-400'>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-80'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={userGrowthData}>
                      <defs>
                        <linearGradient id='colorUsers' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#8b5cf6' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#8b5cf6' stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey='month' stroke='#6b7280' />
                      <YAxis stroke='#6b7280' />
                      <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                        labelStyle={{ color: '#f9fafb' }}
                      />
                      <Area type='monotone' dataKey='users' stroke='#8b5cf6' fillOpacity={1} fill='url(#colorUsers)' />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-xl text-purple-400'>Revenue</CardTitle>
                <CardDescription className='text-gray-400'>Monthly revenue in VND</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-80'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={revenueData}>
                      <XAxis dataKey='month' stroke='#6b7280' />
                      <YAxis stroke='#6b7280' />
                      <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                        labelStyle={{ color: '#f9fafb' }}
                        formatter={(value: number) => [`${value.toLocaleString()} VND`, 'Revenue']}
                      />
                      <Bar dataKey='revenue' fill='#8b5cf6' radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
            <Card className='bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-xl text-purple-400'>Course Distribution</CardTitle>
                <CardDescription className='text-gray-400'>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-64 flex items-center justify-center'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <RePieChart>
                      <Pie
                        data={courseData}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey='value'
                        label={({ name, percent }: { name: string; percent: number }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {courseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                        labelStyle={{ color: '#f9fafb' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-700 shadow-xl lg:col-span-2'>
              <CardHeader>
                <CardTitle className='text-xl text-purple-400'>Recent Activity</CardTitle>
                <CardDescription className='text-gray-400'>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='users'>
                  <TabsList className='bg-gray-800 mb-4'>
                    <TabsTrigger value='users' className='text-white data-[state=active]:bg-purple-600'>
                      Users
                    </TabsTrigger>
                    <TabsTrigger value='payments' className='text-white data-[state=active]:bg-purple-600'>
                      Payments
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='users'>
                    <div className='overflow-x-auto'>
                      <table className='w-full'>
                        <thead>
                          <tr className='border-b border-gray-800'>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Name</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Email</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Date</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((user) => (
                            <tr key={user.id} className='border-b border-gray-800'>
                              <td className='py-3 px-4'>{user.name}</td>
                              <td className='py-3 px-4 text-gray-400'>{user.email}</td>
                              <td className='py-3 px-4 text-gray-400'>{user.date}</td>
                              <td className='py-3 px-4'>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    user.status === 'active'
                                      ? 'bg-green-900/30 text-green-500'
                                      : 'bg-red-900/30 text-red-500'
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value='payments'>
                    <div className='overflow-x-auto'>
                      <table className='w-full'>
                        <thead>
                          <tr className='border-b border-gray-800'>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>User</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Course</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Amount</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Date</th>
                            <th className='text-left py-3 px-4 text-gray-400 font-medium'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentPayments.map((payment) => (
                            <tr key={payment.id} className='border-b border-gray-800'>
                              <td className='py-3 px-4'>{payment.user}</td>
                              <td className='py-3 px-4 text-gray-400'>{payment.course}</td>
                              <td className='py-3 px-4'>{payment.amount}</td>
                              <td className='py-3 px-4 text-gray-400'>{payment.date}</td>
                              <td className='py-3 px-4'>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    payment.status === 'completed'
                                      ? 'bg-green-900/30 text-green-500'
                                      : 'bg-yellow-900/30 text-yellow-500'
                                  }`}
                                >
                                  {payment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
