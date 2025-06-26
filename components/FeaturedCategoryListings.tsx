import Link from "next/link";
import CategoryListings from "./category-listings";

interface FeaturedCategoryListingsProps {
  category: string;
  title: string;
  href: string;
  limit?: number;
}

export default function FeaturedCategoryListings({
  category,
  title,
  href,
  limit = 2,
}: FeaturedCategoryListingsProps) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <CategoryListings category={category} limit={limit} />
      <div className="mt-6 text-center">
        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-600 hover:text-white transition-colors"
        >
          View All {title}
        </Link>
      </div>
    </div>
  );
}
