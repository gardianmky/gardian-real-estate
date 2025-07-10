"use client";

import { Listing } from "@/types/listing";
import { PropertyFeaturesCard } from "@/components/ui/property-features";
import { cleanPropertyTitle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RegularImageWithFallback } from "@/components/ui/image-with-fallback";
import Link from "next/link";

interface PropertyCardProps {
  listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  const image = listing.images?.[0]?.url || "/placeholder.jpg";
  const price = listing.price || "Contact Agent";

  // Handle address - priority: displayAddress > constructed address > heading
  let address = "Property Location";
  let fullAddress = "Property Location";

  if (listing.address && !("agentID" in listing.address)) {
    // This is actual address info
    if (listing.address.displayAddress) {
      fullAddress = listing.address.displayAddress;
      address = listing.address.displayAddress;
    } else {
      const addressParts = [
        listing.address.street,
        listing.address.suburb,
        listing.address.state,
        listing.address.postcode,
      ].filter(Boolean);

      if (addressParts.length > 0) {
        fullAddress = addressParts.join(", ");
        // For card display, show street + suburb for better readability
        const shortAddress = [listing.address.street, listing.address.suburb]
          .filter(Boolean)
          .join(", ");
        address = shortAddress || fullAddress;
      }
    }
  } else if (listing.heading) {
    address = listing.heading;
    fullAddress = listing.heading;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 card-hover">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={listing.heading}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {/* Property Address - Most Prominent */}
        <div className="mb-3">
          <h3
            className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300"
            title={fullAddress}
          >
            {address}
          </h3>
        </div>

        {/* Property Type/Heading if different from address */}
        {listing.heading && address !== listing.heading && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-1 capitalize">
            {cleanPropertyTitle(listing.heading).toLowerCase()}
          </p>
        )}

        {/* Price */}
        <p className="font-bold text-xl text-teal-600 mb-4">{price}</p>

        {/* Property Specifications - More Prominent */}
        <div className="mb-4">
          <PropertyFeaturesCard listing={listing} className="flex-wrap" />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
          {/* Agent Information with Photo */}
          {listing.agents && listing.agents.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex items-center">
                {listing.agents[0].imageURL ? (
                  <RegularImageWithFallback
                    src={listing.agents[0].imageURL}
                    alt={listing.agents[0].name || "Agent"}
                    className="w-8 h-8 rounded-full object-cover mr-3 border border-gray-200"
                    onHide={() => {
                      // This will be handled by the client component
                    }}
                  />
                ) : null}
                <div
                  className={`w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 ${listing.agents[0].imageURL ? "hidden" : ""}`}
                >
                  <svg
                    className="w-4 h-4 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {listing.agents[0].name || "Contact Agent"}
                </span>
              </div>
            </div>
          )}

          {/* Click-through button to listing page */}
          <Button asChild variant="primary" size="default" className="w-full">
            <Link href={`/listing/${listing.listingID || listing.id}`}>
              <span className="flex items-center justify-center">
                View Property Details
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
