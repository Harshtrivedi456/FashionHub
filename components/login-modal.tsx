import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  const handleLogin = () => {
    router.push("/login")
    onClose()
  }

  const handleSignup = () => {
    router.push("/signup")
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6">You need to be logged in to add items to your cart.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={handleSignup}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

