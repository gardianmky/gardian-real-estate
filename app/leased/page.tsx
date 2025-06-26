import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building, MapPin, Calendar, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recently Leased Properties - Gardian Real Estate',
  description: 'View our recently leased properties and successful rental outcomes in the local area.',
};

// Mock data for recently leased properties
const recentlyLeased = [
  {
    id: 1,
    address: '123 Collins Street, Melbourne VIC 3000',
    price: '$650 per week',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    leasedDate: '2024-01-15',
    propertyType: 'Apartment',
    image: '/placeholder.jpg'
  },
  {
    id: 2,
    address: '456 Smith Street, Collingwood VIC 3066',
    price: '$550 per week',
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 0,
    leasedDate: '2024-01-12',
    propertyType: 'Studio',
    image: '/placeholder.jpg'
  },
  {
    id: 3,
    address: '789 High Street, Prahran VIC 3181',
    price: '$800 per week',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    leasedDate: '2024-01-10',
    propertyType: 'Townhouse',
    image: '/placeholder.jpg'
  },
  {
    id: 4,
    address: '321 Chapel Street, Windsor VIC 3181',
    price: '$720 per week',
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    leasedDate: '2024-01-08',
    propertyType: 'Apartment',
    image: '/placeholder.jpg'
  },
  {
    id: 5,
    address: '654 Brunswick Street, Fitzroy VIC 3065',
    price: '$680 per week',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    leasedDate: '2024-01-05',
    propertyType: 'House',
    image: '/placeholder.jpg'
  },
  {
    id: 6,
    address: '987 Richmond Street, Richmond VIC 3121',
    price: '$590 per week',
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 1,
    leasedDate: '2024-01-03',
    propertyType: 'Apartment',
    image: '/placeholder.jpg'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function LeasedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Recently Leased Properties
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover our successful rental outcomes and see what properties have been leased in your area. 
              Our expert team delivers results for both landlords and tenants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/for-rent"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                View Current Rentals
              </Link>
              <Link
                href="/property-management"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center"
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
              <div className="text-3xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-gray-600">Properties Leased This Year</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">14 Days</div>
              <div className="text-gray-600">Average Time to Lease</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
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
          {recentlyLeased.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.address}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Leased
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">{property.price}</div>
                  <div className="text-sm text-gray-500">{property.propertyType}</div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{property.address}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{property.bedrooms} bed</span>
                  <span>{property.bathrooms} bath</span>
                  <span>{property.carSpaces} car</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Leased {formatDate(property.leasedDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
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
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
