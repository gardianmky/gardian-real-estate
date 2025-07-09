"use client";

import { AuctionListing } from "@/types/auction";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Gavel, Eye, AlertCircle } from "lucide-react";
import { format, parseISO, isBefore, isAfter, isToday, addDays, startOfWeek, endOfWeek } from "date-fns";

interface AuctionPropertyCardProps {
  listing: AuctionListing;
  className?: string;
}

export default function AuctionPropertyCard({ listing, className = "" }: AuctionPropertyCardProps) {
  const auctionDate = parseISO(listing.auction.auctionDate);
  const now = new Date();
  const isUpcoming = isAfter(auctionDate, now);
  const isThisWeek = auctionDate >= startOfWeek(now) && auctionDate <= endOfWeek(now);
  const isSoon = auctionDate <= addDays(now, 7) && isUpcoming;

  const getStatusBadge = () => {
    switch (listing.auction.auctionStatus) {
      case "upcoming":
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isSoon ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
          }`}>
            {isSoon ? "Auction Soon" : "Upcoming Auction"}
          </span>
        );
      case "soldAtAuction":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Sold at Auction</span>;
      case "passedIn":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Passed In</span>;
      case "withdrawn":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Withdrawn</span>;
      default:
        return null;
    }
  };

  const primaryImage = listing.images?.[0];

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || listing.heading}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge()}
        </div>

        {/* Auction Soon Alert */}
        {isSoon && isUpcoming && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {isToday(auctionDate) ? "Today!" : `${Math.ceil((auctionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Address & Price */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
            {listing.heading}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">
              {listing.address?.displayAddress || 
               `${listing.address?.suburb}, ${listing.address?.state} ${listing.address?.postcode}`}
            </span>
          </div>
          
          {/* Price/Guide */}
          <div className="text-teal-600 font-semibold text-lg">
            {listing.auction.guidePrice || listing.price || "Guide Price Available"}
          </div>
        </div>

        {/* Property Details */}
        {listing.bedBathCarLand && (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            {listing.bedBathCarLand.map((detail, index) => (
              <div key={index} className="flex items-center">
                <span className="font-medium">{detail.value}</span>
                <span className="ml-1">{detail.label?.toLowerCase()}</span>
              </div>
            ))}
          </div>
        )}

        {/* Auction Details */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-teal-600" />
            <span className="font-medium">
              {format(auctionDate, "EEEE, MMMM do, yyyy")}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-teal-600" />
            <span>{listing.auction.auctionTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Gavel className="w-4 h-4 mr-2 text-teal-600" />
            <span className="truncate">{listing.auction.auctionLocation}</span>
          </div>
        </div>

        {/* Next Inspection */}
        {listing.auction.inspectionTimes && listing.auction.inspectionTimes.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center text-sm text-gray-600">
              <Eye className="w-4 h-4 mr-2" />
              <span>Next inspection: {format(parseISO(listing.auction.inspectionTimes[0].date), "MMM d")} at {listing.auction.inspectionTimes[0].startTime}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href={`/property/${listing.listingID || listing.id}`}
            className="flex items-center justify-center px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            View Details
          </Link>
          
          {listing.auction.auctionStatus === "upcoming" && (
            <button
              onClick={() => {
                // Handle bidder registration or inquiry
                window.location.href = `/contact?property=${listing.listingID}&service=auction-inquiry`;
              }}
              className="flex items-center justify-center px-3 py-2 bg-white text-teal-600 border border-teal-600 text-sm font-medium rounded-lg hover:bg-teal-50 transition-colors"
            >
              {listing.auction.registrationRequired ? "Register" : "Enquire"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
