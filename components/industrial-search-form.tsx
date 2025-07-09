"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function IndustrialSearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [agent, setAgent] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm) params.append("q", searchTerm);
    params.append("category", "Industrial"); // Ensure Industrial category
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

    router.push(`/commercial/industrial?${params.toString()}`);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Search Industrial Properties
      </h3>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by location, industrial type, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Search Industrial
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <option value="Paget">Paget</option>
              <option value="Mackay Harbour">Mackay Harbour</option>
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
              <option value="1000000-2000000">$1M - $2M</option>
              <option value="2000000+">$2M+</option>
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

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            Industrial Property Types
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
            <div>• Manufacturing</div>
            <div>• Warehouse</div>
            <div>• Distribution</div>
            <div>• Storage</div>
            <div>• Factory</div>
            <div>• Workshop</div>
            <div>• Industrial Land</div>
            <div>• Cold Storage</div>
          </div>
        </div>
      </form>
    </div>
  );
}
