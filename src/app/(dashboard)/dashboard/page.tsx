import RevenueChart from '@/components/dashboard/RevenueChart/RevenueChart'
import SubscriptionChart from '@/components/dashboard/SubscriptionChart/SubsCriptionChart'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
   <div className='grid grid-cols-1 md:grid-cols-2 gap-9 '>
     <RevenueChart/>
     <SubscriptionChart/>
   </div>
    </div>
  )
}
