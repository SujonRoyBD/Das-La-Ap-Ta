"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/store/cartSlice'
import CartPage from '@/app/(client)/cart/page'

const data = [
  {
    id: 1,
    name: "roy",
    roll: 12,
    img: "/assets/ourUnique.jpg.png",
    price: 200,
  },
  {
    id: 2,
    name: "sujon",
    roll: 15,
    img: "/assets/ourUnique.jpg.png",
    price: 150,
  },
   {
    id: 3,
    name: "roy",
    roll: 12,
    img: "/assets/ourUnique.jpg.png",
    price: 200,
  },
  {
    id: 4,
    name: "sujon",
    roll: 15,
    img: "/assets/ourUnique.jpg.png",
    price: 150,
  }
]

export default function ProductList() {
  const dispatch = useDispatch()

  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
     
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }} className=''>
             <h1>Products</h1>
          <p>Name: {item.name}</p>
          <p>Roll: {item.roll}</p>
          <p>Price: ${item.price}</p>
          <Link href={`/productDetails/${item.id}`}>
            <Image src={item.img} alt={item.name} width={500} height={150} />
          </Link>

        <Link href="/cart" > <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  name: item.name,
                  roll: item.roll,
                  img: item.img,
                  price: item.price,
                })
              )
            }
          >
            Add To Cart
          </button></Link>
        </div>
      ))}

      <Link href="/cart">
        <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', display: 'inline-block', marginTop: '20px' }}>
          Go to Cart
        </div>
      </Link>

      <CartPage/>
    </div>
  )
}
