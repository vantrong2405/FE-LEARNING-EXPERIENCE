'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Alert } from '@/components/ui/alert'
import Link from 'next/link'
import { Icons } from '../ui/icons'
import { pathURL } from '@/constants/path'
import { Volume2, VolumeX, Smile } from 'lucide-react'
import { ModeToggle } from '../ui/toggle'
import useStoreLocal from '@/stores/useStoreLocal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const { isMusicOn, toggleMusic } = useStoreLocal()

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header className='bg-white dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 ease-in-out'>
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
                  <Button
                    variant='ghost'
                    className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'
                  >
                    Courses <Icons.ChevronDown className='ml-1 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white dark:bg-gray-800'>
                  <DropdownMenuItem>
                    <Link href='#' className='text-gray-900 dark:text-white hover:text-purple-400'>
                      All Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='#' className='text-gray-900 dark:text-white hover:text-purple-400'>
                      Featured
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='#' className='text-gray-900 dark:text-white hover:text-purple-400'>
                      Categories
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant='ghost' className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'>
                Blog
              </Button>
              <Button variant='ghost' className='text-gray-900 dark:text-white hover:text-purple-400 transition-colors'>
                Contact
              </Button>
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
              <Button
                variant='ghost'
                className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
              >
                Courses
              </Button>
              <Button
                variant='ghost'
                className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
              >
                Blog
              </Button>
              <Button
                variant='ghost'
                className='w-full text-left text-gray-900 dark:text-white hover:text-purple-400 transition-colors py-2'
              >
                Contact
              </Button>
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
            </div>
          )}
        </div>
      </header>

      {showAlert && (
        <Alert className='fixed top-16 left-1/2 transform -translate-x-1/2 dark:bg-gray-800 bg-red-500 w-[100%] py-2 px-4 border-none  text-xs shadow-lg rounded-lg transition-all duration-300 ease-in-out flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Smile className='h-4 w-4 text-yellow-300' />
            <span className='text-xs font-medium'>New courses available! Check them out now.</span>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className=' hover:text-yellow-300 transition-colors'
            onClick={toggleMusic}
          >
            {isMusicOn ? <Volume2 className='h-4 w-4' /> : <VolumeX className='h-4 w-4' />}
          </Button>
        </Alert>
      )}
    </div>
  )
}
