import type { ReactNode } from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen dark:bg-[#0D0A25] flex flex-col'>
      <Header />
      <div className='mt-2 md:mt-0 md:flex md:flex-1 md:p-16'>
        <div className='flex-1 p-6'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
