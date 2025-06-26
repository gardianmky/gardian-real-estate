"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface DropdownItem {
  label: string
  href: string
}

interface DropdownSection {
  title: string
  items: DropdownItem[]
}

interface DropdownProps {
  sections: DropdownSection[]
  label: string
}

function Dropdown({ sections, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 hover:text-teal-600 transition-colors duration-200 py-2"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 md:w-80 bg-white rounded-lg shadow-lg z-50 py-4 border border-gray-100">
          <div className="grid grid-cols-1 gap-4">
            {sections.map((section, index) => (
              <div key={index} className="px-4">
                <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                <ul className="space-y-1">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="block text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 py-1 rounded transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function DropdownNavigation() {
  const realEstateDropdown = {
    label: "Real Estate",
    sections: [
      {
        title: "Browse Homes",
        items: [
          { label: "Browse all homes in Mackay", href: "/browse/all" },
          { label: "Northern Beaches real estate", href: "/browse/northern-beaches" },
          { label: "Mackay City real estate", href: "/browse/mackay-city" },
          { label: "Pioneer Valley real estate", href: "/browse/pioneer-valley" },
          { label: "Paget real estate", href: "/browse/paget" },
          { label: "Sarina real estate", href: "/browse/sarina" },
          { label: "West Mackay real estate", href: "/browse/west-mackay" },
        ],
      },
    ],
  }

  const rentalsDropdown = {
    label: "Rentals",
    sections: [
      {
        title: "Rental Properties",
        items: [
          { label: "Rental Buildings in Mackay", href: "/rentals/all" },
          { label: "Northern Beaches apartments for rent", href: "/rentals/northern-beaches" },
          { label: "Mackay City apartments for rent", href: "/rentals/mackay-city" },
          { label: "Pioneer Valley apartments for rent", href: "/rentals/pioneer-valley" },
          { label: "Paget apartments for rent", href: "/rentals/paget" },
          { label: "Sarina apartments for rent", href: "/rentals/sarina" },
          { label: "West Mackay apartments for rent", href: "/rentals/west-mackay" },
        ],
      },
    ],
  }

  const commercialDropdown = {
    label: "Commercial",
    sections: [
      {
        title: "Commercial Properties",
        items: [
          { label: "All commercial properties", href: "/commercial/all" },
          { label: "Office spaces", href: "/commercial/office" },
          { label: "Retail properties", href: "/commercial/retail" },
          { label: "Industrial spaces", href: "/commercial/industrial" },
          { label: "Land for development", href: "/commercial/land" },
          { label: "Investment properties", href: "/commercial/investment" },
          { label: "Business for sale", href: "/commercial/business" },
        ],
      },
    ],
  }

  const browseHomesDropdown = {
    label: "Browse Homes",
    sections: [
      {
        title: "Suburbs",
        items: [
          { label: "Northern Beaches", href: "/browse/northern-beaches" },
          { label: "Mackay City", href: "/browse/mackay-city" },
          { label: "Pioneer Valley", href: "/browse/pioneer-valley" },
          { label: "Paget", href: "/browse/paget" },
          { label: "Sarina", href: "/browse/sarina" },
          { label: "West Mackay", href: "/browse/west-mackay" },
        ],
      },
    ],
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex space-x-8">
            <Dropdown sections={realEstateDropdown.sections} label={realEstateDropdown.label} />
            <Dropdown sections={rentalsDropdown.sections} label={rentalsDropdown.label} />
            <Dropdown sections={commercialDropdown.sections} label={commercialDropdown.label} />
            <Dropdown sections={browseHomesDropdown.sections} label={browseHomesDropdown.label} />
          </div>
          <div>
            <Link
              href="/contact"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
