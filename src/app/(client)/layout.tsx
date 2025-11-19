import Providers from '@/components/providers/Providers'
import Navbar from '@/components/shared/Navbar/Navbar'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='bg-white'>
        
      <Providers><main>
        <Navbar/>
        {children}
        </main>
        </Providers>
    </div>
  )
}
