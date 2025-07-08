'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyFeaturesInline } from '@/components/ui/property-features';
import { Button } from '@/components/ui/button';
import { 
  FaMapMarkerAlt, 
  FaHome,
  FaBed, 
  FaBath, 
  FaCar, 
  FaRulerCombined
} from 'react-icons/fa';
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
  enableCarousel = true, // Enable by default for cinematic experience
}: {
  properties: Property[];
  autoSelect?: 'highestPrice' | 'mostRecent';
  enableCarousel?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-advance slides for current property images
  useEffect(() => {
    if (!isAutoPlaying || !property?.images?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, property?.images?.length]);

  // Auto-advance through featured properties
  useEffect(() => {
    if (enableCarousel && featured.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => {
          const nextIndex = (prev + 1) % featured.length;
          setCurrentImageIndex(0); // Reset image index when changing property
          return nextIndex;
        });
      }, 12000); // 12 seconds per property
      return () => clearInterval(interval);
    }
  }, [enableCarousel, featured.length]);

  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const nextProperty = () => {
    setIndex((prev) => (prev + 1) % featured.length);
    setCurrentImageIndex(0);
    setIsAutoPlaying(true);
  };

  const prevProperty = () => {
    setIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
    setCurrentImageIndex(0);
    setIsAutoPlaying(true);
  };

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

  const address = property?.address?.displayAddress || property?.heading || 'Featured Property';
  const price = property?.price || 'Contact for price';

  return (
    <section className="relative bg-white overflow-hidden rounded-3xl shadow-2xl mb-16 transition-all duration-500 border border-gray-100">
      {/* Parallax Carousel Hero */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden rounded-3xl">
        {property?.images && property.images.length > 0 ? (
          <>
            {/* Background Images with Parallax Effect */}
            <AnimatePresence mode="wait">
              {property.images.map((image, imgIndex) => (
                imgIndex === currentImageIndex && (
                  <motion.div
                    key={`${property.listingID}-${imgIndex}`}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image.url?.replace('http://', 'https://') || image}
                      alt={property.heading}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={imgIndex === 0 && index === 0}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

            {/* Image Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Property Navigation Arrows (Multiple Properties) */}
            {featured.length > 1 && (
              <>
                <button
                  onClick={prevProperty}
                  className="absolute left-4 bottom-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-300 z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextProperty}
                  className="absolute right-4 bottom-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-300 z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Featured Property Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                ⭐ Featured Property {featured.length > 1 && `${index + 1}/${featured.length}`}
              </div>
            </div>

            {/* Image Dot Indicators */}
            {property.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {property.images.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() => {
                      setCurrentImageIndex(imgIndex);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      imgIndex === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Property Dots (Multiple Properties) */}
            {featured.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {featured.map((_, propIndex) => (
                  <button
                    key={propIndex}
                    onClick={() => {
                      setIndex(propIndex);
                      setCurrentImageIndex(0);
                      setIsAutoPlaying(true);
                    }}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      propIndex === index 
                        ? 'bg-teal-400 scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
            <div className="text-center">
              <FaHome className="w-16 h-16 text-teal-400 mx-auto mb-4" />
              <p className="text-teal-600 font-medium">Featured Property</p>
            </div>
          </div>
        )}

        {/* Property Information Overlay */}
        <div className="absolute inset-0 flex items-end justify-start p-6 md:p-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg leading-tight"
            >
              {property.heading || address}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2 text-white/90 mb-4"
            >
              <FaMapMarkerAlt className="w-5 h-5 text-teal-400" />
              <p className="text-lg md:text-xl">
                {address}
              </p>
            </motion.div>

            {/* Property Features Quick View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              {property.bedBathCarLand?.map((feature, idx) => {
                const icons = {
                  bedrooms: <FaBed className="w-4 h-4" />,
                  bathrooms: <FaBath className="w-4 h-4" />,
                  carSpaces: <FaCar className="w-4 h-4" />,
                  landSize: <FaRulerCombined className="w-4 h-4" />
                };
                
                if (feature.value === '0' || !feature.value) return null;
                
                return (
                  <div key={idx} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                    {icons[feature.key as keyof typeof icons]}
                    <span className="text-sm font-medium">{feature.value} {feature.label}</span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="text-2xl md:text-3xl font-bold text-white bg-teal-600/90 px-4 py-2 rounded-lg backdrop-blur-sm">
                {price}
              </div>
              
              <Button asChild variant="primary" size="lg" className="bg-white text-teal-600 hover:bg-gray-100 font-semibold shadow-lg">
                <Link href={`/listing/${property?.listingID}`}>
                  <span className="flex items-center">
                    View Property
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
