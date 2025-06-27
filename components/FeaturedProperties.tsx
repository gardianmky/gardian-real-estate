"use client";

import Link from "next/link";
import { Listing } from "@/types";

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
              <h3 className="font-semibold">{listing.heading}</h3>
              <p className="text-gray-500">{listing.price}</p>
              <Link
                href={`/listing/${listing.listingID}`}
                className="text-teal-700 font-medium block mt-2"
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