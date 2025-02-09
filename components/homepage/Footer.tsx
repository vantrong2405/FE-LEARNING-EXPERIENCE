import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const partners = [
  {
    name: 'Partner 1',
    logo: 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg'
  },
  {
    name: 'Partner 2',
    logo: 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg'
  },
  {
    name: 'Partner 3',
    logo: 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg'
  },
  {
    name: 'Partner 4',
    logo: 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg'
  },
  {
    name: 'Partner 5',
    logo: 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg'
  }
]

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' }
]

export default function Footer() {
  return (
    <footer className='bg-gray-900 py-16'>
      <div className='container mx-auto px-4'>
        <div className='mb-12'>
          <h3 className='text-2xl font-semibold text-white mb-6 text-center'>Our Trusted Partners</h3>
          <div className='flex flex-wrap justify-center items-center gap-8'>
            {partners.map((partner, index) => (
              <Image
                key={index}
                src={partner.logo || '/placeholder.svg'}
                alt={partner.name}
                width={100}
                height={50}
                className='opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0'
              />
            ))}
          </div>
        </div>
        <div className='border-t border-gray-800 pt-8 text-center'>
          <div className='flex justify-center space-x-6 mb-6'>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className='text-gray-400 hover:text-purple-400 transition-colors'>
                <link.icon className='h-6 w-6' />
              </a>
            ))}
          </div>
          <p className='text-gray-400'>&copy; 2025 EduMall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
