import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { HomeIcon, SearchIcon, KeyIcon, FileTextIcon, UsersIcon, CalendarIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rental Assistance - Gardian Real Estate',
  description: 'Get expert help finding the perfect rental property. Our rental specialists provide personalized assistance throughout your search.',
};

export default function RentalAssistancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rental Assistance Services
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Let our rental specialists help you find the perfect property that fits your needs and budget. 
              We&apos;ll guide you through every step of the rental process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=rental-assistance"
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Get Started Today
              </Link>
              <Link
                href="/for-rent"
                className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors text-center"
              >
                Browse Available Rentals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive rental assistance service is designed to make your property search 
              as smooth and stress-free as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Property Search</h3>
              <p className="text-gray-600">
                We&apos;ll search for properties that match your specific criteria, budget, and location preferences.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection Coordination</h3>
              <p className="text-gray-600">
                We&apos;ll coordinate property inspections at times that suit your schedule and accompany you if needed.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileTextIcon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Application Assistance</h3>
              <p className="text-gray-600">
                Help with rental applications, documentation, and liaising with property managers on your behalf.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Negotiation Support</h3>
              <p className="text-gray-600">
                Professional negotiation assistance for rent, lease terms, and property modifications.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyIcon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Move-in Support</h3>
              <p className="text-gray-600">
                Guidance through the lease signing process, bond lodgment, and move-in arrangements.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Continued assistance during your tenancy for any property-related matters or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Rental Assistance?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Market Expertise</h3>
                    <p className="text-gray-600">In-depth knowledge of the Mackay rental market and property trends.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Time-Saving Service</h3>
                    <p className="text-gray-600">We handle the legwork so you can focus on other important matters.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Access to Exclusive Properties</h3>
                    <p className="text-gray-600">First access to new listings and off-market rental opportunities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional Network</h3>
                    <p className="text-gray-600">Strong relationships with property managers and landlords.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Service</h3>
                    <p className="text-gray-600">Tailored approach based on your specific needs and preferences.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="">Select budget range</option>
                    <option value="under-400">Under $400/week</option>
                    <option value="400-600">$400 - $600/week</option>
                    <option value="600-800">$600 - $800/week</option>
                    <option value="800-1000">$800 - $1,000/week</option>
                    <option value="over-1000">Over $1,000/week</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Areas</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., North Mackay, Andergrove"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Tell us about your specific needs..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  Request Rental Assistance
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about our rental assistance service</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a cost for rental assistance?</h3>
              <p className="text-gray-600">
                Our rental assistance service is complimentary for tenants. We&apos;re paid by property owners when we successfully 
                match tenants with their properties.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does the process take?</h3>
              <p className="text-gray-600">
                The timeline varies depending on your requirements and market availability. On average, we help clients 
                find suitable properties within 2-4 weeks.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What areas do you cover?</h3>
              <p className="text-gray-600">
                We provide rental assistance throughout Mackay and surrounding areas including North Mackay, South Mackay, 
                Andergrove, Ooralea, and Beaconsfield.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you help with commercial rentals?</h3>
              <p className="text-gray-600">
                Yes, we also provide assistance for commercial and retail property rentals. Our team has expertise 
                in both residential and commercial rental markets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Rental?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Don&apos;t spend countless hours searching for rental properties. Let our experts do the hard work for you 
            and find the perfect home that meets all your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=rental-assistance"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Start Your Search Today
            </Link>
            <Link
              href="/agents"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
