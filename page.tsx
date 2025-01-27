"use client"

import Link from "next/link"
import Image from "next/image"
import Layout from "./components/layout"
import OfferCarousel from "./components/offer-carousel"
import { products, categories } from "./data/products"

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8 bg-gradient-to-r from-pink-100 to-white">
        <OfferCarousel />

        {categories.map((category) => (
          <section key={category} className="p-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="relative">
              <div className="flex overflow-x-auto space-x-6 pb-6">
                {products
                  .filter((product) => product.category === category)
                  .slice(0, 10)
                  .map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id} className="flex-shrink-0">
                      <div className="w-72 bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={280}
                          height={280}
                          className="w-full h-64 object-cover mb-4 rounded"
                        />
                        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                        <p className="text-xl text-indigo-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </Layout>
  )
}

