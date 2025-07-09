import { Listing } from "./index";
import { PropertyCategory } from "@/lib/categories";

// Enhanced types for auction-specific properties
export interface AuctionDetails {
  auctionDate: string; // ISO date string
  auctionTime: string; // e.g., "10:00 AM"
  auctionLocation: string; // e.g., "On Site" or "Gardian Real Estate Office"
  auctionLocationAddress?: string; // Full address if different from property
  registrationRequired: boolean;
  registrationDeadline?: string; // ISO date string
  guidePrice?: string; // e.g., "$800,000 - $850,000"
  auctioneer?: string; // Name of auctioneer
  auctionStatus: "upcoming" | "inProgress" | "soldAtAuction" | "passedIn" | "withdrawn";
  bidderRegistrationUrl?: string;
  inspectionTimes?: Array<{
    date: string; // ISO date string
    startTime: string;
    endTime: string;
    type: "openInspection" | "privateInspection" | "byAppointment";
  }>;
  terms?: string; // Auction terms and conditions
  deposit?: string; // Required deposit amount
  settlementPeriod?: string; // e.g., "30 days"
}

export interface AuctionListing extends Omit<Listing, 'disposalMethod'> {
  auction: AuctionDetails;
  disposalMethod: "auction"; // Override disposal method for auctions
}

export interface AuctionFilters {
  dateRange?: "thisWeek" | "nextWeek" | "thisMonth" | "all";
  status?: AuctionDetails["auctionStatus"];
  priceRange?: {
    min?: number;
    max?: number;
  };
  suburb?: string;
  propertyType?: PropertyCategory;
  bedrooms?: number;
  bathrooms?: number;
}
