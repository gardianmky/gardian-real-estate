import type { Listing } from "@/types/listing";

interface Props {
  listings: Listing[];
}

export default function FeaturedListings({ listings }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <div key={listing.listingID} className="border p-4 rounded">
          <div className="font-bold">{listing.heading}</div>
          <div>{listing.address?.street}, {listing.address?.suburb}</div>
          <div>{listing.price}</div>
        </div>
      ))}
    </div>
  );
}