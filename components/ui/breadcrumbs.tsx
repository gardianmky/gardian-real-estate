"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  homeLabel?: string
  className?: string
}

export default function Breadcrumbs({ items = [], homeLabel = "Home", className = "" }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Generate breadcrumbs based on the current path if no items are provided
  const breadcrumbs: BreadcrumbItem[] = items.length > 0 ? items : generateBreadcrumbs(pathname, homeLabel)

  if (breadcrumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className={`py-3 px-4 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-1 text-sm text-gray-500">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />}

              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary-600 transition-colors duration-200">
                  {index === 0 ? (
                    <span className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumbs based on the current path
function generateBreadcrumbs(pathname: string, homeLabel: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)

  // Always start with home
  const breadcrumbs: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }]

  // Map common routes to readable names
  const routeLabels: Record<string, string> = {
    buy: "Properties For Sale",
    rent: "Properties For Rent",
    commercial: "Commercial Properties",
    listing: "Property Details",
    agent: "Agent Profile",
    agents: "Our Agents",
    search: "Search Results",
    contact: "Contact Us",
    about: "About Us",
    sell: "Sell Your Property",
  }

  // Build up the breadcrumbs based on the path segments
  let currentPath = ""

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // For listing/[id] or agent/[id] paths, handle specially
    if ((segment === "listing" || segment === "agent") && index < segments.length - 1) {
      breadcrumbs.push({
        label: routeLabels[segment] || capitalize(segment),
        href: currentPath,
      })

      // Skip the ID segment as we'll handle it differently
      currentPath += `/${segments[index + 1]}`

      // For listing IDs, use a shortened version
      if (segment === "listing") {
        const id = segments[index + 1]
        breadcrumbs.push({
          label: `Listing #${id.substring(0, 4)}...`,
          href: currentPath,
        })
      } else if (segment === "agent") {
        breadcrumbs.push({
          label: "Agent Profile",
          href: currentPath,
        })
      }

      // Skip the next iteration since we've already handled it
      return
    }

    // For normal paths
    if (routeLabels[segment]) {
      breadcrumbs.push({
        label: routeLabels[segment],
        href: currentPath,
      })
    } else {
      // Try to make the segment more readable
      breadcrumbs.push({
        label: capitalize(segment),
        href: currentPath,
      })
    }
  })

  return breadcrumbs
}

// Helper function to capitalize a string
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ")
}
