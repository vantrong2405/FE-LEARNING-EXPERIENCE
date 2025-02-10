import type { ReactNode } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-[#0D0A25] flex flex-col'>
      <Header />
      <div className='flex flex-1'>
        <div className='flex-1 p-6'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
