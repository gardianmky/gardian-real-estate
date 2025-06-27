import { Home, Bath, Car, Ruler, Building } from "lucide-react";

import type { Listing } from "@/types/listing"
import { formatPropertyFeatures } from "@/lib/utils"

interface PropertyFeaturesProps {
  listing: Listing
  format?: "standard" | "compact" | "detailed"
  layout?: "horizontal" | "grid" | "vertical"
  showIcons?: boolean
  className?: string
}

const getFeatureIcon = (key: string) => {
  switch (key) {
    case "beds":
      return <Home className="h-4 w-4" />
    case "baths":
      return <Bath className="h-4 w-4" />
    case "cars":
      return <Car className="h-4 w-4" />
    case "land":
      return <Ruler className="h-4 w-4" />
    case "floor":
      return <Building className="h-4 w-4" />
    default:
      return null
  }
}

export default function PropertyFeatures({ 
  listing, 
  format = "standard", 
  layout = "horizontal",
  showIcons = true,
  className = ""
}: PropertyFeaturesProps) {
  const features = formatPropertyFeatures(listing, format)

  if (!features.length) {
    return null
  }

  const baseClasses = {
    horizontal: "flex gap-4",
    grid: "grid grid-cols-2 md:grid-cols-4 gap-4",
    vertical: "space-y-2"
  }

  const itemClasses = {
    horizontal: "flex items-center text-sm text-gray-700",
    grid: "flex items-center justify-center text-center p-3 bg-gray-50 rounded-lg",
    vertical: "flex items-center text-sm text-gray-700"
  }

  return (
    <div className={`${baseClasses[layout]} ${className}`}>
      {features.map((feature) => (
        <div key={feature.key} className={itemClasses[layout]}>
          {showIcons && (
            <span className="text-teal-500 mr-2 flex-shrink-0">
              {getFeatureIcon(feature.key)}
            </span>
          )}
          <span className={layout === "grid" ? "block" : ""}>
            {layout === "grid" ? (
              <>
                <div className="text-lg font-semibold text-gray-800">{feature.value}</div>
                <div className="text-xs text-gray-600 capitalize">{feature.fullLabel}</div>
              </>
            ) : (
              `${feature.value} ${feature.label}`
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

// Specialized components for common use cases
export function PropertyFeaturesInline({ listing, className = "" }: { listing: Listing; className?: string }) {
  return (
    <PropertyFeatures 
      listing={listing} 
      format="standard"
      layout="horizontal"
      showIcons={true}
      className={className}
    />
  )
}

export function PropertyFeaturesGrid({ listing, className = "" }: { listing: Listing; className?: string }) {
  return (
    <PropertyFeatures 
      listing={listing} 
      format="detailed"
      layout="grid"
      showIcons={false}
      className={className}
    />
  )
}

export function PropertyFeaturesCompact({ listing, className = "" }: { listing: Listing; className?: string }) {
  return (
    <PropertyFeatures 
      listing={listing} 
      format="compact"
      layout="horizontal"
      showIcons={false}
      className={`text-xs ${className}`}
    />
  )
}
