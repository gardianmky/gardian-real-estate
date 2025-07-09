'use client';

import Image from "next/image";
import Link from "next/link";
import { Home, Bath, Car, Building, DollarSign } from "lucide-react";
import type { Listing } from "@/types/listing";
import { PropertyFeaturesCard } from "@/components/ui/property-features";
import { RegularImageWithFallback } from "@/components/ui/image-with-fallback";

type ListingStatus = "forSale" | "forRent" | "sold" | "leased";

interface PropertyListingProps {
  listing: Listing;
  category: ListingStatus;
}

export default function PropertyListing({
  listing,
  category,
}: PropertyListingProps) {
  // Get the first image or use a placeholder
  const mainImage =
    listing.images && listing.images.length > 0
      ? listing.images[0].url
      : "/placeholder.svg?height=300&width=400";

  // Get badge text and icon based on category
  const getBadgeInfo = () => {
    switch (category) {
      case "forSale":
        return { text: "For Sale", icon: <Home className="h-4 w-4 mr-1" /> };
      case "forRent":
        return {
          text: "For Rent",
          icon: <DollarSign className="h-4 w-4 mr-1" />,
        };
      case "sold":
        return { text: "Sold", icon: <Home className="h-4 w-4 mr-1" /> };
      case "leased":
        return {
          text: "Leased",
          icon: <DollarSign className="h-4 w-4 mr-1" />,
        };
      default:
        return {
          text: "Property",
          icon: <Building className="h-4 w-4 mr-1" />,
        };
    }
  };

  const badge = getBadgeInfo();

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
            {/* Address as primary heading */}
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 transition-colors duration-200">
              {listing.address?.displayAddress ||
                `${listing.address?.street || ""}, ${listing.address?.suburb || ""}`
                  .trim()
                  .replace(/^,|,$/, "") ||
                listing.heading}
            </h3>
            {/* Property type/heading if different from address */}
            {listing.heading &&
              listing.heading !==
                (listing.address?.displayAddress ||
                  `${listing.address?.street || ""}, ${listing.address?.suburb || ""}`
                    .trim()
                    .replace(/^,|,$/, "")) && (
                <p className="text-gray-600 text-sm mb-2">{listing.heading}</p>
              )}
          </div>

          <p className="text-xl font-bold text-teal-600 mb-4">
            {listing.price}
          </p>

          <div className="mb-4">
            <PropertyFeaturesCard listing={listing} className="flex-wrap" />
          </div>

          {/* Agent Information with Photo */}
          {listing.agents && listing.agents.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 mb-4">
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

          <button className="w-full bg-gray-50 hover:bg-gray-100 text-teal-600 py-2 rounded-lg font-medium transition-colors duration-200 mt-auto">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
