"use client"

import { useState, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import Layout from "../../components/layout"
import VirtualTrialRoom from "../../components/virtual-trial-room"
import LoginModal from "../../components/login-modal"
import { CartContext } from "../../contexts/cart-context"
import { AuthContext } from "../../contexts/auth-context"
import { products } from "../../data/products"

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useContext(CartContext)
  const { isLoggedIn } = useContext(AuthContext)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  if (!product) {
    return (
      <Layout>
        <div>Product not found</div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    if (isLoggedIn()) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      })
      setIsAddedToCart(true)
      setTimeout(() => setIsAddedToCart(false), 2000)
    } else {
      setIsLoginModalOpen(true)
    }
  }

  const similarProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <Layout>
      <div className="bg-gradient-to-r from-pink-100 to-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
            </div>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p>{product.description}</p>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {product.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add to Cart
            </button>
            {isAddedToCart && <p className="text-green-600 font-semibold">Added to cart!</p>}
          </div>
        </div>
        <VirtualTrialRoom productImage={product.image} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((similarProduct) => (
              <Link href={`/products/${similarProduct.id}`} key={similarProduct.id}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <Image
                    src={similarProduct.image || "/placeholder.svg"}
                    alt={similarProduct.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                  <h3 className="text-sm font-semibold truncate">{similarProduct.name}</h3>
                  <p className="text-indigo-600 font-bold">${similarProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Layout>
  )
}

