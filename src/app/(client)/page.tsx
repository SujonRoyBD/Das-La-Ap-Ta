import According from '@/components/according/According'
import CategoriesTable from '@/components/categoryTable/CategoryTabe'
import Product from '@/components/products/Product'
import React from 'react'

export default function Client() {
  return (
    <div>
      <Product/>
      <According/>
      <CategoriesTable/>
    </div>
  )
}
