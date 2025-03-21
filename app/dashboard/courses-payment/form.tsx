'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import qr from '@/public/assets/images/qr.png'
import { useCart } from '@/components/ui/cart-context'
import { Icons } from '@/components/ui/icons'
import { CartItem } from '@/models/cart.type'

const QRPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('qr')
  const [paymentStatus, setPaymentStatus] = useState('pending')
  const [voucher, setVoucher] = useState('')
  const [price, setPrice] = useState(129.99)
  const [discount, setDiscount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(900)
  const [paymentCode, setPaymentCode] = useState('')
  const [copiedField, setCopiedField] = useState('')

  const { cart, selectedItems, setSelectedItems } = useCart() as {
    cart: CartItem[]
    selectedItems: string[]
    setSelectedItems: (items: string[]) => void
  }

  useEffect(() => {
    if (selectedItems.length > 0) {
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
    }
  }, [selectedItems])

  useEffect(() => {
    const savedItems = localStorage.getItem('selectedItems')
    if (savedItems && selectedItems.length === 0) {
      setSelectedItems(JSON.parse(savedItems))
    }
  }, [])

  const selectedItemsData = useMemo(() => {
    return cart.filter((item) => selectedItems.includes(item.id))
  }, [cart, selectedItems])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setPaymentCode(generatePaymentCode())
  }, [])

  const generatePaymentCode = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase()
  }

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const checkPaymentStatus = () => {
    setPaymentStatus('checking')
    setTimeout(() => {
      setPaymentStatus(Math.random() > 0.5 ? 'completed' : 'pending')
    }, 2000)
  }

  const applyVoucher = () => {
    if (voucher.toLowerCase() === 'extra10') {
      const newDiscount = discount + 13.0
      setDiscount(newDiscount)
      setPrice(199.99 - newDiscount)
      setVoucher('')
    }
  }

  const copyToClipboard = (text: any, field: any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(''), 2000)
    })
  }

  return (
    <div className='min-h-screen dark:bg-[#0D0A25] px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-8xl mx-auto'>
        <Card className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-900 dark:text-white flex items-center justify-between'>
              <span>{paymentMethod === 'qr' ? 'Scan QR Code to Pay' : 'Payment Method'}</span>
              <div className='flex items-center text-red-500'>
                <Icons.Clock className='w-5 h-5 mr-2' />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue='qr'
              className='flex space-x-4 mb-6'
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='qr' id='qr' />
                <Label htmlFor='qr' className='flex items-center space-x-2 cursor-pointer'>
                  <Icons.QrCode className='w-6 h-6 text-purple-600' />
                  <span>QR Code</span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='card' id='card' />
                <Label htmlFor='card' className='flex items-center space-x-2 cursor-pointer'>
                  <Icons.CreditCard className='w-6 h-6 text-purple-600' />
                  <span>Credit Card</span>
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'qr' ? (
              <div className='text-center'>
                <Image
                  src={qr || '/placeholder.svg'}
                  alt='Payment QR Code'
                  width={220}
                  height={220}
                  className='mx-auto mb-6 rounded-lg shadow-md'
                />
                <div className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg mb-6 shadow-md'>
                  <h3 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>Payment Information</h3>
                  <div className='space-y-4 text-sm text-gray-700 dark:text-gray-300'>
                    <div className='flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow'>
                      <div className='flex items-center font-semibold'>
                        <Icons.User className='w-5 h-5 mr-3 text-purple-600' />
                        <span>Doan Vo Van Trong</span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard('Doan Vo Van Trong', 'name')}
                        className='text-purple-600 hover:text-purple-700'
                      >
                        <Icons.CopyIcon className='w-4 h-4' />
                        <span className='sr-only'>Copy name</span>
                      </Button>
                    </div>
                    <div className='flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow'>
                      <div className='flex items-center font-semibold'>
                        <Icons.BanknoteIcon className='w-5 h-5 mr-3 text-purple-600' />
                        <span>MB-BANK</span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard('MB-BANK', 'bank')}
                        className='text-purple-600 hover:text-purple-700'
                      >
                        <Icons.CopyIcon className='w-4 h-4' />
                        <span className='sr-only'>Copy bank name</span>
                      </Button>
                    </div>
                    <div className='flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow'>
                      <div className='flex items-center font-semibold'>
                        <Icons.CreditCard className='w-5 h-5 mr-3 text-purple-600' />
                        <span>Number Account: 0357407264</span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard('0357407264', 'account')}
                        className='text-purple-600 hover:text-purple-700'
                      >
                        <Icons.CopyIcon className='w-4 h-4' />
                        <span className='sr-only'>Copy account number</span>
                      </Button>
                    </div>
                    <div className='flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow'>
                      <div className='flex items-center font-semibold'>
                        <Icons.Tag className='w-5 h-5 mr-3 text-purple-600' />
                        <span>Payment Code: {paymentCode}</span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard(paymentCode, 'code')}
                        className='text-purple-600 hover:text-purple-700'
                      >
                        <Icons.CopyIcon className='w-4 h-4' />
                        <span className='sr-only'>Copy payment code</span>
                      </Button>
                    </div>
                  </div>
                  {copiedField && (
                    <p className='text-green-500 mt-2 text-sm'>
                      {copiedField.charAt(0).toUpperCase() + copiedField.slice(1)} copied to clipboard!
                    </p>
                  )}
                </div>
                <p className='text-gray-700 dark:text-gray-300 mb-6'>
                  Scan this QR code with your mobile payment app to complete the purchase.
                </p>
                <Button
                  onClick={checkPaymentStatus}
                  disabled={paymentStatus === 'checking'}
                  className='bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105'
                >
                  {paymentStatus === 'checking' ? (
                    <Icons.RefreshCw className='mr-2 h-4 w-4' />
                  ) : (
                    <Icons.RefreshCw className='mr-2 h-4 w-4' />
                  )}
                  Check Payment Status
                </Button>
                {paymentStatus === 'completed' && (
                  <p className='text-green-500 mt-4 font-semibold'>Payment completed successfully!</p>
                )}
              </div>
            ) : (
              <p className='text-gray-700 dark:text-gray-300 text-center'>
                Please switch back to QR Code payment or proceed to the card payment page.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-900 dark:text-white'>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <>
              {selectedItemsData.map((cartItem) => (
                <div key={cartItem.id}>
                  {/* Thông tin khóa học */}
                  <div className='flex items-center space-x-4 mb-6'>
                    <Image
                      src={cartItem.course.thumbnailUrl}
                      alt='Course Thumbnail'
                      width={80}
                      height={80}
                      className='rounded-lg shadow-md'
                    />
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{cartItem.course.title}</h3>
                      <p className='text-sm text-gray-700 dark:text-gray-300'>{cartItem.course.description}</p>
                    </div>
                  </div>

                  {/* Thông tin giá cả */}
                  <div className='space-y-2 mb-6'>
                    <div className='flex justify-between'>
                      <span className='text-gray-700 dark:text-gray-300'>Original Price:</span>
                      <span className='text-gray-900 dark:text-white'>{cartItem.price.toFixed(2)}đ</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-700 dark:text-gray-300'>Discount:</span>
                      {discount > 0 ? <span className='text-green-600'>{discount.toFixed(2)}</span> : 0}đ
                    </div>
                  </div>
                </div>
              ))}

              {/* Hiển thị tổng giá */}
              <div className='border-t pt-4 mt-4'>
                <div className='flex justify-between text-lg font-semibold'>
                  <span className='text-gray-900 dark:text-white'>Total:</span>
                  <span className='text-gray-900 dark:text-white'>
                    {selectedItemsData.reduce((total, item) => total + item.price, 0).toFixed(2)}đ
                  </span>
                </div>
              </div>
            </>

            <div className='mb-6'>
              <Label htmlFor='voucher' className='text-gray-700 dark:text-gray-300 mb-2 block'>
                Have a voucher?
              </Label>

              <div className='flex w-full items-center space-x-2'>
                <Input
                  id='voucher'
                  placeholder='Enter code'
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  className='  rounded-r-none focus:ring-purple-500 focus:border-purple-500'
                />
                <div className='flex justify-center '>
                  <Button
                    onClick={applyVoucher}
                    className='  rounded-l-none bg-purple-600 hover:bg-purple-700 text-white'
                  >
                    <Icons.Tag className='mr-2 h-3 w-3' />
                    Apply
                  </Button>
                </div>
              </div>
            </div>
            <div className='mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <Icons.AlertCircle className='h-5 w-5 text-yellow-400' aria-hidden='true' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-yellow-800 dark:text-yellow-100'>
                    Important Payment Information
                  </h3>
                  <div className='mt-2 text-sm text-yellow-700 dark:text-yellow-200'>
                    <p className='mb-2'>Please read the following instructions carefully:</p>
                    <ul className='list-disc pl-5 space-y-1'>
                      <li>Bank transfers may take up to 30 minutes to be reflected in our system.</li>
                      <li>Ensure you use the provided payment code as the transfer reference.</li>
                      <li>After making the payment, click the "Check Payment Status" button.</li>
                      <li>
                        If your payment is not updated after 30 minutes, please follow these steps:
                        <ol className='list-decimal pl-5 mt-1'>
                          <li>Double-check that you've entered the correct amount and reference code.</li>
                          <li>Verify that the transfer has been completed from your bank's end.</li>
                          <li>
                            If everything is correct, please contact our support team via our Facebook page for
                            immediate assistance.
                          </li>
                        </ol>
                      </li>
                    </ul>
                    <p className='mt-2'>
                      For any questions or concerns, don't hesitate to reach out to our customer support team. We're
                      here to help ensure a smooth payment process for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 transition duration-300 ease-in-out transform hover:scale-105'
              disabled={paymentStatus !== 'completed'}
            >
              {paymentStatus === 'completed' ? 'Proceed to Course' : 'Awaiting Payment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default QRPayment
