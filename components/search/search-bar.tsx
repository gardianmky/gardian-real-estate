"use client";

import { useState } from 'react';
import { useSearchContext } from 'context/search-context';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  variant?: 'header' | 'propertyFilters';
  defaultPropertyType?: string;
}

const SearchBar = ({ variant = 'header', defaultPropertyType = 'rent' }: SearchBarProps) => {
  const { setSearchQuery, setPropertyType, setLocation } = useSearchContext();
  const [query, setQuery] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
    setPropertyType(defaultPropertyType);
    setLocation(locationInput);
    router.push(`/${defaultPropertyType}?search=${query}&location=${locationInput}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0 bg-white p-3 sm:p-2 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter a suburb, postcode, or property address"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-l-xl sm:rounded-r-none border-0 bg-gray-50 sm:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200 text-sm sm:text-base placeholder-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-xl sm:rounded-l-none sm:rounded-r-xl hover:bg-primary-700 transition-all duration-300 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search Properties</span>
          <span className="sm:hidden">Search</span>
        </button>
      </form>
      
      {/* Quick Search Suggestions for Mobile */}
      <div className="mt-4 sm:hidden">
        <div className="flex flex-wrap gap-2 justify-center">
          {['Mackay', 'Northern Beaches', 'South Mackay', 'West Mackay'].map((location) => (
            <button
              key={location}
              onClick={() => {
                setLocationInput(location);
                setLocation(location);
                router.push(`/${defaultPropertyType}?location=${location}`);
              }}
              className="px-3 py-1 bg-white rounded-full border border-gray-200 text-xs text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
