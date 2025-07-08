import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchListingsIndex } from '@/lib/api';
import PropertyCard from '@/components/property-card';
import { PropertyFeaturesInline } from '@/components/ui/property-features';

export const metadata: Metadata = {
  title: 'Properties for Sale in Mackay | Gardian Real Estate',
  description: 'Browse all properties for sale in Mackay and surrounding areas. Find your dream home with Gardian Real Estate - Mackay\'s trusted property experts.',
  openGraph: {
    title: 'Properties for Sale in Mackay | Gardian Real Estate',
    description: 'Browse all properties for sale in Mackay and surrounding areas. Find your dream home with Gardian Real Estate.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface BuyPageProps {
  searchParams: { 
    page?: string; 
    disposalMethod?: string;
    [key: string]: string | undefined;
  };
}

// Pagination Component
function Pagination({ 
  currentPage, 
  totalPages, 
  basePath = '/buy'
}: { 
  currentPage: number; 
  totalPages: number; 
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showEllipsis = totalPages > 7;
  
  if (showEllipsis) {
    // Show first page
    pages.push(1);
    
    if (currentPage > 4) {
      pages.push('...');
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }
    
    // Show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 && (
        <a
          href={`${basePath}?page=${currentPage - 1}&disposalMethod=forSale`}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Previous
        </a>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <span key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <a
              href={`${basePath}?page=${page}&disposalMethod=forSale`}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-teal-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </a>
          )}
        </span>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <a
          href={`${basePath}?page=${currentPage + 1}&disposalMethod=forSale`}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Next
        </a>
      )}
    </div>
  );
}

async function getListings(page: number) {
  try {
    // Fetch all results to properly handle pagination after filtering
    const { listings } = await fetchListingsIndex({
      page: 1, // Always fetch from page 1 since we need to filter first
      disposalMethod: 'forSale',
      type: 'Residential', // API type filter doesn't work, but keep for future compatibility
      fetchAll: true, // Get all results for proper filtering and pagination
      resultsPerPage: 200, // Large number to get most properties
      orderBy: 'dateListed',
      orderDirection: 'desc'
    });

    // Client-side filtering since API type parameter is not working
    const filteredListings = listings.filter((listing: any) => {
      // Only include Residential properties
      const propertyType = listing.type || listing.propertyType || listing.category;
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
        console.warn(`Filtering out potential commercial property from buy listings: ${listing.heading}`);
        return false;
      }
      
      return true;
    });

    // Apply proper pagination after filtering
    const resultsPerPage = 12;
    const totalResults = filteredListings.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedListings = filteredListings.slice(startIndex, endIndex);

    return { 
      listings: paginatedListings, 
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        resultsPerPage: resultsPerPage,
        totalResults: totalResults
      }
    };
  } catch (error) {
    console.error('Error fetching buy listings:', error);
    return { 
      listings: [], 
      pagination: { 
        currentPage: 1, 
        totalPages: 1, 
        nextPage: null, 
        resultsPerPage: 12, 
        totalResults: 0 
      } 
    };
  }
}

export default async function BuyPage({ searchParams }: BuyPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const { listings, pagination } = await getListings(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Properties for Sale in Mackay
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Discover your dream home with Gardian Real Estate. Browse our extensive collection of properties for sale in Mackay and surrounding areas.
            </p>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Properties for Sale
              </h2>
              <p className="text-gray-600">
                {pagination.totalResults} {pagination.totalResults === 1 ? 'property' : 'properties'} found
                {currentPage > 1 && ` (Page ${currentPage} of ${pagination.totalPages})`}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {listings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {listings.map((listing: any) => (
                <PropertyCard key={listing.listingID} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages}
              basePath="/buy"
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any properties matching your criteria. Please try again later or contact us directly.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our experienced team at Gardian Real Estate can help you find the perfect property. 
              Get in touch with us today for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Contact Our Team
              </a>
              <a 
                href="/agents" 
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Our Agents
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
