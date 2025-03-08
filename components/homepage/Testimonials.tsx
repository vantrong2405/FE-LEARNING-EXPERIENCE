import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '../ui/icons'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Data Scientist',
    image: 'https://p2amia.upertis.ac.id/wp-content/uploads/2017/12/instructor4.jpg',
    quote:
      "ELearn's courses have been instrumental in advancing my career in data science. The quality of instruction is unparalleled."
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s',
    quote:
      "I've taken multiple programming courses on ELearn, and each one has significantly improved my coding skills. Highly recommended!"
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbsB8JQHddPH1KvZYLJAUfjFJ5FTr9jd0wsn2mB968OxOaNP_IZSUEP_yo_Aii4GvQ9Zg&usqp=CAU',
    quote:
      'The digital marketing courses on ELearn have helped me stay ahead in this rapidly evolving field. Great investment in my professional growth.'
  }
]

export default function Testimonials() {
  return (
    <div className='py-24 bg-gray-50 dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-in-up'>What Our Students Say</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className='dark:bg-gray-700 rounded-lg p-6 shadow-lg animate-fade-in-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className='flex flex-col items-center text-center'>
                <Image
                  src={testimonial.image || '/placeholder.svg'}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className='rounded-full mb-4'
                />
                <Icons.Quote className='h-8 w-8 text-purple-400 mb-4' />
                <p className='dark:text-gray-300 italic mb-6'>"{testimonial.quote}"</p>
                <div>
                  <h3 className='text-lg font-semibold'>{testimonial.name}</h3>
                  <p className='dark:text-purple-300'>{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
