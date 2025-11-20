
import { RenderPortal } from '@/components/reusable/renderPortal'
import React from 'react'
import Tab from '../(tabs)/tabs/page'

export default function Settings() {
  return (
    <div>
       <RenderPortal elementId='header-title' >settings</RenderPortal>
      <Tab/>
    </div>
  )
}
