import { Loader2 } from "lucide-react"

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 text-primary-500 animate-spin mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Search Results</h2>
        <p className="text-gray-500">Please wait while we find the perfect properties for you...</p>
      </div>
    </div>
  )
}
