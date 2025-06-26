import { Listing } from "types/index";

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
            <p className="text-primary-600 text-xl font-semibold">{property.price}</p>
            <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
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