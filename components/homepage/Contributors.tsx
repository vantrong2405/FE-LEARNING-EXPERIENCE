'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const team = {
  contributors: [
    {
      name: 'Đoàn Võ Văn Trọng',
      role: 'Founder & Lead Developer',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
      github: 'https://github.com/alexjohnson',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      twitter: 'https://twitter.com/alexjohnson'
    },
    {
      name: 'Nguyễn Đức Ninh',
      role: 'UX Designer',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
      github: 'https://github.com/sarahlee',
      linkedin: 'https://linkedin.com/in/sarahlee',
      twitter: 'https://twitter.com/sarahlee'
    },
    {
      name: 'Nguyễn Đức Thắng',
      role: 'Backend Engineer',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
      github: 'https://github.com/mikechen',
      linkedin: 'https://linkedin.com/in/mikechen',
      twitter: 'https://twitter.com/mikechen'
    },
    {
      name: 'Nguyễn Bá Thế Viễn',
      role: 'Content Strategist',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
      github: 'https://github.com/emilydavis',
      linkedin: 'https://linkedin.com/in/emilydavis',
      twitter: 'https://twitter.com/emilydavis'
    },
    {
      name: 'Nguyễn Hữu Trường',
      role: 'Mobile Developer',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
      github: 'https://github.com/carlosrodriguez',
      linkedin: 'https://linkedin.com/in/carlosrodriguez',
      twitter: 'https://twitter.com/carlosrodriguez'
    }
  ]
}

export default function TeamPage() {
  return (
    <section className='py-24 bg-gray-50 dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-gray-800 dark:text-white mb-12'>Meet Our Team</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {/* Contributors */}
          {team.contributors.map((member, index) => (
            <div key={index} className='lg:col-span-1'>
              <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
                <div className='flex flex-col items-center text-center'>
                  <Image src={member.image} alt={member.name} width={100} height={100} className='rounded-full mb-3' />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{member.name}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mb-3'>{member.role}</p>
                  <div className='flex space-x-3'>
                    <Link href={member.github} target='_blank'>
                      <Github className='w-5 h-5 text-gray-400 hover:text-purple-500 transition-colors' />
                    </Link>
                    <Link href={member.linkedin} target='_blank'>
                      <Linkedin className='w-5 h-5 text-gray-400 hover:text-purple-500 transition-colors' />
                    </Link>
                    <Link href={member.twitter} target='_blank'>
                      <Twitter className='w-5 h-5 text-gray-400 hover:text-purple-500 transition-colors' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
