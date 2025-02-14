'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div id='default-carousel' className='relative w-full' data-carousel='slide'>
      {/* Carousel wrapper */}
      <div className='relative h-40 md:h-48 lg:h-56 w-full overflow-hidden rounded-lg'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={image} alt={`Slide ${index + 1}`} layout='fill' objectFit='cover' className='rounded-lg' />
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'dark:bg-white' : 'bg-purple-400'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
