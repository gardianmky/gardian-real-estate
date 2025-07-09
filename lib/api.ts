// API Configuration - Enhanced for live data fetching
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.renet.app",
  HEADERS: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.RENET_API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN || "MRhE2JztS7rewrkrttDgJOrCHa17vBarvKLVk5V2xBlBWiZCqGfamsXH"}`,
    "User-Agent": "RapidAPI/4.2.8 (Macintosh; OS X/15.3.0) GCDHTTPRequest",
    Connection: "close",
    "Content-Type": "application/json",
  },
  // Gardian Real Estate specific filtering
  AGENCY_ID: "10021353",
  GARDIAN_AGENTS: [
    "chris bonanno",
    "cecelia reed",
    "mark kelly",
    "ben kerrisk",
    "mick mcleod",
    "ryan patton",
    "gardian leasing team",
  ],
  // Default pagination settings for better data fetching
  DEFAULT_PAGE_SIZE: 50, // Increased from 12 to fetch more data per request
  MAX_PAGE_SIZE: 100, // Maximum allowed by most APIs per request
  PRODUCTION_FETCH_SIZE: 100, // More conservative for production reliability
  MAX_TOTAL_PROPERTIES: 1000, // Safety limit for total properties
};

// API Endpoints
const ENDPOINTS = {
  LISTINGS: {
    FOR_SALE: "/Website/Listings",
    FOR_RENT: "/Website/Listings",
    FEATURED: "/Website/Listings",
    ALL: "/Website/Listings", // Generic endpoint for all listings
    DETAIL: (id: string) => `/Website/Listings/${id}`,
  },
  AGENTS: {
    LIST: "/Website/Agents",
    DETAIL: (id: string) => `/Website/Agents/${id}`,
    LISTINGS: (id: string) => `/Website/Agents/${id}/Listings`,
  },
  SEARCH: {
    BASIC: "/Website/Search",
    ADVANCED: "/Website/Search/Advanced",
  },
};

import type {
  Listing,
  FetchListingsParams,
  CategoryFilterResult,
} from "../types";
import {
  validateAndNormalizeCategories,
  sanitizeCategoryForAPI,
  validateCategoryWithErrors,
  PropertyCategory,
  CategoryValidationError,
} from "./categories";

// ===== ENHANCED CATEGORY VALIDATION FOR API =====

/**
 * Validate and prepare categories for API calls
 */
export function validateCategoriesForAPI(
  categories: string[] | PropertyCategory[],
): CategoryFilterResult {
  if (!Array.isArray(categories) || categories.length === 0) {
    return {
      validCategories: [],
      invalidCategories: [],
      hasErrors: false,
    };
  }

  const stringCategories = categories.map((cat) =>
    typeof cat === "string" ? cat : cat.toString(),
  );
  const validCategories: PropertyCategory[] = [];
  const invalidCategories: string[] = [];
  let errorMessage = "";

  for (const category of stringCategories) {
    const validation = validateCategoryWithErrors(category);

    if (validation.success && validation.category) {
      validCategories.push(validation.category as PropertyCategory);
    } else {
      invalidCategories.push(category);
      if (validation.error === CategoryValidationError.INVALID_CATEGORY) {
        errorMessage = validation.message || `Invalid category: ${category}`;
      }
    }
  }

  return {
    validCategories,
    invalidCategories,
    hasErrors: invalidCategories.length > 0,
    errorMessage: invalidCategories.length > 0 ? errorMessage : undefined,
  };
}

/**
 * Sanitize and prepare category parameter for API URL
 */
export function prepareCategoryForAPI(
  category: string | PropertyCategory,
): string | null {
  if (!category) return null;

  const stringCategory =
    typeof category === "string" ? category : category.toString();
  return sanitizeCategoryForAPI(stringCategory);
}

/**
 * Prepare multiple categories for API URL (comma-separated)
 */
export function prepareCategoriesForAPI(
  categories: string[] | PropertyCategory[],
): string | null {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  const validation = validateCategoriesForAPI(categories);

  if (validation.hasErrors) {
    console.warn("Category validation errors:", validation.errorMessage);
    console.warn("Invalid categories:", validation.invalidCategories);
  }

  // Use only valid categories for API call
  if (validation.validCategories.length === 0) {
    return null;
  }

  return validation.validCategories.join(",");
}

// Core Fetch Function with Enhanced Error Handling and Live Data Filtering
async function apiFetch(
  endpoint: string,
  params: Record<string, any> = {},
  page = 1,
) {
  try {
    // Skip API calls during build phase
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return {
        data: [],
        pagination: { totalResults: "0", currentPage: "1", totalPages: "1" },
      };
    }

    const queryParams = new URLSearchParams({
      ...params,
      page: params.page || page.toString(),
    }).toString();

    const url = `${API_CONFIG.BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}${queryParams}`;

    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const pagination = {
      totalResults:
        response.headers.get("X-totalResults") ||
        response.headers.get("x-totalResults"),
      resultsPerPage:
        response.headers.get("X-resultsPerPage") ||
        response.headers.get("x-resultsPerPage"),
      currentPage:
        response.headers.get("X-currentPage") ||
        response.headers.get("x-currentPage"),
      totalPages:
        response.headers.get("X-totalPages") ||
        response.headers.get("x-totalPages"),
    };

    const data = await response.json();

    // Return data as-is for proper server-side pagination
    // Client-side filtering should be minimal and only for data cleanup
    let filteredData = Array.isArray(data) ? data : [data];

    return { data: filteredData, pagination };
  } catch (error) {
    console.error("API Error:", error);
    return {
      data: [],
      pagination: { totalResults: "0", currentPage: "1", totalPages: "1" },
    };
  }
}

// Specific API Methods with Enhanced Live Data Handling
export async function fetchListingById(id: string): Promise<Listing | null> {
  try {
    const { data } = await RealEstateAPI.getListingDetails(id);
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    const listing = Array.isArray(data) ? data[0] : data;
    const standardId = listing.listingID || listing.id;
    return {
      ...listing,
      id: standardId,
      listingID: standardId,
      bedBathCarLand: [
        {
          key: "bedrooms",
          label: "Bedrooms",
          value: listing.bedrooms?.toString() || "0",
        },
        {
          key: "bathrooms",
          label: "Bathrooms",
          value: listing.bathrooms?.toString() || "0",
        },
        {
          key: "carSpaces",
          label: "Car Spaces",
          value: listing.carSpaces?.toString() || "0",
        },
        {
          key: "landSize",
          label: "Land Size",
          value: listing.landSize?.toString() || "0",
        },
      ],
      description: listing.description || "",
      agents: listing.agents || [],
    };
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return null;
  }
}

// Fetch ALL properties from API (production-ready)
export async function fetchAllPropertiesFromAPI({
  disposalMethod = "forSale",
  type = "",
  ...filters
}: {
  disposalMethod?: "forSale" | "forRent" | "sold" | "leased";
  type?: string;
  [key: string]: any;
}) {
  try {
    // Skip API calls during build phase - return empty array for build performance
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.log(
        "🏗️ Build phase detected - skipping comprehensive property fetch",
      );
      return [];
    }

    // For production, always try to fetch (fallback token is available)
    if (typeof window !== "undefined") {
      console.log("🌐 Client-side fetch detected - proceeding with API call");
    }

    console.log(
      `🚀 Fetching ALL ${type || "all"} properties for ${disposalMethod}...`,
    );
    console.log(
      `🔑 API Token available: ${!!process.env.RENET_API_TOKEN || !!process.env.NEXT_PUBLIC_API_TOKEN}`,
    );
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`📡 API Base URL: ${API_CONFIG.BASE_URL}`);
    console.log(`🏢 Agency ID: ${API_CONFIG.AGENCY_ID}`);

    // Build base API request parameters
    const baseParams = new URLSearchParams();
    baseParams.append("disposalMethod", disposalMethod);
    baseParams.append("orderBy", "dateListed");
    baseParams.append("orderDirection", "desc");
    baseParams.append("agencyID", API_CONFIG.AGENCY_ID);

    if (type) {
      baseParams.append("type", type);
    }

    // Add additional filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        baseParams.append(key, value.toString());
      }
    });

    let allProperties: any[] = [];
    let currentPage = 1;
    let totalPages = 1;
    let totalFetched = 0;

    do {
      const params = new URLSearchParams(baseParams);
      params.append("page", currentPage.toString());
      params.append(
        "resultsPerPage",
        API_CONFIG.PRODUCTION_FETCH_SIZE.toString(),
      );

      const url = `${API_CONFIG.BASE_URL}${ENDPOINTS.LISTINGS.ALL}?${params.toString()}`;

      const response = await fetch(url, {
        headers: API_CONFIG.HEADERS,
        cache: "no-store",
      });

      if (!response.ok) {
        console.warn(
          `API request failed for page ${currentPage} with status: ${response.status}`,
        );
        console.warn(`Request URL: ${url}`);
        const errorText = await response.text();
        console.warn(`Response: ${errorText}`);
        break;
      }

      const pageProperties = await response.json();
      const pagePropertiesArray = Array.isArray(pageProperties)
        ? pageProperties
        : [];

      // Get pagination info
      const totalResults = parseInt(
        response.headers.get("x-totalResults") ||
          response.headers.get("X-totalResults") ||
          "0",
      );
      totalPages = Math.ceil(totalResults / API_CONFIG.PRODUCTION_FETCH_SIZE);

      allProperties = allProperties.concat(pagePropertiesArray);
      totalFetched += pagePropertiesArray.length;

      console.log(
        `📦 Fetched page ${currentPage}/${totalPages}: ${pagePropertiesArray.length} properties (Total: ${totalFetched}/${totalResults})`,
      );

      currentPage++;

      // Safety check to prevent infinite loops
      if (allProperties.length >= API_CONFIG.MAX_TOTAL_PROPERTIES) {
        console.warn(
          `⚠️ Reached maximum property limit (${API_CONFIG.MAX_TOTAL_PROPERTIES}), stopping fetch.`,
        );
        break;
      }

      // Break if we got fewer properties than expected (end of data)
      if (
        pagePropertiesArray.length < API_CONFIG.PRODUCTION_FETCH_SIZE &&
        currentPage > totalPages
      ) {
        break;
      }
    } while (currentPage <= totalPages);

    console.log(
      `✅ Successfully fetched ${allProperties.length} total properties!`,
    );
    return allProperties;
  } catch (error) {
    console.error("❌ Error fetching all properties:", error);
    return [];
  }
}

// Enhanced API with proper server-side pagination and strict category validation
export async function fetchListingsIndex({
  page = 1,
  type = "",
  categories = [],
  category,
  disposalMethod = "forSale",
  resultsPerPage = API_CONFIG.DEFAULT_PAGE_SIZE,
  orderBy = "dateListed",
  orderDirection = "desc",
  fetchAll = false, // When true, gets more results for filtering
  ...filters
}: {
  page?: number;
  type?: string;
  categories?: string[] | PropertyCategory[];
  category?: string | PropertyCategory;
  disposalMethod?: "forSale" | "forRent" | "sold" | "leased";
  resultsPerPage?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  fetchAll?: boolean;
  [key: string]: any;
}) {
  try {
    // Skip API calls during build phase only (fallback token is available)
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return {
        listings: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          nextPage: null,
          resultsPerPage: resultsPerPage,
          totalResults: 0,
        },
      };
    }

    // ===== ENHANCED CATEGORY VALIDATION =====
    // Prepare categories for API call with strict validation
    let categoryParam: string | null = null;

    // Handle single category parameter
    if (category) {
      categoryParam = prepareCategoryForAPI(category);
      if (!categoryParam) {
        console.warn(`Invalid single category provided: ${category}`);
      }
    }

    // Handle multiple categories parameter
    if (categories.length > 0) {
      const multiCategoryParam = prepareCategoriesForAPI(categories);
      if (multiCategoryParam) {
        // If we have both single and multiple categories, combine them
        categoryParam = categoryParam
          ? `${categoryParam},${multiCategoryParam}`
          : multiCategoryParam;
      }
    }

    // Early return if category validation failed and we have no other filters
    if ((category || categories.length > 0) && !categoryParam) {
      console.warn(
        "All provided categories were invalid, returning empty results",
      );
      return {
        listings: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          nextPage: null,
          resultsPerPage: resultsPerPage,
          totalResults: 0,
        },
      };
    }

    // Build API request parameters
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append(
      "resultsPerPage",
      (fetchAll ? API_CONFIG.MAX_PAGE_SIZE : resultsPerPage).toString(),
    );
    params.append("disposalMethod", disposalMethod);
    params.append("orderBy", orderBy);
    params.append("orderDirection", orderDirection);

    // Add Gardian Real Estate agency filter to API request - this is CRITICAL for pagination
    params.append("agencyID", API_CONFIG.AGENCY_ID);

    // Add type filter if specified
    if (type) {
      params.append("type", type);
    }

    // Add validated category filters
    if (categoryParam) {
      params.append("category", categoryParam);
      console.log(`🏷️ Category filter applied: ${categoryParam}`);
    }

    // Add additional filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const url = `${API_CONFIG.BASE_URL}${ENDPOINTS.LISTINGS.ALL}?${params.toString()}`;

    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`API request failed with status: ${response.status}`);
      throw new Error(`API Error: ${response.status}`);
    }

    let listings;
    try {
      listings = await response.json();
      listings = Array.isArray(listings) ? listings : [];
    } catch (jsonError) {
      console.error("Failed to parse API response JSON:", jsonError);
      listings = [];
    }

    // Extract pagination info from response headers
    const totalResults = parseInt(
      response.headers.get("x-totalResults") ||
        response.headers.get("X-totalResults") ||
        "0",
    );
    const currentPageFromAPI = parseInt(
      response.headers.get("x-currentPage") ||
        response.headers.get("X-currentPage") ||
        page.toString(),
    );
    const totalPagesFromAPI = parseInt(
      response.headers.get("x-totalPages") ||
        response.headers.get("X-totalPages") ||
        "1",
    );
    const nextPageFromAPI =
      response.headers.get("x-NextPage") || response.headers.get("X-NextPage");

    // Client-side data validation and cleanup
    let invalidAgencyCount = 0;
    let invalidTypeCount = 0;
    const cleanedListings = Array.isArray(listings)
      ? listings.filter((item: any) => {
          // Remove obvious invalid entries
          if (!item || (!item.id && !item.listingID)) return false;

          // Double-check agency filtering (fallback validation)
          if (item.agencyID && item.agencyID !== API_CONFIG.AGENCY_ID) {
            invalidAgencyCount++;
            return false;
          }

          // CRITICAL: Strict type validation - only include properties that exactly match the requested type
          if (type) {
            const propertyType =
              item.type || item.propertyType || item.category;
            if (propertyType !== type) {
              invalidTypeCount++;
              return false;
            }
            // Additional validation: ensure we have a valid type value
            if (!propertyType) {
              invalidTypeCount++;
              return false;
            }
          }

          return true;
        })
      : [];

    // Log filtering issues for monitoring (only if found)
    if (invalidAgencyCount > 0) {
      console.warn(
        `API agency filter bypass detected: ${invalidAgencyCount} listings from other agencies returned. Server-side agencyID filter may need attention.`,
      );
    }
    if (invalidTypeCount > 0) {
      console.warn(
        `API type filter bypass detected: ${invalidTypeCount} listings with incorrect type '${type}' returned. Server-side type filter may need attention.`,
      );
    }

    // Remove duplicates
    const uniqueListings = cleanedListings.filter(
      (listing: any, index: number, self: any[]) => {
        const id = listing.listingID || listing.id;
        return (
          index === self.findIndex((l: any) => (l.listingID || l.id) === id)
        );
      },
    );

    // Enhanced data mapping with standardized ID handling and category validation
    const enhancedListings = uniqueListings.map((listing: any) => {
      const standardId = listing.listingID || listing.id;

      // ===== CATEGORY VALIDATION FOR RESPONSE =====
      let validatedCategories: PropertyCategory[] = [];

      // Handle categories array from API response
      if (Array.isArray(listing.categories)) {
        const categoryValidation = validateCategoriesForAPI(listing.categories);
        validatedCategories = categoryValidation.validCategories;

        if (categoryValidation.hasErrors) {
          console.warn(
            `Invalid categories in API response for listing ${standardId}:`,
            categoryValidation.invalidCategories,
          );
        }
      }

      // Handle single category from API response
      if (listing.category && typeof listing.category === "string") {
        const categoryValidation = validateCategoryWithErrors(listing.category);
        if (categoryValidation.success && categoryValidation.category) {
          validatedCategories.push(
            categoryValidation.category as PropertyCategory,
          );
        } else {
          console.warn(
            `Invalid single category in API response for listing ${standardId}:`,
            listing.category,
          );
        }
      }

      // Remove duplicates from validated categories
      validatedCategories = [...new Set(validatedCategories)];

      return {
        ...listing,
        id: standardId,
        listingID: standardId,
        bedBathCarLand: [
          {
            key: "bedrooms",
            label: "Bedrooms",
            value: listing.bedrooms?.toString() || "0",
          },
          {
            key: "bathrooms",
            label: "Bathrooms",
            value: listing.bathrooms?.toString() || "0",
          },
          {
            key: "carSpaces",
            label: "Car Spaces",
            value: listing.carSpaces?.toString() || "0",
          },
          {
            key: "landSize",
            label: "Land Size",
            value: listing.landSize?.toString() || "0",
          },
        ],
        description: listing.description || "",
        agents: listing.agents || [],
        images:
          listing.images?.map((img: any) => ({
            ...img,
            url: img.url?.replace("http://", "https://") || img.url,
          })) || [],
        // ENHANCED: Validated categories
        categories: validatedCategories,
        // Keep legacy category field for backward compatibility
        category: listing.category,
      };
    });

    // For fetchAll, return all results with single page pagination
    if (fetchAll) {
      return {
        listings: enhancedListings,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          nextPage: null,
          resultsPerPage: enhancedListings.length,
          totalResults: enhancedListings.length,
        },
      };
    }

    // For normal pagination, use server-provided pagination info
    // This is correct because we're now filtering server-side via agencyID parameter
    return {
      listings: enhancedListings,
      pagination: {
        currentPage: currentPageFromAPI,
        totalPages: totalPagesFromAPI,
        nextPage: nextPageFromAPI ? parseInt(nextPageFromAPI) : null,
        resultsPerPage: resultsPerPage,
        totalResults: totalResults,
      },
    };
  } catch (error) {
    console.error("Error fetching listings index:", error);
    return {
      listings: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        nextPage: null,
        resultsPerPage: resultsPerPage,
        totalResults: 0,
      },
    };
  }
}

export const RealEstateAPI = {
  // Listings
  getListings: async (
    type: "forSale" | "forRent" | "featured" = "forSale",
    params: Record<string, any> = {},
    page = 1,
  ) => {
    const endpoint =
      type === "forSale"
        ? ENDPOINTS.LISTINGS.FOR_SALE
        : type === "forRent"
          ? ENDPOINTS.LISTINGS.FOR_RENT
          : ENDPOINTS.LISTINGS.FEATURED;
    return apiFetch(endpoint, params, page);
  },

  getListingDetails: async (id: string) => {
    return apiFetch(ENDPOINTS.LISTINGS.DETAIL(id));
  },

  // Agents
  getAgents: async (params: Record<string, any> = {}, page = 1) => {
    return apiFetch(ENDPOINTS.AGENTS.LIST, params, page);
  },

  getAgentDetails: async (id: string) => {
    return apiFetch(ENDPOINTS.AGENTS.DETAIL(id));
  },

  getAgentListings: async (
    id: string,
    params: Record<string, any> = {},
    page = 1,
  ) => {
    return apiFetch(ENDPOINTS.AGENTS.LISTINGS(id), params, page);
  },

  // Search
  searchListings: async (
    params: Record<string, any>,
    advanced = false,
    page = 1,
  ) => {
    const endpoint = advanced
      ? ENDPOINTS.SEARCH.ADVANCED
      : ENDPOINTS.SEARCH.BASIC;
    return apiFetch(endpoint, params, page);
  },
};

// Updated function to fetch agents using the correct endpoint and handling pagination
export async function fetchAgents(page = 1, params: Record<string, any> = {}) {
  try {
    const { data, pagination } = await RealEstateAPI.getAgents(params, page);
    return { agents: data, pagination };
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
}

// Backward compatibility function for existing fetchListings calls
export async function fetchListings(params: FetchListingsParams) {
  return await fetchListingsIndex({
    page: params.page,
    type: params.type,
    disposalMethod: params.disposalMethod,
    resultsPerPage: params.pageSize || 12,
    orderBy: params.orderBy,
    orderDirection: params.orderDirection,
    suburb: params.suburb,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    bedrooms: params.bedrooms,
    bathrooms: params.bathrooms,
    propertyType: params.propertyType,
    agentID: params.agentID,
  });
}
