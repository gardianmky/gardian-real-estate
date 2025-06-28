import FeaturedPropertyHero from '@/components/hero/FeaturedPropertyHero';
import AnimatedHeroSection from '@/components/hero/animated-hero-section';
import { PropertyFeaturesInline } from '@/components/ui/property-features';
import { Button } from '@/components/ui/button';
import { cleanPropertyTitle } from '@/lib/utils';
import Link from "next/link";
import Image from "next/image";
import { fetchListingsIndex } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getFeaturedProperties() {
  try {
    // Fetch 6 different types of featured properties for variety
    const [
      highestPriceRes,
      highestRentRes, 
      newestRes,
      largestRes,
      waterfrontRes,
      premiumRes
    ] = await Promise.all([
      // 1. Highest priced residential for sale
      fetchListingsIndex({
        disposalMethod: 'forSale',
        type: 'Residential',
        fetchAll: false,
        resultsPerPage: 1,
        orderBy: 'price',
        orderDirection: 'desc'
      }),
      // 2. Highest priced rental
      fetchListingsIndex({
        disposalMethod: 'forRent',
        type: 'Residential',
        fetchAll: false,
        resultsPerPage: 1,
        orderBy: 'price',
        orderDirection: 'desc'
      }),
      // 3. Newest residential listing
      fetchListingsIndex({
        disposalMethod: 'forSale',
        type: 'Residential',
        fetchAll: false,
        resultsPerPage: 1,
        orderBy: 'dateListed',
        orderDirection: 'desc'
      }),
      // 4. Largest land size residential
      fetchListingsIndex({
        disposalMethod: 'forSale',
        type: 'Residential',
        fetchAll: false,
        resultsPerPage: 10,
        orderBy: 'dateListed',
        orderDirection: 'desc'
      }),
      // 5. Premium location (search for waterfront/view properties)
      fetchListingsIndex({
        disposalMethod: 'forSale',
        type: 'Residential',
        fetchAll: false,
        resultsPerPage: 10,
        orderBy: 'price',
        orderDirection: 'desc'
      }),
      // 6. Premium residential backup
      fetchListingsIndex({
        disposalMethod: 'forSale',
        type: 'Residential',
        fetchAll: false,
        resultsPerPage: 2,
        orderBy: 'price',
        orderDirection: 'desc'
      })
    ]);

    const featuredProperties: any[] = [];

    // 1. Add highest priced for sale
    if (highestPriceRes.listings?.[0]) {
      featuredProperties.push({
        ...highestPriceRes.listings[0],
        featuredType: 'Highest Price For Sale'
      });
    }

    // 2. Add highest priced rental  
    if (highestRentRes.listings?.[0]) {
      featuredProperties.push({
        ...highestRentRes.listings[0],
        featuredType: 'Premium Rental'
      });
    }

    // 3. Add newest listing
    if (newestRes.listings?.[0]) {
      featuredProperties.push({
        ...newestRes.listings[0],
        featuredType: 'Newest Listing'
      });
    }

    // 4. Add largest property (by land size)
    const largestProperty = (largestRes.listings || []).find((property: any) => {
      const landSize = parseInt(property.landSize) || 0;
      return landSize > 500; // At least 500m²
    });
    if (largestProperty) {
      featuredProperties.push({
        ...largestProperty,
        featuredType: 'Spacious Property'
      });
    }

    // 5. Add waterfront/view property
    const premiumProperty = (waterfrontRes.listings || []).find((property: any) => {
      const description = (property.description || '').toLowerCase();
      const heading = (property.heading || '').toLowerCase();
      return description.includes('water') || description.includes('view') || 
             description.includes('ocean') || heading.includes('view') ||
             description.includes('river') || description.includes('beach');
    });
    if (premiumProperty) {
      featuredProperties.push({
        ...premiumProperty,
        featuredType: 'Premium Location'
      });
    }

    // 6. Fill remaining slots with premium properties
    const remainingSlots = 6 - featuredProperties.length;
    if (remainingSlots > 0) {
      const additionalProperties = (premiumRes.listings || [])
        .filter((property: any) => {
          const existingIds = featuredProperties.map((p: any) => p.listingID || p.id);
          const currentId = property.listingID || property.id;
          return !existingIds.includes(currentId);
        })
        .slice(0, remainingSlots);
      
      additionalProperties.forEach((property: any) => {
        featuredProperties.push({
          ...property,
          featuredType: 'Premium Home'
        });
      });
    }

    // Ensure all properties are residential and unique
    const cleanedProperties = featuredProperties
      .filter((property: any) => {
        const isResidential = property.type === 'Residential' || 
                             property.propertyType === 'Residential' ||
                             property.category === 'Residential' ||
                             !property.type;
        return isResidential && (property.listingID || property.id);
      })
      .filter((property: any, index: number, self: any[]) => {
        const id = property.listingID || property.id;
        return index === self.findIndex((p: any) => (p.listingID || p.id) === id);
      });

    return cleanedProperties.slice(0, 6);
    
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="bg-white min-h-screen">
      <AnimatedHeroSection />

      {/* Featured Property Hero Section - Improved spacing */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPropertyHero 
            properties={featuredProperties}
            autoSelect="highestPrice"
            enableCarousel={true}
          />
        </div>
      </section>

      {/* Premium Residential Properties Section - Better mobile layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 px-2">Premium Residential Properties</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">Discover exceptional residential homes for sale in Mackay and surrounding areas. Find your perfect family home today.</p>
          </div>
          
          {/* Property Type Navigation - Enhanced mobile responsiveness */}
          <div className="flex justify-center mb-8 sm:mb-12 px-2">
            <div className="bg-white rounded-2xl p-1 sm:p-2 shadow-lg border border-gray-100 w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                <Link 
                  href="/for-rent" 
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm lg:text-base text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-all duration-300 font-medium flex-1 group"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="text-center mb-6 sm:mb-8">
                <span className="inline-flex items-center px-3 sm:px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-semibold">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {featuredProperties.length} Handpicked Premium Properties
                </span>
              </div>
              
              {/* Property Grid - 3 tiles layout for desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                {featuredProperties.map((property: any, index: number) => {
                  const uniqueKey = property?.listingID || property?.id || `property-${index}`;
                  
                  return (
                    <div key={uniqueKey} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-50">
                    {property?.images && property.images.length > 0 ? (
                      <div className="h-48 sm:h-56 lg:h-64 relative overflow-hidden">
                        <Image
                          src={property.images[0].url || property.images[0]}
                          alt={property?.address?.displayAddress || property?.heading || 'Residential Property'}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Featured Type Badge */}
                        {property?.featuredType && (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-teal-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold z-10">
                            {property.featuredType}
                          </div>
                        )}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Residential
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center relative">
                        {/* Featured Type Badge for placeholder */}
                        {property?.featuredType && (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-teal-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold z-10">
                            {property.featuredType}
                          </div>
                        )}
                        <div className="text-center">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="text-teal-400 font-medium text-xs sm:text-sm">Residential Property</span>
                        </div>
                      </div>
                    )}
                    <div className="p-4 sm:p-5 lg:p-7">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                        {cleanPropertyTitle(property?.heading || property?.address?.displayAddress)}
                      </h3>
                      
                      {(() => {
                        const priceValue = property?.price || 
                                         property?.displayPrice || 
                                         property?.priceText || 
                                         property?.salePrice || 
                                         property?.rentPrice ||
                                         property?.listPrice;
                        
                        if (priceValue) {
                          return (
                            <div className="mb-3 sm:mb-4">
                              <p className="text-xl sm:text-2xl font-bold text-teal-600 leading-tight">
                                {priceValue}
                              </p>
                              {property?.priceMethod && (
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                  {property.priceMethod}
                                </p>
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <div className="mb-3 sm:mb-4">
                              <p className="text-sm sm:text-lg font-semibold text-gray-600 bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border">
                                Contact for Price
                              </p>
                            </div>
                          );
                        }
                      })()}
                      
                      
                      <div className="mb-4 sm:mb-6">
                        <PropertyFeaturesInline listing={property} className="text-xs sm:text-sm text-gray-600" />
                      </div>
                      <Button asChild variant="primary" size="default" className="w-full">
                        <Link href={`/property/${property?.listingID}`}>
                          <span className="flex items-center">
                            View This Home
                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                  );
                })}
              </div>
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
                  <Button asChild variant="primary" size="lg">
                    <Link href="/for-sale">
                      View Residential Homes For Sale
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/for-rent">
                      View Rental Homes
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Button asChild variant="primary" size="lg">
              <Link href="/for-sale">
                <span className="flex items-center">
                  Explore All Residential Homes
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Cards Section - Enhanced mobile responsiveness */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 px-2">Our Premium Services</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">Comprehensive real estate solutions designed to exceed your expectations at every step</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <Link href="/buy" className="group text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Buy a Home</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Expert guidance through every step of your property purchase, with transparent costs and professional advice.</p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors text-sm sm:text-base">
                Find a Local Agent
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link href="/rent" className="group text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Rent a Home</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Seamless rental experience from browsing our extensive network to application and ongoing support.</p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors text-sm sm:text-base">
                Find Rentals
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link href="/sell" className="group text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Sell a Home</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Professional marketing and strategic guidance to achieve the best possible outcome for your property sale.</p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors text-sm sm:text-base">
                See Your Options
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Finance & Insurance Section - Enhanced mobile responsiveness */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-teal-25 via-teal-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-teal-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-teal-100">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Gardian Finance & Insurance</h2>
                  <p className="text-xs sm:text-sm text-teal-600 font-semibold">Powered by Gardian Finance & Gardian Insurance</p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                At Gardian Real Estate, we don't just help you find your perfect home - we help you secure it with competitive finance rates and comprehensive insurance coverage. Our trusted partnership with HomeLoad ensures you get expert guidance throughout your entire property journey.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Fast Pre-Approval</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Get pre-approved quickly through Gardian's trusted finance partners</p>
                </div>
                
                <div className="text-center p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Complete Protection</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Comprehensive home & contents insurance for peace of mind</p>
                </div>
                
                <div className="text-center p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Gardian Expertise</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Local knowledge combined with nationwide finance solutions</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 sm:gap-4 justify-center">
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/finance">
                    <span className="flex items-center">
                      Get Pre-Approved Today
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full">
                  <Link href="/insurance">
                    <span className="flex items-center">
                      Get Insurance Quote
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                  </Link>
                </Button>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-xs sm:text-sm text-teal-800 font-medium">
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