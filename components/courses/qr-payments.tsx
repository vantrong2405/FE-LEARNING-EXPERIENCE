'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QrCode, CreditCard, RefreshCw } from 'lucide-react'

const QRPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('qr')
  const [paymentStatus, setPaymentStatus] = useState('pending')

  const checkPaymentStatus = () => {
    // Simulate checking payment status
    setPaymentStatus('checking')
    setTimeout(() => {
      setPaymentStatus(Math.random() > 0.5 ? 'completed' : 'pending')
    }, 2000)
  }

  return (
    <div className='container mx-auto px-4 py-8 dark:bg-[#0D0A25]'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>Complete Your Purchase</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-900 dark:text-white'>
              {paymentMethod === 'qr' ? 'Scan QR Code to Pay' : 'Payment Method'}
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
                  <QrCode className='w-6 h-6' />
                  <span>QR Code</span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='card' id='card' />
                <Label htmlFor='card' className='flex items-center space-x-2 cursor-pointer'>
                  <CreditCard className='w-6 h-6' />
                  <span>Credit Card</span>
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'qr' ? (
              <div className='text-center'>
                <Image
                  src='/placeholder.svg?height=250&width=250'
                  alt='Payment QR Code'
                  width={250}
                  height={250}
                  className='mx-auto mb-4'
                />
                <p className='text-gray-700 dark:text-gray-300 mb-4'>
                  Scan this QR code with your mobile payment app to complete the purchase.
                </p>
                <Button
                  onClick={checkPaymentStatus}
                  disabled={paymentStatus === 'checking'}
                  className='bg-purple-600 hover:bg-purple-700 text-white'
                >
                  {paymentStatus === 'checking' ? (
                    <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <RefreshCw className='mr-2 h-4 w-4' />
                  )}
                  Check Payment Status
                </Button>
                {paymentStatus === 'completed' && (
                  <p className='text-green-500 mt-4'>Payment completed successfully!</p>
                )}
              </div>
            ) : (
              <p className='text-gray-700 dark:text-gray-300'>
                Please switch back to QR Code payment or proceed to the card payment page.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className='dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-900 dark:text-white'>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4 mb-4'>
              <Image
                src='/placeholder.svg?height=80&width=80'
                alt='Course Thumbnail'
                width={80}
                height={80}
                className='rounded-lg'
              />
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Mastering Full-Stack Web Development
                </h3>
                <p className='text-sm text-gray-700 dark:text-gray-300'>React, Node.js, and Beyond</p>
              </div>
            </div>
            <div className='space-y-2 mb-4'>
              <div className='flex justify-between'>
                <span className='text-gray-700 dark:text-gray-300'>Original Price:</span>
                <span className='text-gray-900 dark:text-white'>$199.99</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-700 dark:text-gray-300'>Discount:</span>
                <span className='text-green-600'>-$70.00</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <span className='text-gray-900 dark:text-white'>Total:</span>
                <span className='text-purple-600'>$129.99</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full bg-purple-600 hover:bg-purple-700 text-white'
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
