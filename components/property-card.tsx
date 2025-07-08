import { Listing } from "@/types/listing";
import { PropertyFeaturesInline } from "@/components/ui/property-features";
import { cleanPropertyTitle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PropertyCardProps {
  listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
    const image = listing.images?.[0]?.url || "/placeholder.jpg";
    const price = listing.price || "Contact Agent";
    
    // Handle address - API's "address" field might contain agent info or actual address
    let address = "Property Location";
    if (listing.heading) {
      address = listing.heading;
    } else if (listing.address) {
      // Check if it's an agent object (has agentID) or address object
      if ('agentID' in listing.address) {
        // This is agent info, use heading instead
        address = listing.heading || "Property Location";
      } else {
        // This is actual address info
        const addressParts = [
          listing.address.street,
          listing.address.suburb,
          listing.address.state,
          listing.address.postcode,
        ].filter(Boolean);
        
        if (addressParts.length > 0) {
          address = addressParts.join(", ");
        } else if (listing.address.displayAddress) {
          address = listing.address.displayAddress;
        }
      }
    }
  
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={listing.heading} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors duration-300 capitalize">
            {cleanPropertyTitle(listing.heading).toLowerCase()}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">{address}</p>
          <p className="font-bold text-xl text-teal-600 mb-4">{price}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
            <PropertyFeaturesInline listing={listing} />
            
            {/* Agent Information */}
            {listing.agents && listing.agents.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{listing.agents[0].name || 'Contact Agent'}</span>
              </div>
            )}
            
            {/* Click-through button to listing page */}
            <Button asChild variant="primary" size="default" className="w-full">
              <Link href={`/listing/${listing.listingID || listing.id}`}>
                <span className="flex items-center justify-center">
                  View Property Details
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
}