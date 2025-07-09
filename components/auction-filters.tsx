"use client";

import { useState } from "react";
import { AuctionFilters } from "@/types/auction";
import { Calendar, Filter, X } from "lucide-react";
import { PropertyCategory } from "@/lib/categories";

interface AuctionFiltersProps {
  filters: AuctionFilters;
  onFiltersChange: (filters: AuctionFilters) => void;
  onReset: () => void;
}

export default function AuctionFiltersComponent({ filters, onFiltersChange, onReset }: AuctionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof AuctionFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== "" && value !== "all"
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-teal-600" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden lg:block'} p-4 space-y-4 border-t lg:border-t-0`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Auction Date
            </label>
            <select
              value={filters.dateRange || "all"}
              onChange={(e) => handleFilterChange("dateRange", e.target.value as AuctionFilters["dateRange"])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="thisWeek">This Week</option>
              <option value="nextWeek">Next Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status || ""}
              onChange={(e) => handleFilterChange("status", e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="soldAtAuction">Sold at Auction</option>
              <option value="passedIn">Passed In</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          {/* Suburb Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suburb
            </label>
            <input
              type="text"
              placeholder="Enter suburb"
              value={filters.suburb || ""}
              onChange={(e) => handleFilterChange("suburb", e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Property Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType || ""}
              onChange={(e) => handleFilterChange("propertyType", e.target.value as PropertyCategory || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Unit">Unit</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <select
              value={filters.priceRange?.min || ""}
              onChange={(e) => handleFilterChange("priceRange", {
                ...filters.priceRange,
                min: e.target.value ? Number(e.target.value) : undefined
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">No Min</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="400000">$400,000</option>
              <option value="500000">$500,000</option>
              <option value="600000">$600,000</option>
              <option value="700000">$700,000</option>
              <option value="800000">$800,000</option>
              <option value="1000000">$1,000,000</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <select
              value={filters.priceRange?.max || ""}
              onChange={(e) => handleFilterChange("priceRange", {
                ...filters.priceRange,
                max: e.target.value ? Number(e.target.value) : undefined
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">No Max</option>
              <option value="400000">$400,000</option>
              <option value="500000">$500,000</option>
              <option value="600000">$600,000</option>
              <option value="700000">$700,000</option>
              <option value="800000">$800,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="1500000">$1,500,000</option>
              <option value="2000000">$2,000,000+</option>
            </select>
          </div>
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <select
              value={filters.bedrooms || ""}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <select
              value={filters.bathrooms || ""}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 border-t">
            <button
              onClick={onReset}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
