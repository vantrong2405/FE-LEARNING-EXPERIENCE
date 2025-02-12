import { Users, BookOpen, GraduationCap } from 'lucide-react'

const stats = [
  { icon: Users, value: '2,000+', label: 'Expert Instructors' },
  { icon: BookOpen, value: '5,500+', label: 'High-Quality Courses' },
  { icon: GraduationCap, value: '4.5M+', label: 'Active Students' }
]

export default function Statistics() {
  return (
    <div className='dark:bg-gradient-to-r dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 bg-gray-300 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 text-center'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col items-center animate-fade-in-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='bg-white/10 rounded-full p-4 mb-4'>
                <stat.icon className='h-8 w-8 text-purple-400' />
              </div>
              <h3 className='text-3xl md:text-4xl font-bold  mb-2'>{stat.value}</h3>
              <p className='dark:text-purple-200 text-lg'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
