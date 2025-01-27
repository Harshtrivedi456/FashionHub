"use client"

import { useState, useContext } from "react"
import { useParams } from "next/navigation"
import Layout from "../../components/layout"
import { CartContext } from "../../contexts/cart-context"

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 19.99,
    description: "Comfortable cotton t-shirt",
    category: "Clothing",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 499.99,
    description: "Latest model smartphone",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useContext(CartContext)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  if (!product) {
    return (
      <Layout>
        <div>Product not found</div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <div className="space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
              Add to Wishlist
            </button>
          </div>
          {isAddedToCart && <p className="text-green-600 font-semibold">Added to cart!</p>}
        </div>
      </div>
    </Layout>
  )
}

