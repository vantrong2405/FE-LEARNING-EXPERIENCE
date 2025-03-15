'use client'

import { useEffect, useState } from 'react'
import { Search, Trash2, CreditCard, Plus, Minus, ShoppingCart, ChevronLeft, Info, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useCartQuery, useDeleteCartItemMutation, useTotalCartMutation } from '@/queries/useCart'
import { pathURL } from '@/constants/path'
import { handleErrorApi } from '@/lib/utils'
import { TotalCartBodyType } from '@/schemaValidator/cart.schema'
import { useCart } from '@/components/ui/cart-context'

export default function CartPage() {
  const { cart, setCart, selectedItems, setSelectedItems } = useCart()
  const deleteCartItemMutation = useDeleteCartItemMutation()
  const totalCartMutation = useTotalCartMutation()

  const deleteCartItem = async (id: string) => {
    try {
      deleteCartItemMutation.mutateAsync(id)
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleTotalCart = (body: TotalCartBodyType) => {
    totalCartMutation.mutate(body, {
      onSuccess: (data) => {},
      onError: (error) => {
        handleErrorApi({ error })
      }
    })
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cart.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const isAllSelected = cart.length > 0 && selectedItems.length === cart.length

  const selectedItemsData = cart.filter((item) => selectedItems.includes(item.id))
  const totalAmount = selectedItemsData.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalOriginalAmount = selectedItemsData.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalDiscount = totalOriginalAmount - totalAmount

  return (
    <div className='container mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-3'>
            <ShoppingCart className='h-8 w-8 text-purple-400' />
            <h1 className='text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
              Giỏ Hàng Của Tôi
            </h1>
          </div>
          <Button
            variant='outline'
            size='lg'
            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white hidden sm:flex'
            asChild
          >
            <Link href={pathURL.dashboard_courses}>
              <ChevronLeft className='h-5 w-5 mr-2' />
              Tiếp tục mua sắm
            </Link>
          </Button>
        </div>

        {cart.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className='mb-8'>
              {/* Cart Header */}
              <div className='bg-gray-900 border border-gray-700 rounded-t-lg p-5 flex items-center text-base'>
                <div className='w-8 mr-6'>
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => {
                      handleSelectAll(checked as boolean)

                      if (checked) {
                        handleTotalCart({ courseIds: cart.map((item) => item.courseId) })
                      } else {
                        handleTotalCart({ courseIds: [] })
                      }
                    }}
                    className='border-gray-600 h-5 w-5'
                  />
                </div>
                <div className='flex-1 font-medium text-lg'>Chọn tất cả ({cart.length} khóa học)</div>
                <div className='hidden md:block w-36 text-center'>Đơn giá</div>
                <div className='hidden md:block w-36 text-center'>Số lượng</div>
                <div className='hidden md:block w-36 text-center'>Thành tiền</div>
                <div className='w-12 text-center'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className='h-5 w-5 text-gray-400' />
                      </TooltipTrigger>
                      <TooltipContent className='bg-gray-800 border-gray-700 text-white'>
                        <p>Chọn khóa học để thanh toán</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Cart Items */}
              <div className='space-y-px'>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className='bg-gray-900 border border-gray-700 p-5 flex flex-col md:flex-row md:items-center hover:border-purple-500 transition-all duration-300'
                  >
                    {/* Checkbox and Thumbnail */}
                    <div className='flex items-center mb-4 md:mb-0'>
                      <div className='w-8 mr-6'>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                          className='border-gray-600 h-5 w-5'
                        />
                      </div>
                      <div className='relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden mr-6'>
                        <Image
                          src={item.course.thumbnailUrl || '/placeholder.svg'}
                          alt={item.course.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>

                    {/* Course Info - Mobile Layout */}
                    <div className='md:hidden flex-1 mb-4'>
                      <h3 className='text-lg font-medium text-white line-clamp-2 mb-2'>{item.course.title}</h3>
                      <p className='text-sm text-gray-400 mb-3'>Giảng viên: {item.course.instructor.name}</p>

                      <div className='flex justify-between items-center mt-3'>
                        <div>
                          <p className='text-sm text-gray-400 line-through'>{item.price.toLocaleString('vi-VN')}đ</p>
                          <p className='text-xl font-bold text-purple-400'>{item.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='w-8 text-center text-lg'>{item.quantity}</span>
                        </div>
                      </div>

                      <div className='flex justify-between items-center mt-4'>
                        <p className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </p>
                        <div className='flex gap-3'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            asChild
                          >
                            <Link href={pathURL.courses_detail(item.course.id)}>
                              <Search className='h-4 w-4 mr-2' />
                              Chi tiết
                            </Link>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            onClick={() => deleteCartItem(item.id)}
                          >
                            <Trash2 className='h-4 w-4 mr-2' />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Course Info - Desktop Layout */}
                    <div className='hidden md:flex flex-1 items-center'>
                      <div className='flex-1'>
                        <h3 className='text-xl font-medium text-white line-clamp-2 mb-2'>{item.course.title}</h3>
                        <p className='text-base text-gray-400 mb-3'>Giảng viên: {item.course.instructor.name}</p>
                        <div className='flex gap-3 mt-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            asChild
                          >
                            <Link href={pathURL.courses_detail(item.course.id)}>
                              <Search className='h-4 w-4 mr-2' />
                              Chi tiết
                            </Link>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            onClick={() => deleteCartItem(item.id)}
                          >
                            <Trash2 className='h-4 w-4 mr-2' />
                            Xóa
                          </Button>
                        </div>
                      </div>

                      <div className='w-36 text-center'>
                        <p className='text-sm text-gray-400 line-through'>{item.price.toLocaleString('vi-VN')}đ</p>
                        <p className='text-xl font-bold text-purple-400'>{item.price.toLocaleString('vi-VN')}đ</p>
                      </div>

                      <div className='w-36 text-center'>
                        <div className='flex items-center justify-center gap-3'>
                          <span className='w-8 text-center text-lg'>{item.quantity}</span>
                        </div>
                      </div>

                      <div className='w-36 text-center'>
                        <p className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </p>
                      </div>

                      <div className='w-12 text-center'>{/* Placeholder for alignment */}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Summary - Bottom Placement */}
            <Card className='bg-gray-900 border-gray-700 shadow-xl mb-8'>
              <CardHeader className='pb-4 border-b border-gray-800'>
                <CardTitle className='text-2xl text-purple-400'>Thông Tin Thanh Toán</CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-semibold mb-2'>Chi tiết đơn hàng</h3>
                    <div className='flex justify-between text-base'>
                      <span className='text-gray-400'>Số khóa học đã chọn:</span>
                      <span className='font-medium'>{selectedItems.length}</span>
                    </div>
                    <div className='flex justify-between text-base'>
                      <span className='text-gray-400'>Tổng số lượng:</span>
                      <span className='font-medium'>
                        {selectedItemsData.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <div className='flex justify-between text-base'>
                      <span className='text-gray-400'>Tạm tính:</span>
                      <span className='font-medium'>{totalOriginalAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className='flex justify-between text-base'>
                      <span className='text-gray-400'>Giảm giá:</span>
                      <span className='font-medium text-green-500'>-{totalDiscount.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className='pt-4 mt-2 border-t border-gray-800 flex justify-between items-center'>
                      <span className='text-xl font-semibold'>Tổng thanh toán:</span>
                      <span className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                        {totalAmount.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-col justify-between'>
                    <div>
                      <h3 className='text-lg font-semibold mb-4'>Thông tin thanh toán</h3>

                      {totalDiscount > 0 && (
                        <div className='bg-purple-900/30 border border-purple-800 rounded-md p-4 mb-6'>
                          <p className='text-sm text-purple-300'>
                            Bạn đã tiết kiệm được{' '}
                            <span className='font-bold'>{totalDiscount.toLocaleString('vi-VN')}đ</span> với các khóa học
                            đã chọn!
                          </p>
                        </div>
                      )}

                      <div className='bg-gray-800/50 rounded-md p-4 mb-6'>
                        <ul className='space-y-3'>
                          <li className='flex items-start gap-3'>
                            <div className='rounded-full bg-purple-900/30 p-1 mt-0.5'>
                              <ArrowRight className='h-3 w-3 text-purple-400' />
                            </div>
                            <span className='text-sm text-gray-300'>
                              Thanh toán an toàn qua các cổng thanh toán uy tín
                            </span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='rounded-full bg-purple-900/30 p-1 mt-0.5'>
                              <ArrowRight className='h-3 w-3 text-purple-400' />
                            </div>
                            <span className='text-sm text-gray-300'>
                              Truy cập khóa học ngay sau khi thanh toán thành công
                            </span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='rounded-full bg-purple-900/30 p-1 mt-0.5'>
                              <ArrowRight className='h-3 w-3 text-purple-400' />
                            </div>
                            <span className='text-sm text-gray-300'>Hỗ trợ kỹ thuật 24/7 khi gặp vấn đề</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <Link href={pathURL.payment}>
                <CardFooter className='p-6 pt-0'>
                  <Button
                    className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-7 text-lg'
                    disabled={selectedItems.length === 0}
                  >
                    <CreditCard className='h-6 w-6 mr-3' />
                    Thanh Toán Ngay
                  </Button>
                </CardFooter>
              </Link>
            </Card>

            {/* Mobile Continue Shopping Button */}
            <div className='flex sm:hidden justify-center mb-8'>
              <Button
                variant='outline'
                className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full'
                asChild
              >
                <Link href={pathURL.dashboard_courses}>
                  <ChevronLeft className='h-4 w-4 mr-2' />
                  Tiếp tục mua sắm
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <Card className='bg-gray-900 border-gray-700 shadow-lg p-10 text-center'>
            <div className='flex flex-col items-center gap-6'>
              <ShoppingCart className='h-20 w-20 text-gray-600' />
              <h2 className='text-2xl font-semibold'>Giỏ hàng của bạn đang trống</h2>
              <p className='text-gray-400 text-lg'>Hãy thêm khóa học vào giỏ hàng để tiến hành thanh toán</p>
              <Button
                className='mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 px-8'
                asChild
              >
                <Link href={pathURL.dashboard_courses}>Khám Phá Khóa Học</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
