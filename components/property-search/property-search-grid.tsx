import type { Listing } from "@/types/listing";

interface Props {
  listings: Listing[];
  page: number;
  totalPages: number;
}

export default function PropertySearchGrid({ listings, page, totalPages }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.listingID} className="border p-4 rounded">
            <div className="font-bold">{listing.heading}</div>
            <div>{listing.address?.street}, {listing.address?.suburb}</div>
            <div>{listing.price}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center text-gray-500">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}