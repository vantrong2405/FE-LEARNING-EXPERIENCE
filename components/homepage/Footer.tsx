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
    <footer className='bg-gray-100 dark:bg-gray-900 py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
          <div>
            <h4 className='font-semibold mb-4 text-gray-800 dark:text-white'>About ELearn</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4 text-gray-800 dark:text-white'>Resources</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4 text-gray-800 dark:text-white'>Legal</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4 text-gray-800 dark:text-white'>Contact Us</h4>
            <p className='text-gray-600 dark:text-gray-400 mb-2'>1234 Learning Street</p>
            <p className='text-gray-600 dark:text-gray-400 mb-2'>Education City, ED 12345</p>
            <p className='text-gray-600 dark:text-gray-400'>support@elearn.com</p>
          </div>
        </div>
        <div className='border-t border-gray-300 dark:border-gray-700 pt-8 mt-8 text-center'>
          <div className='flex justify-center space-x-6 mb-6'>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors'
              >
                <link.icon className='h-6 w-6' />
              </a>
            ))}
          </div>
          <p className='text-gray-600 dark:text-gray-400'>
            &copy; {new Date().getFullYear()} ELearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
