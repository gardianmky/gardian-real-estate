"use client";

import Link from "next/link";
import { Listing } from "@/types";
import { PropertyFeaturesInline } from "@/components/ui/property-features";

interface FeaturedPropertiesProps {
  listings: Listing[];
}

export default function FeaturedProperties({ listings }: FeaturedPropertiesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.slice(0, 6).map((listing) => (
          <div key={listing.listingID} className="border rounded-lg shadow hover:shadow-lg transition">
            <img
              src={listing.images[0]?.url || '/placeholder.jpg'}
              alt={listing.heading}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{listing.heading}</h3>
              
              {/* Address */}
              {listing.address && (
                <p className="text-gray-600 text-sm mb-3">
                  {listing.address.street}, {listing.address.suburb}, {listing.address.state} {listing.address.postcode}
                </p>
              )}
              
              <p className="text-xl font-bold text-teal-600 mb-4">{listing.price}</p>
              
              {/* Property Features */}
              <div className="mb-4">
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
              
              <Link
                href={`/listing/${listing.listingID}`}
                className="text-teal-700 font-medium block mt-2 hover:text-teal-800 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}