import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Github } from 'lucide-react'

const contributors = [
  {
    name: 'Đoàn Võ Văn Trọng',
    role: 'Lead Developer',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    github: 'https://github.com/alexjohnson'
  },
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
    <section className='py-16 bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12 text-white'>Our Contributors</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {contributors.map((contributor, index) => (
            <Card key={index} className='bg-gray-800 border-gray-700'>
              <CardContent className='p-6 flex flex-col items-center text-center'>
                <Image
                  src={contributor.image || '/placeholder.svg'}
                  alt={contributor.name}
                  width={100}
                  height={100}
                  className='rounded-full mb-4'
                />
                <h3 className='text-lg font-semibold text-white mb-1'>{contributor.name}</h3>
                <p className='text-sm text-gray-400 mb-4'>{contributor.role}</p>
                <a
                  href={contributor.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-purple-400 hover:text-purple-300 transition-colors'
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
