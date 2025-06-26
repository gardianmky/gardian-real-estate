import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RealEstateAPI } from "@/lib/api";
import { Listing } from "types/listing";
import ListingClient from "./ListingClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const { data } = await RealEstateAPI.getListingDetails(id);
    const listing = Array.isArray(data) ? data[0] : data;

    if (!listing) {
      return {
        title: 'Property Not Found | Gardian Real Estate',
        description: 'The requested property listing could not be found.'
      };
    }

    // Create a clean description from the listing description
    const description = listing.description 
      ? listing.description.replace(/<[^>]*>/g, '').slice(0, 160) + '...'
      : `${listing.heading} - View details, photos and contact information for this property in Mackay.`;

    // Get the primary image
    const primaryImage = listing.images && listing.images.length > 0 
      ? (listing.images[0].url || listing.images[0]).replace('http://', 'https://')
      : null;

    // Create property features text
    const features = [];
    if (listing.bedrooms) features.push(`${listing.bedrooms} bed`);
    if (listing.bathrooms) features.push(`${listing.bathrooms} bath`);
    if (listing.carSpaces) features.push(`${listing.carSpaces} car`);
    const featuresText = features.length > 0 ? ` • ${features.join(', ')}` : '';

    const title = `${listing.heading}${featuresText} | Gardian Real Estate`;

    return {
      title,
      description,
      keywords: [
        'Mackay real estate',
        'property for sale',
        'property for rent', 
        'Gardian Real Estate',
        listing.suburb,
        listing.state,
        ...(listing.propertyType ? [listing.propertyType] : [])
      ].filter(Boolean).join(', '),
      
      openGraph: {
        title: listing.heading,
        description,
        type: 'article',
        url: `https://gardianrealestate.com.au/listing/${id}`,
        siteName: 'Gardian Real Estate',
        
        ...(primaryImage && {
          images: [
            {
              url: primaryImage,
              width: 1200,
              height: 630,
              alt: listing.heading,
            }
          ]
        }),
        
        locale: 'en_AU',
      },
      
      twitter: {
        card: 'summary_large_image',
        title: listing.heading,
        description,
        ...(primaryImage && {
          images: [primaryImage]
        }),
      },
      
      alternates: {
        canonical: `https://gardianrealestate.com.au/listing/${id}`,
      },
      
      other: {
        'property:price': listing.price || '',
        'property:type': listing.propertyType || '',
        'property:bedrooms': listing.bedrooms?.toString() || '',
        'property:bathrooms': listing.bathrooms?.toString() || '',
        'property:address': listing.address?.displayAddress || '',
      }
    };
  } catch (error) {
    console.error('Error generating metadata for listing:', error);
    return {
      title: 'Property Listing | Gardian Real Estate',
      description: 'View property details at Gardian Real Estate in Mackay.'
    };
  }
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await RealEstateAPI.getListingDetails(id);
  const listing = Array.isArray(data) ? data[0] : data;

  if (!listing) {
    return notFound();
  }

  return <ListingClient listing={listing} />;
}
