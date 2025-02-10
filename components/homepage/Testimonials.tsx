import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Data Scientist',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    quote:
      "ELearn's courses have been instrumental in advancing my career in data science. The quality of instruction is unparalleled."
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    quote:
      "I've taken multiple programming courses on ELearn, and each one has significantly improved my coding skills. Highly recommended!"
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg',
    quote:
      'The digital marketing courses on ELearn have helped me stay ahead in this rapidly evolving field. Great investment in my professional growth.'
  }
]

export default function Testimonials() {
  return (
    <div className='bg-gray-800 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-white animate-fade-in-up'>
          What Our Students Say
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='bg-gray-700 rounded-lg p-6 shadow-lg animate-fade-in-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='flex items-center mb-4'>
                <Image
                  src={testimonial.image || '/placeholder.svg'}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className='rounded-full mr-4'
                />
                <div>
                  <h3 className='text-lg font-semibold text-white'>{testimonial.name}</h3>
                  <p className='text-purple-300'>{testimonial.role}</p>
                </div>
              </div>
              <p className='text-gray-300 italic'>"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
