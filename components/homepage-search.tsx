"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { fetchAgents } from "../lib/api"
import type { Agent } from "../types/agent"
import { Search, MapPin, Building, Home, DollarSign } from "lucide-react";

const AgentCarousel = dynamic(() => import("./agents-section"), {
  loading: () => <div>Loading agents...</div>,
  ssr: false
})

export default function HomepageSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState<"sale" | "rent" | "commercial">("sale")
  const [agents, setAgents] = useState<Agent[]>([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const { agents: fetchedAgents, pagination } = await fetchAgents(page);
        setAgents(prevAgents => [...prevAgents, ...fetchedAgents]);
        setHasMore(pagination?.currentPage < pagination?.totalPages);
      } catch (error) {
        console.error("Failed to fetch agents", error)
      }
    }

    loadAgents()
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    let searchUrl = ""

    switch (propertyType) {
      case "rent":
        searchUrl = `/rent?keywords=${encodeURIComponent(searchTerm)}`
        break
      case "commercial":
        searchUrl = `/commercial?keywords=${encodeURIComponent(searchTerm)}`
        break
      default:
        searchUrl = `/buy?keywords=${encodeURIComponent(searchTerm)}`
    }

    if (location) {
      searchUrl += `&location=${encodeURIComponent(location)}`
    }

    router.push(searchUrl)
  }

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12 transform hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Find Your Perfect Property</h2>

      <form onSubmit={handleSearch}>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setPropertyType("sale")}
                className={`px-5 py-3 text-sm font-medium flex items-center justify-center ${
                  propertyType === "sale"
                    ? "bg-teal-500 text-white border border-teal-500"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-teal-200"
                } ${propertyType === "sale" ? "" : "hover:text-teal-600"} rounded-l-lg transition-colors duration-200`}
              >
                <Home className="h-4 w-4 mr-2" />
                Buy
              </button>
              <button
                type="button"
                onClick={() => setPropertyType("rent")}
                className={`px-5 py-3 text-sm font-medium flex items-center justify-center ${
                  propertyType === "rent"
                    ? "bg-teal-500 text-white border border-teal-500"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300 hover:border-teal-200"
                } ${propertyType === "rent" ? "" : "hover:text-teal-600"} transition-colors duration-200`}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Rent
              </button>
              <button
                type="button"
                onClick={() => setPropertyType("commercial")}
                className={`px-5 py-3 text-sm font-medium flex items-center justify-center ${
                  propertyType === "commercial"
                    ? "bg-teal-500 text-white border border-teal-500"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-teal-200"
                } ${propertyType === "commercial" ? "" : "hover:text-teal-600"} rounded-r-lg transition-colors duration-200`}
              >
                <Building className="h-4 w-4 mr-2" />
                Commercial
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location (suburb, city, postcode)"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="relative md:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by keywords, features..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center w-full md:w-auto md:self-end"
          >
            <Search className="h-5 w-5 mr-2" />
            <span>Search Properties</span>
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 text-center">Meet Our Featured Agents</h3>
        <AgentCarousel agents={agents} />
        {hasMore && (
          <button onClick={handleLoadMore} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">Load More</button>
        )}
      </div>
    </div>
  )
}
