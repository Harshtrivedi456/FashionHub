"use client"

import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import Layout from "../components/layout"
import { CartContext } from "../contexts/cart-context"

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p className="text-indigo-600 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                Remove
              </button>
            </div>
          ))}
          <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <Link href="/checkout" className="block w-full">
            <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </Layout>
  )
}

