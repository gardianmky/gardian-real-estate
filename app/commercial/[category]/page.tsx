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
import { redirect } from "next/navigation";

const GRID_PAGE_SIZE = 12;

export const dynamic = "force-dynamic";

// Category mapping for commercial property types
const CATEGORY_MAP = {
  office: {
    propertyType: "Office",
    type: "Commercial",
    title: "Office Spaces",
    description: "Find the perfect office space for your business needs",
    icon: "🏢",
  },
  retail: {
    propertyType: "Retail",
    type: "Commercial", 
    title: "Retail Properties",
    description: "Discover prime retail locations for your business",
    icon: "🏬",
  },
  storage: {
    propertyType: "Storage",
    type: "Commercial",
    title: "Storage & Warehouses", 
    description: "Storage facilities and warehouse spaces available",
    icon: "🏭",
  },
  land: {
    propertyType: "Land",
    type: "Commercial",
    title: "Commercial Land",
    description: "Development opportunities and commercial land parcels",
    icon: "🏞️",
  },
  investment: {
    propertyType: "Investment",
    type: "Commercial",
    title: "Investment Properties",
    description: "Commercial investment opportunities with strong returns",
    icon: "📈",
  },
  business: {
    type: "Business",
    title: "Business for Sale",
    description: "Established businesses ready for new ownership",
    icon: "💼",
  },
  all: {
    type: "Commercial",
    title: "All Commercial Properties",
    description: "Browse all commercial real estate opportunities",
    icon: "🏗️",
  },
} as const;

interface PageProps {
  params: Promise<{ category: string }>;
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

export async function generateStaticParams() {
  return [
    { category: 'office' },
    { category: 'retail' },
    { category: 'storage' },
    { category: 'land' },
    { category: 'investment' },
    { category: 'business' },
    { category: 'all' },
  ];
}

export default async function CommercialCategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const searchQuery = await searchParams;
  const page = Number(searchQuery?.page || 1);

  // Check if category is valid
  if (!CATEGORY_MAP[category as keyof typeof CATEGORY_MAP]) {
    redirect('/commercial');
  }

  const categoryConfig = CATEGORY_MAP[category as keyof typeof CATEGORY_MAP];

  let listings: Listing[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let error = null;

  try {
    console.log(`🏢 Fetching ${categoryConfig.title} (Page ${page})`);

    // Build API filters based on category
    const apiFilters = {
      page,
      type: categoryConfig.type,
      ...(categoryConfig.propertyType && { propertyType: categoryConfig.propertyType }),
      disposalMethod: (searchQuery?.disposalMethod as any) || "forSale",
      resultsPerPage: GRID_PAGE_SIZE,
      // Add search filters from URL params
      suburb: typeof searchQuery?.suburb === "string" ? searchQuery.suburb : undefined,
      minPrice: searchQuery?.minPrice ? Number(searchQuery.minPrice) : undefined,
      maxPrice: searchQuery?.maxPrice ? Number(searchQuery.maxPrice) : undefined,
      category: typeof searchQuery?.category === "string" ? searchQuery.category : undefined,
      agentID: typeof searchQuery?.agent === "string" ? searchQuery.agent : undefined,
    };

    const result = await fetchListingsIndex(apiFilters);

    // Safely extract data with null checks
    listings = Array.isArray(result?.listings) ? result.listings : [];
    totalCount = result?.pagination?.totalResults || 0;
    totalPages = result?.pagination?.totalPages || 1;

    console.log(
      `✅ ${categoryConfig.title}: ${totalCount} total properties, showing ${listings.length} on page ${page}/${totalPages}`,
    );
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : `Failed to load ${categoryConfig.title.toLowerCase()}`;
    console.log(`Error fetching ${categoryConfig.title}:`, error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Gardian Style */}
      <div className="bg-teal-600 text-white py-2 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trusted Commercial Real Estate Partners
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryConfig.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {categoryConfig.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {categoryConfig.description}
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <CommercialSearchForm />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Unable to Load Properties
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
            <Link
              href="/commercial"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ← Back to Commercial Properties
            </Link>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {totalCount > 0 ? `${totalCount} Properties Found` : 'No Properties Found'}
                </h2>
                <p className="text-gray-600">
                  {totalCount > 0 ? `Showing page ${page} of ${totalPages}` : `Try adjusting your search criteria`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/commercial"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  ← All Commercial
                </Link>
              </div>
            </div>

            {/* Property Grid */}
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {listings.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No {categoryConfig.title} Available
                </h3>
                <p className="text-gray-600 mb-4">
                  We don't have any {categoryConfig.title.toLowerCase()} matching your criteria at the moment.
                </p>
                <Link
                  href="/commercial"
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View All Commercial Properties
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <PaginationServer currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Finding the Perfect {categoryConfig.title}?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Our experienced commercial real estate team is here to help you find exactly what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Our Team
            </Link>
            <Link
              href="/commercial/services"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}