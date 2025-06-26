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
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 text-left font-medium
              ${isActive ? "bg-teal-500 text-white shadow-md" : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-600"}
            `}
          >
            {icon}
            <span className="ml-3 flex-1">{label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="mt-2 ml-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
              {sections.map((section, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-semibold text-gray-500 text-sm px-3 py-1">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className={`block px-4 py-2 rounded-lg transition-all duration-200 text-sm
                            ${pathname === item.href || pathname.startsWith(`${item.href}/`)
                              ? "bg-teal-100 text-teal-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"}
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
            className={`flex items-center px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium
              ${isActive ? "bg-teal-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100 hover:text-teal-600"}
            `}
          >
            {icon}
            <span className="ml-2 hidden lg:inline">{label}</span>
            <span className="ml-2 lg:hidden">{label.split(' ')[0]}</span>
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

          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 py-6 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:translate-y-1">
            <div className="grid grid-cols-1 gap-6">
              {sections.map((section, index) => (
                <div key={index} className="px-6">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className={`block text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
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
    <nav className="w-full bg-white/95 backdrop-blur-sm py-2 md:py-4 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 md:px-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="h-10 w-auto flex items-center">
            <Image
              src="/images/gardian-logo.webp"
              alt="GARDIAN Real Estate"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Header - Fitted Layout */}
        <div className="hidden md:flex md:flex-row md:justify-between md:items-center md:gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="h-12 w-auto flex items-center flex-shrink-0">
            <Image
              src="/images/gardian-logo.webp"
              alt="Gardian Real Estate - Mackay's Best Real Estate"
              width={140}
              height={56}
              className="h-10 lg:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Centered Navigation */}
          <div className="flex items-center gap-1 lg:gap-2 flex-1 justify-center">
            <Dropdown sections={realEstateDropdown.sections} label={realEstateDropdown.label} icon={realEstateDropdown.icon} />
            <Dropdown sections={rentalsDropdown.sections} label={rentalsDropdown.label} icon={rentalsDropdown.icon} />
            <Dropdown sections={commercialDropdown.sections} label={commercialDropdown.label} icon={commercialDropdown.icon} />
            <Dropdown sections={propertyManagementDropdown.sections} label={propertyManagementDropdown.label} icon={propertyManagementDropdown.icon} />
          </div>
          
          {/* Right Side Navigation Links */}
          <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
            {mainLinks.filter(link => link.label !== "Open Homes").map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center px-2 lg:px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium
                  ${isActive(link.href) 
                    ? "bg-teal-500 text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-teal-600"}
                `}
                prefetch={true}
              >
                {link.icon}
                <span className="ml-2 hidden lg:inline">{link.label}</span>
                <span className="ml-2 lg:hidden">{link.label.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 space-y-2">
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

            <div className="border-t border-gray-200 pt-2 mt-4">
              {mainLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 mb-1
                    ${isActive(link.href) 
                      ? "bg-teal-500 text-white shadow-md" 
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-600"}
                  `}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-3 font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}