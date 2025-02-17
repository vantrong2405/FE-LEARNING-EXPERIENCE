'use client'

import { useEffect, useState } from 'react'
import { Book, Lightbulb, GraduationCap, Award, Rocket, Sparkles } from 'lucide-react'

export default function LazyLoading() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handlePageLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handlePageLoad()
    } else {
      window.addEventListener('load', handlePageLoad)
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) return prevProgress
        return prevProgress + Math.random() * 8
      })
    }, 100)

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handlePageLoad)
    }
  }, [])

  if (!isClient || !loading) return null

  const icons = [Book, Lightbulb, GraduationCap, Award, Rocket, Sparkles]

  const iconColors = [
    'text-blue-400',
    'text-indigo-400',
    'text-purple-400',
    'text-pink-400',
    'text-red-400',
    'text-yellow-400'
  ]

  return (
    <div className='fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 p-4'>
      {/* Loader Container */}
      <div className='relative w-full max-w-md'>
        {/* Outer decorative ring */}
        <div className='absolute inset-0 rounded-full bg-blue-200 animate-pulse' style={{ borderWidth: '2px' }}></div>

        {/* Main circle */}
        <div className='relative w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl'>
          <div className='w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center shadow-lg'>
            <div className='w-5/6 h-5/6 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative shadow-inner'>
              {/* Circular Progress Bar */}
              <svg className='w-full h-full' viewBox='0 0 100 100'>
                <circle
                  className='text-blue-100 stroke-current'
                  strokeWidth='4'
                  cx='50'
                  cy='50'
                  r='44'
                  fill='transparent'
                ></circle>
                <circle
                  className='text-purple-500 stroke-current transition-all duration-300 ease-linear'
                  strokeWidth='4'
                  strokeLinecap='round'
                  cx='50'
                  cy='50'
                  r='44'
                  fill='transparent'
                  strokeDasharray='276.46'
                  strokeDashoffset={276.46 - (276.46 * progress) / 100}
                ></circle>
              </svg>
              {/* Progress Number */}
              <div className='absolute text-3xl md:text-5xl font-extrabold text-blue-700'>{Math.round(progress)}%</div>
            </div>
          </div>
        </div>

        {/* Floating Icons with Fixed Colors */}
        {icons.map((Icon, index) => (
          <div
            key={index}
            className={`absolute w-12 h-12 opacity-90 ${iconColors[index]} transition-all duration-300 ease-in-out`}
            style={{
              top: `${50 - Math.round(54 * Math.cos((index * Math.PI) / 3))}%`,
              left: `${50 + Math.round(54 * Math.sin((index * Math.PI) / 3))}%`,
              transform: 'translate(-50%, -50%)',
              animation: `iconPulse 2s ease-in-out ${index * 0.3}s infinite`
            }}
          >
            <Icon strokeWidth={1.5} className='w-full h-full' />
          </div>
        ))}

        {/* Decorative elements */}
        <div className='absolute top-0 left-0 w-6 h-6 bg-blue-300 rounded-full opacity-50 animate-ping'></div>
        <div
          className='absolute bottom-0 right-0 w-8 h-8 bg-blue-400 rounded-full opacity-50 animate-ping'
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className='absolute top-1/4 right-1/4 w-4 h-4 bg-blue-200 rounded-full opacity-50 animate-ping'
          style={{ animationDelay: '0.7s' }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className='mt-6 text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text text-center'>
        Preparing Your Learning Journey...
      </div>
    </div>
  )
}
