import { Listing } from "types/index";
import { PropertyFeaturesInline } from "@/components/ui/property-features";

interface FeaturedPropertyProps {
  property: Listing | null | undefined;
}

export default function FeaturedPropertyShowcase({ property }: FeaturedPropertyProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {property ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-64 relative rounded-lg overflow-hidden">
            {property.images && property.images[0] && (
              <img
                src={property.images[0].url}
                alt={property.heading}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{property.heading}</h2>
            <p className="text-gray-600 mb-4">
              {property.address.street}, {property.address.suburb},{" "}
              {property.address.state} {property.address.postcode}
            </p>
            <p className="text-teal-600 text-xl font-semibold mb-4">{property.price}</p>
            
            {/* Property Features */}
            <div className="mb-4">
              <PropertyFeaturesInline listing={property} />
            </div>

            {/* Agent Information */}
            {property.agents && property.agents.length > 0 && (
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{property.agents[0].name || 'Contact Agent'}</span>
              </div>
            )}

            <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No featured property available</p>
        </div>
      )}
    </div>
  );
}