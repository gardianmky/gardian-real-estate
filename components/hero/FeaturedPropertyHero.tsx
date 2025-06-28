'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PropertyFeaturesInline } from '@/components/ui/property-features';
import { Button } from '@/components/ui/button';
import type { Listing } from '@/types/listing';

interface Property extends Partial<Listing> {
  listingID: string;
  heading: string;
  price: string;
  images: any[];
  bedBathCarLand: any[];
  address?: { displayAddress?: string };
  description?: string;
}

export default function FeaturedPropertyHero({
  properties = [],
  autoSelect = 'highestPrice', // or 'mostRecent'
  enableCarousel = false,
}: {
  properties: Property[];
  autoSelect?: 'highestPrice' | 'mostRecent';
  enableCarousel?: boolean;
}) {
  const [index, setIndex] = useState(0);

  const featured = (() => {
    if (properties.length === 0) return [];
    
    if (autoSelect === 'highestPrice') {
      return [...properties].sort((a, b) => {
        const priceA = parseInt(a.price?.replace(/\D/g, '') || '0');
        const priceB = parseInt(b.price?.replace(/\D/g, '') || '0');
        return priceB - priceA;
      });
    }
    return properties;
  })();

  const property = featured[index];

  useEffect(() => {
    if (enableCarousel && featured.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % featured.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [enableCarousel, featured.length]);

  // Fallback if no property available
  if (!property) {
    return (
      <section className="relative bg-gradient-to-r from-teal-50 to-teal-100 overflow-hidden rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-16 transition-all duration-500">
        <div className="p-10 md:p-14 text-center">
          <span className="text-sm uppercase text-teal-600 font-medium tracking-wider mb-2 block">
            Featured Properties
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Premium Properties in Mackay
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our exclusive selection of properties for sale and rent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/for-sale">
                View Properties For Sale
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/for-rent">
                View Rental Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const imageUrl = property?.images?.[0]?.url || property?.images?.[0] || '/placeholder.svg';
  const address = property?.address?.displayAddress || property?.heading || 'Featured Property';
  const price = property?.price || 'Contact for price';
  const secureImageUrl = imageUrl?.replace('http://', 'https://') || imageUrl;

  return (
    <section className="relative bg-white overflow-hidden rounded-3xl shadow-xl mb-16 transition-all duration-500 group border border-gray-50">
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Property Image */}
        <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden lg:rounded-l-3xl rounded-t-3xl lg:rounded-t-none">
          <Image
            src={secureImageUrl}
            alt={address}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority
          />
          {/* Enhanced overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Property Details */}
        <div className="p-6 lg:p-12 flex flex-col justify-center">
          <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-6 w-fit">
            ⭐ Featured Property
          </span>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {address}
          </h2>
          <p className="text-2xl lg:text-3xl text-teal-600 font-bold mb-6">{price}</p>

          {/* Property Features */}
          <div className="mb-8">
            <PropertyFeaturesInline 
              listing={property as any} 
              className="flex flex-wrap gap-4 text-gray-600" 
            />
          </div>

          {/* Description Preview */}
          {property?.description && (
            <p className="text-gray-600 mb-8 text-base leading-relaxed line-clamp-3">
              {property.description.slice(0, 150)}...
            </p>
          )}

          {/* Enhanced CTA Button */}
          <Button asChild variant="primary" size="xl" className="w-full lg:w-auto">
            <Link href={`/property/${property?.listingID}`}>
              <span className="flex items-center justify-center">
                View Property Details
                <svg 
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Enhanced Carousel Indicators */}
      {enableCarousel && featured.length > 1 && (
        <div className="absolute top-6 right-6 flex space-x-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === i 
                  ? 'bg-teal-600 scale-110' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`View property ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Property Count Badge */}
      {enableCarousel && featured.length > 1 && (
        <div className="absolute bottom-6 left-6 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {index + 1} of {featured.length}
        </div>
      )}

      {/* Manual Navigation Arrows for Carousel */}
      {enableCarousel && featured.length > 1 && (
        <>
          <button
            onClick={() => setIndex((prev) => (prev - 1 + featured.length) % featured.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Previous property"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % featured.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Next property"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
