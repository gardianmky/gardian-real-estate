import Link from "next/link"
import Image from "next/image"
import { Home, Bath } from "lucide-react"
import type { Listing } from "@/types/listing"
import { PropertyFeaturesInline } from "@/components/ui/property-features"
import { cleanPropertyTitle } from "@/lib/utils"

interface ListingsGridProps {
  listings: Listing[]
}

interface ListingCardProps {
  listing: Listing
}

function ListingCard({ listing }: ListingCardProps) {
  // Extract property details
  const { listingID, heading, address, price, bedBathCarLand, images, type, categories } = listing

  // Get the first image or use a placeholder
  const imageUrl = images && images.length > 0 ? images[0].url : "/placeholder.svg?height=400&width=600"

  // Get property features
  const bedrooms = bedBathCarLand?.find((item) => item.key === "bedrooms")?.value
  const bathrooms = bedBathCarLand?.find((item) => item.key === "bathrooms")?.value

  // Format address
  const formattedAddress = `${address.street}, ${address.suburb}`

  // Determine if it's a commercial property
  const isCommercial = type === "Commercial" || categories?.includes("Commercial") || false

  return (
    <Link
      href={`/listing/${listingID}`}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Property Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={heading || "Property listing"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {isCommercial ? "Commercial" : "Residential"}
        </div>
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm font-bold px-3 py-1 rounded-full">
          {price}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">
          {cleanPropertyTitle(heading)}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{formattedAddress}</p>

        {/* Property Features */}
        <div className="mb-4">
          <PropertyFeaturesInline listing={listing} />
        </div>

        {/* View Details Button */}
        <div className="mt-auto">
          <button className="w-full bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center">
            View Details
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  if (!listings || listings.length === 0) {
    return <div className="text-center py-8 text-gray-500">No listings available at this time.</div>
  }

  // Adjust the grid layout to better accommodate two cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.listingID} listing={listing} />
      ))}
    </div>
  )
}
