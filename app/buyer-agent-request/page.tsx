'use client';

import Link from 'next/link';
import { UserPlus, Search, Mail, Phone } from 'lucide-react';
import { useFormSubmission } from '@/hooks/use-form-submission';

// Metadata moved to layout.tsx for client components

export default function BuyerAgentRequestPage() {
  const { state, formData, updateField, submitForm } = useFormSubmission({
    endpoint: '/api/contact/buyer-agent',
    resetOnSuccess: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formFields = [
      { name: 'firstName', label: 'First Name', type: 'text' as const, required: true },
      { name: 'lastName', label: 'Last Name', type: 'text' as const, required: true },
      { name: 'email', label: 'Email', type: 'email' as const, required: true },
      { name: 'phone', label: 'Phone', type: 'tel' as const, required: true },
      { name: 'budgetRange', label: 'Budget Range', type: 'select' as const, required: true },
      { name: 'propertyType', label: 'Property Type', type: 'select' as const, required: true }
    ];

    const additionalData = {
      bedrooms: formData.bedrooms || '',
      bathrooms: formData.bathrooms || '',
      carSpaces: formData.carSpaces || '',
      preferredSuburbs: formData.preferredSuburbs || '',
      timeline: formData.timeline || '',
      additionalRequirements: formData.additionalRequirements || ''
    };

    await submitForm(formFields, additionalData);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Buyer's Agent</h1>
            <p className="text-xl text-gray-600">
              Let our expert team help you find and secure your perfect property
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Search className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Property Search</h3>
              <p className="text-gray-600">Access to exclusive listings and off-market properties</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <UserPlus className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Dedicated Agent</h3>
              <p className="text-gray-600">Personal agent working exclusively for your interests</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Mail className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Negotiation Support</h3>
              <p className="text-gray-600">Professional negotiation to secure the best deal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Request Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Tell Us What You're Looking For</h2>
              
              {/* Success Message */}
              {state.isSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">{state.message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{state.error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                    <input
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range*</label>
                    <select 
                      value={formData.budgetRange || ''}
                      onChange={(e) => updateField('budgetRange', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="300000-400000">$300,000 - $400,000</option>
                      <option value="400000-500000">$400,000 - $500,000</option>
                      <option value="500000-600000">$500,000 - $600,000</option>
                      <option value="600000-750000">$600,000 - $750,000</option>
                      <option value="750000-1000000">$750,000 - $1,000,000</option>
                      <option value="1000000+">$1,000,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type*</label>
                    <select 
                      value={formData.propertyType || ''}
                      onChange={(e) => updateField('propertyType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select property type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="unit">Unit</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Spaces</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Suburbs</label>
                  <input
                    type="text"
                    value={formData.preferredSuburbs || ''}
                    onChange={(e) => updateField('preferredSuburbs', e.target.value)}
                    placeholder="e.g. North Mackay, West Mackay, Andergrove"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="12months+">12+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                  <textarea
                    rows={4}
                    value={formData.additionalRequirements || ''}
                    onChange={(e) => updateField('additionalRequirements', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Tell us about any specific requirements, features you must have, or questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={state.isSubmitting}
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.isSubmitting ? 'Submitting...' : 'Request Buyer\'s Agent'}
                </button>
              </form>
            </div>

            {/* Process Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold mb-6">How It Works</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Submit Your Request</h4>
                      <p className="text-gray-600 text-sm">Complete the form with your property requirements and preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Agent Assignment</h4>
                      <p className="text-gray-600 text-sm">We'll assign an experienced agent who specializes in your desired area</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Property Search</h4>
                      <p className="text-gray-600 text-sm">Your agent will search for properties matching your criteria</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Purchase Support</h4>
                      <p className="text-gray-600 text-sm">Full support through viewing, negotiation, and settlement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-teal-900 mb-4">Questions?</h3>
                <p className="text-teal-700 mb-6">
                  Speak directly with our team about buyer's agent services.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:0749577424"
                    className="flex items-center text-teal-700 hover:text-teal-800"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    (07) 4957 7424
                  </a>
                  <a
                    href="mailto:info@gardianrealestate.com.au"
                    className="flex items-center text-teal-700 hover:text-teal-800"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    info@gardianrealestate.com.au
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
