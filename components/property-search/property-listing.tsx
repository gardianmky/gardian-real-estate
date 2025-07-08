import Image from "next/image"
import Link from "next/link"
import { Home, Bath, Car, Building, DollarSign } from "lucide-react"
import type { Listing } from "@/types/listing"
import { PropertyFeaturesInline } from "@/components/ui/property-features"

type ListingStatus = "forSale" | "forRent" | "sold" | "leased"

interface PropertyListingProps {
  listing: Listing
  category: ListingStatus
}

export default function PropertyListing({ listing, category }: PropertyListingProps) {
  // Get the first image or use a placeholder
  const mainImage =
    listing.images && listing.images.length > 0 ? listing.images[0].url : "/placeholder.svg?height=300&width=400"

  // Get badge text and icon based on category
  const getBadgeInfo = () => {
    switch (category) {
      case "forSale":
        return { text: "For Sale", icon: <Home className="h-4 w-4 mr-1" /> }
      case "forRent":
        return { text: "For Rent", icon: <DollarSign className="h-4 w-4 mr-1" /> }
      case "sold":
        return { text: "Sold", icon: <Home className="h-4 w-4 mr-1" /> }
      case "leased":
        return { text: "Leased", icon: <DollarSign className="h-4 w-4 mr-1" /> }
      default:
        return { text: "Property", icon: <Building className="h-4 w-4 mr-1" /> }
    }
  }

  const badge = getBadgeInfo()

  return (
    <Link href={`/listing/${listing.listingID}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover h-full">
        <div className="relative h-64 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
          <Image
            src={mainImage}
            alt={listing.heading}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 z-20 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            {badge.icon}
            {badge.text}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-teal-600 transition-colors duration-200">
              {listing.heading}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {`${listing.address.street}, ${listing.address.suburb}, ${listing.address.state} ${listing.address.postcode}`}
            </p>
          </div>

          <p className="text-xl font-bold text-teal-600 mb-2">{listing.price}</p>

          <div className="border-t border-gray-100 pt-4 mb-5">
            <PropertyFeaturesInline listing={listing} />
          </div>

          {/* Agent Information */}
          {listing.agents && listing.agents.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{listing.agents[0].name || 'Contact Agent'}</span>
            </div>
          )}

          <button className="w-full bg-gray-50 hover:bg-gray-100 text-teal-600 py-2 rounded-lg font-medium transition-colors duration-200 mt-auto">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}
