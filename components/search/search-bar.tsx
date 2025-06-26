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
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Enter a suburb or postcode"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600"
      />
      <button
        type="submit"
        className="ml-4 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
