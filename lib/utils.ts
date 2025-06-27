import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Listing } from "types/index";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clean up property titles by removing duplicate agency branding
 * @param title The original property title/heading
 * @returns Clean title without agency duplication
 */
export function cleanPropertyTitle(title?: string): string {
  if (!title) return 'Property';
  
  const cleanTitle = title
    .replace(/Gardian Real Estate/gi, '')
    .replace(/Mackay's Best Real Estate/gi, '')
    .replace(/\s*-\s*/g, ' - ')
    .replace(/^\s*-\s*/, '')
    .replace(/\s*-\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
    
  return cleanTitle || title || 'Property';
}

export function extractBedBathCarLand(listing: Listing) {
  if (!listing?.bedBathCarLand) {
    return { beds: "0", baths: "0", cars: "0", land: "N/A", floorArea: "N/A" };
  }

  const beds = listing.bedBathCarLand.find((item) => item.key === "bedrooms")?.value || "0";
  const baths = listing.bedBathCarLand.find((item) => item.key === "bathrooms")?.value || "0";
  const cars = listing.bedBathCarLand.find((item) => item.key === "carSpaces")?.value || "0";
  const land = listing.bedBathCarLand.find((item) => item.key === "landSize")?.value || "N/A";
  const floorArea = listing.bedBathCarLand.find((item) => item.key === "floorArea")?.value || "N/A";
  
  return { beds, baths, cars, land, floorArea };
}

// Format property features for display with proper labels
export function formatPropertyFeatures(listing: Listing, format: "standard" | "compact" | "detailed" = "standard") {
  const { beds, baths, cars, land, floorArea } = extractBedBathCarLand(listing);
  
  const features = [
    { 
      key: "beds", 
      value: beds, 
      label: format === "compact" ? "bd" : (beds === "1" ? "bed" : "beds"),
      fullLabel: "Bedrooms"
    },
    { 
      key: "baths", 
      value: baths, 
      label: format === "compact" ? "ba" : (baths === "1" ? "bath" : "baths"),
      fullLabel: "Bathrooms"
    },
    { 
      key: "cars", 
      value: cars, 
      label: format === "compact" ? "car" : (cars === "1" ? "car" : "cars"),
      fullLabel: "Car Spaces"
    },
  ];

  // Add land size if available and not "N/A"
  if (land && land !== "N/A") {
    features.push({ 
      key: "land", 
      value: land, 
      label: format === "compact" ? "land" : "land",
      fullLabel: "Land Size"
    });
  }

  // Add floor area for detailed format
  if (format === "detailed" && floorArea && floorArea !== "N/A") {
    features.push({ 
      key: "floor", 
      value: floorArea, 
      label: "floor area",
      fullLabel: "Floor Area"
    });
  }

  // Filter out zero values and empty/null values - show only meaningful data
  return features.filter(f => {
    const numValue = parseInt(f.value || '0');
    return numValue > 0 && f.value !== "0" && f.value !== "" && f.value !== "N/A";
  });
}

// Legacy function for backward compatibility
export function extractBedBathCar(listing: Listing) {
  const { beds, baths, cars } = extractBedBathCarLand(listing);
  return { beds, baths, cars };
}

export function generateListingJsonLd(listing: Listing) {
  const { beds, baths } = extractBedBathCarLand(listing);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing?.heading || "",
    description: `${beds} bedroom, ${baths} bathroom property located at ${listing?.address?.street}, ${listing?.address?.suburb}, ${listing?.address?.state}`,
    url: `https://yourdomain.com/listing/${listing?.listingID}`,
    datePosted: new Date().toISOString(),
    image: listing?.images && listing?.images.length > 0 ? listing?.images[0].url : "",
    address: {
      "@type": "PostalAddress",
      streetAddress: listing?.address?.street || "",
      addressLocality: listing?.address?.suburb || "",
      addressRegion: listing?.address?.state || "",
      postalCode: listing?.address?.postcode || "",
      addressCountry: "AU",
    },
    offers: {
      "@type": "Offer",
      price: listing?.price || "",
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
    numberOfRooms: beds,
    numberOfBathroomsTotal: baths,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Bedrooms", value: beds },
      { "@type": "LocationFeatureSpecification", name: "Bathrooms", value: baths },
    ],
  };
  return structuredData;
}
