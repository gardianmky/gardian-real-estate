"use client"

import Link from "next/link"

export default function StaticPagesNavigation() {
  return (
    <div className="bg-gray-50 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Browse Properties</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/buy" className="text-primary-600 hover:text-primary-800 transition-colors">
            For Sale
          </Link>
          <Link href="/for-sale" className="text-primary-600 hover:text-primary-800 transition-colors">
            For Sale (All)
          </Link>
          <Link href="/for-rent" className="text-primary-600 hover:text-primary-800 transition-colors">
            For Rent
          </Link>
          <Link href="/agents" className="text-primary-600 hover:text-primary-800 transition-colors">
            Our Agents
          </Link>
        </div>
      </div>
    </div>
  )
}