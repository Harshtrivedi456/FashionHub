"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Layout from "../components/layout"
import { products, categories } from "../data/products"

function ProductList() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  return (
    <>
      <div className="flex space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg ${selectedCategory === null ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-80 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-2xl text-indigo-600 font-bold mt-2">${product.price.toFixed(2)}</p>
              <p className="text-lg text-gray-500 mt-1">{product.category}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-lg text-gray-500 ml-2">({product.reviews})</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default function ProductsPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </Layout>
  )
}

