# ReNet Website API Documentation

## Overview

The ReNet Website API provides real-time access to property listings, agent information, and form submission capabilities for the Gardian Real Estate website. This documentation covers the API structure, authentication, and implementation patterns.

## API Configuration

### Base Configuration
```typescript
const API_CONFIG = {
  BASE_URL: 'https://api.renet.app',
  AGENCY_ID: '10021353', // Gardian Real Estate
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 100
}
```

### Authentication
All API requests require Bearer token authentication:
```typescript
headers: {
  'Authorization': 'Bearer [TOKEN]',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
```

## Core Endpoints

### 1. Listings API

#### Get Listings
```
GET /Website/Listings
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `disposalMethod` | string | Yes | `forSale`, `forRent`, `sold`, `leased` |
| `type` | string | No | `Land`, `Residential`, `Commercial`, `Business`, `Rural` |
| `category` | string | No | Property category (see categories enum) |
| `suburb` | string | No | Filter by suburb name |
| `page` | integer | No | Page number (default: 1) |
| `agentID` | integer | No | Filter by specific agent |
| `agencyID` | string | No | Filter by agency (auto-set to Gardian) |

**Response Headers:**
- `x-totalResults`: Total number of items
- `x-resultsPerPage`: Results per page
- `x-currentPage`: Current page number
- `x-totalPages`: Total pages available
- `x-NextPage`: Next page number (if available)

**Example Implementation:**
```typescript
export async function fetchListingsIndex({
  page = 1,
  type = '',
  disposalMethod = 'forSale',
  resultsPerPage = 50,
  orderBy = 'dateListed',
  orderDirection = 'desc',
  ...filters
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    resultsPerPage: resultsPerPage.toString(),
    disposalMethod,
    orderBy,
    orderDirection,
    agencyID: '10021353', // Gardian Real Estate filter
    ...filters
  });

  const response = await fetch(`${BASE_URL}/Website/Listings?${params}`, {
    headers: API_HEADERS,
    cache: 'no-store' // Ensure fresh data
  });

  const listings = await response.json();
  const pagination = extractPaginationHeaders(response);
  
  return { listings, pagination };
}
```

#### Get Listing Details
```
GET /Website/Listings/{listingID}
```

**Path Parameters:**
- `listingID` (integer): The unique listing identifier

**Response:** Extended `ListingDetail` object with additional fields:
- `description`: Full property description
- `features`: Detailed property features array
- `floorplans`: Array of floorplan media
- `links`: Related links and documents

### 2. Agents API

#### Get Agents
```
GET /Website/Agents
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number to retrieve |
| `officeID` | integer | Filter by office ID |

**Response:** Array of `AgentExpanded` objects with:
- `agentID`, `officeID`, `name`, `title`
- `department`, `mobile`, `phone`, `email`
- `imageURL`, `profile`

### 3. Forms API

#### Submit General Form
```
POST /Website/Forms
```

**Request Body:**
```json
{
  "type": "Appraisal Request",
  "sourceURL": "https://gardianrealestate.com.au/appraisal-request",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "0423 123 456",
  "comments": "Would like an appraisal on my property",
  "address": {
    "street": "123 Main St",
    "suburb": "Mackay",
    "state": "QLD",
    "postcode": "4740"
  },
  "additionalFields": [
    {
      "field": "propertyType",
      "value": "House"
    }
  ]
}
```

#### Submit Enquiry
```
POST /Website/Enquiries
```

**Request Body:**
```json
{
  "type": "listing",
  "sourceURL": "https://gardianrealestate.com.au/listing/123456",
  "agentID": 78943,
  "listingID": 123456,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "0423 123 456",
  "enquiry": "Would like to know more about this listing."
}
```

### 4. Statistics API

#### Submit Statistics
```
POST /Website/Statistics
```

**Request Body:**
```json
[
  {
    "date": "2025-03-02",
    "propertyID": "20339394",
    "views": 30,
    "impressions": 54
  }
]
```

## Data Structures

### Listing Object
```typescript
interface Listing {
  listingID: string;
  agencyID: string;
  type: 'Land' | 'Residential' | 'Commercial' | 'Business' | 'Rural';
  categories: string[];
  agents: Agent[];
  address: Address;
  heading: string;
  price: string;
  bedBathCarLand: Feature[];
  images: Media[];
}
```

### Enhanced Listing (Implementation)
```typescript
interface EnhancedListing extends Listing {
  id: string; // Normalized ID field
  bedBathCarLand: [
    { key: 'bedrooms', label: 'Bedrooms', value: string },
    { key: 'bathrooms', label: 'Bathrooms', value: string },
    { key: 'carSpaces', label: 'Car Spaces', value: string },
    { key: 'landSize', label: 'Land Size', value: string }
  ];
  description: string;
  images: Media[]; // HTTPS URLs enforced
}
```

### Agent Object
```typescript
interface Agent {
  agentID: number;
  name: string;
  title: string;
  phone: string;
  mobile: string;
  imageURL?: string;
}

interface AgentExpanded extends Agent {
  officeID: number;
  department: string;
  email: string;
  profile: string;
}
```

### Address Object
```typescript
interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  displayAddress?: string;
}
```

### Feature Object
```typescript
interface Feature {
  key: string;
  label: string;
  value: string;
}
```

### Media Object
```typescript
interface Media {
  url: string;
  description?: string;
  type: 'image' | 'floorplan' | 'document' | 'video';
  category?: 'contract';
}
```

## Implementation Patterns

### Error Handling
```typescript
async function apiFetch(endpoint: string, params = {}) {
  try {
    // Skip API calls during build phase
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return { data: [], pagination: defaultPagination };
    }

    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { data: [], pagination: defaultPagination };
  }
}
```

### Pagination Handling
```typescript
function extractPaginationHeaders(response: Response) {
  return {
    totalResults: parseInt(response.headers.get('x-totalResults') || '0'),
    currentPage: parseInt(response.headers.get('x-currentPage') || '1'),
    totalPages: parseInt(response.headers.get('x-totalPages') || '1'),
    nextPage: response.headers.get('x-NextPage') 
      ? parseInt(response.headers.get('x-NextPage')) 
      : null
  };
}
```

### Data Enhancement
```typescript
function enhanceListingData(listing: any): EnhancedListing {
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
    images: listing.images?.map((img: any) => ({
      ...img,
      url: img.url?.replace('http://', 'https://') || img.url
    })) || []
  };
}
```

## Agency-Specific Configuration

### Gardian Real Estate Settings
```typescript
const GARDIAN_CONFIG = {
  AGENCY_ID: '10021353',
  AGENTS: [
    'chris bonanno',
    'cecelia reed', 
    'mark kelly',
    'ben kerrisk',
    'mick mcleod',
    'ryan patton',
    'gardian leasing team'
  ]
};
```

### Server-Side Filtering
All API requests automatically include the `agencyID` parameter to ensure only Gardian Real Estate properties are returned:

```typescript
params.append('agencyID', API_CONFIG.AGENCY_ID);
```

## Form Submission Implementation

### Custom Hook for Form Handling
```typescript
// From hooks/use-form-submission.ts
export function useFormSubmission(endpoint: string, formType: string) {
  const submitForm = async (formData: FormField[]) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formType,
          sourceURL: window.location.href,
          ...formData
        })
      });

      if (!response.ok) throw new Error('Submission failed');
      return await response.json();
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  return { submitForm };
}
```

## Best Practices

### 1. Caching Strategy
- Use `cache: 'no-store'` for fresh property data
- Consider implementing client-side caching for agent data
- Handle build-time gracefully with fallbacks

### 2. Performance Optimization
- Use pagination effectively (50 items per page)
- Implement lazy loading for images
- Filter server-side when possible

### 3. Error Resilience
- Always provide fallback data structures
- Log errors for debugging
- Handle API unavailability gracefully

### 4. Security
- Store API tokens securely
- Validate all user inputs before API submission
- Use HTTPS for all image URLs

## Example Usage

### Fetching Featured Properties
```typescript
const featuredProperties = await fetchListingsIndex({
  disposalMethod: 'forSale',
  type: 'Residential',
  orderBy: 'price',
  orderDirection: 'desc',
  resultsPerPage: 6
});
```

### Submitting Contact Form
```typescript
const formSubmission = await fetch('/api/contact/landlord', {
  method: 'POST',
  body: JSON.stringify({
    type: 'Property Appraisal',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '0423 123 456',
    comments: 'Looking for property appraisal'
  })
});
```

## Supported Property Categories

```typescript
enum PropertyCategories {
  // Residential
  'House',
  'Townhouse', 
  'Unit',
  'Villa',
  'Apartment',
  'Penthouse',
  'Studio',
  'Duplex',
  'Terrace',
  'Serviced Apartment',
  'Mobile Home',
  
  // Land & Rural
  'Land',
  'Acerage',
  'House and Land',
  'Rural',
  'Semi Rural',
  'Acerage Semi Rural',
  
  // Commercial
  'Commercial',
  'Business'
}
```

## Rate Limits & Quotas

- Standard rate limits apply per bearer token
- Pagination recommended for large data sets
- Consider implementing request throttling for high-traffic applications

---

*This documentation reflects the current implementation in the Gardian Real Estate website and aligns with the OpenAPI 3.0 specification for the ReNet Website API v3.*