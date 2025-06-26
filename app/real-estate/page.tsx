"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, ChevronDown } from "lucide-react"

interface PropertyCard {
  id: string
  title: string
  address: string
  price: string
  bedrooms: number
  bathrooms: number
  carSpaces: number
  propertyType: string
  imageUrl: string
}

export default function RealEstatePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    propertyType: "",
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
    carSpaces: "",
  })

  // Sample property data
  const properties: PropertyCard[] = [
    {
      id: "1",
      title: "Modern Family Home",
      address: "123 Main Street, Mackay, QLD 4740",
      price: "$750,000",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      propertyType: "House",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "2",
      title: "Beachfront Apartment",
      address: "45 Ocean Drive, Mackay, QLD 4740",
      price: "$550,000",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      propertyType: "Apartment",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "3",
      title: "Rural Retreat",
      address: "789 Country Road, Pioneer Valley, QLD 4751",
      price: "$850,000",
      bedrooms: 5,
      bathrooms: 3,
      carSpaces: 3,
      propertyType: "House",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "4",
      title: "City Penthouse",
      address: "56 Central Avenue, Mackay, QLD 4740",
      price: "$650,000",
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 2,
      propertyType: "Apartment",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "5",
      title: "Suburban Family Home",
      address: "23 Quiet Street, West Mackay, QLD 4740",
      price: "$495,000",
      bedrooms: 3,
      bathrooms: 1,
      carSpaces: 1,
      propertyType: "House",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "6",
      title: "Waterfront Property",
      address: "78 River View, North Mackay, QLD 4740",
      price: "$1,200,000",
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      propertyType: "House",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
  ]

  // Filter properties based on search term and filters
  const filteredProperties = properties.filter((property) => {
    // Search term filter
    if (
      searchTerm &&
      !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !property.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Property type filter
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false
    }

    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms < Number.parseInt(filters.bedrooms)) {
      return false
    }

    // Bathrooms filter
    if (filters.bathrooms && property.bathrooms < Number.parseInt(filters.bathrooms)) {
      return false
    }

    // Car spaces filter
    if (filters.carSpaces && property.carSpaces < Number.parseInt(filters.carSpaces)) {
      return false
    }

    // Price range filter
    if (filters.priceRange) {
      const price = Number.parseInt(property.price.replace(/[^0-9]/g, ""))
      const [min, max] = filters.priceRange.split("-").map((p) => Number.parseInt(p))

      if (max) {
        if (price < min || price > max) return false
      } else {
        // For "1000000+" case
        if (price < min) return false
      }
    }

    return true
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Real Estate Listings</h1>

      {/* Search and Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by location, property name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} />
            Filters
            <ChevronDown size={18} className={`transform transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {isFilterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-100">
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Price Range</option>
              <option value="0-300000">$0 - $300,000</option>
              <option value="300000-500000">$300,000 - $500,000</option>
              <option value="500000-750000">$500,000 - $750,000</option>
              <option value="750000-1000000">$750,000 - $1,000,000</option>
              <option value="1000000-">$1,000,000+</option>
            </select>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Bathrooms</option>
              <option value="1">1+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
            <select
              name="carSpaces"
              value={filters.carSpaces}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Car Spaces</option>
              <option value="1">1+ Car Spaces</option>
              <option value="2">2+ Car Spaces</option>
              <option value="3">3+ Car Spaces</option>
              <option value="4">4+ Car Spaces</option>
            </select>
          </div>
        )}
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <Link href={`/listing/${property.id}`} key={property.id} className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
                <Image
                  src={property.imageUrl || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="property-badge">For Sale</div>

                <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-white/90 backdrop-blur-sm text-teal-600 py-2 rounded-lg font-medium hover:bg-white transition-colors duration-200">
                    Quick View
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold line-clamp-1 group-hover:text-teal-600 transition-colors duration-200">
                    {property.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                </div>

                <p className="text-xl font-bold text-teal-600 mb-5">{property.price}</p>

                <div className="flex justify-between text-sm text-gray-700 mb-5 border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teal-500 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teal-500 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teal-500 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>{property.carSpaces} Cars</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-gray-600">No properties found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}
