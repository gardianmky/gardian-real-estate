import Link from "next/link"

export default function ListingNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-10 rounded-xl shadow-soft">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-400 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Listing Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the property listing you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-primary-600 to-teal-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Return to Listings
        </Link>
      </div>
    </div>
  )
}
