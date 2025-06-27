import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
  searchParams?: URLSearchParams;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  className = "",
  searchParams
}: PaginationProps) {
  
  // Generate URL with preserved search parameters
  const generatePageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', page.toString());
    return `${basePath}?${params.toString()}`;
  };

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  // Calculate which page numbers to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={generatePageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
          Previous
        </span>
      )}

      {/* First page */}
      {startPage > 1 && (
        <>
          <Link
            href={generatePageUrl(1)}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={generatePageUrl(page)}
          className={`px-3 py-2 rounded-lg border transition-colors ${
            page === currentPage
              ? 'bg-primary-600 border-primary-600 text-white'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <Link
            href={generatePageUrl(totalPages)}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={generatePageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
}

// Server component version for use in server-side rendered pages
export function PaginationServer({
  currentPage,
  totalPages,
  basePath,
  className = "",
  preserveParams = {}
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
  preserveParams?: Record<string, string | undefined>;
}) {
  
  // Generate URL with preserved search parameters
  const generatePageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(preserveParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set('page', page.toString());
    return `${basePath}?${params.toString()}`;
  };

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={generatePageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
          Previous
        </span>
      )}

      <span className="px-4 py-2 text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={generatePageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
}
