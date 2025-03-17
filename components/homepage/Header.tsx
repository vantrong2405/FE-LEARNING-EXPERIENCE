'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Icons } from '../ui/icons'
import { pathURL } from '@/constants/path'
import { Volume2, VolumeX, ChevronUp } from 'lucide-react'
import { ModeToggle } from '../ui/toggle'
import useStoreLocal from '@/stores/useStoreLocal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCircle, LogOut } from 'lucide-react'
import Chatbox from '../chatbox/Chatbox'
import { useGetMeQuery, useLogoutMutation } from '@/queries/useAuth'
import { getRefreshTokenFromLocalStorage } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Courses', href: '#courses' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' }
]

export default function Header() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { isMusicOn, toggleMusic } = useStoreLocal()
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const logoutMutation = useLogoutMutation()
  const GetMeQuery = useGetMeQuery()
  const { email, name } = GetMeQuery.data?.payload.data ?? {}
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === pathURL.home

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (scrollY > 60) {
      setShowAlert(false)
    } else {
      setShowAlert(true)
    }

    if (scrollY > 300) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }, [scrollY])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
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
    setIsLoggedIn(false)
    router.push('/login')
  }

  // Handle keyboard shortcut for search
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      setSearchDialogOpen(true)
    }
  }, [])

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 ease-in-out ${scrollY > 0 ? 'shadow-md' : ''}`}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link href={pathURL.home} className='flex items-center space-x-2'>
              <Icons.GraduationCap className='h-8 w-8 text-purple-500' />
              <span className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text'>
                ELearn
              </span>
            </Link>
            {isHomePage && (
              <nav className='hidden md:flex space-x-6'>
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'
                    onClick={() => scrollToSection(item.name.toLowerCase())}
                  >
                    {item.name}
                  </Button>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'
                    >
                      More <Icons.ChevronDown className='ml-1 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='bg-white dark:bg-gray-800'>
                    <DropdownMenuItem>
                      <Link href='#' className='text-gray-900 dark:text-white hover:text-purple-400'>
                        Blog
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='#' className='text-gray-900 dark:text-white hover:text-purple-400'>
                        About Us
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='#' className='text-gray-900 dark:text-white hover:text-purple-400'>
                        Contact
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            )}

            <div className='hidden md:flex items-center space-x-4'>
              <div className='relative order-1 sm:order-none flex-grow max-w-md'>
                <Icons.Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                <Input
                  type='search'
                  placeholder='Tìm kiếm... (Ctrl+K)'
                  className='w-full pl-8 bg-gray-800 border-gray-700 focus:border-purple-500 text-white'
                  onClick={() => setSearchDialogOpen(true)}
                  readOnly
                />
              </div>
              <ModeToggle />
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'
              >
                <Icons.Globe className='h-5 w-5' />
              </Button>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src='/avatars/01.png' alt='@user' />
                        <AvatarFallback>
                          <UserCircle className='h-6 w-6' /> {/* UserCircle is now correctly rendered */}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <Link href={pathURL.profile}>
                      <DropdownMenuItem className='flex items-center'>
                        <UserCircle className='mr-2 h-4 w-4' />
                        <span>{name}</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className='flex items-center' onClick={handleSignOut}>
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href={pathURL.login}>
                    <Button
                      variant='ghost'
                      className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href={pathURL.register}>
                    <Button className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'>
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-gray-900 dark:text-white hover:text-purple-400 transition-colors'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Icons.X className='h-6 w-6' /> : <Icons.Menu className='h-6 w-6' />}
            </Button>
          </div>
          {isHomePage && isMenuOpen && (
            <div className='mt-4 md:hidden transition-all duration-300 ease-in-out'>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
                  onClick={() => {
                    scrollToSection(item.name.toLowerCase())
                    setIsMenuOpen(false)
                  }}
                >
                  {item.name}
                </Button>
              ))}
              {isLoggedIn ? (
                <>
                  <Link href={pathURL.profile}>
                    <Button
                      variant='ghost'
                      className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
                    >
                      {name}
                    </Button>
                  </Link>
                  <Button
                    variant='ghost'
                    className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href={pathURL.login} className='w-full'>
                    <Button
                      variant='ghost'
                      className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href={pathURL.register} className='w-full'>
                    <Button className='w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'>
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {showScrollTop && (
        <Button
          variant='secondary'
          size='icon'
          className='fixed bottom-28 right-4 rounded-full shadow-lg z-50'
          onClick={scrollToTop}
        >
          <ChevronUp className='h-6 w-6' />
        </Button>
      )}
      <Button
        variant='secondary'
        size='icon'
        className='fixed bottom-16 right-4 rounded-full shadow-lg z-50'
        onClick={toggleMusic}
      >
        {isMusicOn ? <Volume2 className='h-6 w-6' /> : <VolumeX className='h-6 w-6' />}
      </Button>
      <Chatbox /> {/* Chatbox luôn nằm dưới cùng */}
      {/* Search Dialog */}
      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className='sm:max-w-[550px] bg-gray-900 border border-gray-700 text-white p-0 rounded-lg shadow-lg'>
          {/* Header */}
          <DialogHeader className='p-4 border-b border-gray-800'>
            <DialogTitle className='text-lg font-semibold'>Tìm kiếm</DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <div className='p-4 border-b border-gray-800'>
            <div className='relative'>
              <Icons.Search className='absolute left-3 top-2 h-5 w-5 text-gray-400' />
              <Input
                ref={searchInputRef}
                type='search'
                placeholder='Tìm kiếm khóa học, người dùng, đánh giá...'
                className='w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 focus:border-purple-500 text-white text-base rounded-md'
                autoFocus
              />
            </div>
          </div>

          {/* Recent Searches */}
          <div className='p-4'>
            <div className='text-sm text-gray-400 mb-2'>Tìm kiếm gần đây</div>
            <div className='space-y-2'>
              {['JavaScript Cơ Bản', 'React Advanced', 'Nguyễn Văn A'].map((item, index) => (
                <div
                  key={index}
                  className='flex items-center p-2 hover:bg-gray-800 rounded-md cursor-pointer transition'
                >
                  <Icons.Search className='h-4 w-4 text-gray-500 mr-2' />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Keyboard Shortcuts */}
            <div className='mt-4 text-xs text-gray-500 flex justify-between'>
              <span>
                Nhấn <kbd className='px-2 py-1 bg-gray-800 rounded'>↑</kbd>{' '}
                <kbd className='px-2 py-1 bg-gray-800 rounded'>↓</kbd> để điều hướng
              </span>
              <span>
                Nhấn <kbd className='px-2 py-1 bg-gray-800 rounded'>Enter</kbd> để chọn
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
