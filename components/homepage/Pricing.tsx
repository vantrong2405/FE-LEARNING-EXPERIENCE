import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    features: ['Access to 100+ courses', 'Basic quizzes and assignments', 'Email support'],
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: '$19.99',
    features: ['Access to all courses', 'Advanced projects', 'Priority email support', 'Career services'],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Custom course creation', 'Dedicated account manager', 'API access', 'Advanced analytics'],
    cta: 'Contact Sales'
  }
]

export default function Pricing() {
  return (
    <section className='py-24 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Choose Your Learning Path</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                plan.popular
                  ? 'border-purple-500 dark:border-purple-400 shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <CardHeader>
                <CardTitle className='text-2xl font-bold text-center'>{plan.name}</CardTitle>
                {plan.popular && (
                  <span className='bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    Most Popular
                  </span>
                )}
              </CardHeader>
              <CardContent className='flex-grow'>
                <p className='text-4xl font-bold text-center mb-6'>{plan.price}</p>
                <ul className='space-y-3'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center'>
                      <Check className='h-5 w-5 text-green-500 mr-2' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
