import Image from 'next/image'
import Link from 'next/link'
import { Icons } from '../ui/icons'

const socialLinks = [
  { icon: Icons.Facebook, href: '#' },
  { icon: Icons.Twitter, href: '#' },
  { icon: Icons.Instagram, href: '#' },
  { icon: Icons.Linkedin, href: '#' }
]

export default function Footer() {
  return (
    <footer className='dark:bg-gray-900 py-16 bg-gray-200'>
      <div className='container mx-auto px-4'>
        <div className='ml-20 flex justify-between'>
          <div>
            <h4 className=' font-semibold mb-4'>About ELearn</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className=' font-semibold mb-4'>Resources</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className=' font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='#' className='dark:text-gray-400 dark:hover:text-purple-400'>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className=' font-semibold mb-4'>Contact Us</h4>
            <p className='dark:text-gray-400 mb-2'>1234 Learning Street</p>
            <p className='dark:text-gray-400 mb-2'>Education City, ED 12345</p>
            <p className='dark:text-gray-400'>support@ELearn.com</p>
          </div>
        </div>
        <div className='border-t border-gray-800 pt-6 text-center mt-8'>
          <div className='flex justify-center space-x-6 mb-6'>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className='dark:text-gray-400 dark:hover:text-purple-400 transition-colors'
              >
                <link.icon className='h-6 w-6' />
              </a>
            ))}
          </div>
          <p className='dark:text-gray-400'>&copy; 2025 ELearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
