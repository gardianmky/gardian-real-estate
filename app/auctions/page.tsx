import { fetchListingsIndex } from "@/lib/api";
import PropertyCard from "@/components/property-card";
import Link from "next/link";
import { PaginationServer } from "@/components/ui/pagination";
import { Listing } from "@/types/listing";
import SearchBar from "@/components/search/search-bar";
import PropertyFilters from "@/components/property-filters";
import { ReloadButton } from "@/components/ui/reload-button";

const GRID_PAGE_SIZE = 12;

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    suburb?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    disposalMethod?: string;
    categories?: string;
    propertyType?: string;
    agent?: string;
  }>;
}

export default async function AuctionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);

  let listings: Listing[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let error = null;

  try {
    console.log(`Fetching auction properties (Page ${page})`);

    const result = await fetchListingsIndex({
      page,
      type: "Residential",
      disposalMethod: "auction",
      resultsPerPage: GRID_PAGE_SIZE,
      suburb: typeof params?.suburb === "string" ? params.suburb : undefined,
      minPrice: params?.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
      category: typeof params?.category === "string" ? params.category : undefined,
      propertyType: typeof params?.propertyType === "string" ? params.propertyType : undefined,
      agentID: typeof params?.agent === "string" ? params.agent : undefined,
    });

    listings = Array.isArray(result?.listings) ? result.listings : [];

    if (result?.pagination) {
      totalCount = result.pagination.totalCount || 0;
      totalPages = result.pagination.totalPages || 1;
    }

    console.log(`Auction properties loaded: ${listings.length} properties found`);
  } catch (err) {
    console.error("Failed to fetch auction properties:", err);
    error = err instanceof Error ? err.message : "Failed to load auction properties";
  }

  const hasFilters = Object.keys(params || {}).some((key) =>
    ["suburb", "minPrice", "maxPrice", "category", "propertyType", "agent"].includes(key)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Auctions</h1>
              <p className="text-gray-600 mt-1">
                Discover upcoming property auctions in Mackay
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ReloadButton />
              <Link
                href="/"
                className="text-teal-600 hover:text-teal-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <PropertyFilters />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {hasFilters ? "Filtered Results" : "All Auctions"}
                </h2>
                <span className="text-sm text-gray-500">
                  {totalCount} {totalCount === 1 ? "property" : "properties"}
                </span>
              </div>
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 mb-4">Failed to load auction properties</p>
                <p className="text-sm text-red-500">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : listings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-6">🏛️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Auctions Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {hasFilters
                    ? "No auction properties match your current filters. Try adjusting your search criteria."
                    : "There are currently no auction properties available. Check back soon for new listings!"}
                </p>
                {hasFilters && (
                  <Link
                    href="/auctions"
                    className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Clear Filters
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {listings.map((listing) => (
                    <PropertyCard key={listing.listingID} listing={listing} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <PaginationServer
                      currentPage={page}
                      totalPages={totalPages}
                      baseUrl="/auctions"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}