'use client';

import { useSearchContext } from 'context/search-context';
import { useState, useEffect } from 'react';
import { fetchListingsIndex, fetchAllPropertiesFromAPI } from '@/lib/api';
import PropertyCard from '@/components/property-card';
import { Listing } from '@/types/listing';

interface SearchResultsProps {
  propertyType: string;
  data?: any; // Made optional for backward compatibility
}

export default function SearchResults({ propertyType, data }: SearchResultsProps) {
  const { filters } = useSearchContext();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      setError(null);
      
      try {
        const disposalMethod = propertyType === 'buy' ? 'forSale' : 'forRent';
        console.log(`🔍 Search: Fetching ALL ${propertyType} properties...`);
        
        // Fetch ALL properties from API using new comprehensive strategy
        const allProperties = await fetchAllPropertiesFromAPI({
          disposalMethod,
          type: 'Residential', // Keep for API compatibility, but we'll filter client-side too
          ...filters // Include current search filters
        });
        
        // Client-side filtering since API type parameter is not working properly
        const filteredListings = allProperties.filter((listing: any) => {
          const propertyType = listing.type || listing.propertyType || listing.category;
          
          // Only include Residential properties
          if (propertyType !== 'Residential') {
            return false;
          }
          
          // Additional validation: exclude obvious commercial indicators
          const heading = (listing.heading || '').toLowerCase();
          const description = (listing.description || '').toLowerCase();
          const categories = listing.categories || [];
          
          const commercialIndicators = [
            'commercial', 'office', 'retail', 'industrial', 'warehouse', 
            'development', 'subdivision', 'business', 'investment opportunity'
          ];
          
          const hasCommercialIndicators = commercialIndicators.some(indicator => 
            heading.includes(indicator) || description.includes(indicator) ||
            categories.some((cat: string) => cat.toLowerCase().includes(indicator))
          );
          
          if (hasCommercialIndicators) {
            console.warn(`Filtering out potential commercial property from search: ${listing.heading}`);
            return false;
          }
          
          return true;
        });

        // Enhance properties with standardized data
        const enhancedListings = filteredListings.map((listing: any) => {
          const standardId = listing.listingID || listing.id;
          return {
            ...listing,
            id: standardId,
            listingID: standardId,
            bedBathCarLand: [
              { key: 'bedrooms', label: 'Bedrooms', value: listing.bedrooms?.toString() || '0' },
              { key: 'bathrooms', label: 'Bathrooms', value: listing.bathrooms?.toString() || '0' },
              { key: 'carSpaces', label: 'Car Spaces', value: listing.carSpaces?.toString() || '0' },
              { key: 'landSize', label: 'Land Size', value: listing.landSize?.toString() || '0' }
            ],
            description: listing.description || '',
            agents: listing.agents || [],
            images: listing.images?.map((img: any) => ({
              ...img,
              url: img.url?.replace('http://', 'https://') || img.url
            })) || []
          };
        });
        
        console.log(`✅ Search results: ${enhancedListings.length} total properties found`);
        setListings(enhancedListings);
      } catch (err) {
        setError('Failed to load search results');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [propertyType, filters]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Searching properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Search Results ({listings.length} properties found)
        </h2>
        <p className="text-gray-600 mt-2">
          Showing properties for {propertyType === 'buy' ? 'sale' : 'rent'}
        </p>
      </div>
      
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <PropertyCard key={listing.listingID || listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">No properties found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
}
