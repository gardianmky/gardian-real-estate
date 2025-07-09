"use client"

import Link from "next/link"
import { SearchProvider, useSearch } from "context/search-context"
import PropertyFilters from "components/search/property-filters"
import SearchResults from "components/search/search-results"
import SearchBar from "components/search/search-bar"

export default function RentPage() {
  return (
    <SearchProvider>
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

          {/* Rental Application Form Link */}
          <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-teal-800 mb-1">Ready to Apply?</h3>
                <p className="text-sm text-teal-600">Download the official REIQ rental application form</p>
              </div>
              <a 
                href="https://www.rta.qld.gov.au/sites/default/files/2025-03/Form-22-Rental-application.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Download REIQ Rental Application Form (PDF)
              </a>
            </div>
            <p className="text-xs text-teal-500 mt-2">
              Please complete and return this form to apply for a rental property
            </p>
          </div>
        </div>

        <div className="mb-6">
          <PropertyFilters propertyType="rent" />
        </div>

        <div className="w-full">
          <SearchResults propertyType="rent" />
        </div>
      </div>
    </SearchProvider>
  )
}