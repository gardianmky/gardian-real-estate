import { Metadata } from "next";
import { fetchListingsIndex } from "@/lib/api";
import PropertyCard from "@/components/property-card";

export const metadata: Metadata = {
  title: "Properties for Sale in Mackay | Gardian Real Estate",
  description:
    "Browse all properties for sale in Mackay and surrounding areas. Find your dream home with Gardian Real Estate - Mackay's trusted property experts.",
  openGraph: {
    title: "Properties for Sale in Mackay | Gardian Real Estate",
    description:
      "Browse all properties for sale in Mackay and surrounding areas. Find your dream home with Gardian Real Estate.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

interface BuyPageProps {
  searchParams: Promise<{
    page?: string;
    disposalMethod?: string;
    keywords?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertyType?: string;
    [key: string]: string | undefined;
  }>;
}

// Pagination Component
function Pagination({
  currentPage,
  totalPages,
  basePath = "/buy",
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  searchParams?: any;
}) {
  if (totalPages <= 1) return null;

  // Build query string preserving search parameters
  const buildQueryString = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('disposalMethod', 'forSale');
    
    // Preserve search parameters
    if (searchParams?.keywords) params.set('keywords', searchParams.keywords);
    if (searchParams?.location) params.set('location', searchParams.location);
    if (searchParams?.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams?.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams?.bedrooms) params.set('bedrooms', searchParams.bedrooms);
    if (searchParams?.bathrooms) params.set('bathrooms', searchParams.bathrooms);
    if (searchParams?.propertyType) params.set('propertyType', searchParams.propertyType);
    
    return `${basePath}?${params.toString()}`;
  };

  const pages = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    // Show first page
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
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
          href={buildQueryString(currentPage - 1)}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Previous
        </a>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <a
              href={buildQueryString(page as number)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-teal-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
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
          href={buildQueryString(currentPage + 1)}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Next
        </a>
      )}
    </div>
  );
}

async function getListings(page: number, searchParams: any) {
  try {
    const hasSearchCriteria = searchParams.keywords || searchParams.location;
    
    console.log(`🏠 Fetching residential properties for sale (Page ${page})`);
    if (hasSearchCriteria) {
      console.log(`🔍 Search criteria: keywords="${searchParams.keywords || ''}", location="${searchParams.location || ''}"`);
    }

    // Build API parameters with search filters
    const apiParams: any = {
      page,
      type: "Residential",
      disposalMethod: "forSale",
      resultsPerPage: 12,
    };

    // Add search parameters if provided
    if (searchParams.keywords) {
      apiParams.keywords = searchParams.keywords;
    }
    if (searchParams.location) {
      apiParams.suburb = searchParams.location;
    }
    if (searchParams.minPrice) {
      apiParams.minPrice = parseInt(searchParams.minPrice);
    }
    if (searchParams.maxPrice) {
      apiParams.maxPrice = parseInt(searchParams.maxPrice);
    }
    if (searchParams.bedrooms) {
      apiParams.bedrooms = parseInt(searchParams.bedrooms);
    }
    if (searchParams.bathrooms) {
      apiParams.bathrooms = parseInt(searchParams.bathrooms);
    }
    if (searchParams.propertyType) {
      apiParams.propertyTypes = searchParams.propertyType;
    }

    const result = await fetchListingsIndex(apiParams);

    // Ensure we have valid data
    const listings = Array.isArray(result?.listings) ? result.listings : [];
    const pagination = result?.pagination || {
      currentPage: page,
      totalPages: 1,
      nextPage: null,
      resultsPerPage: 12,
      totalResults: 0,
    };

    console.log(
      `✅ Buy page: ${pagination.totalResults} total properties, showing ${listings.length} on page ${page}/${pagination.totalPages}`,
    );

    return {
      listings,
      pagination,
      hasSearchCriteria,
      searchCriteria: {
        keywords: searchParams.keywords || '',
        location: searchParams.location || ''
      }
    };
  } catch (error) {
    console.error("Error fetching buy listings:", error);
    return {
      listings: [],
      pagination: {
        currentPage: page,
        totalPages: 1,
        nextPage: null,
        resultsPerPage: 12,
        totalResults: 0,
      },
      hasSearchCriteria: false,
      searchCriteria: { keywords: '', location: '' }
    };
  }
}

export default async function BuyPage({ searchParams }: BuyPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
  const { listings, pagination, hasSearchCriteria, searchCriteria } = await getListings(currentPage, resolvedSearchParams);

  // Ensure pagination has default values
  const safePagination = {
    currentPage: pagination?.currentPage || currentPage,
    totalPages: pagination?.totalPages || 1,
    nextPage: pagination?.nextPage || null,
    resultsPerPage: pagination?.resultsPerPage || 12,
    totalResults: pagination?.totalResults || 0,
  };

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
              Discover your dream home with Gardian Real Estate. Browse our
              extensive collection of properties for sale in Mackay and
              surrounding areas.
            </p>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Status Bar */}
        {hasSearchCriteria && (
          <div className="mb-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-teal-900 font-medium">
                  Searching for: 
                  {searchCriteria.keywords && <span className="ml-2 font-normal">"{searchCriteria.keywords}"</span>}
                  {searchCriteria.keywords && searchCriteria.location && <span className="mx-2">in</span>}
                  {searchCriteria.location && <span className="font-normal">"{searchCriteria.location}"</span>}
                </p>
                <p className="text-teal-700 text-sm mt-1">
                  {safePagination.totalResults} {safePagination.totalResults === 1 ? "result" : "results"} found
                </p>
              </div>
              <a
                href="/buy"
                className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 bg-white border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Search
              </a>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {hasSearchCriteria ? "Search Results" : "Properties for Sale"}
              </h2>
              <p className="text-gray-600">
                {!hasSearchCriteria && (
                  <>
                    {safePagination.totalResults}{" "}
                    {safePagination.totalResults === 1 ? "property" : "properties"}{" "}
                    available
                  </>
                )}
                {currentPage > 1 &&
                  ` (Page ${currentPage} of ${safePagination.totalPages})`}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                Page {safePagination.currentPage} of {safePagination.totalPages}
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
              currentPage={safePagination.currentPage}
              totalPages={safePagination.totalPages}
              basePath="/buy"
              searchParams={resolvedSearchParams}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any properties matching your criteria. Please
                try again later or contact us directly.
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
              Our experienced team at Gardian Real Estate can help you find the
              perfect property. Get in touch with us today for personalised
              assistance.
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
