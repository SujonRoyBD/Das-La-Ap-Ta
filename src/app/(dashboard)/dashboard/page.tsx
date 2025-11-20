import RevenueChart from '@/components/dashboard/RevenueChart/RevenueChart'
import SubscriptionChart from '@/components/dashboard/SubscriptionChart/SubsCriptionChart'
import { RenderPortal } from '@/components/reusable/renderPortal'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <RenderPortal elementId='header-title'>dashboard</RenderPortal>
   <div className='grid grid-cols-1 md:grid-cols-2 gap-9 '>
     <RevenueChart/>
     <SubscriptionChart/>
   </div>
    </div>
  )
}
