'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Alert } from '@/components/ui/alert'
import Link from 'next/link'
import { Icons } from '../ui/icons'
import { pathURL } from '@/constants/path'
import { Volume2, VolumeX, Smile, ChevronUp, UserCircle, LogOut } from 'lucide-react'
import { ModeToggle } from '../ui/toggle'
import useStoreLocal from '@/stores/useStoreLocal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Courses', href: '#courses' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { isMusicOn, toggleMusic } = useStoreLocal()
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Giả lập trạng thái đăng nhập
  const [userEmail, setUserEmail] = useState('user@example.com') // Giả lập email người dùng

  // 🎯 Sử dụng useCallback để tối ưu sự kiện cuộn
  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setScrollY(y)

    // Chỉ cập nhật state khi giá trị thực sự thay đổi
    setShowAlert((prev) => (y > 60 ? false : prev !== true ? true : prev))
    setShowScrollTop((prev) => (y > 300 ? true : prev !== false ? false : prev))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 ease-in-out ${scrollY > 0 ? 'shadow-md' : ''}`}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-around'>
            <Link href={pathURL.home} className='flex items-center space-x-2'>
              <Icons.GraduationCap className='h-8 w-8 text-purple-500' />
              <span className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text'>
                ELearn
              </span>
            </Link>
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
            <div className='hidden md:flex items-center space-x-4'>
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
                          <UserCircle className='h-6 w-6' />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <DropdownMenuItem className='flex items-center'>
                      <UserCircle className='mr-2 h-4 w-4' />
                      <span>{userEmail}</span>
                    </DropdownMenuItem>
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
          {isMenuOpen && (
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
                  <Button
                    variant='ghost'
                    className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
                  >
                    {userEmail}
                  </Button>
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

      {showAlert && (
        <Alert className='w-[80%] fixed top-16 left-1/2 transform -translate-x-1/2 dark:bg-gray-800 bg-red-500 py-2 px-4 border-none text-xs shadow-lg rounded-lg transition-all duration-300 ease-in-out flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Smile className='h-4 w-4 text-yellow-300' />
            <span className='text-xs font-medium'>New courses available! Check them out now.</span>
          </div>
          <Button variant='ghost' size='icon' onClick={toggleMusic}>
            {isMusicOn ? <Volume2 className='h-4 w-4' /> : <VolumeX className='h-4 w-4' />}
          </Button>
        </Alert>
      )}

      {showScrollTop && (
        <Button
          variant='secondary'
          size='icon'
          className='fixed bottom-4 right-4 rounded-full shadow-lg'
          onClick={scrollToTop}
        >
          <ChevronUp className='h-6 w-6' />
        </Button>
      )}
    </div>
  )
}
