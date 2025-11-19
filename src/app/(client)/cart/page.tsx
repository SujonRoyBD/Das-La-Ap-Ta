"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

import { RootState } from "@/components/redux/store/store";
import { addToCart, clearCart, decreaseQuantity, removeFromCart } from "@/components/redux/store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0)
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
        <Link href="/">
          <div className="text-blue-600 underline">Go Back to Shop</div>
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center border rounded-lg p-4 shadow-sm"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={150}
              height={150}
              className="rounded-lg object-cover"
            />

            <div className="flex-1 md:ml-6 mt-4 md:mt-0">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">Roll: {item.roll}</p>
              <p className="mt-2">
                Price per unit:{" "}
                <span className="font-bold">${item.price.toFixed(2)}</span>
              </p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="flex flex-col items-center gap-3 mt-4 md:mt-0 md:ml-6">
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-3xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
