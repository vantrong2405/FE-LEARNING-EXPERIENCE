'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Home,
  Users,
  BookOpen,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  HelpCircle,
  Receipt
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Define navigation items
  const navItems = [
    { href: '/manage', label: 'Dashboard', icon: Home },
    { href: '/manage/users', label: 'Người dùng', icon: Users },
    { href: '/manage/courses', label: 'Khóa học', icon: BookOpen },
    { href: '/manage/enrollments', label: 'Đăng ký', icon: BookOpen },
    { href: '/manage/reviews', label: 'Đánh giá', icon: Star },
    { href: '/manage/payments', label: 'Thanh toán', icon: Receipt },
    { href: '/manage/faqs', label: 'FAQs', icon: HelpCircle }
  ]

  // Check if current path is active
  const isActive = (path: string) => {
    return pathname === path
  }

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='flex h-screen bg-gradient-to-br from-[#0D0A25] to-[#1A1744] text-white'>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 transition-all duration-300 ease-in-out fixed h-full z-10`}
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
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <Button
                  variant='ghost'
                  className={`w-full justify-start ${
                    isActive(item.href)
                      ? 'text-purple-400 bg-gray-800'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className='mr-2 h-5 w-5' />
                  {sidebarOpen && item.label}
                </Button>
              </Link>
            ))}
          </div>
          <div className='absolute bottom-4 w-full left-0 px-4'>
            <Button variant='ghost' className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'>
              <LogOut className='mr-2 h-5 w-5' />
              {sidebarOpen && 'Đăng xuất'}
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
            <h1 className='text-xl font-bold text-purple-400'>
              {navItems.find((item) => isActive(item.href))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
              <Input
                type='search'
                placeholder='Tìm kiếm...'
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

        {/* Page Content */}
        <main className='p-6'>{children}</main>
      </div>
    </div>
  )
}
