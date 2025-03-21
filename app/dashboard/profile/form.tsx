'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useChangePasswordMutation, useGetMeQuery, useUpdateMeMutation } from '@/queries/useAuth'
import { toast } from 'sonner'
import { ChangePasswordBody, ChangePasswordBodyType, MeBody, MeBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { handleErrorApi } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Icons } from '@/components/ui/icons'

export default function FormProfile() {
  const [email, setEmail] = useState('')
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const getMeQuery = useGetMeQuery()
  const updateMeMutation = useUpdateMeMutation()
  const changePasswordMutation = useChangePasswordMutation()

  const formU = useForm<MeBodyType>({
    resolver: zodResolver(MeBody),
    defaultValues: {
      name: '',
      gender: ''
    }
  })

  useEffect(() => {
    if (getMeQuery.data?.payload?.data) {
      const { name, email, gender } = getMeQuery.data.payload.data
      formU.setValue('name', name || '')
      formU.setValue('gender', gender || '')
      setEmail(email || '')
    }
  }, [getMeQuery.data])

  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: ''
    }
  })

  const handleUpdate = (body: MeBodyType) => {
    updateMeMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Update Account Success!')
      },
      onError: (error) => {
        handleErrorApi({
          error,
          setError: formU.setError
        })
      }
    })
  }

  const handleChangePassword = (body: ChangePasswordBodyType) => {
    if (body.new_password !== body.confirm_password) {
      form.setError('confirm_password', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }
    changePasswordMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Change Password Success!')
        form.reset()
      },
      onError: (error) => {
        handleErrorApi({
          error,
          setError: form.setError
        })
      }
    })
  }

  return (
    <div className='min-h-screen w-full dark:bg-gray-900 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          Account Management
        </h1>

        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 dark:bg-gray-800 rounded-lg mb-6'>
            <TabsTrigger
              value='account'
              className='dark:text-white data-[state=active]:dark:bg-purple-600 transition-all duration-200'
            >
              <Icons.User className='w-5 h-5 mr-2' />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger
              value='password'
              className='dark:text-white data-[state=active]:dark:bg-purple-600 transition-all duration-200'
            >
              <Icons.Lock className='w-5 h-5 mr-2' />
              Đổi mật khẩu
            </TabsTrigger>
            <TabsTrigger
              value='cart'
              className='dark:text-white data-[state=active]:dark:bg-purple-600 transition-all duration-200'
            >
              <Icons.ShoppingCart className='w-5 h-5 mr-2' />
              Giỏ hàng
            </TabsTrigger>
          </TabsList>

          <TabsContent value='account'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-purple-400'>Thông tin tài khoản</CardTitle>
                <CardDescription className='text-gray-400'>
                  Chỉnh sửa thông tin cá nhân của bạn tại đây.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='name' className='dark:text-purple-300'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    {...formU.register('name')}
                    className={` dark:bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 ${formU.formState.errors.name ? 'border-red-500' : ''}`}
                  />
                  {formU.formState.errors.name && (
                    <p className='text-red-500 text-sm'>{formU.formState.errors.name.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email' className='dark:text-purple-300'>
                    Email
                  </Label>
                  <div className='flex items-center gap-2'>
                    <Input
                      id='email'
                      value={email}
                      disabled
                      className='dark:bg-gray-800 border-purple-500 text-gray-400'
                    />
                    <Button
                      variant='outline'
                      size='icon'
                      className='dark:bg-gray-800 border-purple-500 hover:dark:bg-purple-700'
                    >
                      <Icons.AlertCircle className='h-4 w-4 dark:text-purple-400' />
                    </Button>
                  </div>
                  <p className='text-sm text-gray-400'>Liên hệ quản trị viên để thay đổi email.</p>
                </div>

                <div className='space-y-2'>
                  <Label className='dark:text-purple-300' htmlFor='gender'>
                    Select Gender
                  </Label>
                  <Select
                    onValueChange={(value) => formU.setValue('gender', value)}
                    value={formU.watch('gender') || ''}
                  >
                    <SelectTrigger
                      className={`w-full dark:bg-gray-800 border-purple-500 text-gray-400 ${formU.formState.errors.gender ? 'border-red-500' : ''}`}
                    >
                      <SelectValue placeholder='Select Gender ' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formU.formState.errors.gender && (
                    <p className='text-red-500 text-sm'>{formU.formState.errors.gender.message}</p>
                  )}
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='dark:text-purple-300'>Đăng ký nhận email marketing</Label>
                    <p className='text-sm text-gray-400'>Nhận thông tin về khuyến mãi và sản phẩm mới</p>
                  </div>
                  <Switch
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                    className='dark:bg-gray-600 data-[state=checked]:dark:bg-purple-500'
                  />
                </div>

                <Button
                  variant={'secondary'}
                  type='submit'
                  className='w-full dark:bg-purple-600 hover:dark:bg-purple-700 transition-colors duration-200'
                  onClick={formU.handleSubmit(handleUpdate)}
                >
                  Lưu thay đổi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='password'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-purple-400'>Đổi mật khẩu</CardTitle>
                <CardDescription className='text-gray-400'>
                  Cập nhật mật khẩu của bạn để bảo mật tài khoản.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password' className='dark:text-purple-300'>
                    Mật khẩu hiện tại
                  </Label>
                  <div className='relative'>
                    <Input
                      id='current-password'
                      type={showPassword ? 'text' : 'password'}
                      {...form.register('current_password')}
                      className={` dark:bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 pr-10 ${form.formState.errors.current_password ? 'border-red-500' : ''}`}
                    />
                    <Button
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:dark:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icons.EyeOff className='h-4 w-4 dark:text-purple-400' />
                      ) : (
                        <Icons.Eye className='h-4 w-4 dark:text-purple-400' />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.current_password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.current_password.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='new-password' className='dark:text-purple-300'>
                    Mật khẩu mới
                  </Label>
                  <Input
                    id='new-password'
                    type='password'
                    {...form.register('new_password')}
                    className={` dark:bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 pr-10 ${form.formState.errors.new_password ? 'border-red-500' : ''}`}
                  />
                  {form.formState.errors.new_password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.new_password.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirm-password' className='dark:text-purple-300'>
                    Xác nhận mật khẩu mới
                  </Label>
                  <Input
                    id='confirm-password'
                    type='password'
                    {...form.register('confirm_password')}
                    className={` dark:bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 pr-10 ${form.formState.errors.confirm_password ? 'border-red-500' : ''}`}
                  />
                  {form.formState.errors.confirm_password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.confirm_password.message}</p>
                  )}
                </div>

                <Button
                  onClick={form.handleSubmit(handleChangePassword)}
                  type='submit'
                  variant={'secondary'}
                  className='w-full dark:bg-purple-600 hover:dark:bg-purple-700 transition-colors duration-200'
                >
                  Cập nhật mật khẩu
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='cart'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-purple-400'>Giỏ hàng của bạn</CardTitle>
                <CardDescription className='text-gray-400'>Xem và quản lý các sản phẩm trong giỏ hàng.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-center py-8'>
                  <Icons.ShoppingCart className='w-16 h-16 mx-auto dark:text-purple-400 mb-4' />
                  <p className='text-xl font-semibold mb-2 dark:text-purple-300'>Giỏ hàng trống</p>
                  <p className='text-gray-400 mb-4'>Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                  <Button
                    variant={'outline'}
                    className='dark:bg-purple-600 hover:dark:bg-purple-700 transition-colors duration-200'
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
