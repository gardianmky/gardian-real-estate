"use client";

import { useState, useEffect } from "react";
import { fetchListings } from "lib/api";
import { Listing } from "types/index";
import Link from "next/link";

interface Category {
  name: string;
  href: string;
}

export default function CategoryListings() {
  const [listings, setListings] = useState<Listing[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const categories: Category[] = [
    { name: "Properties For Sale", href: "/for-sale" },
    { name: "Properties For Rent", href: "/for-rent" },
    { name: "Commercial Properties", href: "/commercial" },
    { name: "Recently Sold", href: "/sold" },
  ];

  useEffect(() => {
    async function fetchCategoryListings() {
      setLoading(true);
      setError(null);

      try {
        const categoryListings = await Promise.all(
          categories.map(async (category) => {
            const { listings } = await fetchListings({
              page: 1,
              pageSize: pageSize,
              category: [category.name],
            });
            return listings;
          })
        );
        setListings(categoryListings);
      } catch (err: any) {
        console.error("Error fetching category listings:", err);
        setError("Failed to load category listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryListings();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading category listings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 py-4">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
        {listings.map((categoryList, index) => (
          <div key={categories[index].name}>
            <h3 className="text-lg font-semibold mb-2">{categories[index].name}</h3>
            <div className="flex overflow-x-auto space-x-4">
              {categoryList.map((listing) => (
                <div key={listing.listingID} className="w-64 bg-white rounded-lg shadow-md p-4">
                  <Link href={`/listing/${listing.listingID}`}>
                    <img
                      src={listing.images[0]?.url}
                      alt={listing.heading}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <h4 className="text-md font-semibold">{listing.heading}</h4>
                    <p className="text-gray-600">{listing.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
