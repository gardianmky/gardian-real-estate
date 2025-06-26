"use client"

import Link from "next/link"
import { Home, Key, Building, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

export default function SimpleNavigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    // More robust path matching to handle nested routes
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    {
      label: "For Sale",
      href: "/buy",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      label: "For Rent",
      href: "/rent",
      icon: <Key className="h-5 w-5 mr-2" />,
    },
    {
      label: "Commercial",
      href: "/commercial",
      icon: <Building className="h-5 w-5 mr-2" />,
    },
  ]

  return (
    <nav className="w-full bg-white py-3 md:py-4 border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-3 md:px-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="h-12 w-auto flex items-center">
            <Image
              src="/images/gardian-logo.webp"
              alt="Gardian Real Estate - Mackay's Best Real Estate"
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-row md:justify-between md:gap-2">
          <div className="flex items-center gap-4">
            <Link href="/" className="h-12 w-auto flex items-center">
              <Image
                src="/images/gardian-logo.webp"
                alt="Gardian Real Estate - Mackay's Best Real Estate"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    flex items-center px-6 py-3 rounded-md transition-colors duration-200 text-base
                    ${isActive(item.href) ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                  `}
                  prefetch={true}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/property-management"
            className={`
              flex items-center px-6 py-3 rounded-md transition-colors duration-200 text-base
              ${isActive("/property-management") ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
            `}
            prefetch={true}
          >
            <Building className="h-5 w-5 mr-2" />
            Property Management
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} mt-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 rounded-md transition-colors duration-200 text-sm
                  ${isActive(item.href) ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <Link
              href="/property-management"
              className={`
                flex items-center px-4 py-3 rounded-md transition-colors duration-200 text-sm mt-2
                ${isActive("/property-management") ? "bg-teal-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
              `}
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building className="h-5 w-5 mr-2" />
              Property Management
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
