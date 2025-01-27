import Link from "next/link"
import Layout from "../components/layout"

export default function OrderConfirmationPage() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl mb-8">Thank you for your purchase. Your order has been successfully placed.</p>
        <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </Layout>
  )
}

