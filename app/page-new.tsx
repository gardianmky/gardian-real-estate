import FeaturedPropertyHero from '@/components/hero/FeaturedPropertyHero';
import AnimatedHeroSection from '@/components/hero/animated-hero-section';
import { PropertyFeaturesInline } from '@/components/ui/property-features';
import { cleanPropertyTitle } from '@/lib/utils';
import Link from "next/link";
import Image from "next/image";
import { fetchListingsIndex } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getFeaturedProperties() {
  try {
    // Specifically fetch premium residential properties for homepage
    const res = await fetchListingsIndex({
      disposalMethod: 'forSale',
      type: 'Residential', // Explicitly residential properties only
      fetchAll: false, // Changed from true to false to prevent over-fetching
      resultsPerPage: 6, // Optimized to fetch 6 for hero carousel
      orderBy: 'dateListed',
      orderDirection: 'desc'
    });
    
    // Filter and prioritize premium residential properties, removing duplicates
    const residentialProperties = (res.listings || []).filter(property => {
      const isResidential = property.type === 'Residential' || 
                           property.propertyType === 'Residential' ||
                           property.category === 'Residential' ||
                           !property.type; // Default to residential if no type specified
      return isResidential;
    });
    
    // Remove any remaining duplicates based on listingID
    const uniqueProperties = residentialProperties.filter((property, index, self) => {
      const id = property.listingID || property.id;
      return index === self.findIndex(p => (p.listingID || p.id) === id);
    });
    
    // Limit to 6 properties for homepage display and hero carousel
    return uniqueProperties.slice(0, 6);
    
  } catch (error) {
    console.error('Error fetching featured residential properties:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="bg-white min-h-screen">
      <AnimatedHeroSection />

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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">Premium Residential Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover exceptional residential homes for sale in Mackay and surrounding areas. Find your perfect family home today.</p>
          </div>
          
          {/* Enhanced Responsive Tab Controls */}
          <div className="flex justify-center mb-12 px-2">
            <div className="bg-white rounded-2xl p-1 sm:p-2 shadow-lg border border-gray-100 w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                <Link 
                  href="/for-rent" 
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-all duration-300 font-medium flex-1 group"
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
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base bg-teal-600 text-white rounded-lg sm:rounded-xl shadow-md font-medium flex-1 hover:bg-teal-700 transition-all duration-300 group"
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
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-all duration-300 font-medium flex-1 group"
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
            <>
              {/* Featured Badge */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4 Premium Residential Homes Available
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                {featuredProperties.map((property: any, index: number) => {
                  // Ensure unique key for each property
                  const uniqueKey = property?.listingID || property?.id || `property-${index}`;
                  
                  return (
                    <div key={uniqueKey} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-50">
                    {property?.images && property.images.length > 0 ? (
                      <div className="h-64 relative overflow-hidden">
                        <Image
                          src={property.images[0].url || property.images[0]}
                          alt={property?.address?.displayAddress || property?.heading || 'Residential Property'}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Residential
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 text-teal-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="text-teal-400 font-medium text-sm">Residential Property</span>
                        </div>
                      </div>
                    )}
                    <div className="p-7">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                        {cleanPropertyTitle(property?.heading || property?.address?.displayAddress)}
                      </h3>
                      
                      {/* Enhanced Price Display with Multiple Field Support */}
                      {(() => {
                        const priceValue = property?.price || 
                                         property?.displayPrice || 
                                         property?.priceText || 
                                         property?.salePrice || 
                                         property?.rentPrice ||
                                         property?.listPrice;
                        
                        if (priceValue) {
                          return (
                            <div className="mb-4">
                              <p className="text-2xl font-bold text-teal-600 leading-tight">
                                {priceValue}
                              </p>
                              {property?.priceMethod && (
                                <p className="text-sm text-gray-500 font-medium">
                                  {property.priceMethod}
                                </p>
                              )}
                            </div>
                          );
                        } else {
                          // Show "Contact for Price" if no price available
                          return (
                            <div className="mb-4">
                              <p className="text-lg font-semibold text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border">
                                Contact for Price
                              </p>
                            </div>
                          );
                        }
                      })()}
                      
                      {/* Bed/Bath/Car Features */}
                      <div className="flex items-center gap-4 mb-4 text-gray-600">
                        {(() => {
                          // Extract bed, bath, car from bedBathCarLand array
                          const extractBedBathCar = (data: any[]) => {
                            const result: { bed: number | null, bath: number | null, car: number | null } = { bed: null, bath: null, car: null };
                            data?.forEach(item => {
                              if (!item?.key || !item?.value) return;
                              const val = parseInt(item.value);
                              if (isNaN(val)) return;
                              if (item.key.toLowerCase().includes("bed")) result.bed = val;
                              if (item.key.toLowerCase().includes("bath")) result.bath = val;
                              if (item.key.toLowerCase().includes("car")) result.car = val;
                            });
                            return result;
                          };
                          
                          const { bed, bath, car } = extractBedBathCar(property?.bedBathCarLand || []);
                          
                          return (
                            <>
                              {bed !== null && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm16-5v2a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2z" />
                                  </svg>
                                  <span className="text-sm font-medium">{bed} bed</span>
                                </div>
                              )}
                              {bath !== null && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                  </svg>
                                  <span className="text-sm font-medium">{bath} bath</span>
                                </div>
                              )}
                              {car !== null && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-6-6-6 6m12 0a2 2 0 01-2 2H7a2 2 0 01-2-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6z" />
                                  </svg>
                                  <span className="text-sm font-medium">{car} car</span>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                      
                      <div className="mb-6">
                        <PropertyFeaturesInline listing={property} className="text-sm text-gray-600" />
                      </div>
                      <Link 
                        href={`/property/${property?.listingID}`} 
                        className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 w-full justify-center group-hover:bg-teal-700"
                      >
                        View This Home
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  );
                })}              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-12">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Discover Premium Residential Homes</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">Browse our comprehensive collection of premium residential properties and family homes across Mackay and surrounding areas</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/for-sale" 
                    className="bg-teal-600 text-white px-8 py-3 rounded-xl hover:bg-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    View Residential Homes For Sale
                  </Link>
                  <Link 
                    href="/for-rent" 
                    className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-xl hover:bg-teal-50 transition-all duration-300 font-semibold"
                  >
                    View Rental Homes
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/for-sale" 
              className="inline-flex items-center bg-teal-600 text-white px-10 py-4 rounded-xl hover:bg-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
            >
              Explore All Residential Homes
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
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Buy a Home</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Expert guidance through every step of your property purchase, with transparent costs and professional advice.</p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors">
                Find a Local Agent
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link href="/rent" className="group text-center bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Rent a Home</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Seamless rental experience from browsing our extensive network to application and ongoing support.</p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors">
                Find Rentals
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link href="/sell" className="group text-center bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Sell a Home</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Professional marketing and strategic guidance to achieve the best possible outcome for your property sale.</p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors">
                See Your Options
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gardian Finance Insurance CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-25 via-teal-50 to-emerald-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-teal-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Gardian Finance & Insurance</h2>
                  <p className="text-sm text-teal-600 font-semibold">Powered by Gardian Finance & Gardian Insurance</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Gardian Real Estate, we don't just help you find your perfect home - we help you secure it with competitive finance rates and comprehensive insurance coverage. Our trusted partnership with HomeLoad ensures you get expert guidance throughout your entire property journey.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Fast Pre-Approval</h3>
                  <p className="text-sm text-gray-600">Get pre-approved quickly through Gardian's trusted finance partners</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Complete Protection</h3>
                  <p className="text-sm text-gray-600">Comprehensive home & contents insurance for peace of mind</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Gardian Expertise</h3>
                  <p className="text-sm text-gray-600">Local knowledge combined with nationwide finance solutions</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/finance" 
                  className="inline-flex items-center bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                >
                  Get Pre-Approved Today
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/insurance" 
                  className="inline-flex items-center bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-xl hover:bg-teal-50 transition-all duration-300 font-semibold group"
                >
                  Get Insurance Quote
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-sm text-teal-800 font-medium">
                  🏠 <strong>Gardian Advantage:</strong> Bundle your property purchase with finance and insurance for exclusive rates and seamless service!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
