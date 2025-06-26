"use client"
import { useState, useEffect } from "react";
import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Bath, Car, Maximize } from "lucide-react";
import type { Listing } from "../types/listing";

interface HomepageFeatureProps {
  featuredProperty: Listing | null;
}

const HomepageFeature: React.FC<HomepageFeatureProps> = ({ featuredProperty }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    if (featuredProperty) {
      setIsLoading(false);
    }
  }, [featuredProperty]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondImage(true), 2000); // 2s pulse, then fade
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    featuredProperty && (
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/amethyst-flow.png"
              alt="Background"
              layout="fill"
              object="cover"
              className={`pulse-animation ${showSecondImage ? "fade-out" : ""}`}
              style={{ transition: "opacity 2s", opacity: showSecondImage ? "0.25" : "0.19", filter: "blur(5px)" }}
            />
            <Image
              src="/amens.png"
              alt="Amens"
              layout="fill"
              object="cover"
              className={`absolute inset-0 ${showSecondImage ? "fade-in" : "opacity-0"}`}
              style={{ transition: "opacity 2s", opacity: showSecondImage ? "0.25" : "0.19", filter: "blur(5px)" }}
            />
          </div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <div className="mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ktx8CkroQ7jDhtLtBaCyb4MJs3KkkP.png"
                  alt="Gardian Logo"
                  width={200}
                  height={80}
                  className="mb-4"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Your Dream Property</h2>
              <p className="text-gray-600 mb-6">
                Explore our featured listing and find the perfect place to call home.
              </p>

              {/* Property details */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Home className="w-5 h-5 mr-2 text-teal-600" />
                  <span>{featuredProperty.bedrooms} Beds</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Bath className="w-5 h-5 mr-2 text-teal-600" />
                  <span>{featuredProperty.bathrooms} Baths</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Car className="w-5 h-5 mr-2 text-teal-600" />
                  <span>{featuredProperty.garages} Garage</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Maximize className="w-5 h-5 mr-2 text-teal-600" />
                  <span>{featuredProperty.area} m²</span>
                </div>
              </div>

              <Link
                href={`/listing/${featuredProperty.id}`}
                className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
                <Image
                  src={featuredProperty.images[0].url || "/placeholder.svg"}
                  alt={featuredProperty.heading}
                  width={600}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 p-4">
                  <h3 className="text-lg font-semibold text-white">{featuredProperty.heading}</h3>
                  <p className="text-gray-300 text-sm">
                    {featuredProperty.address.street}, {featuredProperty.address.suburb}
                  </p>
                  <div className="mt-2 text-white font-bold text-xl">${featuredProperty.price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default HomepageFeature;
