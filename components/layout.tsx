"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const offers = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    text: "Summer Sale! 20% off on all summer collection items",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    text: "New Arrivals! Check out our latest fashion trends",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    text: "Free Shipping on orders over $50",
  },
]

export default function OfferCarousel() {
  const [currentOffer, setCurrentOffer] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      {offers.map((offer, index) => (
        <div
          key={offer.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentOffer ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={offer.image || "/placeholder.svg"} alt={`Offer ${offer.id}`} layout="fill" objectFit="cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <p className="text-xl font-bold">{offer.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

