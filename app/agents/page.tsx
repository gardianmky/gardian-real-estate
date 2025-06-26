import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAgents } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Our Real Estate Agents | Gardian Real Estate Mackay',
  description: 'Meet our experienced real estate agents in Mackay. Our professional team is dedicated to helping you buy, sell, or rent property in Mackay and surrounding areas.',
  openGraph: {
    title: 'Our Real Estate Agents | Gardian Real Estate Mackay',
    description: 'Meet our experienced real estate agents in Mackay. Professional, dedicated service for all your property needs.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface AgentsPageProps {
  searchParams: { 
    [key: string]: string | undefined;
  };
}

// Agent Card Component
function AgentCard({ agent }: { agent: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={agent.imageURL || '/placeholder.svg'}
          alt={agent.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {agent.name}
        </h3>
        
        {agent.title && (
          <p className="text-primary-600 font-medium mb-3">{agent.title}</p>
        )}
        
        {agent.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {agent.description}
          </p>
        )}

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          {agent.email && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${agent.email}`} className="hover:text-primary-600 transition-colors">
                {agent.email}
              </a>
            </div>
          )}
          
          {agent.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${agent.phone}`} className="hover:text-primary-600 transition-colors">
                {agent.phone}
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/agents/${agent.agentID}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
          >
            View Profile
          </Link>
          {agent.email && (
            <a
              href={`mailto:${agent.email}`}
              className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


async function getAllAgents() {
  try {
    // Fetch all agents without pagination
    const { agents, pagination } = await fetchAgents(1, { resultsPerPage: 100 }); // Large number to get all
    return { agents, totalAgents: agents.length };
  } catch (error) {
    console.error('Error fetching agents:', error);
    return { 
      agents: [], 
      totalAgents: 0 
    };
  }
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const { agents, totalAgents } = await getAllAgents();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Our experienced real estate professionals are here to guide you through every step of your property journey in Mackay and surrounding areas.
            </p>
          </div>
        </div>
      </div>

      {/* Agents Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                All Our Real Estate Agents
              </h2>
              <p className="text-gray-600">
                {totalAgents} professional {totalAgents === 1 ? 'agent' : 'agents'} ready to help you with all your property needs
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Team
              </span>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {agents.map((agent: any) => (
              <AgentCard key={agent.agentID} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Agents Available</h3>
              <p className="text-gray-600 mb-4">
                We're currently updating our agent directory. Please contact us directly for assistance.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Work with Our Team?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're buying, selling, or renting, our experienced agents are here to provide you with 
              exceptional service and expert guidance throughout your property journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Get Started Today
              </a>
              <a 
                href="/for-sale" 
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
