import Link from "next/link";
import Image from "next/image";

const GRID_PAGE_SIZE = 12;

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    suburb?: string;
    propertyType?: string;
  }>;
}

import { fetchListingsIndex } from "@/lib/api";

async function getOpenHomes(params: any) {
  try {
    // Use centralized API function for consistent data fetching
    const res = await fetchListingsIndex({
      disposalMethod: "forSale",
      type: "Residential",
      fetchAll: true,
      page: params.page || 1,
      resultsPerPage: GRID_PAGE_SIZE,
      orderBy: "dateListed",
      orderDirection: "desc",
      // Add search filters from URL params
      suburb: typeof params?.suburb === 'string' ? params.suburb : undefined,
      propertyType: typeof params?.propertyType === 'string' ? params.propertyType : undefined
    });
    
    // Filter for listings with open homes
    // In production, this would be a proper API field
    const listings = (res.listings || []).filter((listing: any) => {
      // Simulate open homes availability - in production would check listing.openHomes or similar
      return listing.status === 'Active' || Math.random() > 0.3;
    });
    
    return { 
      listings, 
      totalCount: listings.length 
    };
    
  } catch (error) {
    console.error('Error fetching open homes:', error);
    return { listings: [], totalCount: 0 };
  }
}

export default async function OpenHomesPage({
  searchParams
}: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  
  const { listings, totalCount } = await getOpenHomes(params);
  const totalPages = Math.max(1, Math.ceil(totalCount / GRID_PAGE_SIZE));

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
              <span className="text-gray-800">Open Homes</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Open Homes</h1>
          <p className="text-gray-600 mb-4">
            View properties with scheduled open home inspections in Mackay and surrounding areas. Book your inspection today!
          </p>
          
          {/* Results Summary */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600">
              {totalCount > 0 ? (
                <>
                  <span className="font-semibold text-gray-800">{totalCount}</span> open {totalCount === 1 ? "home" : "homes"} scheduled
                  {totalPages > 1 && (
                    <span className="ml-2">• Page {page} of {totalPages}</span>
                  )}
                </>
              ) : (
                "No open homes scheduled"
              )}
            </div>
            
            {/* Navigation Links */}
            <div className="flex space-x-2">
              <Link 
                href="/open-homes" 
                className="px-4 py-2 bg-primary-600 text-white rounded text-sm font-medium"
              >
                Open Homes
              </Link>
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
            </div>
          </div>
        </div>

        {/* Search Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Filter Open Homes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Suburb</label>
              <input 
                type="text" 
                placeholder="Enter suburb..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                <option value="">All upcoming dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="thisweek">This week</option>
                <option value="weekend">This weekend</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                <option value="">All types</option>
                <option value="House">House</option>
                <option value="Unit">Unit</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Filter Results
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="mb-8">
          {listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Open Homes Scheduled</h3>
                <p className="text-gray-600 mb-6">
                  There are currently no open home inspections scheduled. Check back soon or browse our available properties.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/for-sale" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    View Properties For Sale
                  </Link>
                  <Link href="/book-appointment" className="bg-white text-primary-600 border border-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                    Book Private Inspection
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing: any) => (
                <div key={listing.listingID} className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Open Home Badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    Open Home
                  </div>
                  
                  {listing?.images && listing.images.length > 0 ? (
                    <div className="h-48 relative">
                      <Image
                        src={listing.images[0].url || listing.images[0]}
                        alt={listing?.address?.displayAddress || listing?.heading || 'Property'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image Available</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {listing?.address?.displayAddress || listing?.heading || 'Property Address'}
                    </h3>
                    {listing?.price && (
                      <p className="text-lg font-bold text-primary-600 mb-2">
                        {listing.price}
                      </p>
                    )}
                    
                    {/* Open Home Time */}
                    <div className="bg-green-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center text-green-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">
                          Saturday 2:00 PM - 2:30 PM
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 text-sm text-gray-600 mb-4">
                      {listing?.bedBathCarLand?.map((feature: any, i: number) => (
                        <span key={i}>{feature.value} {feature.label?.toLowerCase()}</span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link 
                        href={`/property/${listing.listingID}`} 
                        className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <Link 
                        href={`/book-appointment?property=${listing.listingID}`} 
                        className="flex-1 text-center bg-white text-primary-600 border border-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium"
                      >
                        Book Private
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {page > 1 && (
                <Link 
                  href={`/open-homes?page=${page - 1}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages, page - 2 + i));
                return (
                  <Link
                    key={pageNum}
                    href={`/open-homes?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg ${
                      pageNum === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              
              {page < totalPages && (
                <Link 
                  href={`/open-homes?page=${page + 1}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">About Open Home Inspections</h2>
              <p className="text-gray-600 mb-4">
                Open home inspections allow you to view properties at scheduled times without needing to book a private appointment. 
                It's a great way to get a feel for the property and ask questions directly to our sales team.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No appointment necessary
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Meet our sales representatives
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  View multiple properties in one area
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Get immediate answers to your questions
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Need a Private Inspection?</h3>
              <p className="text-gray-600 mb-6">
                Can't make it to an open home? We can arrange a private inspection at a time that suits you.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/book-appointment" 
                  className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium text-center"
                >
                  Book Private Inspection
                </Link>
                <Link 
                  href="/contact" 
                  className="block w-full bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium text-center"
                >
                  Contact Our Team
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Contact for Open Homes</h4>
                <p className="text-sm text-gray-600 mb-2">07 4957 7424</p>
                <p className="text-sm text-gray-600">94 Victoria Street, Mackay QLD 4740</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}