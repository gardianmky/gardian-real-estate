import { fetchListingsIndex } from "@/lib/api";
import PropertyCard from "@/components/property-card";
import { PropertyCardSkeleton } from "@/components/property-card-skeleton";
import Link from "next/link";
import { PaginationServer } from "@/components/ui/pagination";
import { Listing } from "@/types/listing";
import { IndustrialSearchForm } from "@/components/industrial-search-form";

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

export default async function IndustrialPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);

  let listings: Listing[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let error = null;

  try {
    console.log(`🏭 Fetching industrial properties (Page ${page})`);

    // Fetch listings with Industrial category filter
    const result = await fetchListingsIndex({
      page,
      type: "Commercial",
      category: "Industrial", // Filter specifically for Industrial
      disposalMethod: (params?.disposalMethod as any) || "forSale",
      resultsPerPage: GRID_PAGE_SIZE,
      // Add search filters from URL params
      suburb: typeof params?.suburb === "string" ? params.suburb : undefined,
      minPrice: params?.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
      // propertyType: "Industrial", // This field doesn't exist in the API
      agentID: typeof params?.agent === "string" ? params.agent : undefined,
    });

    // Safely extract data with null checks
    listings = Array.isArray(result?.listings) ? result.listings : [];
    totalCount = result?.pagination?.totalResults || 0;
    totalPages = result?.pagination?.totalPages || 1;

    // Additional client-side filtering to prevent residential bleed-through
    listings = listings.filter(
      (listing) =>
        listing.category === "Industrial" ||
        listing.type === "Commercial" ||
        (listing.categories && listing.categories.includes("Industrial" as any)),
    );

    console.log(
      `✅ Industrial page: ${totalCount} total properties, showing ${listings.length} on page ${page}/${totalPages}`,
    );
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to load industrial properties";
    console.log("Error fetching industrial properties:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Gardian Style */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 text-center text-sm">
        Industrial Properties
      </div>

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/commercial"
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
              Back to Commercial
            </Link>

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-teal-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/commercial" className="hover:text-teal-600">
                Commercial
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">Industrial</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Industrial Properties
          </h1>
          <p className="text-gray-600 mb-4">
            Discover premium industrial real estate opportunities in Mackay and
            surrounding areas. From manufacturing facilities to warehouses,
            distribution centers, and industrial developments.
          </p>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{totalCount}</span> industrial
              properties found
            </div>

            <div className="flex space-x-2">
              <Link
                href="/commercial/industrial?disposalMethod=forSale"
                className={`px-4 py-2 rounded text-sm font-medium ${
                  (params?.disposalMethod || "forSale") === "forSale"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                For Sale
              </Link>
              <Link
                href="/commercial/industrial?disposalMethod=forRent"
                className={`px-4 py-2 rounded text-sm font-medium ${
                  params?.disposalMethod === "forRent"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                For Lease
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <IndustrialSearchForm />

        {/* Properties Grid - Gardian Style */}
        <div className="mb-8">
          {listings.length === 0 ? (
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
                  No Industrial Properties Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any industrial properties matching your
                  criteria. Contact our commercial team for available
                  opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:0749577424"
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Contact Commercial Team
                  </a>
                  <Link
                    href="/commercial"
                    className="bg-white text-teal-600 border border-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    View All Commercial
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing: Listing) => (
                <PropertyCard
                  key={listing.listingID || listing.id}
                  listing={listing}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <PaginationServer
              totalPages={totalPages}
              currentPage={page}
              basePath="/commercial/industrial"
              className="bg-white rounded-lg shadow-sm p-4"
              preserveParams={params}
            />
          </div>
        )}

        {/* Industrial Services Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Industrial Real Estate Services
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Industrial sales and leasing</li>
              <li>• Manufacturing facility procurement</li>
              <li>• Warehouse and distribution center sourcing</li>
              <li>• Industrial development opportunities</li>
              <li>• Specialized industrial property management</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Industrial Property Experts
            </h3>
            <p className="text-gray-600 mb-6">
              Our experienced industrial specialists understand the unique
              requirements of manufacturing, warehousing, and distribution
              businesses.
            </p>
            <div className="space-y-3">
              <Link
                href="/contact?service=industrial"
                className="block w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium text-center"
              >
                Contact Industrial Team
              </Link>
              <Link
                href="/appraisal-request?type=industrial"
                className="block w-full bg-white text-teal-600 border border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors font-medium text-center"
              >
                Industrial Appraisal
              </Link>
              <Link
                href="/book-appointment?service=industrial"
                className="block w-full bg-gray-100 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
              >
                Book Industrial Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
