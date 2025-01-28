"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Layout from "./components/layout"
import OfferCarousel from "./components/offer-carousel"
import { products, categories } from "./data/products"
import { ChevronDown, ChevronUp } from "lucide-react"

const categoryImages = {
  "Men's Wear": "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&h=800&q=80",
  "Women's Wear": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&h=800&q=80",
  "Children's Wear":
    "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1200&h=800&q=80",
  Accessories: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=1200&h=800&q=80",
}

const categoryDescriptions = {
  "Men's Wear":
    "Discover our collection of stylish and comfortable men's clothing. From casual everyday wear to formal attire, we have everything to keep you looking sharp.",
  "Women's Wear":
    "Explore our diverse range of women's fashion. Whether you're looking for elegant dresses, comfortable loungewear, or trendy outfits, we've got you covered.",
  "Children's Wear":
    "Dress your little ones in cute and comfortable clothing. Our children's collection features playful designs and durable materials perfect for active kids.",
  Accessories:
    "Complete your look with our wide selection of accessories. From jewelry to bags, find the perfect finishing touches for any outfit.",
}

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <Layout>
      <div className="space-y-16 bg-gradient-to-r from-pink-100 to-white p-8">
        <OfferCarousel />

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12">
                  <h2 className="text-4xl font-bold mb-6">{category}</h2>
                  <p className="text-xl text-gray-600 mb-8">{categoryDescriptions[category]}</p>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center text-2xl text-indigo-600 font-semibold"
                  >
                    {expandedCategory === category ? (
                      <>
                        <span>Hide Products</span>
                        <ChevronUp className="w-8 h-8 ml-2" />
                      </>
                    ) : (
                      <>
                        <span>Show Products</span>
                        <ChevronDown className="w-8 h-8 ml-2" />
                      </>
                    )}
                  </button>
                </div>
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src={categoryImages[category] || "/placeholder.svg"}
                    alt={category}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              {expandedCategory === category && (
                <div className="p-12 border-t">
                  <div className="relative">
                    <div className="flex overflow-x-auto space-x-8 pb-8">
                      {products
                        .filter((product) => product.category === category)
                        .slice(0, 4)
                        .map((product) => (
                          <Link href={`/products/${product.id}`} key={product.id} className="flex-shrink-0">
                            <div className="w-96 bg-white border-2 rounded-xl p-6 hover:shadow-2xl transition-shadow">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={360}
                                height={360}
                                className="w-full h-80 object-cover mb-6 rounded-lg"
                              />
                              <h3 className="text-2xl font-semibold truncate mb-2">{product.name}</h3>
                              <p className="text-3xl text-indigo-600 font-bold mb-4">${product.price.toFixed(2)}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-8 h-8 ${
                                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="text-xl text-gray-500 ml-2">({product.reviews})</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                    <Link
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-indigo-100 transition-colors"
                    >
                      <svg
                        className="w-8 h-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

