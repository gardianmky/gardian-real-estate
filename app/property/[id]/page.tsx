import Link from "next/link";
import Image from "next/image";
import { fetchListingById } from "@/lib/api";
import { PropertyFeaturesGrid } from "@/components/ui/property-features";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import { cleanPropertyTitle } from "@/lib/utils";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate dynamic metadata for SEO and Open Graph
export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const property = await fetchListingById(id);
    
    if (!property) {
      return {
        title: 'Property Not Found | Gardian Real Estate',
        description: 'The requested property could not be found.',
      };
    }

    const title = `${property.heading} | Gardian Real Estate`;
    const description = property.description?.slice(0, 160) || 
      `${property.heading} - Premium property in Mackay. Contact Gardian Real Estate for more details.`;
    const imageUrl = property.images?.[0]?.url?.replace('http://', 'https://') || 
                     (typeof property.images?.[0] === 'string' ? property.images[0] : '');

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://gardianrealestate.com.au/property/${id}`,
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: property.heading,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Property | Gardian Real Estate',
      description: 'Discover premium properties in Mackay with Gardian Real Estate.',
    };
  }
}

export default async function PropertyDetailPage({
  params
}: PropertyPageProps) {
  const { id } = await params;
  const property = await fetchListingById(id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-primary-600 text-white py-2 text-center text-sm">
          Premium Property Details
        </div>
        
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or is no longer available.</p>
          <div className="space-x-4">
            <Link href="/for-sale" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
              Browse Properties
            </Link>
            <Link href="/contact" className="bg-white text-teal-600 border border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-2 text-center text-sm">
        Premium Property Details
      </div>
      
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/for-sale" className="flex items-center text-teal-600 hover:text-teal-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Properties
            </Link>
            
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-teal-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/for-sale" className="hover:text-teal-600">Properties</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">Property Details</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Property Images Carousel */}
        <div className="mb-8">
          <PropertyImageCarousel 
            images={property.images || []} 
            alt={property.heading || 'Property'} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {cleanPropertyTitle(property.heading)}
                </h1>
                
                {/* Property Type & Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                  {property.categories && property.categories.map((category: string, index: number) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>

                {/* Price */}
                {property.price && (
                  <div className="text-2xl font-bold text-teal-600 mb-4">
                    {property.price}
                  </div>
                )}
              </div>

              {/* Property Features */}
              {property.bedBathCarLand && property.bedBathCarLand.length > 0 && (
                <PropertyFeaturesGrid listing={property} className="mb-6" />
              )}

              {/* Description */}
              {property.description && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Description</h3>
                  <div className="prose max-w-none text-gray-600">
                    {property.description.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature.value} {feature.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Floorplans */}
              {property.floorplans && property.floorplans.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Floorplans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.floorplans.map((floorplan: any, index: number) => (
                      <div key={index} className="relative h-64 rounded-lg overflow-hidden border">
                        <Image
                          src={floorplan.url}
                          alt={floorplan.description || `Floorplan ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Agent Info & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Agent Information */}
              {property.agents && property.agents.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Agent</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      {property.agents[0].imageURL ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={property.agents[0].imageURL}
                            alt={property.agents[0].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{property.agents[0].name}</h4>
                        <p className="text-sm text-gray-600">{property.agents[0].title}</p>
                        {property.agents[0].mobile && (
                          <a href={`tel:${property.agents[0].mobile}`} className="text-sm text-teal-600 hover:text-teal-700 block mt-1">
                            📱 {property.agents[0].mobile}
                          </a>
                        )}
                        {property.agents[0].phone && property.agents[0].phone !== property.agents[0].mobile && (
                          <a href={`tel:${property.agents[0].phone}`} className="text-sm text-teal-600 hover:text-teal-700 block">
                            📞 {property.agents[0].phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <a 
                  href={`tel:${property.agents?.[0]?.mobile || '0749577424'}`}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium text-center block"
                >
                  Call Agent
                </a>
                <Link 
                  href={`/contact?property=${property.listingID}&agent=${property.agents?.[0]?.agentID}`}
                  className="w-full bg-white text-teal-600 border border-teal-600 py-3 px-4 rounded-lg hover:bg-teal-50 transition-colors font-medium text-center block"
                >
                  Send Enquiry
                </Link>
                <Link 
                  href="/book-appointment"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center block"
                >
                  Book Inspection
                </Link>
              </div>

              {/* Property ID */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-gray-600">
                  <strong>Property ID:</strong> {property.listingID}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Listed:</strong> {property.type} Property
                </div>
              </div>

              {/* Additional Links */}
              {property.links && property.links.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-gray-800 mb-3">Additional Information</h4>
                  <div className="space-y-2">
                    {property.links.map((link: any, index: number) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-teal-600 hover:text-teal-700"
                      >
                        {link.description || link.type || 'View Document'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Properties</h2>
          <div className="text-center py-8 bg-white rounded-lg">
            <p className="text-gray-600 mb-4">Interested in similar properties?</p>
            <div className="space-x-4">
              <Link href="/for-sale" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                Browse All Properties
              </Link>
              <Link href="/contact" className="bg-white text-teal-600 border border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                Contact Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}