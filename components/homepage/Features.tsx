import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '../ui/icons'

const features = [
  {
    icon: Icons.Lightbulb,
    title: 'Expert-Led Courses',
    description: 'Learn from industry professionals and renowned academics.'
  },
  {
    icon: Icons.Clock,
    title: 'Flexible Learning',
    description: 'Study at your own pace, anytime and anywhere.'
  },
  {
    icon: Icons.ShieldCheck,
    title: 'Recognized Certificates',
    description: 'Earn certificates valued by top employers worldwide.'
  },
  {
    icon: Icons.Users,
    title: 'Community Support',
    description: 'Join a global community of learners and educators.'
  }
]

export default function Features() {
  return (
    <section className='py-24 bg-gray-50 dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Why Choose ELearn?</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <Card key={index} className='bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300'>
              <CardHeader>
                <feature.icon className='h-12 w-12 text-purple-500 mb-4' />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 dark:text-gray-300'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
