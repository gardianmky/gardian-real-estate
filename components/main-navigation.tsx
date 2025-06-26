"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Key, Building, Menu, X, User, Info, Mail } from "lucide-react"
import Image from "next/image"

interface DropdownItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface DropdownSection {
  title: string
  items: DropdownItem[]
}

interface DropdownProps {
  sections: DropdownSection[]
  label: string
  icon?: React.ReactNode
  isMobile?: boolean
}

function Dropdown({ sections, label, icon, isMobile = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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

  const isActive = sections.some(section =>
    section.items.some(item =>
      pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
  )

  return (
    <div className="relative" ref={dropdownRef}>
      {isMobile ? (
        <div className="w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center w-full px-4 py-3 rounded-md transition-colors duration-200 text-left
              ${isActive ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
            `}
          >
            {icon}
            <span className="ml-2">{label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="mt-2 ml-6 space-y-2">
              {sections.map((section, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium text-gray-500 text-sm px-2">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className={`block px-4 py-2 rounded transition-colors duration-200
                            ${pathname === item.href || pathname.startsWith(`${item.href}/`)
                              ? "bg-teal-100 text-teal-700"
                              : "text-gray-600 hover:bg-gray-50"}
                          `}
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
          )}
        </div>
      ) : (
        <div className="relative group">
          <button
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200
              ${isActive ? "bg-teal-500 text-white" : "text-gray-700 hover:bg-gray-100"}
            `}
          >
            {icon}
            <span className="ml-2">{label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 py-4 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="grid grid-cols-1 gap-4">
              {sections.map((section, index) => (
                <div key={index} className="px-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className={`block text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 py-1 rounded transition-colors duration-200
                            ${pathname === item.href || pathname.startsWith(`${item.href}/`) ? "text-teal-600 bg-teal-50" : ""}
                          `}
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
        </div>
      )}
    </div>
  )
}

export default function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const realEstateDropdown = {
    label: "Buy",
    icon: <Home className="h-5 w-5" />,
    sections: [
      {
        title: "GARDIAN Properties",
        items: [
          { label: "All Properties", href: "/buy" },
          { label: "For Sale", href: "/for-sale" },
          { label: "Open Homes", href: "/open-homes" },
          { label: "Recently Sold", href: "/sold" },
        ],
      },
      {
        title: "Services",
        items: [
          { label: "Property Appraisal", href: "/appraisal-request" },
          { label: "Buyer's Agent", href: "/buyer-agent-request" },
          { label: "Book Appointment", href: "/book-appointment" },
        ],
      },
      {
        title: "Locations",
        items: [
          { label: "Northern Beaches", href: "/browse/northern-beaches" },
          { label: "Mackay City", href: "/browse/mackay-city" },
          { label: "Pioneer Valley", href: "/browse/pioneer-valley" },
        ],
      },
    ],
  }

  const rentalsDropdown = {
    label: "Rent",
    icon: <Key className="h-5 w-5" />,
    sections: [
      {
        title: "GARDIAN Rentals",
        items: [
          { label: "All Rentals", href: "/rent" },
          { label: "For Rent", href: "/for-rent" },
          { label: "Leased Properties", href: "/leased" },
          { label: "Rental Assistance", href: "/rental-assistance" },
        ],
      },
    ],
  }

  const commercialDropdown = {
    label: "Commercial",
    icon: <Building className="h-5 w-5" />,
    sections: [
      {
        title: "GARDIAN Commercial",
        items: [
          { label: "All Commercial", href: "/commercial" },
          { label: "Office Spaces", href: "/commercial/office" },
          { label: "Retail Properties", href: "/commercial/retail" },
        ],
      },
    ],
  }

  const propertyManagementDropdown = {
    label: "Management",
    icon: <Building className="h-5 w-5" />,
    sections: [
      {
        title: "GARDIAN Property Management",
        items: [
          { label: "Our Services", href: "/property-management" },
          { label: "Landlord Resources", href: "/property-management/landlords" },
          { label: "Tenant Resources", href: "/property-management/tenants" },
        ],
      },
    ],
  }

  const mainLinks = [
    {
      label: "Open Homes",
      href: "/open-homes",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Agents",
      href: "/agents",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-5 w-5" />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <nav className="w-full bg-white py-3 md:py-4 border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="h-12 w-auto flex items-center">
            <Image
              src="/images/gardian-logo.webp"
              alt="GARDIAN Real Estate"
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-gray-50 text-gray-700"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden md:flex md:flex-row md:justify-between md:items-center md:gap-4">
          <div className="flex items-center">
            <Link href="/" className="h-12 w-auto flex items-center mr-8">
              <Image
                src="/images/gardian-logo.webp"
                alt="Gardian Real Estate - Mackay's Best Real Estate"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            <div className="flex items-center gap-2">
              <Dropdown sections={realEstateDropdown.sections} label={realEstateDropdown.label} icon={realEstateDropdown.icon} />
              <Dropdown sections={rentalsDropdown.sections} label={rentalsDropdown.label} icon={rentalsDropdown.icon} />
              <Dropdown sections={commercialDropdown.sections} label={commercialDropdown.label} icon={commercialDropdown.icon} />
              <Dropdown sections={propertyManagementDropdown.sections} label={propertyManagementDropdown.label} icon={propertyManagementDropdown.icon} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mainLinks.slice(0, 5).map((link) => ( // Keep only the first five items
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200
                  ${isActive(link.href) ? "bg-teal-500 text-white" : "text-gray-700 hover:bg-gray-100"}
                `}
                prefetch={true}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} mt-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-2">
            <Dropdown
              sections={realEstateDropdown.sections}
              label={realEstateDropdown.label}
              icon={realEstateDropdown.icon}
              isMobile={true}
            />
            <Dropdown
              sections={rentalsDropdown.sections}
              label={rentalsDropdown.label}
              icon={rentalsDropdown.icon}
              isMobile={true}
            />
            <Dropdown
              sections={commercialDropdown.sections}
              label={commercialDropdown.label}
              icon={commercialDropdown.icon}
              isMobile={true}
            />
            <Dropdown
              sections={propertyManagementDropdown.sections}
              label={propertyManagementDropdown.label}
              icon={propertyManagementDropdown.icon}
              isMobile={true}
            />

            {mainLinks.slice(0, 5).map((link) => ( // Keep only the first five items
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200
                  ${isActive(link.href) ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}