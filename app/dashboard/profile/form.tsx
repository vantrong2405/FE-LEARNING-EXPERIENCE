'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Lock, ShoppingCart, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function FormProfile() {
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [name, setName] = useState('Văn Trọng')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='min-h-screen w-full bg-[#0D0A25] text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center mt-2'>Account Management</h1>

        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='w-full bg-white rounded-lg shadow-sm flex justify-around '>
            <TabsTrigger value='account' className='text-lg'>
              <User className='w-5 h-5 mr-2' />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger value='password' className='text-lg'>
              <Lock className='w-5 h-5 mr-2' />
              Đổi mật khẩu
            </TabsTrigger>
            <TabsTrigger value='cart' className='text-lg'>
              <ShoppingCart className='w-5 h-5 mr-2' />
              Giỏ hàng
            </TabsTrigger>
          </TabsList>

          <TabsContent value='account'>
            <Card className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Thông tin tài khoản</CardTitle>
                <CardDescription>Chỉnh sửa thông tin cá nhân của bạn tại đây.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='bg-[#7f76e0] border-purple-400'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <div className='flex items-center gap-2'>
                    <Input
                      id='email'
                      value='trongdn2405@gmail.com'
                      disabled
                      className='bg-[#7f76e0] border-purple-400'
                    />
                    <Button variant='outline' size='icon' className='bg-[#7f76e0] border-purple-400'>
                      <AlertCircle className='h-4 w-4 ' />
                    </Button>
                  </div>
                  <p className='text-sm text-gray-400'>Liên hệ quản trị viên để thay đổi email.</p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Number Phone</Label>
                  <Input
                    id='phone'
                    type='tel'
                    value='0357407264'
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Số điện thoại'
                    className='bg-[#7f76e0] border-purple-400'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Đăng ký nhận email marketing</Label>
                    <p className='text-sm text-gray-400'>Nhận thông tin về khuyến mãi và sản phẩm mới</p>
                  </div>
                  <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                </div>

                <Button className='w-full bg-purple-400 hover:bg-purple-700'>Lưu thay đổi</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='password'>
            <Card className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Đổi mật khẩu</CardTitle>
                <CardDescription>Cập nhật mật khẩu của bạn để bảo mật tài khoản.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password'>Mật khẩu hiện tại</Label>
                  <div className='relative'>
                    <Input
                      id='current-password'
                      type={showPassword ? 'text' : 'password'}
                      className='bg-[#7f76e0] border-purple-400 pr-10'
                    />
                    <Button
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4 text-gray-400' />
                      ) : (
                        <Eye className='h-4 w-4 text-gray-400' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='new-password'>Mật khẩu mới</Label>
                  <Input id='new-password' type='password' className='bg-[#7f76e0] border-purple-400' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Xác nhận mật khẩu mới</Label>
                  <Input id='confirm-password' type='password' className='bg-[#7f76e0] border-purple-400' />
                </div>

                <Button className='w-full bg-purple-400 hover:bg-purple-700'>Cập nhật mật khẩu</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='cart'>
            <Card className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Giỏ hàng của bạn</CardTitle>
                <CardDescription>Xem và quản lý các sản phẩm trong giỏ hàng.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-center py-8'>
                  <ShoppingCart className='w-16 h-16 mx-auto text-gray-400 mb-4' />
                  <p className='text-xl font-semibold mb-2'>Giỏ hàng trống</p>
                  <p className='text-gray-400 mb-4'>Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                  <Button className='bg-purple-400 hover:bg-purple-700'>Tiếp tục mua sắm</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
