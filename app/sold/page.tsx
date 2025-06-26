import { fetchListingsIndex } from "@/lib/api";
import PropertyCard from "@/components/property-card";
import { PropertyCardSkeleton } from "@/components/property-card-skeleton";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";
import { Listing } from "@/types/listing";
import SearchBar from "@/components/search/search-bar";
import PropertyFilters from "@/components/property-filters";

const GRID_PAGE_SIZE = 12;

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    suburb?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    category?: string;
    categories?: string;
    propertyType?: string;
    agent?: string;
  }>;
}

export default async function SoldPage({
  searchParams
}: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  
  let listings: Listing[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let error = null;

  try {
    // Fetch ALL sold properties using the centralized API function
    const res = await fetchListingsIndex({
      disposalMethod: "sold",
      type: "Residential",
      fetchAll: true, // Fetch all results for comprehensive listing
      page,
      resultsPerPage: GRID_PAGE_SIZE,
      orderBy: "dateListed",
      orderDirection: "desc",
      // Add search filters from URL params
      suburb: typeof params?.suburb === 'string' ? params.suburb : undefined,
      minPrice: params?.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
      bedrooms: params?.bedrooms ? Number(params.bedrooms) : undefined,
      bathrooms: params?.bathrooms ? Number(params.bathrooms) : undefined,
      category: typeof params?.category === 'string' ? params.category : undefined,
      propertyType: typeof params?.propertyType === 'string' ? params.propertyType : undefined,
      agentID: typeof params?.agent === 'string' ? params.agent : undefined,
      // Add categories filter support
      categories: params?.categories ? params.categories.split(',').filter(Boolean) : []
    });
    
    listings = res.listings || [];
    totalCount = res.pagination?.totalResults || 0;
    totalPages = res.pagination?.totalPages || 1;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load sold properties";
    console.log("Error fetching sold properties:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-primary-600 hover:text-primary-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">Sold Properties</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Recently Sold Properties</h1>
          <p className="text-gray-600 mb-4">
            Browse recently sold properties in Mackay and surrounding areas to understand current market values.
          </p>
          
          {/* Results Summary */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600">
              {totalCount > 0 ? (
                <>
                  <span className="font-semibold text-gray-800">{totalCount}</span> {totalCount === 1 ? "property" : "properties"} sold
                  {totalPages > 1 && (
                    <span className="ml-2">• Page {page} of {totalPages}</span>
                  )}
                </>
              ) : (
                "No sold properties found"
              )}
            </div>
            
            {/* Property Type Filters */}
            <div className="flex space-x-2">
              <Link 
                href="/for-sale" 
                className="px-4 py-2 text-gray-600 hover:text-primary-600 text-sm font-medium"
              >
                For Sale
              </Link>
              <Link 
                href="/for-rent" 
                className="px-4 py-2 text-gray-600 hover:text-primary-600 text-sm font-medium"
              >
                For Rent
              </Link>
              <Link 
                href="/sold" 
                className="px-4 py-2 bg-primary-600 text-white rounded text-sm font-medium"
              >
                Recently Sold
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="mb-6">
            <SearchBar variant="header" defaultPropertyType="sold" />
          </div>
          <PropertyFilters />
        </div>

        {/* Properties Grid */}
        <div className="mb-8">
          {error ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Unable to Load Properties</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Sold Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or view our current listings.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/for-sale" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    View Properties For Sale
                  </Link>
                  <Link href="/for-rent" className="bg-white text-primary-600 border border-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                    View Rental Properties
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing: Listing) => (
                <PropertyCard key={listing.listingID || listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              basePath="/sold"
              className="bg-white rounded-lg shadow-sm p-4"
              searchParams={new URLSearchParams(
                Object.entries(params || {})
                  .filter(([_, value]) => value !== undefined)
                  .map(([key, value]) => [key, String(value)])
              )}
            />
          </div>
        )}

        {/* Call to Action */}
        {listings.length > 0 && (
          <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Thinking of Selling?</h2>
            <p className="text-gray-600 mb-6">
              Get a free property appraisal and see what your home could be worth in today's market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appraisal-request" 
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Request Free Appraisal
              </Link>
              <Link 
                href="/agents" 
                className="bg-white text-primary-600 border border-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                Speak to an Agent
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
