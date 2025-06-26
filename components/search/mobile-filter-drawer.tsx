"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import PropertyFilters from "./property-filters"
import { useSearch, type PropertyType } from "@/context/search-context"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  propertyType: PropertyType
}

export default function MobileFilterDrawer({ isOpen, onClose, propertyType }: MobileFilterDrawerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { activeFiltersCount } = useSearch()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Lock body scroll
      document.body.style.overflow = "hidden"
    } else {
      // Add a delay to allow for animation
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      // Restore body scroll
      document.body.style.overflow = ""
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full h-[90vh] bg-white rounded-t-xl overflow-hidden transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {activeFiltersCount} active
              </span>
            )}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(90vh-64px)]">
          <PropertyFilters propertyType={propertyType} />
        </div>
      </div>
    </div>
  )
}
