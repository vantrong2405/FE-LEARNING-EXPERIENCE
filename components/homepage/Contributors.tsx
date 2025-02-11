import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Linkedin, Twitter } from 'lucide-react'

const leader = {
  name: 'Đoàn Võ Văn Trọng',
  role: 'Founder & Lead Developer',
  image: 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
  github: 'https://github.com/alexjohnson',
  linkedin: 'https://linkedin.com/in/alexjohnson',
  twitter: 'https://twitter.com/alexjohnson'
}

const contributors = [
  {
    name: 'Nguyễn Đức Ninh',
    role: 'UX Designer',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    github: 'https://github.com/sarahlee'
  },
  {
    name: 'Nguyễn Đức Thắng',
    role: 'Backend Engineer',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    github: 'https://github.com/mikechen'
  },
  {
    name: 'Nguyễn Bá Thế Viễn',
    role: 'Content Strategist',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    github: 'https://github.com/emilydavis'
  },
  {
    name: 'Nguyễn Hữu Trường',
    role: 'Mobile Developer',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    github: 'https://github.com/carlosrodriguez'
  }
]

export default function Contributors() {
  return (
    <section className='py-24 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-16 '>Meet Our Team</h2>

        {/* Leader Card */}
        <div className='flex justify-center mb-12'>
          <Card className='dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-750 transition-colors w-full max-w-md'>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <Image
                src={leader.image || '/placeholder.svg'}
                alt={leader.name}
                width={150}
                height={150}
                className='rounded-full mb-4'
              />
              <h3 className='text-2xl font-semibold  mb-1'>{leader.name}</h3>
              <p className='text-lg dark:text-purple-300 mb-4'>{leader.role}</p>
              <div className='flex space-x-4'>
                <a
                  href={leader.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='dark:text-purple-400 dark:hover:text-purple-300 transition-colors'
                >
                  <Github className='w-6 h-6' />
                </a>
                <a
                  href={leader.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='dark:text-purple-400 dark:hover:text-purple-300 transition-colors'
                >
                  <Linkedin className='w-6 h-6' />
                </a>
                <a
                  href={leader.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='dark:text-purple-400 dark:hover:text-purple-300 transition-colors'
                >
                  <Twitter className='w-6 h-6' />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contributors Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {contributors.map((contributor, index) => (
            <Card key={index} className='dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-750 transition-colors'>
              <CardContent className='p-6 flex flex-col items-center text-center'>
                <Image
                  src={contributor.image || '/placeholder.svg'}
                  alt={contributor.name}
                  width={120}
                  height={120}
                  className='rounded-full mb-4'
                />
                <h3 className='text-xl font-semibold  mb-1'>{contributor.name}</h3>
                <p className='text-sm dark:text-purple-300 mb-4'>{contributor.role}</p>
                <a
                  href={contributor.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='dark:text-purple-400 dark:hover:text-purple-300 transition-colors'
                >
                  <Github className='w-6 h-6' />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
