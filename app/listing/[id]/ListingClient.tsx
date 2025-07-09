"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Gallery from 'react-image-gallery';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { 
  FaBed, 
  FaBath, 
  FaCar, 
  FaRulerCombined, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaHome,
  FaCheckCircle,
  FaInfo,
  FaBuilding,
  FaLeaf,
  FaWifi,
  FaSwimmingPool,
  FaDumbbell,
  FaParking,
  FaSolarPanel,
  FaShieldAlt,
  FaThermometerHalf,
  FaWater
} from 'react-icons/fa';
import { Listing } from 'types/listing';
import { cleanPropertyTitle } from '@/lib/utils';

// Runtime check for icon validity
if (
  [AiFillHeart, AiOutlineHeart, FaFacebookF, FaTwitter, FaLinkedinIn, FaShare].some(
    (icon) => typeof icon !== 'function'
  )
) {
  console.error('One or more icon components are not functions:', {
    AiFillHeart,
    AiOutlineHeart,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaShare,
  });
  throw new Error('One or more icon components are not valid React components.');
}

interface ListingClientProps {
  listing: Listing;
}

export default function ListingClient({ listing }: ListingClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || !listing.images?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === listing.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, listing.images?.length]);

  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link
        href="/"
        className="inline-flex items-center mb-8 text-teal-600 hover:text-teal-800 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2h-2.586l2.293 2.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Back to Listings
      </Link>

      {/* Agent CTA Bar - Above the Fold */}
      {listing.agents && listing.agents.length > 0 && (
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {listing.agents[0].imageURL ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={listing.agents[0].imageURL.replace('http://', 'https://')}
                    alt={listing.agents[0].name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div>
                <p className="font-semibold">{listing.agents[0].name}</p>
                <p className="text-sm text-white/80">{listing.agents[0].title || 'Property Agent'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {listing.agents[0].mobile && (
                <a 
                  href={`tel:${listing.agents[0].mobile}`}
                  className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {listing.agents[0].mobile}
                </a>
              )}
              <Link 
                href={`/contact-agent?agentID=${listing.agents[0].agentID || listing.agents[0].id}&listingID=${listing.listingID || listing.id}&agentName=${encodeURIComponent(listing.agents[0].name)}`}
                className="bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Send Message
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {/* Hero Section with Parallax Carousel */}
        <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <>
              {/* Background Images with Parallax Effect */}
              <AnimatePresence mode="wait">
                {listing.images.map((image, index) => (
                  index === currentImageIndex && (
                    <motion.div
                      key={index}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={image.url.replace(/^http:\/\//i, 'https://')}
                        alt={listing.heading}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

              {/* Navigation Arrows */}
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

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                {currentImageIndex + 1} / {listing.images.length}
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {listing.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => {
                  // You can integrate with react-image-gallery here for fullscreen
                  const galleryElement = document.querySelector('.image-gallery');
                  if (galleryElement) {
                    // Trigger fullscreen gallery
                  }
                }}
                className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <FaHome className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No images available</p>
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
                {cleanPropertyTitle(listing.heading)}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-2 text-white/90 mb-6"
              >
                <FaMapMarkerAlt className="w-5 h-5 text-teal-400" />
                <p className="text-lg md:text-xl">
                  {'street' in (listing.address ?? {}) 
                    ? `${listing.address?.street ?? ''}, ${listing.address?.suburb ?? ''} ${listing.address?.state ?? ''} ${listing.address?.postcode ?? ''}`.trim()
                    : 'Address not available'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="text-2xl md:text-3xl font-bold text-white bg-teal-600/90 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {listing.price}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Schedule Viewing
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hidden Gallery for Fullscreen (Optional) */}
        <div className="hidden">
          <Gallery
            items={listing.images?.map((image) => ({
              original: image.url.replace(/^http:\/\//i, 'https://'),
              thumbnail: image.url.replace(/^http:\/\//i, 'https://'),
            })) || []}
            showPlayButton={false}
            showFullscreenButton={true}
            showNav={true}
            showThumbnails={true}
            startIndex={currentImageIndex}
          />
        </div>

        {/* Property Details */}
        <div className="p-6 md:p-8">
          {/* Property Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
                {cleanPropertyTitle(listing.heading)}
              </h2>
              <div className="flex items-start gap-2 text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5 mt-1 text-teal-500 flex-shrink-0" />
                <p className="text-lg">
                  {'street' in (listing.address ?? {}) 
                    ? `${listing.address?.street ?? ''}, ${listing.address?.suburb ?? ''} ${listing.address?.state ?? ''} ${listing.address?.postcode ?? ''}`.trim()
                    : 'Address not available'}
                </p>
              </div>
              {listing.propertyType && (
                <div className="flex items-center gap-2 mt-2">
                  <FaBuilding className="w-4 h-4 text-gray-500" />
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {listing.propertyType}
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-1">
                {listing.price}
              </div>
              {listing.disposalMethod && (
                <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  {listing.disposalMethod === 'forSale' ? 'For Sale' : listing.disposalMethod === 'forRent' ? 'For Rent' : listing.disposalMethod}
                </div>
              )}
            </div>
          </div>

          {/* Save and Share Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-6 rounded-full transition-colors shadow-sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <AiFillHeart className="text-red-400" /> : <AiOutlineHeart />}
                {isFavorite ? "Saved" : "Save Property"}
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2.5 px-6 rounded-full transition-colors border border-gray-200 shadow-sm"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <FaShare />
                  Share Property
                </motion.button>

                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-3 z-10 border border-gray-200"
                  >
                    <div className="flex gap-2">
                      <button 
                        className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          const text = encodeURIComponent(`Check out this property: ${listing.heading}`);
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                        }}
                      >
                        <FaFacebookF />
                      </button>
                      <button 
                        className="p-2.5 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          const text = encodeURIComponent(`Check out this property: ${listing.heading}`);
                          window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                        }}
                      >
                        <FaTwitter />
                      </button>
                      <button 
                        className="p-2.5 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          const title = encodeURIComponent(listing.heading);
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
                        }}
                      >
                        <FaLinkedinIn />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Property ID: {listing.listingID || listing.id}
            </div>
          </div>

          {/* Property Description */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 rounded-lg">
                <FaInfo className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Property Description</h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: listing.description?.replace(/\n/g, '<br>') || 'No description available.' 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Property Features */}
          {listing.features && listing.features.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaCheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Property Features</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.features.map((feature, idx) => {
                  // Determine icon based on feature content
                  const getFeatureIcon = (featureText: string) => {
                    const text = featureText.toLowerCase();
                    if (text.includes('pool') || text.includes('swimming')) return <FaSwimmingPool className="w-4 h-4 text-blue-500" />;
                    if (text.includes('gym') || text.includes('fitness')) return <FaDumbbell className="w-4 h-4 text-purple-500" />;
                    if (text.includes('parking') || text.includes('garage')) return <FaParking className="w-4 h-4 text-gray-600" />;
                    if (text.includes('solar') || text.includes('energy')) return <FaSolarPanel className="w-4 h-4 text-yellow-500" />;
                    if (text.includes('security') || text.includes('alarm')) return <FaShieldAlt className="w-4 h-4 text-red-500" />;
                    if (text.includes('air') || text.includes('heating') || text.includes('cooling')) return <FaThermometerHalf className="w-4 h-4 text-blue-400" />;
                    if (text.includes('water') || text.includes('tank')) return <FaWater className="w-4 h-4 text-blue-600" />;
                    if (text.includes('wifi') || text.includes('internet')) return <FaWifi className="w-4 h-4 text-green-500" />;
                    if (text.includes('garden') || text.includes('yard') || text.includes('outdoor')) return <FaLeaf className="w-4 h-4 text-green-600" />;
                    return <FaCheckCircle className="w-4 h-4 text-emerald-500" />;
                  };
                  
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-teal-200 transition-colors">
                      <div className="mt-0.5">
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Property Highlights */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaHome className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Property Details</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { key: "bedrooms", icon: <FaBed className="w-6 h-6 text-purple-500" />, label: "Bedrooms", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
                { key: "bathrooms", icon: <FaBath className="w-6 h-6 text-blue-500" />, label: "Bathrooms", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
                { key: "carSpaces", icon: <FaCar className="w-6 h-6 text-gray-600" />, label: "Parking", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
                { key: "landSize", icon: <FaRulerCombined className="w-6 h-6 text-green-500" />, label: "Land Size", bgColor: "bg-green-50", borderColor: "border-green-200" }
              ].map((item) => {
                const value = listing.bedBathCarLand?.find((i) => i.key === item.key)?.value || "0";
                const displayValue = item.key === "landSize" && value !== "0" ? `${value} sqm` : value;
                
                return (
                  <div key={item.key} className={`${item.bgColor} ${item.borderColor} border rounded-xl p-4 text-center hover:shadow-md transition-shadow`}>
                    <div className="flex justify-center mb-3">
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {displayValue}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Property Information Timeline */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FaCalendarAlt className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Property Information</h2>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Property Type */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaBuilding className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Property Type</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {listing.type || listing.propertyType || 'Not specified'}
                  </div>
                </div>

                {/* Categories */}
                {listing.categories && listing.categories.length > 0 && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <FaHome className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {listing.categories.join(', ')}
                    </div>
                  </div>
                )}

                {/* Listing ID */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaInfo className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Property ID</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {listing.listingID || listing.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Information & CTAs */}
          {listing.agents && listing.agents.length > 0 && (
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Agent{listing.agents.length > 1 ? 's' : ''}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listing.agents.map((agent: any) => (
                  <div key={agent.agentID || agent.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      {/* Agent Image */}
                      {agent.imageURL ? (
                        <Image
                          src={agent.imageURL.replace('http://', 'https://')}
                          alt={agent.name || 'Agent'}
                          width={80}
                          height={80}
                          className="rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}

                      {/* Agent Details */}
                      <div className="flex-grow">
                        <Link 
                          href={`/agents/${agent.agentID || agent.id}`}
                          className="text-lg font-semibold text-teal-600 hover:text-teal-700 hover:underline block mb-1"
                        >
                          {agent.name}
                        </Link>
                        {agent.title && (
                          <p className="text-sm text-gray-600 mb-3">{agent.title}</p>
                        )}
                        
                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                          {agent.mobile && (
                            <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                              <div className="p-1.5 bg-teal-100 rounded-lg">
                                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Mobile</div>
                                <div className="text-sm font-medium text-gray-800">{agent.mobile}</div>
                              </div>
                            </div>
                          )}
                          {agent.phone && (
                            <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                              <div className="p-1.5 bg-blue-100 rounded-lg">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Office</div>
                                <div className="text-sm font-medium text-gray-800">{agent.phone}</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Agent CTAs */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href={`/contact-agent?agentID=${agent.agentID || agent.id}&listingID=${listing.listingID || listing.id}&agentName=${encodeURIComponent(agent.name)}`}
                            className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-700 transition-colors text-center"
                          >
                            Contact {agent.name?.split(' ')[0]}
                          </Link>
                          
                          {agent.mobile && (
                            <a
                              href={`tel:${agent.mobile}`}
                              className="bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded text-sm font-medium hover:bg-teal-50 transition-colors text-center"
                            >
                              Call Now
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional CTAs */}
              <div className="mt-6 bg-teal-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Interested in this property?
                </h3>
                <p className="text-gray-600 mb-4">
                  Get in touch with our team for more information, arrange an inspection, or request a property appraisal.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/contact-agent?listingID=${listing.listingID || listing.id}`}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  >
                    Schedule Inspection
                  </Link>
                  <Link
                    href={`/appraisal-request?referenceProperty=${listing.listingID || listing.id}`}
                    className="bg-white text-teal-600 border border-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                  >
                    Request Appraisal
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      </div>
    </div>
  );
}