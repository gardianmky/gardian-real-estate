// API Configuration - Enhanced for live data fetching
const API_CONFIG = {
  BASE_URL: 'https://api.renet.app',
  HEADERS: {
    'Accept': 'application/json',
    'Authorization': 'Bearer MRhE2JztS7rewrkrttDgJOrCHa17vBarvKLVk5V2xBlBWiZCqGfamsXH',
    'User-Agent': 'RapidAPI/4.2.8 (Macintosh; OS X/15.3.0) GCDHTTPRequest',
    'Connection': 'close',
    'Content-Type': 'application/json'
  },
  // Gardian Real Estate specific filtering
  AGENCY_ID: '10021353',
  GARDIAN_AGENTS: ['chris bonanno', 'cecelia reed', 'mark kelly', 'ben kerrisk', 'mick mcleod', 'ryan patton', 'gardian leasing team'],
  // Default pagination settings for better data fetching
  DEFAULT_PAGE_SIZE: 50, // Increased from 12 to fetch more data per request
  MAX_PAGE_SIZE: 100     // Maximum allowed by most APIs
};

// API Endpoints
const ENDPOINTS = {
  LISTINGS: {
    FOR_SALE: '/Website/Listings',
    FOR_RENT: '/Website/Listings', 
    FEATURED: '/Website/Listings',
    ALL: '/Website/Listings', // Generic endpoint for all listings
    DETAIL: (id: string) => `/Website/Listings/${id}`
  },
  AGENTS: {
    LIST: '/Website/Agents',
    DETAIL: (id: string) => `/Website/Agents/${id}`,
    LISTINGS: (id: string) => `/Website/Agents/${id}/Listings`
  },
  SEARCH: {
    BASIC: '/Website/Search',
    ADVANCED: '/Website/Search/Advanced'
  }
};

import type { Listing, FetchListingsParams } from '../types';

// Core Fetch Function with Enhanced Error Handling and Live Data Filtering
async function apiFetch(endpoint: string, params: Record<string, any> = {}, page = 1) {
  try {
    // Skip API calls during build phase
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return { data: [], pagination: { totalResults: '0', currentPage: '1', totalPages: '1' } };
    }

    const queryParams = new URLSearchParams({
      ...params,
      page: params.page || page.toString()
    }).toString();

    const url = `${API_CONFIG.BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}${queryParams}`;

    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const pagination = {
      totalResults: response.headers.get('X-totalResults') || response.headers.get('x-totalResults'),
      resultsPerPage: response.headers.get('X-resultsPerPage') || response.headers.get('x-resultsPerPage'), 
      currentPage: response.headers.get('X-currentPage') || response.headers.get('x-currentPage'),
      totalPages: response.headers.get('X-totalPages') || response.headers.get('x-totalPages')
    };

    const data = await response.json();
    
    // Filter for Gardian Real Estate properties only
    let filteredData = Array.isArray(data) ? data : [data];
    
    // Apply Gardian filtering if this is a listings endpoint
    if (endpoint.includes('Listings') && Array.isArray(filteredData)) {
      filteredData = filteredData.filter((item: any) => {
        // Filter by agency ID
        if (item.agencyID === API_CONFIG.AGENCY_ID) return true;
        
        // Filter by agent names
        if (item.agents && Array.isArray(item.agents)) {
          return item.agents.some((agent: any) =>
            API_CONFIG.GARDIAN_AGENTS.some(gardianAgent => 
              agent.name?.toLowerCase().includes(gardianAgent.toLowerCase())
            )
          );
        }
        
        return false;
      });
    }

    return { data: filteredData, pagination };

  } catch (error) {
    console.error('API Error:', error);
    return { data: [], pagination: { totalResults: '0', currentPage: '1', totalPages: '1' } };
  }
}

// Specific API Methods with Enhanced Live Data Handling
export async function fetchListingById(id: string): Promise<Listing | null> {
  try {
    const { data } = await RealEstateAPI.getListingDetails(id);
    if (!data || (Array.isArray(data) && data.length === 0)) return null;
    
    const listing = Array.isArray(data) ? data[0] : data;
    return {
      ...listing,
      id: listing.id || listing.listingID,
      listingID: listing.listingID || listing.id,
      bedBathCarLand: [
        { key: 'bedrooms', label: 'Bedrooms', value: listing.bedrooms?.toString() || '0' },
        { key: 'bathrooms', label: 'Bathrooms', value: listing.bathrooms?.toString() || '0' },
        { key: 'carSpaces', label: 'Car Spaces', value: listing.carSpaces?.toString() || '0' },
        { key: 'landSize', label: 'Land Size', value: listing.landSize?.toString() || '0' }
      ],
      description: listing.description || '',
      agents: listing.agents || []
    };
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return null;
  }
}

// Enhanced API with micro-specific filtering for index pages
export async function fetchListingsIndex({ 
  page = 1, 
  type = '', 
  categories = [], 
  disposalMethod = 'forSale',
  resultsPerPage = API_CONFIG.DEFAULT_PAGE_SIZE,
  orderBy = 'dateListed',
  orderDirection = 'desc',
  fetchAll = false, // New option to fetch all results
  ...filters 
}: {
  page?: number;
  type?: string;
  categories?: string[];
  disposalMethod?: 'forSale' | 'forRent' | 'sold';
  resultsPerPage?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  fetchAll?: boolean;
  [key: string]: any;
}) {
  try {
    // Skip API calls during build phase
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return { 
        listings: [], 
        pagination: { 
          currentPage: 1, 
          totalPages: 1, 
          nextPage: null, 
          resultsPerPage: resultsPerPage, 
          totalResults: 0 
        } 
      };
    }

    // If fetchAll is true, start with a larger page size and potentially fetch multiple pages
    const pageSize = fetchAll ? API_CONFIG.MAX_PAGE_SIZE : resultsPerPage;
    let allListings: any[] = [];
    let currentPage = page;
    let hasMorePages = true;

    while (hasMorePages) {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('resultsPerPage', pageSize.toString());
      params.append('disposalMethod', disposalMethod);
      params.append('orderBy', orderBy);
      params.append('orderDirection', orderDirection);

      // Add type filter if specified (e.g., 'Commercial', 'Residential')
      if (type) {
        params.append('type', type);
      }

      // Add multiple category filters - try API first, fallback to client-side
      if (categories.length > 0) {
        // Try comma-separated categories for API
        params.append('category', categories.join(','));
      }

      // Add additional filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const url = `${API_CONFIG.BASE_URL}${ENDPOINTS.LISTINGS.ALL}?${params.toString()}`;

      const response = await fetch(url, {
        headers: API_CONFIG.HEADERS,
        cache: 'no-store'
      });

      if (!response.ok) {
        console.warn(`API request failed with status: ${response.status}`);
        break;
      }

      let listings = await response.json();
      
      // Ensure we have an array
      listings = Array.isArray(listings) ? listings : [];

      // Extract pagination info from response headers with fallbacks
      const pagination = {
        currentPage: parseInt(response.headers.get('x-currentPage') || response.headers.get('X-currentPage') || currentPage.toString()),
        totalPages: parseInt(response.headers.get('x-totalPages') || response.headers.get('X-totalPages') || '1'),
        nextPage: response.headers.get('x-NextPage') || response.headers.get('X-NextPage') ? 
          parseInt(response.headers.get('x-NextPage') || response.headers.get('X-NextPage') || '0') : null,
        resultsPerPage: parseInt(response.headers.get('x-resultsPerPage') || response.headers.get('X-resultsPerPage') || pageSize.toString()),
        totalResults: parseInt(response.headers.get('x-totalResults') || response.headers.get('X-totalResults') || listings.length.toString()),
      };

      // Apply Gardian Real Estate filtering
      const filteredListings = listings.filter((item: any) => {
        // Filter by agency ID
        if (item.agencyID === API_CONFIG.AGENCY_ID) return true;
        
        // Filter by agent names
        if (item.agents && Array.isArray(item.agents)) {
          return item.agents.some((agent: any) =>
            API_CONFIG.GARDIAN_AGENTS.some(gardianAgent => 
              agent.name?.toLowerCase().includes(gardianAgent.toLowerCase())
            )
          );
        }
        
        return false;
      });

      allListings = allListings.concat(filteredListings);

      // If not fetching all, or if we've reached the end, break
      if (!fetchAll || currentPage >= pagination.totalPages || pagination.nextPage === null) {
        hasMorePages = false;
      } else {
        currentPage++;
      }

      // Safety check to prevent infinite loops
      if (currentPage > 50) {
        console.warn('Reached maximum page limit (50) - stopping pagination');
        break;
      }
    }

    // If API doesn't support multiple category filtering, do it client-side
    if (categories.length > 0) {
      allListings = allListings.filter((listing: any) => {
        if (!listing.categories) return false;
        const listingCategories = Array.isArray(listing.categories) ? listing.categories : [listing.categories];
        return categories.some(cat => 
          listingCategories.some((listingCat: string) => 
            listingCat.toLowerCase().includes(cat.toLowerCase())
          )
        );
      });
    }

    // Enhanced data mapping for consistent structure
    const enhancedListings = allListings.map((listing: any) => ({
      ...listing,
      id: listing.id || listing.listingID,
      listingID: listing.listingID || listing.id,
      bedBathCarLand: [
        { key: 'bedrooms', label: 'Bedrooms', value: listing.bedrooms?.toString() || '0' },
        { key: 'bathrooms', label: 'Bathrooms', value: listing.bathrooms?.toString() || '0' },
        { key: 'carSpaces', label: 'Car Spaces', value: listing.carSpaces?.toString() || '0' },
        { key: 'landSize', label: 'Land Size', value: listing.landSize?.toString() || '0' }
      ],
      description: listing.description || '',
      agents: listing.agents || [],
      // Convert images to HTTPS for security
      images: listing.images?.map((img: any) => ({
        ...img,
        url: img.url?.replace('http://', 'https://') || img.url
      })) || []
    }));

    // For pagination, if we're fetching all, return all results but paginate for display
    let paginatedListings = enhancedListings;
    let finalPagination;

    if (fetchAll) {
      // Return all listings but with pagination info for display
      finalPagination = {
        currentPage: 1,
        totalPages: Math.max(1, Math.ceil(enhancedListings.length / resultsPerPage)),
        nextPage: enhancedListings.length > resultsPerPage ? 2 : null,
        resultsPerPage: resultsPerPage,
        totalResults: enhancedListings.length,
      };
    } else {
      // Standard pagination
      const startIndex = (page - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      paginatedListings = enhancedListings.slice(startIndex, endIndex);
      
      finalPagination = {
        currentPage: page,
        totalPages: Math.max(1, Math.ceil(enhancedListings.length / resultsPerPage)),
        nextPage: page < Math.ceil(enhancedListings.length / resultsPerPage) ? page + 1 : null,
        resultsPerPage: resultsPerPage,
        totalResults: enhancedListings.length,
      };
    }

    return { 
      listings: fetchAll ? enhancedListings : paginatedListings, 
      pagination: finalPagination 
    };

  } catch (error) {
    console.error('Error fetching listings index:', error);
    return { 
      listings: [], 
      pagination: { 
        currentPage: 1, 
        totalPages: 1, 
        nextPage: null, 
        resultsPerPage: resultsPerPage, 
        totalResults: 0 
      } 
    };
  }
}

export const RealEstateAPI = {
  // Listings
  getListings: async (type: 'forSale' | 'forRent' | 'featured' = 'forSale', params: Record<string, any> = {}, page = 1) => {
    const endpoint = type === 'forSale' ? ENDPOINTS.LISTINGS.FOR_SALE :
                    type === 'forRent' ? ENDPOINTS.LISTINGS.FOR_RENT :
                    ENDPOINTS.LISTINGS.FEATURED;
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

  getAgentListings: async (id: string, params: Record<string, any> = {}, page = 1) => {
    return apiFetch(ENDPOINTS.AGENTS.LISTINGS(id), params, page);
  },

  // Search
  searchListings: async (params: Record<string, any>, advanced = false, page = 1) => {
    const endpoint = advanced ? ENDPOINTS.SEARCH.ADVANCED : ENDPOINTS.SEARCH.BASIC;
    return apiFetch(endpoint, params, page);
  }
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
    agentID: params.agentID
  });
}