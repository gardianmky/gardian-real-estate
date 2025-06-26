"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, MapPin, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export type PropertyCategory = "sale" | "rent" | "commercial"

interface SearchFiltersProps {
  category: PropertyCategory
  className?: string
}

export default function SearchFilters({ category, className = "" }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  // Search state
  const [location, setLocation] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [propertyType, setPropertyType] = useState("")

  // Commercial-specific filters
  const [floorArea, setFloorArea] = useState("")
  const [commercialType, setCommercialType] = useState("")

  // Rental-specific filters
  const [furnished, setFurnished] = useState(false)
  const [petsAllowed, setPetsAllowed] = useState(false)
  const [availableFrom, setAvailableFrom] = useState("")

  // Initialize filters from URL params
  useEffect(() => {
    if (searchParams) {
      setLocation(searchParams.get("location") || "")
      setMinPrice(searchParams.get("minPrice") || "")
      setMaxPrice(searchParams.get("maxPrice") || "")
      setBedrooms(searchParams.get("bedrooms") || "")
      setBathrooms(searchParams.get("bathrooms") || "")
      setPropertyType(searchParams.get("propertyType") || "")

      // Commercial-specific
      if (category === "commercial") {
        setFloorArea(searchParams.get("floorArea") || "")
        setCommercialType(searchParams.get("commercialType") || "")
      }

      // Rental-specific
      if (category === "rent") {
        setFurnished(searchParams.get("furnished") === "true")
        setPetsAllowed(searchParams.get("petsAllowed") === "true")
        setAvailableFrom(searchParams.get("availableFrom") || "")
      }
    }
  }, [searchParams, category])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query parameters
    const params = new URLSearchParams()

    if (location) params.set("location", location)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (bedrooms) params.set("bedrooms", bedrooms)
    if (bathrooms) params.set("bathrooms", bathrooms)
    if (propertyType) params.set("propertyType", propertyType)

    // Add category-specific params
    if (category === "commercial") {
      if (floorArea) params.set("floorArea", floorArea)
      if (commercialType) params.set("commercialType", commercialType)
    }

    if (category === "rent") {
      if (furnished) params.set("furnished", "true")
      if (petsAllowed) params.set("petsAllowed", "true")
      if (availableFrom) params.set("availableFrom", availableFrom)
    }

    // Set page to 1 when searching
    params.set("page", "1")

    // Navigate to the current page with search params
    let path = ""
    switch (category) {
      case "sale":
        path = "/for-sale"
        break
      case "rent":
        path = "/for-rent"
        break
      case "commercial":
        path = "/commercial"
        break
    }

    router.push(`${path}?${params.toString()}`)
  }

  // Reset all filters
  const resetFilters = () => {
    setLocation("")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("")
    setBathrooms("")
    setPropertyType("")
    setFloorArea("")
    setCommercialType("")
    setFurnished(false)
    setPetsAllowed(false)
    setAvailableFrom("")

    // Navigate to the base page without params
    let path = ""
    switch (category) {
      case "sale":
        path = "/for-sale"
        break
      case "rent":
        path = "/for-rent"
        break
      case "commercial":
        path = "/commercial"
        break
    }

    router.push(path)
  }

  // Get price options based on category
  const getPriceOptions = () => {
    if (category === "rent") {
      return [
        { label: "Any", value: "" },
        { label: "$100/week", value: "100" },
        { label: "$200/week", value: "200" },
        { label: "$300/week", value: "300" },
        { label: "$400/week", value: "400" },
        { label: "$500/week", value: "500" },
        { label: "$600/week", value: "600" },
        { label: "$700/week", value: "700" },
        { label: "$800/week", value: "800" },
        { label: "$900/week", value: "900" },
        { label: "$1,000/week", value: "1000" },
        { label: "$1,500/week", value: "1500" },
      ]
    } else {
      return [
        { label: "Any", value: "" },
        { label: "$100,000", value: "100000" },
        { label: "$200,000", value: "200000" },
        { label: "$300,000", value: "300000" },
        { label: "$400,000", value: "400000" },
        { label: "$500,000", value: "500000" },
        { label: "$600,000", value: "600000" },
        { label: "$700,000", value: "700000" },
        { label: "$800,000", value: "800000" },
        { label: "$900,000", value: "900000" },
        { label: "$1,000,000", value: "1000000" },
        { label: "$1,500,000", value: "1500000" },
        { label: "$2,000,000+", value: "2000000" },
      ]
    }
  }

  // Get property type options based on category
  const getPropertyTypeOptions = () => {
    if (category === "commercial") {
      return [
        { label: "Any Type", value: "" },
        { label: "Office", value: "Office" },
        { label: "Retail", value: "Retail" },
        { label: "Industrial", value: "Industrial" },
        { label: "Warehouse", value: "Warehouse" },
        { label: "Land", value: "Land" },
        { label: "Other", value: "Other" },
      ]
    } else {
      return [
        { label: "Any Type", value: "" },
        { label: "House", value: "House" },
        { label: "Apartment", value: "Apartment" },
        { label: "Townhouse", value: "Townhouse" },
        { label: "Villa", value: "Villa" },
        { label: "Land", value: "Land" },
        { label: "Rural", value: "Rural" },
      ]
    }
  }

  // Get floor area options for commercial properties
  const getFloorAreaOptions = () => {
    return [
      { label: "Any Size", value: "" },
      { label: "Up to 100m²", value: "100" },
      { label: "100-200m²", value: "200" },
      { label: "200-500m²", value: "500" },
      { label: "500-1000m²", value: "1000" },
      { label: "1000m²+", value: "1001" },
    ]
  }

  // Get commercial type options
  const getCommercialTypeOptions = () => {
    return [
      { label: "Any", value: "" },
      { label: "For Sale", value: "Sale" },
      { label: "For Lease", value: "Lease" },
      { label: "Both", value: "Both" },
    ]
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <form onSubmit={handleSearch}>
        {/* Basic Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Location (suburb, city, postcode)"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Filter size={18} />
            Filters
            {isAdvancedOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            <span>Search</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <select
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {getPriceOptions().map((option) => (
                    <option key={`min-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {getPriceOptions().map((option) => (
                    <option key={`max-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {getPropertyTypeOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms & Bathrooms (not for commercial) */}
              {category !== "commercial" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </>
              )}

              {/* Commercial-specific filters */}
              {category === "commercial" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor Area</label>
                    <select
                      value={floorArea}
                      onChange={(e) => setFloorArea(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {getFloorAreaOptions().map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commercial Type</label>
                    <select
                      value={commercialType}
                      onChange={(e) => setCommercialType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {getCommercialTypeOptions().map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Rental-specific filters */}
              {category === "rent" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                    <input
                      type="date"
                      value={availableFrom}
                      onChange={(e) => setAvailableFrom(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex items-center space-x-6 mt-6">
                    <div className="flex items-center">
                      <input
                        id="furnished"
                        type="checkbox"
                        checked={furnished}
                        onChange={(e) => setFurnished(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="furnished" className="ml-2 block text-sm text-gray-700">
                        Furnished
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="petsAllowed"
                        type="checkbox"
                        checked={petsAllowed}
                        onChange={(e) => setPetsAllowed(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="petsAllowed" className="ml-2 block text-sm text-gray-700">
                        Pets Allowed
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Reset Filters
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
