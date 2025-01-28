"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Layout from "../components/layout"
import { CartContext } from "../contexts/cart-context"
import { products } from "../data/products"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useContext(CartContext)
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/payment")
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={shippingDetails.zipCode}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="country" className="block mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingDetails.country}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id)
              return (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={product?.image || "/placeholder.svg"}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-indigo-600 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              )
            })}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

