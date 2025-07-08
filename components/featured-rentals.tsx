"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchListings } from "@/lib/api"
import type { Listing } from "@/types/listing"
import { PropertyFeaturesInline } from "@/components/ui/property-features"

export default function FeaturedRentals() {
  const [rentalProperties, setRentalProperties] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRentalListings() {
      try {
        setIsLoading(true)
        const allListings = await fetchListings({
          disposalMethod: 'forRent',
          pageSize: 6
        })

        // Filter for rental properties (in a real app, you might have a specific API endpoint for rentals)
        // For now, we'll just take the first 3 listings and treat them as rentals
        const rentals = allListings.listings?.slice(0, 3) || []

        setRentalProperties(rentals)
      } catch (error) {
        console.error("Error fetching rental listings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRentalListings()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-teal-600">Rentals</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our selection of quality rental properties in Mackay and surrounding areas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-full animate-pulse">
                <div className="h-64 bg-gray-200 w-full"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-teal-600">Rentals</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of quality rental properties in Mackay and surrounding areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rentalProperties.map((property) => {
            // Get the first image or use a placeholder
            const mainImage =
              property.images && property.images.length > 0
                ? property.images[0].url
                : "/placeholder.svg?height=300&width=400"

            // Find values for beds, baths, cars
            const getBedBathCarValue = (key: string) => {
              const item = property.bedBathCarLand?.find((item) => item.key === key)
              return item ? item.value : "0"
            }

            return (
              <Link href={`/listing/${property.listingID}`} key={property.listingID} className="block group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover h-full">
                  <div className="relative h-64 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <Image
                      src={mainImage || "/placeholder.svg"}
                      alt={property.heading}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 z-20 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      For Rent
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-teal-600 transition-colors duration-200">
                        {property.heading}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{`${property.address.street}, ${property.address.suburb}, ${property.address.state} ${property.address.postcode}`}</p>
                    </div>

                    <p className="text-xl font-bold text-teal-600 mb-2">{property.price}</p>
                    <p className="text-sm text-accent-600 font-medium mb-4">Available Now</p>

                    <div className="border-t border-gray-100 pt-4 mb-5">
                      <PropertyFeaturesInline listing={property} />
                    </div>

                    {/* Agent Information */}
                    {property.agents && property.agents.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{property.agents[0].name || 'Contact Agent'}</span>
                      </div>
                    )}

                    <button className="w-full bg-gray-50 hover:bg-gray-100 text-teal-600 py-2 rounded-lg font-medium transition-colors duration-200 mt-auto">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/rent"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            <span>View All Rental Properties</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
