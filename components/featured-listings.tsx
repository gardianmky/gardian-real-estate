import type { Listing } from "@/types/listing";
import { PropertyFeaturesInline } from "@/components/ui/property-features";

interface Props {
  listings: Listing[];
}

export default function FeaturedListings({ listings }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <div key={listing.listingID} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="font-bold text-lg text-gray-900 mb-2">{listing.heading}</div>
          <div className="text-gray-600 text-sm mb-3">
            {listing.address?.street}, {listing.address?.suburb}, {listing.address?.state} {listing.address?.postcode}
          </div>
          <div className="text-xl font-bold text-teal-600 mb-4">{listing.price}</div>
          
          {/* Property Features */}
          <div className="mb-4">
            <PropertyFeaturesInline listing={listing} />
          </div>

          {/* Agent Information */}
          {listing.agents && listing.agents.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{listing.agents[0].name || 'Contact Agent'}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}