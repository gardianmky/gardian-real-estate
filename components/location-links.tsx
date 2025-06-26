"use client"

import DropdownMenu from "./dropdown-menu"
import Link from "next/link"
import { Home } from "lucide-react"

export default function LocationLinks() {
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto flex flex-row items-center justify-between py-3">
        <div className="w-full md:w-1/4 px-1">
          <DropdownMenu title="Suburbs" className="text-sm text-gray-700">
            <Link
              href="/search?location=Andergrove"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Andergrove
            </Link>
            <Link
              href="/search?location=Beaconsfield"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Beaconsfield
            </Link>
            <Link
              href="/search?location=Blacks+Beach"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Blacks Beach
            </Link>
            <Link
              href="/search?location=Bucasia"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Bucasia
            </Link>
            <Link
              href="/search?location=Eimeo"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Eimeo
            </Link>
            <Link
              href="/search?location=Mackay+City"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Mackay City
            </Link>
            <Link
              href="/search?location=North+Mackay"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              North Mackay
            </Link>
            <Link
              href="/search?location=South+Mackay"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              South Mackay
            </Link>
          </DropdownMenu>
        </div>

        <div className="w-full md:w-1/4 px-1">
          <DropdownMenu title="Rentals" className="text-sm text-gray-700">
            <Link
              href="/for-rent?location=Andergrove"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Andergrove Rentals
            </Link>
            <Link
              href="/for-rent?location=Beaconsfield"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Beaconsfield Rentals
            </Link>
            <Link
              href="/for-rent?location=Blacks+Beach"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Blacks Beach Rentals
            </Link>
            <Link
              href="/for-rent?location=Mackay+City"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Mackay City Rentals
            </Link>
            <Link
              href="/for-rent?location=North+Mackay"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              North Mackay Rentals
            </Link>
            <Link
              href="/for-rent?location=South+Mackay"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              South Mackay Rentals
            </Link>
          </DropdownMenu>
        </div>

        <div className="w-full md:w-1/4 px-1">
          <DropdownMenu title="Commercial" className="text-sm text-gray-700">
            <Link
              href="/commercial?location=Mackay"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Mackay Commercial
            </Link>
            <Link
              href="/commercial?location=Paget"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Paget Commercial
            </Link>
            <Link
              href="/commercial?location=City+Centre"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              City Centre Commercial
            </Link>
            <Link
              href="/commercial?type=Industrial"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Industrial Properties
            </Link>
            <Link
              href="/commercial?type=Retail"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Retail Spaces
            </Link>
            <Link
              href="/commercial?type=Office"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors duration-200"
            >
              Office Spaces
            </Link>
          </DropdownMenu>
        </div>

        <div className="w-full md:w-1/4 px-1 flex justify-end">
          <Link href="/" className="text-gray-700 hover:text-primary-600 flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
