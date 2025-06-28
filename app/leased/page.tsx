import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { fetchListingsIndex } from '@/lib/api';
import PropertyCard from '@/components/property-card';

export const metadata: Metadata = {
  title: 'Recently Leased Properties - Gardian Real Estate',
  description: 'View our recently leased properties and successful rental outcomes in the local area.',
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function getLeasedProperties(page = 1) {
  try {
    // Use centralized API function for consistent data fetching
    const res = await fetchListingsIndex({
      disposalMethod: "leased", // Use proper leased disposal method
      type: "Residential",
      fetchAll: false, // FIXED: Use proper pagination instead of fetching all
      page,
      resultsPerPage: 12,
      orderBy: "dateListed",
      orderDirection: "desc"
    });
    
    // Return leased properties directly from API
    const listings = res.listings || [];
    
    return listings;
    
  } catch (error) {
    console.error('Error fetching leased properties:', error);
    return [];
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default async function LeasedPage({
  searchParams
}: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const recentlyLeased = await getLeasedProperties(page);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Recently Leased Properties
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Discover our successful rental outcomes and see what properties have been leased in your area. 
              Our expert team delivers results for both landlords and tenants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/for-rent"
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                View Current Rentals
              </Link>
              <Link
                href="/property-management"
                className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors text-center"
              >
                Property Management
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">250+</div>
              <div className="text-gray-600">Properties Leased This Year</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">14 Days</div>
              <div className="text-gray-600">Average Time to Lease</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
              <div className="text-gray-600">Tenant Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Leased Properties */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Lease Successes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These properties have been successfully leased through our comprehensive rental management service. 
            See the results we deliver for property owners and tenants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentlyLeased.length > 0 ? (
            recentlyLeased.map((listing: any) => (
              <PropertyCard key={listing.listingID || listing.id} listing={listing} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Recently Leased Properties</h3>
                <p className="text-gray-600 mb-6">
                  Check back soon for updates on our latest successful leases.
                </p>
                <Link href="/for-rent" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  View Available Rentals
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors">
            Load More Properties
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with Your Rental Property?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a landlord looking to lease your property or a tenant searching for the perfect rental, 
            our experienced team is here to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Contact Our Team
            </Link>
            <Link
              href="/agents"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Meet Our Agents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
