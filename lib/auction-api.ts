import { AuctionListing, AuctionDetails } from "@/types/auction";
import { fetchAllPropertiesFromAPI } from "./api";

/**
 * Auction-specific API functions for ReNet integration
 */

// Common auction keywords to identify auction properties
const AUCTION_KEYWORDS = [
  'auction',
  'bidding',
  'auctioneer',
  'bid',
  'going under the hammer',
  'auction on site',
  'auction at',
  'submit your bid',
  'reserve price',
  'auction day'
];

/**
 * Check if a listing is an auction based on price text and description
 */
function isAuctionProperty(listing: any): boolean {
  const priceText = (listing.price || '').toLowerCase();
  const description = (listing.description || '').toLowerCase();
  const heading = (listing.heading || '').toLowerCase();
  
  // Check for auction keywords in price, description, or heading
  const hasAuctionKeywords = AUCTION_KEYWORDS.some(keyword => 
    priceText.includes(keyword) || 
    description.includes(keyword) || 
    heading.includes(keyword)
  );
  
  // Check for common auction price formats
  const auctionPricePatterns = [
    /auction/i,
    /contact agent/i,
    /by negotiation/i,
    /expressions of interest/i,
    /eoi/i
  ];
  
  const hasAuctionPricePattern = auctionPricePatterns.some(pattern => 
    pattern.test(priceText)
  );
  
  return hasAuctionKeywords || hasAuctionPricePattern;
}

/**
 * Extract auction details from listing data
 */
function extractAuctionDetails(listing: any): AuctionDetails {
  const description = listing.description || '';
  const price = listing.price || '';
  
  // Try to extract auction date from description
  // This is a basic implementation - you may need to adjust based on actual data patterns
  const datePattern = /auction[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i;
  const timePattern = /(\d{1,2}:\d{2}\s?(?:am|pm))/i;
  
  const dateMatch = description.match(datePattern);
  const timeMatch = description.match(timePattern);
  
  // Default auction details - you'll need to enhance this based on actual data structure
  return {
    auctionDate: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString(),
    auctionTime: timeMatch ? timeMatch[1] : "TBA",
    auctionLocation: "On Site", // Default - extract from description if available
    registrationRequired: true,
    auctionStatus: "upcoming",
    guidePrice: price.includes('$') ? price : undefined,
    auctioneer: "TBA", // Extract from description if available
    deposit: "10% of purchase price", // Default
    settlementPeriod: "30 days" // Default
  };
}

/**
 * Convert regular listing to auction listing
 */
function convertToAuctionListing(listing: any): AuctionListing {
  return {
    ...listing,
    id: listing.listingID || listing.id,
    disposalMethod: "auction" as const,
    auction: extractAuctionDetails(listing)
  };
}

/**
 * Fetch auction properties from ReNet API
 */
export async function fetchAuctionListings({
  type = "",
  suburb = "",
  page = 1,
  resultsPerPage = 50
}: {
  type?: string;
  suburb?: string; 
  page?: number;
  resultsPerPage?: number;
} = {}): Promise<{
  listings: AuctionListing[];
  pagination: any;
}> {
  try {
    // Fetch all for-sale properties (auctions are typically listed as for-sale)
    const allProperties = await fetchAllPropertiesFromAPI({
      disposalMethod: "forSale",
      type,
      suburb,
      // Note: We'll fetch more than needed and filter client-side
      // In production, you might want to implement server-side filtering
    });

    // Filter for auction properties
    const auctionProperties = allProperties
      .filter(isAuctionProperty)
      .map(convertToAuctionListing);

    // Implement client-side pagination
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedListings = auctionProperties.slice(startIndex, endIndex);

    const pagination = {
      totalResults: auctionProperties.length.toString(),
      currentPage: page.toString(),
      totalPages: Math.ceil(auctionProperties.length / resultsPerPage).toString(),
      resultsPerPage: resultsPerPage.toString()
    };

    console.log(`🏛️ Found ${auctionProperties.length} auction properties (showing ${paginatedListings.length})`);

    return {
      listings: paginatedListings,
      pagination
    };

  } catch (error) {
    console.error("Error fetching auction listings:", error);
    return {
      listings: [],
      pagination: {
        totalResults: "0",
        currentPage: "1", 
        totalPages: "1",
        resultsPerPage: resultsPerPage.toString()
      }
    };
  }
}

/**
 * Fetch specific auction listing by ID
 */
export async function fetchAuctionListingById(listingID: string): Promise<AuctionListing | null> {
  try {
    // First fetch all properties to find the specific listing
    const allProperties = await fetchAllPropertiesFromAPI({
      disposalMethod: "forSale"
    });

    const listing = allProperties.find(p => p.listingID === listingID || p.id === listingID);
    
    if (!listing || !isAuctionProperty(listing)) {
      return null;
    }

    return convertToAuctionListing(listing);

  } catch (error) {
    console.error("Error fetching auction listing by ID:", error);
    return null;
  }
}

/**
 * Enhanced auction detection with custom auction data
 * Use this if you have a separate auction data feed
 */
export async function fetchAuctionListingsWithCustomData(
  customAuctionData?: AuctionListing[]
): Promise<{
  listings: AuctionListing[];
  pagination: any;
}> {
  // If you have a separate auction feed/CSV/API, process it here
  if (customAuctionData && customAuctionData.length > 0) {
    return {
      listings: customAuctionData,
      pagination: {
        totalResults: customAuctionData.length.toString(),
        currentPage: "1",
        totalPages: "1",
        resultsPerPage: customAuctionData.length.toString()
      }
    };
  }

  // Fallback to API-based detection
  return fetchAuctionListings();
}

/**
 * Utility function to validate and enhance auction data
 */
export function validateAuctionData(listing: any): boolean {
  // Add validation logic based on your requirements
  const hasValidDate = listing.auction?.auctionDate && new Date(listing.auction.auctionDate).getTime() > 0;
  const hasValidLocation = listing.auction?.auctionLocation && listing.auction.auctionLocation !== '';
  
  return hasValidDate && hasValidLocation;
}
