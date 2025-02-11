'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { Icons } from '../ui/icons'
import { pathURL } from '@/constants/path'
import { Volume2, VolumeX, Smile } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMusicOn, setIsMusicOn] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowAlert(false)
      } else {
        setShowAlert(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header className='bg-gray-900/80 backdrop-blur-md transition-all duration-300 ease-in-out'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link href={pathURL.home} className='flex items-center space-x-2'>
              <Icons.GraduationCap className='h-8 w-8 text-purple-500' />
              <span className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text'>
                ELearn
              </span>
            </Link>
            <nav className='hidden md:flex space-x-6'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='text-white hover:text-purple-400 transition-colors'>
                    Courses <Icons.ChevronDown className='ml-1 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-gray-800 border-gray-700'>
                  <DropdownMenuItem>
                    <Link href='#' className='text-gray-200 hover:text-purple-400'>
                      All Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='#' className='text-gray-200 hover:text-purple-400'>
                      Featured
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='#' className='text-gray-200 hover:text-purple-400'>
                      Categories
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant='ghost' className='text-white hover:text-purple-400 transition-colors'>
                Blog
              </Button>
              <Button variant='ghost' className='text-white hover:text-purple-400 transition-colors'>
                Contact
              </Button>
            </nav>
            <div className='hidden md:flex items-center space-x-4'>
              <Button variant='ghost' size='icon' className='text-white hover:text-purple-400 transition-colors'>
                <Icons.Globe className='h-5 w-5' />
              </Button>
              <Link href={pathURL.login}>
                <Button variant='ghost' className='text-white hover:text-purple-400 transition-colors'>
                  Log in
                </Button>
              </Link>
              <Link href={pathURL.register}>
                <Button className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'>
                  Sign up
                </Button>
              </Link>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-white hover:text-purple-400 transition-colors'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Icons.X className='h-6 w-6' /> : <Icons.Menu className='h-6 w-6' />}
            </Button>
          </div>
          {isMenuOpen && (
            <div className='mt-4 md:hidden transition-all duration-300 ease-in-out'>
              <Button
                variant='ghost'
                className='w-full text-left text-white hover:text-purple-400 transition-colors py-2'
              >
                Courses
              </Button>
              <Button
                variant='ghost'
                className='w-full text-left text-white hover:text-purple-400 transition-colors py-2'
              >
                Blog
              </Button>
              <Button
                variant='ghost'
                className='w-full text-left text-white hover:text-purple-400 transition-colors py-2'
              >
                Contact
              </Button>
              <Link href={pathURL.login} className='w-full'>
                <Button
                  variant='ghost'
                  className='w-full text-left text-white hover:text-purple-400 transition-colors py-2'
                >
                  Log in
                </Button>
              </Link>
              <Link href={pathURL.register} className='w-full'>
                <Button className='w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'>
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
      {showAlert && (
        <Alert className='bg-gray-800 w-[100%] py-0 mx-auto border-none text-white text-xs shadow-lg transition-all duration-300 ease-in-out'>
          <AlertDescription className='container mx-auto flex items-center justify-between py-2'>
            <div className='flex items-center space-x-2'>
              <Smile className='h-5 w-5 text-yellow-300' />
              <span className='text-xs font-medium'>New courses available! Check them out now.</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:text-yellow-300 transition-colors'
                onClick={() => setIsMusicOn(!isMusicOn)}
              >
                {isMusicOn ? <Volume2 className='h-5 w-5' /> : <VolumeX className='h-5 w-5' />}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
