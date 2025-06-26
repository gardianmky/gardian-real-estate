import { fetchListingsIndex } from "@/lib/api";
import { RealEstateAPI } from "@/lib/api";
import PropertyCard from "@/components/property-card";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Listing } from "@/types/listing";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate SEO metadata for agent pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const { data } = await RealEstateAPI.getAgentDetails(id);
    const agent = Array.isArray(data) ? data[0] : data;
    
    if (!agent) {
      return {
        title: "Agent Not Found | Gardian Real Estate",
        description: "The requested agent profile could not be found."
      };
    }

    return {
      title: `${agent.name} - ${agent.title || 'Real Estate Agent'} | Gardian Real Estate`,
      description: `Contact ${agent.name}, ${agent.title || 'Real Estate Agent'} at Gardian Real Estate. View their current listings and get in touch for all your property needs in Mackay.`,
      openGraph: {
        title: `${agent.name} - ${agent.title || 'Real Estate Agent'}`,
        description: `Contact ${agent.name} for all your property needs in Mackay and surrounding areas.`,
        type: "profile",
        url: `https://gardianrealestate.com.au/agents/${id}`,
        images: agent.imageURL ? [
          {
            url: agent.imageURL.replace('http://', 'https://'),
            width: 400,
            height: 400,
            alt: `${agent.name} - Gardian Real Estate Agent`,
          }
        ] : [],
      },
    };
  } catch (error) {
    return {
      title: "Agent Profile | Gardian Real Estate",
      description: "View agent profile and current listings at Gardian Real Estate."
    };
  }
}

export default async function AgentProfilePage({ params }: PageProps) {
  const { id } = await params;
  
  let agent = null;
  let listings = [];
  let error = null;

  try {
    // Fetch agent details with better error handling
    console.log('Fetching agent details for ID:', id);
    const agentRes = await RealEstateAPI.getAgentDetails(id);
    console.log('Agent response:', agentRes);
    
    agent = Array.isArray(agentRes.data) ? agentRes.data[0] : agentRes.data;
    console.log('Processed agent:', agent);

    if (!agent) {
      error = "Agent not found";
      console.log('No agent data found');
    } else {
      try {
        // Fetch agent's listings with fallback
        console.log('Fetching listings for agent:', id);
        const listingsRes = await fetchListingsIndex({
          agentID: id,
          fetchAll: true, // Fetch all agent listings
          resultsPerPage: 20,
          orderBy: "dateListed",
          orderDirection: "desc"
        });
        listings = listingsRes.listings || [];
        console.log('Agent listings found:', listings.length);
      } catch (listingsErr) {
        console.error("Error fetching agent listings:", listingsErr);
        // Don't fail the page if listings can't be fetched
        listings = [];
      }
    }
  } catch (err) {
    error = "Failed to load agent profile";
    console.error("Error fetching agent:", err);
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Agent Not Found</h1>
          <p className="text-gray-600 mb-6">The agent profile you're looking for could not be found.</p>
          <Link 
            href="/agents"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            View All Agents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/agents" className="flex items-center text-primary-600 hover:text-primary-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Agents
            </Link>
            
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/agents" className="hover:text-primary-600">Agents</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{agent.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Agent Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Agent Image */}
            <div className="flex-shrink-0">
              {agent.imageURL ? (
                <Image
                  src={agent.imageURL.replace('http://', 'https://')}
                  alt={agent.name || 'Agent'}
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Agent Details */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{agent.name}</h1>
              {agent.title && (
                <p className="text-xl text-primary-600 mb-4">{agent.title}</p>
              )}
              
              {agent.bio && (
                <div className="text-gray-600 mb-6">
                  <p>{agent.bio}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {agent.mobile && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">Mobile: {agent.mobile}</span>
                  </div>
                )}
                
                {agent.phone && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">Office: {agent.phone}</span>
                  </div>
                )}
                
                {agent.email && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">Email: {agent.email}</span>
                  </div>
                )}
              </div>

              {/* Contact CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact-agent?agentID=${agent.agentID || agent.id}&agentName=${encodeURIComponent(agent.name)}`}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                >
                  Contact {agent.name?.split(' ')[0]}
                </Link>
                
                {agent.mobile && (
                  <a
                    href={`tel:${agent.mobile}`}
                    className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors text-center font-medium"
                  >
                    Call {agent.mobile}
                  </a>
                )}
                
                <Link
                  href={`/appraisal-request?agentID=${agent.agentID || agent.id}`}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                >
                  Request Appraisal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Agent's Specialties */}
        {agent.specialties && agent.specialties.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {agent.specialties.map((specialty: string, index: number) => (
                <span 
                  key={index}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Agent's Current Listings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Current Listings ({listings.length})
            </h2>
            
            {listings.length > 0 && (
              <div className="text-sm text-gray-600">
                Showing all properties listed by {agent.name}
              </div>
            )}
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Current Listings</h3>
                <p className="text-gray-600 mb-6">
                  {agent.name} doesn't have any active listings at the moment. Contact them for upcoming properties or market opportunities.
                </p>
                <Link
                  href={`/contact-agent?agentID=${agent.agentID || agent.id}`}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Contact {agent.name?.split(' ')[0]}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing: Listing) => (
                <PropertyCard key={listing.listingID || listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA Section */}
        <div className="mt-8 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Work with {agent.name}?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're buying, selling, or just exploring your options, {agent.name} is here to help you navigate the Mackay property market with expertise and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/contact-agent?agentID=${agent.agentID || agent.id}`}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Send a Message
            </Link>
            <Link
              href="/appraisal-request"
              className="bg-white text-primary-600 border border-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              Get Property Appraisal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
