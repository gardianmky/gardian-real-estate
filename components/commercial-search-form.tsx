"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CommercialSearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [agent, setAgent] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm) params.append("q", searchTerm);
    if (propertyType) params.append("propertyType", propertyType);
    if (location) params.append("suburb", location);
    if (priceRange) {
      if (priceRange === "0-500000") {
        params.append("maxPrice", "500000");
      } else if (priceRange === "500000-1000000") {
        params.append("minPrice", "500000");
        params.append("maxPrice", "1000000");
      } else if (priceRange === "1000000+") {
        params.append("minPrice", "1000000");
      }
    }
    if (agent) params.append("agent", agent);

    router.push(`/commercial?${params.toString()}`);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Search Commercial Properties
      </h3>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by location, property type, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Commercial</option>
              <option value="Commercial">Commercial</option>
              <option value="Business">Business</option>
              <option value="Industrial">Industrial</option>
              <option value="Development">Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Locations</option>
              <option value="Mackay">Mackay</option>
              <option value="North Mackay">North Mackay</option>
              <option value="Glenella">Glenella</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Any Price</option>
              <option value="0-500000">Under $500K</option>
              <option value="500000-1000000">$500K - $1M</option>
              <option value="1000000+">$1M+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent
            </label>
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Agents</option>
              <option value="Chris Bonanno">Chris Bonanno</option>
              <option value="Cecelia Reed">Cecelia Reed</option>
              <option value="Mark Kelly">Mark Kelly</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
