"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Gallery from 'react-image-gallery';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaShare } from 'react-icons/fa';
import { Listing } from 'types/listing';
import { cleanPropertyTitle } from '@/lib/utils';

interface ListingClientProps {
  listing: Listing;
}

export default function ListingClient({ listing }: ListingClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  return (
    <div className="container mx-auto px-4 py-10">
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
        {/* Hero Section with Carousel */}
        <div className="relative h-[600px] w-full">
          {listing.images && listing.images.length > 0 ? (
            <Gallery
              items={listing.images.map((image) => ({
                original: image.url.replace(/^http:\/\//i, 'https://'),
                thumbnail: image.url.replace(/^http:\/\//i, 'https://'),
              }))}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              showThumbnails={false}
              autoPlay={true}
              slideInterval={5000}
              renderItem={(item) => (
                <div className="relative h-full w-full">
                  <Image
                    src={item.original}
                    alt={listing.heading}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
              )}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p>No image available</p>
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-gray-700 opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              {cleanPropertyTitle(listing.heading)}
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Schedule Viewing
            </motion.button>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-2">
                {cleanPropertyTitle(listing.heading)}
              </h2>
              <p className="text-gray-600 text-lg">
                {listing.address.street}, {listing.address.suburb} {listing.address.state} {listing.address.postcode}
              </p>
            </div>
            <div className="text-2xl font-bold text-teal-600">{listing.price}</div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2>Description</h2>
            <p>{listing.description}</p>
          </div>

          {/* Features Section */}
          {listing.features && listing.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside text-gray-700">
                {listing.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Property Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { key: "bedrooms", icon: "bed", label: "Beds" },
              { key: "bathrooms", icon: "bath", label: "Baths" },
              { key: "carSpaces", icon: "car", label: "Car Spaces" },
              { key: "landSize", icon: "land", label: "sqm Land" }
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div>
                  <p className="font-medium">
                    {listing.bedBathCarLand?.find((i) => i.key === item.key)?.value || "0"} {item.label}
                  </p>
                </div>
              </div>
            ))}
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
                        <div className="space-y-1 mb-4 text-sm text-gray-700">
                          {agent.mobile && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>📱 {agent.mobile}</span>
                            </div>
                          )}
                          {agent.phone && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>📞 {agent.phone}</span>
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

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              {isFavorite ? "Saved" : "Save"}
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full transition-colors"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <FaShare />
                Share
              </motion.button>

              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-10"
                >
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-blue-600 text-white">
                      <FaFacebookF />
                    </button>
                    <button className="p-2 rounded-full bg-sky-500 text-white">
                      <FaTwitter />
                    </button>
                    <button className="p-2 rounded-full bg-blue-700 text-white">
                      <FaLinkedinIn />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}