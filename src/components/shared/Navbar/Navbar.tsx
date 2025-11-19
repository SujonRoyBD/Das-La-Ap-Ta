"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/components/redux/store/store";
import Link from "next/link";

export default function Navbar() {
  const items = useSelector((state: RootState) => state.cart.items);

  // Count items (NOT quantities)
  const cartCount = items.length;

  return (
    <div className="">
      <div className="flex justify-between items-center bg-green-500 px-12 py-3 text-white font-semibold">

        <div>Logo</div>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>

          {/* Cart with Count */}
          <Link href="/cart" className="relative">
            Cart

            {/* Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-600 text-white text-sm px-2 py-[2px] rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </div>
  );
}
    