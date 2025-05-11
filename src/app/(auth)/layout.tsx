'use client'

import { HeroHighlight } from '@/components/ui/hero-highlight';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroHighlight className='flex flex-col md:flex-row h-[100vh] w-[100%] items-center justify-center gap-10 p-10'>
        <div className='flex items-center justify-center h-[auto] w-full'>
        {children}
        </div>
    </HeroHighlight>
  )
}