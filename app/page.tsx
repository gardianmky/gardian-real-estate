import SearchBar from 'components/search/search-bar';
import FeaturedPropertyHero from '@/components/hero/FeaturedPropertyHero';
import { PropertyFeaturesInline } from '@/components/ui/property-features';
import Link from "next/link";
import Image from "next/image";
import { fetchListingsIndex } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getFeaturedProperties() {
  try {
    // Use the centralized API function for consistency
    const res = await fetchListingsIndex({
      disposalMethod: 'forSale',
      type: 'Residential',
      fetchAll: true, // Fetch all results for comprehensive listing
      resultsPerPage: 6,
      orderBy: 'dateListed',
      orderDirection: 'desc'
    });
    
    return res.listings || [];
    
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="bg-white min-h-screen">
    

      <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-12 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-4 lg:mb-6 text-gray-800 leading-tight">
            Find Your Perfect Property in Mackay
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Established in 2000, Gardian Real Estate is your trusted local partner for buying, selling, and renting property in Mackay and surrounding areas.
          </p>
          
          <div className="max-w-4xl mx-auto mb-6 lg:mb-8 px-2">
            <SearchBar /> {/* Removed variant prop */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
            <Link href="/buyer-agent-request" className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <span className="text-sm lg:text-base font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Buyer's Agent Request</span>
              </div>
            </Link>
            <Link href="/sold" className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm lg:text-base font-semibold text-gray-700 group-hover:text-green-600 transition-colors">Recent Sales</span>
              </div>
            </Link>
            <Link href="/appraisal-request" className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm lg:text-base font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Request Appraisal</span>
              </div>
            </Link>
            <Link href="/book-appointment" className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm lg:text-base font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">Book Appointment</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Property Hero Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <FeaturedPropertyHero 
            properties={featuredProperties}
            autoSelect="highestPrice"
            enableCarousel={true}
          />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">Discover Premium Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Browse our curated selection of exceptional properties for sale in Mackay and surrounding areas</p>
          </div>
          
          {/* Enhanced Responsive Tab Controls */}
          <div className="flex justify-center mb-12 px-2">
            <div className="bg-white rounded-2xl p-1 sm:p-2 shadow-lg border border-gray-100 w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                <Link 
                  href="/for-rent" 
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-all duration-300 font-medium flex-1 group"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    For Rent
                  </span>
                </Link>
                <Link 
                  href="/for-sale" 
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base bg-primary-600 text-white rounded-lg sm:rounded-xl shadow-md font-medium flex-1 hover:bg-primary-700 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    For Sale
                  </span>
                </Link>
                <Link 
                  href="/commercial" 
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-all duration-300 font-medium flex-1 group"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Commercial
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {featuredProperties && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.map((property: any, index: number) => (
                <div key={property?.listingID || index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  {property?.images && property.images.length > 0 ? (
                    <div className="h-56 relative overflow-hidden">
                      <Image
                        src={property.images[0].url || property.images[0]}
                        alt={property?.address?.displayAddress || property?.heading || 'Property'}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 font-medium">No Image Available</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                      {property?.heading || 'Property Address'}
                    </h3>
                    {property?.price && (
                      <p className="text-2xl font-bold text-primary-600 mb-4">
                        {property.price}
                      </p>
                    )}
                    <div className="mb-6">
                      <PropertyFeaturesInline listing={property} className="text-sm" />
                    </div>
                    <Link 
                      href={`/property/${property?.listingID}`} 
                      className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-300 group"
                    >
                      View Details 
                      <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-12">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Discover Amazing Properties</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">Browse our comprehensive collection of premium properties across Mackay and surrounding areas</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/for-sale" 
                    className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    View Properties For Sale
                  </Link>
                  <Link 
                    href="/for-rent" 
                    className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50 transition-all duration-300 font-semibold"
                  >
                    View Rental Properties
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/for-sale" 
              className="inline-flex items-center bg-primary-600 text-white px-10 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
            >
              Explore All Properties
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive real estate solutions designed to exceed your expectations at every step</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Link href="/buy" className="group text-center bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Buy a Home</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Expert guidance through every step of your property purchase, with transparent costs and professional advice.</p>
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                Find a Local Agent
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link href="/rent" className="group text-center bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Rent a Home</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Seamless rental experience from browsing our extensive network to application and ongoing support.</p>
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                Find Rentals
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link href="/sell" className="group text-center bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Sell a Home</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Professional marketing and strategic guidance to achieve the best possible outcome for your property sale.</p>
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                See Your Options
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}