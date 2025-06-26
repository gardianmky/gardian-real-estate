"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"
import dynamic from "next/dynamic"
import type { Listing } from "@/types/listing"
import type { FetchListingsParams } from "@/types/listing"
import { fetchListings } from "@/lib/api"

// Define local types based on usage
type ListingStatus = 'forSale' | 'forRent'
type PropertyType = 'Residential' | 'Commercial'

// Dynamic imports for better code splitting
const PropertyListing = dynamic(() => import("./property-listing"), {
  loading: () => <Loader2 className="animate-spin" />,
  ssr: false
})
const Pagination = dynamic(() => import("./pagination"), {
  loading: () => <Loader2 className="animate-spin" />,
  ssr: false
})

interface PropertyResultsProps {
  listingType: ListingStatus
  propertyType?: PropertyType
}

export default function PropertyResults({ listingType, propertyType }: PropertyResultsProps) {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const pageParam = searchParams.get("page")
  const location = searchParams.get("location")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const category = searchParams.get("propertyType") as PropertyType | null
  const bedrooms = searchParams.get("bedrooms")
  const bathrooms = searchParams.get("bathrooms")

  useEffect(() => {
    setCurrentPage(pageParam ? Number.parseInt(pageParam) : 1)
  }, [pageParam])

  const locationValue = searchParams.get("location")
  const categoryValue = searchParams.get("propertyType") as PropertyType | null

  const fetchFilteredListings = useCallback(async () => {
    try {
      setLoading(true)
      const itemsPerPage = 9
      const data = await fetchListings({
        type: propertyType || "Commercial",
        disposalMethod: listingType,
        category: categoryValue ? [categoryValue] : undefined,
        page: currentPage,
        pageSize: itemsPerPage,
      })

      const listings = Array.isArray(data) ? data : data.listings || []

      const filteredData = propertyType === "Commercial"
        ? listings.filter((listing: Listing) =>
            listing.type === "Commercial" &&
            Array.isArray(listing.categories) &&
            listing.categories.includes("Commercial")
          )
        : listings

      setListings(filteredData)
      setTotalPages(Math.ceil(listings.length / itemsPerPage))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch listings")
    } finally {
      setLoading(false)
    }
  }, [propertyType, listingType, categoryValue, currentPage])

  useEffect(() => {
    fetchFilteredListings()
  }, [fetchFilteredListings])

  const filteredListings = useMemo(() => listings, [listings])

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (listings.length === 0) return <EmptyState hasFilters={!!searchParams.toString()} />

  return (
    <div>
      <ResultsHeader count={filteredListings.length} hasFilters={!!searchParams.toString()} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredListings.map((listing) => (
          <PropertyListing
            key={listing.listingID}
            listing={listing}
            category={listingType as 'forSale' | 'forRent'}
          />
        ))}
      </div>

      <Pagination totalPages={totalPages} currentPage={Number(searchParams?.get('page') || '1')} />
    </div>
  )
}

// Extracted UI components
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
      <Loader2 className="h-12 w-12 text-primary-500 animate-spin mb-4" />
      <p className="text-gray-600">Loading properties...</p>
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm" role="alert">
      <div className="flex items-center">
        <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
        <p className="font-medium">{error}</p>
      </div>
    </div>
  )
}

function ResultsHeader({ count, hasFilters }: { count: number; hasFilters: boolean }) {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <p className="text-gray-700">
        Found <span className="font-semibold text-primary-600">{count}</span> properties
        {hasFilters ? " matching your search criteria" : ""}
      </p>
    </div>
  )
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {hasFilters ? 'No properties found' : 'No properties available'}
      </h3>
      <p className="text-gray-600 mb-6">
        {hasFilters
          ? "We couldn't find any properties matching your search criteria."
          : "There are currently no properties listed."}
      </p>
      {hasFilters && <p className="text-gray-600">Try adjusting your filters or browse all properties.</p>}
    </div>
  )
}
