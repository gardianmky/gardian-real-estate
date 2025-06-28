"use client"

import Link from "next/link"
import { SearchProvider, useSearch } from "context/search-context"
import PropertyFilters from "components/search/property-filters"
import SearchResults from "components/search/search-results"
import SearchBar from "components/search/search-bar"

export default function RentPage() {
  return (
    
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200" >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Properties For Rent</h1>
          <p className="text-gray-600 mb-6">
            Browse our selection of rental properties in Mackay and surrounding areas. Find your perfect rental home
            today!
          </p>

          <div className="mb-8">
            <SearchBar variant="header" defaultPropertyType="rent" />
          </div>
        </div>

        <div className="mb-6">
          <PropertyFilters propertyType="rent" />
        </div>

        <div className="w-full">
          <SearchResults propertyType="rent" />
        </div>
      </div>
    
  )
}