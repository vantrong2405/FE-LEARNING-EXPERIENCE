'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Bell, ChevronDown, Globe, Search } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0D0A25] px-4'>
      <div className='flex h-16 items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard' className='flex items-center gap-2'>
            <div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-1.5'>
              <div className='text-white font-bold text-xl'>E</div>
            </div>
            <span className='text-xl font-bold text-white'>ELearn</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='text-gray-400 hover:text-white'>
                Khóa học <ChevronDown className='ml-1 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 bg-gray-900 border-gray-800'>
              <DropdownMenuItem className='text-gray-400 hover:text-white focus:text-white'>
                Tất cả khóa học
              </DropdownMenuItem>
              <DropdownMenuItem className='text-gray-400 hover:text-white focus:text-white'>
                Khóa học của tôi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant='ghost' className='text-gray-400 hover:text-white'>
            Bài viết
          </Button>
          <Button variant='ghost' className='text-gray-400 hover:text-white'>
            Liên hệ
          </Button>
        </div>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              type='search'
              placeholder='Tìm kiếm...'
              className='w-64 pl-9 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
            />
          </div>
          <Button variant='ghost' size='icon' className='text-gray-400 hover:text-white'>
            <Bell className='h-5 w-5' />
          </Button>
          <Button variant='ghost' size='icon' className='text-gray-400 hover:text-white'>
            <Globe className='h-5 w-5' />
          </Button>
          <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Kết nối</Button>
        </div>
      </div>
    </header>
  )
}
