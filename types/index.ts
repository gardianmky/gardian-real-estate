export interface Listing {
  id: string;
  listingID: string;
  heading: string;
  price: string;
  description?: string;
  images: Array<{
    url: string;
    alt?: string;
  }>;
  disposalMethod: 'forSale' | 'forRent' | 'sold';
  type: 'Residential' | 'Commercial' | 'Land';
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  garages?: number;
  area?: number;
  landSize?: number;
  address?: {
    street?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    displayAddress?: string;
  };
  agents?: Agent[];
  // Enhanced properties for dynamic data
  bedBathCarLand?: Array<{
    key: string;
    label: string;
    value: string;
  }>;
  categories?: string[];
  links?: Array<{
    url: string;
    description?: string;
    type?: string;
  }>;
  floorplans?: Array<{
    url: string;
    description?: string;
  }>;
  features?: string[];
  agencyID?: string;
  status?: string;
  dateAvailable?: string;
  dateListed?: string;
}

export interface Agent {
  id?: string;
  agentID: string;
  name: string;
  title: string;
  email: string;
  mobile: string;
  phone?: string;
  imageURL?: string;
  profile?: string;
  bio?: string;
  specialties?: string[];
  listings?: Listing[];
  totalListings?: number;
}

export interface Pagination {
  totalResults?: number;
  resultsPerPage?: number;
  currentPage?: number;
  totalPages?: number;
  nextPage?: number | null;
}

export interface FetchListingsParams {
  disposalMethod?: 'forSale' | 'forRent' | 'sold';
  type?: 'Residential' | 'Commercial' | 'Land';
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  suburb?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  propertyType?: string;
  agentID?: string;
  agencyID?: string;
  category?: string;
  keywords?: string;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}