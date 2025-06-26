import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-16 w-16 text-primary-500 animate-spin mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Properties</h2>
        <p className="text-gray-500">Please wait while we find the perfect properties for you...</p>
      </div>
    </div>
  )
}
