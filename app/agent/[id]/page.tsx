import React from "react";
import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { notFound } from 'next/navigation';
import { MapPin, Phone, Mail, Home, Building } from "lucide-react";
import PropertyCard from "@/components/property-card";

interface Agent {
  agentID: string;
  name: string;
  title: string;
  email: string;
  mobile: string;
  phone: string;
  imageURL: string;
  profile: string;
  bio?: string;
  specialties?: string[];
  listings: any[];
  totalListings: number;
}

interface Props {
  params: Promise<{ id: string }>;
}

async function getAgentData(id: string): Promise<Agent | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/agents/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const agent = await getAgentData(id);
  
  return {
    title: agent ? `${agent.name} - Gardian Real Estate` : 'Agent Profile',
    description: agent?.bio || 'Professional real estate agent at Gardian Real Estate'
  };
}

export default async function AgentProfilePage({ params }: Props) {
  const { id } = await params;
  const agent = await getAgentData(id);
  
  if (!agent) {
    notFound();
  }

  const featuredProperty = agent.listings?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/agents" className="inline-flex items-center text-teal-600 hover:text-teal-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Agents
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Agent Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Image
                src={agent.imageURL || '/placeholder-user.jpg'}
                alt={agent.name}
                width={200}
                height={200}
                className="rounded-xl object-cover w-48 h-48"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{agent.name}</h1>
              <p className="text-xl text-teal-600 mb-4">{agent.title}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {agent.mobile && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-teal-600 mr-3" />
                    <a href={`tel:${agent.mobile}`} className="text-gray-700 hover:text-teal-600">
                      {agent.mobile}
                    </a>
                  </div>
                )}
                {agent.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-teal-600 mr-3" />
                    <a href={`mailto:${agent.email}`} className="text-gray-700 hover:text-teal-600">
                      {agent.email}
                    </a>
                  </div>
                )}
              </div>

              {agent.bio && (
                <p className="text-gray-600 mb-6 leading-relaxed">{agent.bio}</p>
              )}

              <div className="flex gap-4">
                <a
                  href={`tel:${agent.mobile}`}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="bg-white text-teal-600 border border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Specialties */}
        {agent.specialties && agent.specialties.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {agent.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Current Listings */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Current Listings</h2>
            <span className="text-gray-600">{agent.totalListings} properties</span>
          </div>

          {agent.listings && agent.listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agent.listings.slice(0, 6).map((listing) => (
                <PropertyCard key={listing.listingID || listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No current listings available</p>
            </div>
          )}

          {agent.listings && agent.listings.length > 6 && (
            <div className="text-center mt-8">
              <Link
                href={`/for-sale?agent=${agent.agentID}`}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                View All {agent.totalListings} Listings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}