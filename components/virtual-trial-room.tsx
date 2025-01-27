"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface VirtualTrialRoomProps {
  productImage: string
}

export default function VirtualTrialRoom({ productImage }: VirtualTrialRoomProps) {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [combinedImage, setCombinedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (userImage && productImage && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const userImg = new Image()
        const productImg = new Image()

        userImg.onload = () => {
          canvas.width = userImg.width
          canvas.height = userImg.height
          ctx.drawImage(userImg, 0, 0)

          productImg.onload = () => {
            const scale = Math.min(canvas.width / productImg.width, canvas.height / productImg.height)
            const x = canvas.width / 2 - (productImg.width / 2) * scale
            const y = canvas.height / 2 - (productImg.height / 2) * scale
            ctx.drawImage(productImg, x, y, productImg.width * scale, productImg.height * scale)
            setCombinedImage(canvas.toDataURL())
          }
          productImg.src = productImage
        }
        userImg.src = userImage
      }
    }
  }, [userImage, productImage])

  return (
    <div className="mt-8 bg-pink-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Virtual Trial Room</h2>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Upload Your Image
        </button>
        <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
        <div className="relative w-64 h-64 border rounded-lg overflow-hidden">
          {combinedImage ? (
            <Image src={combinedImage ?? "/placeholder.svg"} alt="Virtual Trial" layout="fill" objectFit="contain" />
          ) : userImage ? (
            <Image src={userImage ?? "/placeholder.svg"} alt="User" layout="fill" objectFit="cover" />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p className="text-gray-500">Upload an image to start</p>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        {combinedImage && <p className="text-sm text-gray-600">This is how the product might look on you!</p>}
      </div>
    </div>
  )
}

