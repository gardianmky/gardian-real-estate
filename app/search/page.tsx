import SearchBar from 'components/search/search-bar';
import AdvancedFilters from 'components/search/advanced-filters';
import { SearchProvider } from 'context/search-context';
import Link from "next/link";
import Image from "next/image";
import SearchResults from 'components/search/search-results'; // Direct import

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get propertyType from URL params
  const propertyType = typeof searchParams?.propertyType === 'string' 
    ? searchParams.propertyType 
    : 'rent';

  return (
    <SearchProvider>
      <div className="bg-gray-50 min-h-screen">
        {/* Simple header with logo only */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Link href="/">
              <div className="relative h-10 w-32">
                <Image
                  src="/logo.svg"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Property Search</h1>
            <p className="text-gray-600">Find your perfect property in Mackay and surrounding areas</p>
          </div>

          <div className="mb-6">
            <SearchBar variant="header" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <AdvancedFilters />
              </div>
            </div>

            <div className="lg:col-span-3">
              <SearchResults 
                propertyType={propertyType} 
              />
            </div>
          </div>
        </div>
        <footer className="bg-white py-12 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="col-span-2">
                <div className="mb-8">
                  <img src="/images/gardian-logo.webp" alt="Gardian Real Estate" className="h-20 w-auto" />
                </div>
                <p className="text-gray-600 mb-6 max-w-xl">
                  Contact us today at info@gardianrealestate.com.au for a free consultation and discover how Gardian can become your trusted partner in building your real estate success story in Mackay.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/insurance-privacy" className="text-gray-500 hover:text-primary-600 transition-colors">
                      Insurance Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-gray-500 hover:text-primary-600 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/complaints" className="text-gray-500 hover:text-primary-600 transition-colors">
                      Complaints
                    </a>
                  </li>
                  <li>
                    <a href="/compliance" className="text-gray-500 hover:text-primary-600 transition-colors">
                      Compliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SearchProvider>
  );
}
