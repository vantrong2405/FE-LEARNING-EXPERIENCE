import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Newsletter() {
  return (
    <section className='py-24 dark:bg-gradient-to-r dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 bg-gray-100'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>Stay Updated with ELearn</h2>
        <p className='text-lg mb-8 max-w-2xl mx-auto'>
          Subscribe to our newsletter for the latest course updates, learning tips, and exclusive offers.
        </p>
        <form className='max-w-md mx-auto flex flex-col sm:flex-row gap-4'>
          <Input type='email' placeholder='Enter your email' className='flex-grow' />
          <Button type='submit' className='bg-purple-500 hover:bg-purple-600 text-white'>
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
