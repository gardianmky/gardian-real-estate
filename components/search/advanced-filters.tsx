"use client"

import { useState } from "react"
import { Filter, ChevronDown, ChevronUp, Check } from "lucide-react"
import { useSearchContext } from "@/context/search-context"

interface PriceOption {
  label: string
  value: string
}

export default function AdvancedFilters() {
  const { propertyType } = useSearchContext()
  const [isOpen, setIsOpen] = useState(false)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [carSpaces, setCarSpaces] = useState("")
  const [landSize, setLandSize] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")

  // Generate price options based on property type
  const getPriceOptions = (): PriceOption[] => {
    if (propertyType === "rent") {
      return [
        { label: "Any", value: "" },
        { label: "$100", value: "100" },
        { label: "$200", value: "200" },
        { label: "$300", value: "300" },
        { label: "$400", value: "400" },
        { label: "$500", value: "500" },
        { label: "$600", value: "600" },
        { label: "$700", value: "700" },
        { label: "$800", value: "800" },
        { label: "$900", value: "900" },
        { label: "$1,000", value: "1000" },
        { label: "$1,500", value: "1500" },
        { label: "$2,000", value: "2000" },
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
        { label: "$2,000,000", value: "2000000" },
        { label: "$3,000,000", value: "3000000" },
      ]
    }
  }

  const priceOptions = getPriceOptions()

  // Property features
  const propertyFeatures = [
    { id: "pool", label: "Swimming Pool" },
    { id: "aircon", label: "Air Conditioning" },
    { id: "garage", label: "Garage" },
    { id: "balcony", label: "Balcony" },
    { id: "garden", label: "Garden" },
    { id: "security", label: "Security System" },
    { id: "study", label: "Study" },
    { id: "ensuite", label: "Ensuite" },
  ]

  // Handle feature toggle
  const toggleFeature = (featureId: string) => {
    setFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      minPrice !== "" ||
      maxPrice !== "" ||
      bedrooms !== "" ||
      bathrooms !== "" ||
      carSpaces !== "" ||
      landSize !== "" ||
      features.length > 0
    )
  }

  const resetFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("")
    setBathrooms("")
    setCarSpaces("")
    setLandSize("")
    setFeatures([])
    setSortBy("newest")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-100">
      <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-teal-500" />
          <span className="font-medium">Advanced Filters</span>
          {hasActiveFilters() && (
            <span className="ml-2 bg-accent-100 text-accent-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Filters Active
            </span>
          )}
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {priceOptions.map((option) => (
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
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {priceOptions.map((option) => (
                  <option key={`max-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <select
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Car Spaces */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Spaces</label>
              <select
                value={carSpaces}
                onChange={(e) => setCarSpaces(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Land Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land Size</label>
              <select
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Any</option>
                <option value="300">300m²+</option>
                <option value="500">500m²+</option>
                <option value="1000">1,000m²+</option>
                <option value="2000">2,000m²+</option>
                <option value="5000">5,000m²+</option>
                <option value="10000">10,000m²+</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price (Low to High)</option>
                <option value="price_high">Price (High to Low)</option>
                <option value="beds_high">Most Bedrooms</option>
                <option value="land_high">Largest Land Size</option>
              </select>
            </div>
          </div>

          {/* Property Features */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Property Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {propertyFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    features.includes(feature.id)
                      ? "bg-teal-50 border border-teal-200"
                      : "hover:bg-gray-50 border border-gray-100"
                  }`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div
                    className={`h-4 w-4 rounded-sm mr-2 flex items-center justify-center ${
                      features.includes(feature.id) ? "bg-teal-500" : "border border-gray-300"
                    }`}
                  >
                    {features.includes(feature.id) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <label className="text-sm text-gray-700 cursor-pointer">{feature.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Reset Filters
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-accent-500 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
