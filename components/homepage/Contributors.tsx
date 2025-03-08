'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, Facebook, Twitter } from 'lucide-react'

const team = {
  contributors: [
    {
      name: 'Đoàn Võ Văn Trọng',
      role: 'Founder & Lead Developer',
      image: 'https://portfolio-van-trongs-projects.vercel.app/assets/avt1-Bs6gyiC1.png',
      github: 'https://github.com/vantrong2405',
      facebook: 'https://www.facebook.com/doanvo.vantrong/',
      twitter: 'https://x.com/Trongdn2405'
    },
    {
      name: 'Nguyễn Bá Thế Viễn',
      role: 'Content Strategist',
      image: 'https://avatars.githubusercontent.com/u/145112677?v=4',
      github: 'https://github.com/nguyenbathevien',
      facebook: 'https://www.facebook.com/thevien25052003/',
      twitter: 'https://twitter.com/GBavien'
    },
    {
      name: 'Nguyễn Đức Ninh',
      role: 'UX Designer',
      image: 'https://avatars.githubusercontent.com/u/130817149',
      github: 'https://github.com/ninh2103',
      facebook: 'https://www.facebook.com/dninh.vuive',
      twitter: 'https://www.linkedin.com/in/ninh-nguy%E1%BB%85n-057784291/'
    },
    {
      name: 'Nguyễn Đức Thắng',
      role: 'Backend Engineer',
      image: 'https://avatars.githubusercontent.com/u/121211672?v=4',
      github: 'https://github.com/TCyril',
      facebook: 'https://www.facebook.com/TCyril01.NDT/'
    },
    {
      name: 'Nguyễn Hữu Trường',
      role: 'Mobile Developer',
      image: 'http://avatars.githubusercontent.com/u/160813274?v=4',
      github: 'https://github.com/truonghu123',
      facebook: 'https://web.facebook.com/nguyen.huu.truong.149997/'
    }
  ]
}

export default function TeamPage() {
  return (
    <section className='py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 dark:text-white mb-4'>Meet Our Team</h2>
          <div className='h-1 w-20 bg-purple-600 mx-auto mb-6 rounded-full'></div>
          <p className='text-lg text-gray-600 dark:text-gray-300'>The talented people behind our success</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {team.contributors.map((member, index) => (
            <div key={index} className='lg:col-span-1'>
              <div className='bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700'>
                <div className='p-6 flex flex-col items-center text-center'>
                  {/* Image container with proper rounded styling */}
                  <div className='w-32 h-32 rounded-full overflow-hidden mb-6 border-4  shadow-md'>
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      width={128}
                      height={128}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1'>{member.name}</h3>
                  <div className='inline-block bg-purple-100 dark:bg-purple-900 rounded-full px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-200 mb-4'>
                    {member.role}
                  </div>

                  <div className='flex space-x-4 mt-2'>
                    <Link href={member.github} target='_blank' className='group'>
                      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-600 transition-colors duration-300'>
                        <Github className='w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300' />
                      </div>
                    </Link>
                    <Link href={member.facebook} target='_blank' className='group'>
                      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-600 transition-colors duration-300'>
                        <Facebook className='w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300' />
                      </div>
                    </Link>
                    <Link href={member.twitter || ''} target='_blank' className='group'>
                      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-600 transition-colors duration-300'>
                        <Twitter className='w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300' />
                      </div>
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
