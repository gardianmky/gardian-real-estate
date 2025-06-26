import { Listing } from "@/types/listing";
import { PropertyFeaturesInline } from "@/components/ui/property-features";

interface PropertyCardProps {
  listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
    const image = listing.images?.[0]?.url || "/placeholder.jpg";
    const price = listing.price || "Contact Agent";
    const address = [
      listing.address?.street,
      listing.address?.suburb,
      listing.address?.state,
      listing.address?.postcode,
    ]
      .filter(Boolean)
      .join(", ");
  
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
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
            {listing.heading}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">{address}</p>
          <p className="font-bold text-xl text-primary-600 mb-4">{price}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <PropertyFeaturesInline listing={listing} />
          </div>
        </div>
      </div>
    );
}