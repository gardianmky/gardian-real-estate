"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, ClipboardCheck } from "lucide-react"

export default function PropertyFilters() {
  const [activeFilter, setActiveFilter] = useState("residential")

  const propertyTypes = [
    { label: "House", value: "House" },
    { label: "Townhouse", value: "Townhouse" },
    { label: "Unit", value: "Unit" },
    { label: "Villa", value: "Villa" },
    { label: "Apartment", value: "Apartment" },
    { label: "Penthouse", value: "Pent house" },
    { label: "Studio", value: "Studio" },
    { label: "House and Land", value: "House and Land" },
    { label: "Duplex", value: "Duplex" },
    { label: "Terrace", value: "Terrace" },
    { label: "Serviced Apartment", value: "Serviced Apartment" },
    { label: "Mobile Home", value: "Mobile Home" },
    { label: "Land", value: "Land" },
    { label: "Commercial", value: "Commercial" },
    { label: "Business", value: "Business" },
    { label: "Rural", value: "Rural" },
    { label: "Semi Rural", value: "Semi Rural" },
    { label: "Acerage Semi Rural", value: "Acerage Semi Rural" }
  ]

  const secondaryOptions = [
    {
      label: "Sold",
      href: "/sold",
      icon: <CheckCircle className="h-5 w-5 mr-2" />,
    },
    {
      label: "Leased",
      href: "/leased",
      icon: <ClipboardCheck className="h-5 w-5 mr-2" />,
    },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <div className="flex flex-col space-y-4">
        {/* Property Type Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Property Type</h3>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setActiveFilter(type.value)}
                className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                  activeFilter === type.value ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Options */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Other Options</h3>
          <div className="flex flex-wrap gap-2">
            {secondaryOptions.map((option) => (
              <Link
                key={option.label}
                href={option.href}
                className="flex items-center px-4 py-2 rounded-md text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                {option.icon}
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
