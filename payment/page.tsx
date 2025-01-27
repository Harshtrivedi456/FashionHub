"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Layout from "../components/layout"
import { CartContext } from "../contexts/cart-context"

export default function PaymentPage() {
  const router = useRouter()
  const { cart, clearCart } = useContext(CartContext)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      router.push("/order-confirmation")
    }, 2000)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
                placeholder="123"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

