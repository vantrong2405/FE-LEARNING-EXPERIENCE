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
  Menu
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

// Sample user data
const users = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-07-15 14:30',
    courses: 5,
    joined: '2023-01-10'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'Instructor',
    status: 'active',
    lastLogin: '2023-07-14 09:15',
    courses: 3,
    joined: '2023-02-15'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2023-06-30 16:45',
    courses: 0,
    joined: '2023-03-20'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2023-07-12 11:20',
    courses: 2,
    joined: '2023-04-05'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    role: 'Instructor',
    status: 'active',
    lastLogin: '2023-07-13 13:10',
    courses: 4,
    joined: '2023-02-28'
  },
  {
    id: 6,
    name: 'Vũ Thị F',
    email: 'vuthif@example.com',
    role: 'User',
    status: 'pending',
    lastLogin: 'Never',
    courses: 0,
    joined: '2023-07-10'
  },
  {
    id: 7,
    name: 'Đặng Văn G',
    email: 'dangvang@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2023-07-11 10:05',
    courses: 1,
    joined: '2023-05-15'
  },
  {
    id: 8,
    name: 'Ngô Thị H',
    email: 'ngothih@example.com',
    role: 'Instructor',
    status: 'inactive',
    lastLogin: '2023-06-25 08:30',
    courses: 2,
    joined: '2023-03-10'
  }
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<EditUser | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase()
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  // Handle edit user
  interface EditUser {
    id: number
    name: string
    email: string
    role: string
    status: string
    lastLogin: string
    courses: number
    joined: string
  }

  const handleEditUser = (user: EditUser) => {
    setCurrentUser(user)
    setIsEditUserOpen(true)
  }

  // Handle checkbox selection
  interface User {
    id: number
    name: string
    email: string
    role: string
    status: string
    lastLogin: string
    courses: number
    joined: string
  }

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(currentUsers.map((user) => user.id))
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0D0A25] to-[#1A1744] text-white p-3 sm:p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section - Responsive */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          {/* Desktop Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto sm:ml-auto'>
            <Button
              variant='outline'
              className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto text-xs sm:text-sm'
            >
              <Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
            <Button
              variant='outline'
              className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto text-xs sm:text-sm'
            >
              <RefreshCw className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Làm mới</span>
            </Button>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Plus className='h-3 sm:h-4 sm:w-4 mr-1 ' />
                  <span>Thêm Người Dùng</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Thêm Người Dùng Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>
                    Điền thông tin để tạo tài khoản người dùng mới
                  </DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName' className='text-white'>
                      Họ
                    </Label>
                    <Input id='firstName' placeholder='Nguyễn' className='bg-gray-800 border-gray-700 text-white' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName' className='text-white'>
                      Tên
                    </Label>
                    <Input id='lastName' placeholder='Văn A' className='bg-gray-800 border-gray-700 text-white' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email' className='text-white'>
                      Email
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='example@domain.com'
                      className='bg-gray-800 border-gray-700 text-white'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone' className='text-white'>
                      Số điện thoại
                    </Label>
                    <Input id='phone' placeholder='0912345678' className='bg-gray-800 border-gray-700 text-white' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='password' className='text-white'>
                      Mật khẩu
                    </Label>
                    <Input id='password' type='password' className='bg-gray-800 border-gray-700 text-white' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='confirmPassword' className='text-white'>
                      Xác nhận mật khẩu
                    </Label>
                    <Input id='confirmPassword' type='password' className='bg-gray-800 border-gray-700 text-white' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='role' className='text-white'>
                      Vai trò
                    </Label>
                    <Select>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn vai trò' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='user'>User</SelectItem>
                        <SelectItem value='instructor'>Instructor</SelectItem>
                        <SelectItem value='admin'>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='status' className='text-white'>
                      Trạng thái
                    </Label>
                    <Select>
                      <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                      <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                        <SelectItem value='active'>Kích hoạt</SelectItem>
                        <SelectItem value='inactive'>Tạm khóa</SelectItem>
                        <SelectItem value='pending'>Chờ xác nhận</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='col-span-1 md:col-span-2 space-y-2'>
                    <Label htmlFor='bio' className='text-white'>
                      Thông tin thêm
                    </Label>
                    <textarea
                      id='bio'
                      rows={3}
                      placeholder='Thông tin thêm về người dùng...'
                      className='w-full rounded-md bg-gray-800 border-gray-700 text-white p-2'
                    />
                  </div>
                </div>
                <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddUserOpen(false)}
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto'
                  >
                    Hủy
                  </Button>
                  <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto'>Tạo người dùng</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filter Card - Responsive */}
        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader className='p-4 sm:p-6'>
            <CardTitle className='text-lg sm:text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400 text-xs sm:text-sm'>
              Lọc danh sách người dùng theo các tiêu chí
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
                    placeholder='Tìm theo tên, email...'
                    className='pl-8 bg-gray-800 border-gray-700 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='role' className='text-white mb-2 block text-sm'>
                  Vai trò
                </Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn vai trò' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả vai trò</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='instructor'>Instructor</SelectItem>
                    <SelectItem value='user'>User</SelectItem>
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
                    <SelectItem value='active'>Kích hoạt</SelectItem>
                    <SelectItem value='inactive'>Tạm khóa</SelectItem>
                    <SelectItem value='pending'>Chờ xác nhận</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List Card - Responsive */}
        <Card className='bg-gray-900 border-gray-700 shadow-xl'>
          <CardHeader className='p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
              <div>
                <CardTitle className='text-lg sm:text-xl text-purple-400'>Danh sách người dùng</CardTitle>
                <CardDescription className='text-gray-400 text-xs sm:text-sm'>
                  {filteredUsers.length} người dùng được tìm thấy
                </CardDescription>
              </div>
              {selectedUsers.length > 0 && (
                <div className='flex flex-wrap items-center gap-2 w-full sm:w-auto'>
                  <span className='text-xs sm:text-sm text-gray-400'>Đã chọn {selectedUsers.length} người dùng</span>
                  <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-xs'
                    >
                      <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Kích hoạt
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-xs'
                    >
                      <XCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1' /> Tạm khóa
                    </Button>
                    <Button variant='destructive' size='sm' className='text-xs'>
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
                        checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Tên
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Email
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Vai trò
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Trạng thái
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Đăng nhập cuối
                    </th>
                    <th className='text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm'>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                      <td className='py-2 sm:py-3 px-2 sm:px-4'>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                          className='border-gray-600'
                        />
                      </td>
                      <td className='py-2 sm:py-3 px-2 sm:px-4'>
                        <div className='flex items-center'>
                          <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 sm:mr-3'>
                            <span className='font-semibold text-xs sm:text-sm'>{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className='font-medium text-xs sm:text-sm'>{user.name}</div>
                            <div className='text-xs text-gray-400'>Tham gia: {user.joined}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>{user.email}</td>
                      <td className='py-2 sm:py-3 px-2 sm:px-4'>
                        <Badge
                          className={`text-xs ${
                            user.role === 'Admin'
                              ? 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                              : user.role === 'Instructor'
                                ? 'bg-blue-900/30 text-blue-500 hover:bg-blue-900/40'
                                : 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                          }`}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className='py-2 sm:py-3 px-2 sm:px-4'>
                        <Badge
                          className={`text-xs ${
                            user.status === 'active'
                              ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                              : user.status === 'inactive'
                                ? 'bg-red-900/30 text-red-500 hover:bg-red-900/40'
                                : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                          }`}
                        >
                          {user.status === 'active'
                            ? 'Kích hoạt'
                            : user.status === 'inactive'
                              ? 'Tạm khóa'
                              : 'Chờ xác nhận'}
                        </Badge>
                      </td>
                      <td className='py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm'>{user.lastLogin}</td>
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
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer text-xs sm:text-sm'>
                              {user.status === 'active' ? (
                                <>
                                  <XCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Tạm khóa
                                </>
                              ) : (
                                <>
                                  <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Kích hoạt
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-gray-700' />
                            <DropdownMenuItem className='text-red-500 hover:bg-gray-700 cursor-pointer text-xs sm:text-sm'>
                              <Trash2 className='h-3 w-3 sm:h-4 sm:w-4 mr-2' /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive Pagination */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
              <div className='text-xs sm:text-sm text-gray-400 order-2 sm:order-1'>
                Hiển thị {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} trong số{' '}
                {filteredUsers.length} người dùng
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

        {/* Edit User Dialog - Responsive */}
        {currentUser && (
          <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Người Dùng</DialogTitle>
                <DialogDescription className='text-gray-400 text-sm'>Cập nhật thông tin người dùng</DialogDescription>
              </DialogHeader>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-firstName' className='text-white text-sm'>
                    Họ
                  </Label>
                  <Input
                    id='edit-firstName'
                    defaultValue={currentUser.name.split(' ').slice(0, -1).join(' ')}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-lastName' className='text-white text-sm'>
                    Tên
                  </Label>
                  <Input
                    id='edit-lastName'
                    defaultValue={currentUser.name.split(' ').slice(-1).join(' ')}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-email' className='text-white text-sm'>
                    Email
                  </Label>
                  <Input
                    id='edit-email'
                    type='email'
                    defaultValue={currentUser.email}
                    className='bg-gray-800 border-gray-700 text-white'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-phone' className='text-white text-sm'>
                    Số điện thoại
                  </Label>
                  <Input id='edit-phone' placeholder='0912345678' className='bg-gray-800 border-gray-700 text-white' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-role' className='text-white text-sm'>
                    Vai trò
                  </Label>
                  <Select defaultValue={currentUser.role.toLowerCase()}>
                    <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                      <SelectValue placeholder='Chọn vai trò' />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                      <SelectItem value='user'>User</SelectItem>
                      <SelectItem value='instructor'>Instructor</SelectItem>
                      <SelectItem value='admin'>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-status' className='text-white text-sm'>
                    Trạng thái
                  </Label>
                  <Select defaultValue={currentUser.status}>
                    <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                      <SelectValue placeholder='Chọn trạng thái' />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                      <SelectItem value='active'>Kích hoạt</SelectItem>
                      <SelectItem value='inactive'>Tạm khóa</SelectItem>
                      <SelectItem value='pending'>Chờ xác nhận</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='col-span-1 md:col-span-2 space-y-2'>
                  <Label htmlFor='edit-bio' className='text-white text-sm'>
                    Thông tin thêm
                  </Label>
                  <textarea
                    id='edit-bio'
                    rows={3}
                    placeholder='Thông tin thêm về người dùng...'
                    className='w-full rounded-md bg-gray-800 border-gray-700 text-white p-2'
                  />
                </div>
              </div>
              <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                <Button
                  variant='outline'
                  onClick={() => setIsEditUserOpen(false)}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto'
                >
                  Hủy
                </Button>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto'>Lưu thay đổi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
