'use client'

import type React from 'react'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useGetMeQuery, useLogoutMutation } from '@/queries/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { decodeToken, getRefreshTokenFromLocalStorage } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const decode = decodeToken(token as string)
    const role = decode.role === 'User'

    if (token && role && pathname.startsWith('/manage')) {
      router.replace('/')
    }
  }, [pathname, router])

  const getMeQuery = useGetMeQuery()
  const logoutMutation = useLogoutMutation()
  const { name, avatarUrl } = getMeQuery.data?.payload.data ?? {}

  // Define navigation items
  const navItems = [
    { href: '/manage', label: 'Dashboard', icon: Icons.Home },
    { href: '/manage/users', label: 'Người dùng', icon: Icons.Users },
    { href: '/manage/courses', label: 'Khóa học', icon: Icons.BookOpen },
    { href: '/manage/enrollments', label: 'Đăng ký', icon: Icons.BookOpen },
    { href: '/manage/lessons', label: 'Lesson', icon: Icons.BookOpen },
    { href: '/manage/videos', label: 'Videos', icon: Icons.BookOpen },
    { href: '/manage/reviews', label: 'Đánh giá', icon: Icons.Star },
    { href: '/manage/payments', label: 'Thanh toán', icon: Icons.Receipt },
    { href: '/manage/faqs', label: 'FAQs', icon: Icons.HelpCircle }
  ]

  // Check if current path is active
  const isActive = (path: string) => {
    return pathname === path
  }

  // Focus search input when dialog opens
  useEffect(() => {
    if (searchDialogOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [searchDialogOpen])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
        setSearchOpen(false)
      } else {
        setSidebarOpen(true)
        setSearchOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSignOut = () => {
    const refreshToken = getRefreshTokenFromLocalStorage() as string | null

    if (refreshToken) {
      logoutMutation.mutate(
        { refreshToken },
        {
          onSuccess: () => {
            cleanUpAndRedirect()
          },
          onError: () => {
            cleanUpAndRedirect()
          }
        }
      )
    } else {
      cleanUpAndRedirect()
    }
  }

  const cleanUpAndRedirect = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/login-admin')
  }

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
            {sidebarOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
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
            <Button
              onClick={handleSignOut}
              variant='ghost'
              className='w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white'
            >
              <Icons.LogOut className='mr-2 h-5 w-5' />
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
          <div className='flex items-center w-full gap-3 sm:gap-4'>
            <div className='hidden md:flex items-center gap-2 text-purple-400'>
              <h1 className='text-lg font-bold'>
                {navItems.find((item) => isActive(item.href))?.label || 'Dashboard'}
              </h1>
              <span className='text-xs px-2 py-1 bg-purple-900/50 rounded-full'>Admin</span>
            </div>

            <div className='flex items-center ml-auto gap-3 sm:gap-4'>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  className='relative bg-gray-800 border-gray-700 hover:bg-gray-700'
                >
                  <Icons.Bell className='h-5 w-5 text-gray-400' />
                  <span className='absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                    3
                  </span>
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  className='hidden md:flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700'
                >
                  <Icons.Settings className='h-4 w-4 text-gray-400' />
                  <span>Cài đặt</span>
                </Button>

                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center'>
                    <Avatar>
                      <AvatarImage src={avatarUrl as string} alt='@shadcn' />
                      <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className='text-sm font-medium hidden sm:inline-block'>{name}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='p-6'>{children}</main>
      </div>
    </div>
  )
}
