import type { Metadata } from "next";
import { Listing } from "@/types";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";
import PropertyCard from "@/components/property-card";
import { PropertyCardSkeleton } from "@/components/property-card-skeleton";
import SearchBar from "@/components/search/search-bar";
import PropertyFilters from "@/components/property-filters";
import { fetchListingsIndex } from "@/lib/api";
import { ReloadButton } from "@/components/ui/reload-button";

const GRID_PAGE_SIZE = 12;

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    suburb?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertyType?: string;
    agent?: string;
    categories?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Properties For Rent | Gardian Real Estate",
  description:
    "Browse our selection of rental properties in Mackay and surrounding areas",
};

export default async function ForRentPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);

  let listings: Listing[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let isLoading = false;
  let error = null;

  try {
    console.log(`🏠 Fetching residential properties for rent (Page ${page})`);

    // Use the simple, direct API endpoint as documented
    const { listings: fetchedListings, pagination } = await fetchListingsIndex({
      page,
      type: "Residential",
      disposalMethod: "forRent",
      resultsPerPage: GRID_PAGE_SIZE,
      // Add search filters from URL params
      suburb: typeof params?.suburb === "string" ? params.suburb : undefined,
      minPrice: params?.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
      bedrooms: params?.bedrooms ? Number(params.bedrooms) : undefined,
      bathrooms: params?.bathrooms ? Number(params.bathrooms) : undefined,
      propertyType:
        typeof params?.propertyType === "string"
          ? params.propertyType
          : undefined,
      agentID: typeof params?.agent === "string" ? params.agent : undefined,
    });

    listings = Array.isArray(fetchedListings) ? fetchedListings : [];
    totalCount = pagination?.totalResults || 0;
    totalPages = pagination?.totalPages || 1;

    console.log(
      `✅ For-rent page: ${totalCount} total properties, showing ${listings.length} on page ${page}/${totalPages}`,
    );
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load properties";
    console.log("Error fetching properties:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-teal-600 hover:text-teal-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-teal-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">Properties For Rent</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Properties For Rent
          </h1>
          <p className="text-gray-600 mb-4">
            Browse our selection of rental properties in Mackay and surrounding
            areas. Find your perfect rental home today!
          </p>

          {/* Rental Application Form Link */}
          <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-teal-800 mb-1">Ready to Apply?</h3>
                <p className="text-sm text-teal-600">Download the official REIQ rental application form</p>
              </div>
              <a 
                href="https://www.rta.qld.gov.au/sites/default/files/2025-03/Form-22-Rental-application.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Download REIQ Rental Application Form (PDF)
              </a>
            </div>
            <p className="text-xs text-teal-500 mt-2">
              Please complete and return this form to apply for a rental property
            </p>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600">
              {listings.length > 0 ? (
                <div>
                  <span className="font-semibold text-gray-800">
                    {totalCount}
                  </span>{" "}
                  {totalCount === 1 ? "property" : "properties"} found
                  {totalPages > 1 && (
                    <span className="ml-2">
                      • Page {page} of {totalPages}
                    </span>
                  )}
                </div>
              ) : (
                <div>No properties found</div>
              )}
            </div>

            {/* Responsive Property Type Filters */}
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
              <Link
                href="/for-sale"
                className="px-3 sm:px-4 py-2 text-center text-gray-600 hover:text-teal-600 text-sm font-medium transition-colors duration-200 rounded hover:bg-gray-50"
              >
                For Sale
              </Link>
              <Link
                href="/for-rent"
                className="px-3 sm:px-4 py-2 text-center bg-teal-600 text-white rounded text-sm font-medium"
              >
                For Rent
              </Link>
              <Link
                href="/commercial"
                className="px-3 sm:px-4 py-2 text-center text-gray-600 hover:text-teal-600 text-sm font-medium transition-colors duration-200 rounded hover:bg-gray-50"
              >
                Commercial
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="mb-6">
            <SearchBar variant="header" defaultPropertyType="rent" />
          </div>
          <PropertyFilters />
        </div>

        {/* Properties Grid */}
        <div className="mb-8">
          {error ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-red-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Unable to Load Properties
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <ReloadButton className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Try Again
              </ReloadButton>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: GRID_PAGE_SIZE }).map((_, i) => (
                <PropertyCardSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse our other
                  property types.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/for-sale"
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    View Properties For Sale
                  </Link>
                  <Link
                    href="/commercial"
                    className="bg-white text-teal-600 border border-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    Commercial Properties
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing, index) => (
                <PropertyCard
                  key={listing.listingID || listing.id || `listing-${index}`}
                  listing={listing}
                />
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
              basePath="/for-rent"
              className="bg-white rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Call to Action */}
        {listings.length > 0 && (
          <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Looking to Sell Your Property?
            </h2>
            <p className="text-gray-600 mb-6">
              Get a free property appraisal and expert advice on selling your property in today's market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appraisal-request"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Get Free Appraisal
              </Link>
              <Link
                href="/contact"
                className="bg-white text-teal-600 border border-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors font-medium"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
