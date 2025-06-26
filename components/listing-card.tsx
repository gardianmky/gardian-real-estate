import Image from "next/image"
import Link from "next/link"
import type { Listing } from "@/types/listing"
import { PropertyFeaturesInline } from "@/components/ui/property-features"

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const { listingID, heading, price, address, images, agents } = listing

  // Get the first image or use a placeholder
  const mainImage = images && images.length > 0 ? images[0].url : "/placeholder.svg?height=300&width=400"

  return (
    <Link href={`/listing/${listingID}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="relative h-64 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={heading}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="property-badge">For Sale</div>

          <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-full bg-white/90 backdrop-blur-sm text-teal-deep py-2 rounded-lg font-medium hover:bg-white transition-colors duration-200">
              Quick View
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h2 className="text-xl font-semibold line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
              {heading}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{`${address.street}, ${address.suburb}, ${address.state} ${address.postcode}`}</p>
          </div>

          <p className="text-xl font-bold text-primary-600 mb-5">{price}</p>

          <div className="border-t border-gray-100 pt-4 mb-5">
            <PropertyFeaturesInline listing={listing} />
          </div>

          {agents && agents.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 border-t border-gray-100 pt-4">
              {agents[0].imageURL && (
                <div className="agent-avatar mr-3">
                  <Image
                    src={agents[0].imageURL || "/placeholder.svg"}
                    alt={agents[0].name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              )}
              <div>
                <p className="font-medium">{agents[0].name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
