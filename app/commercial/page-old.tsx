import { fetchListingsIndex } from "@/lib/api";
import PropertyCard from "@/components/property-card";
import { PropertyCardSkeleton } from "@/components/property-card-skeleton";
import Link from "next/link";
import Image from "next/image";
import { PaginationServer } from "@/components/ui/pagination";
import { Listing } from "@/types/listing";
import SearchBar from "@/components/search/search-bar";
import PropertyFilters from "@/components/property-filters";
import { CommercialSearchForm } from "@/components/commercial-search-form";

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

export default async function CommercialPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);

  let listings: Listing[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let error = null;

  try {
    console.log(`🏢 Fetching commercial properties (Page ${page})`);

    // Use the simple, direct API endpoint as documented
    const result = await fetchListingsIndex({
      page,
      type: "Commercial",
      disposalMethod: (params?.disposalMethod as any) || "forSale",
      resultsPerPage: GRID_PAGE_SIZE,
      // Add search filters from URL params
      suburb: typeof params?.suburb === "string" ? params.suburb : undefined,
      minPrice: params?.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
      category:
        typeof params?.category === "string" ? params.category : undefined,
      propertyType:
        typeof params?.propertyType === "string"
          ? params.propertyType
          : undefined,
      agentID: typeof params?.agent === "string" ? params.agent : undefined,
    });

    // Safely extract data with null checks
    listings = Array.isArray(result?.listings) ? result.listings : [];
    totalCount = result?.pagination?.totalResults || 0;
    totalPages = result?.pagination?.totalPages || 1;

    console.log(
      `✅ Commercial page: ${totalCount} total properties, showing ${listings.length} on page ${page}/${totalPages}`,
    );
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to load commercial properties";
    console.log("Error fetching commercial properties:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Gardian Style */}
      <div className="bg-teal-600 text-white py-2 text-center text-sm">
        Commercial Properties
      </div>

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
              <span className="text-gray-800">Commercial Properties</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Commercial Properties
          </h1>
          <p className="text-gray-600 mb-4">
            Discover premium commercial real estate opportunities in Mackay and
            surrounding areas. From retail spaces to office buildings and
            industrial properties.
          </p>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{totalCount}</span> commercial
              properties found
            </div>

            <div className="flex space-x-2">
              <Link
                href="/commercial?disposalMethod=forSale"
                className={`px-4 py-2 rounded text-sm font-medium ${
                  (params?.disposalMethod || "forSale") === "forSale"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                For Sale
              </Link>
              <Link
                href="/commercial?disposalMethod=forRent"
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
        <CommercialSearchForm />

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
                  No Commercial Properties Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any commercial properties matching your
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
                    href="/for-sale"
                    className="bg-white text-teal-600 border border-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    View Residential
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
              basePath="/commercial"
              className="bg-white rounded-lg shadow-sm p-4"
              preserveParams={params}
            />
          </div>
        )}

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Commercial Real Estate Services
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Commercial sales and leasing</li>
              <li>• Investment property analysis</li>
              <li>• Market valuations and appraisals</li>
              <li>• Property management services</li>
            </ul>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Need Commercial Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              Our experienced commercial team can help you find the perfect
              property for your business needs.
            </p>
            <div className="space-y-3">
              <Link
                href="/contact?service=commercial"
                className="block w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium text-center"
              >
                Contact Commercial Team
              </Link>
              <Link
                href="/appraisal-request?type=commercial"
                className="block w-full bg-white text-teal-600 border border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors font-medium text-center"
              >
                Commercial Appraisal
              </Link>
              <Link
                href="/book-appointment?service=commercial"
                className="block w-full bg-gray-100 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
              >
                Book Commercial Consultation
              </Link>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                Gardian Commercial Team
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Chris Bonanno:</span>
                  <a
                    href="tel:0408775788"
                    className="text-teal-600 hover:text-teal-700 ml-2"
                  >
                    0408 775 788
                  </a>
                </div>
                <div>
                  <span className="font-medium">Cecelia Reed:</span>
                  <a
                    href="tel:0428121408"
                    className="text-teal-600 hover:text-teal-700 ml-2"
                  >
                    0428 121 408
                  </a>
                </div>
                <div>
                  <span className="font-medium">Mark Kelly:</span>
                  <a
                    href="tel:0418776789"
                    className="text-teal-600 hover:text-teal-700 ml-2"
                  >
                    0418 776 789
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
