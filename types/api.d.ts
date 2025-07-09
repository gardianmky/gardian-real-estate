interface Listing {
  listingID: string;
  heading: string;
  price: string;
  images: Array<{
    url: string;
    alt?: string;
  }>;
  disposalMethod: 'forSale' | 'forRent' | 'sold' | 'auction';
  type: 'Residential' | 'Commercial' | 'Land';
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}

interface Agent {
  agentID: string;
  name: string;
  title: string;
  imageURL: string;
  phone: string;
  email: string;
  bio?: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_RENET_API_TOKEN: string
  }
}