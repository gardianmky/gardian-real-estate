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
    // Fetch sold properties using proper pagination
    const res = await fetchListingsIndex({
      disposalMethod: "sold",
      type: "Residential",
      fetchAll: false, // Use proper pagination for sold listings
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
      {/* Hero Section - Mobile Responsive */}
      <section className="relative bg-gradient-to-br from-blue-25 via-blue-50 to-indigo-50 py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-100/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb - Mobile Responsive */}
          <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-800 font-medium">Recently Sold</li>
            </ol>
          </nav>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 text-gray-800 leading-tight">
              Recently Sold Properties
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed px-4">
              Browse recently sold properties in Mackay and surrounding areas to understand current market values and trends.
            </p>
            
            {/* Quick Stats - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/50 shadow-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {totalCount > 0 ? totalCount : '0'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Properties Sold</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/50 shadow-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 mb-1 sm:mb-2">
                  {totalPages > 1 ? `${page}/${totalPages}` : '1'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Current Page</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/50 shadow-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-1 sm:mb-2">
                  Live
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Market Data</div>
              </div>
            </div>
            
            {/* Property Type Navigation - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
              <Link 
                href="/for-sale" 
                className="inline-flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                For Sale
              </Link>
              <Link 
                href="/for-rent" 
                className="inline-flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                For Rent
              </Link>
              <div className="inline-flex items-center justify-center bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recently Sold
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

        {/* Search and Filters - Mobile Responsive */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Search Sold Properties</h2>
            <SearchBar variant="header" defaultPropertyType="sold" />
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <PropertyFilters />
          </div>
        </div>

        {/* Results Summary - Mobile Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="text-sm sm:text-base text-gray-600">
              {totalCount > 0 ? (
                <>
                  <span className="font-semibold text-gray-800 text-base sm:text-lg">{totalCount}</span> {totalCount === 1 ? "property" : "properties"} sold
                  {totalPages > 1 && (
                    <span className="block sm:inline sm:ml-2 text-xs sm:text-sm text-gray-500">
                      • Page {page} of {totalPages}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-500">No sold properties found</span>
              )}
            </div>
            
            {/* Market Insights - Mobile Responsive */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="bg-primary-50 text-primary-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium">
                Live Data
              </div>
              <div className="bg-green-50 text-green-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium">
                Recent Sales
              </div>
              <div className="bg-purple-50 text-purple-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium">
                Market Trends
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid - Mobile Responsive */}
        <div className="mb-8 sm:mb-12">
          {error ? (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">Unable to Load Properties</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">No Sold Properties Found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Try adjusting your search criteria or view our current listings.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/for-sale" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium text-center">
                    View Properties For Sale
                  </Link>
                  <Link href="/for-rent" className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium text-center">
                    View Rental Properties
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {listings.map((listing: Listing) => (
                <PropertyCard key={listing.listingID || listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination - Mobile Responsive */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                basePath="/sold"
                searchParams={new URLSearchParams(
                  Object.entries(params || {})
                    .filter(([_, value]) => value !== undefined)
                    .map(([key, value]) => [key, String(value)])
                )}
              />
            </div>
          </div>
        )}

        {/* Market Insights Section - Mobile Responsive */}
        {listings.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">Market Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{totalCount}</div>
                <div className="text-sm text-gray-600">Recent Sales</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">Active</div>
                <div className="text-sm text-gray-600">Market Status</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">Live</div>
                <div className="text-sm text-gray-600">Data Updates</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">Trending</div>
                <div className="text-sm text-gray-600">Sales Activity</div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action - Mobile Responsive */}
        {listings.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-xl sm:rounded-2xl"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Thinking of Selling?</h2>
              <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed opacity-90">
                Get a free property appraisal and see what your home could be worth in today's market.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
                <Link 
                  href="/appraisal-request" 
                  className="inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 group text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Request Free Appraisal
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/agents" 
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold group text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Speak to an Agent
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
