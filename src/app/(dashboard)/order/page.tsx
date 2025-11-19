import OrderTable from '@/components/dashboard/OrderTable/OrderTable'
import { RenderPortal } from '@/components/reusable/renderPortal'
import React from 'react'

export default function Order() {
  return (
    <div>
      <OrderTable/>
       <RenderPortal elementId='header-title' >order</RenderPortal>
    </div>
  )
}
