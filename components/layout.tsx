import Link from "next/link"
import { useContext } from "react"
import { AuthContext } from "../contexts/auth-context"
import { CartContext } from "../contexts/cart-context"
import { categories } from "../data/products"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            FashionHub
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-lg hover:underline">
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="text-lg hover:underline"
              >
                {category}
              </Link>
            ))}
            <Link href="/cart" className="text-lg hover:underline">
              Cart ({cart.length})
            </Link>
            {user ? (
              <>
                <span className="text-lg">Welcome, {user.name}</span>
                <button onClick={logout} className="text-lg hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-lg hover:underline">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>Email: info@fashionhub.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Fashion Street, Style City, FC 12345</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 FashionHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

