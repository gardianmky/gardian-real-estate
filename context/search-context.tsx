"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  location: string;
  setLocation: (location: string) => void;
  filters: { [key: string]: string };
  setFilters: (filters: { [key: string]: string }) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('rent');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({});

  const value: SearchContextProps = {
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    location,
    setLocation,
    filters,
    setFilters,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
