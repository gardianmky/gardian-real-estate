'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function TenantApplicationForm() {
  const handleREIQFormRedirect = () => {
    // Replace this URL with the actual REIQ form URL when provided
    window.open('https://forms.reiq.com/rental-application', '_blank');
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Rental Application Form
            </h2>
            <p className="text-xl text-gray-600">
              Complete your rental application using the official REIQ form - it's fast, secure, and industry standard
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Official REIQ Rental Application
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We use the Real Estate Institute of Queensland (REIQ) standard rental application form. 
                  This ensures your application meets all industry requirements and is processed efficiently.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">What you'll need:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Photo identification (driver's license or passport)</li>
                    <li>• Proof of income (pay slips, employment letter)</li>
                    <li>• Reference contact details (previous landlord, employer)</li>
                    <li>• Bank statements or financial documentation</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleREIQFormRedirect}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Complete REIQ Application Form
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  This will open the official REIQ form in a new window
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Industry Standard</h4>
              <p className="text-sm text-gray-600">Official REIQ form meets all Queensland rental requirements</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Process</h4>
              <p className="text-sm text-gray-600">Your personal information is protected throughout the application</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Processing</h4>
              <p className="text-sm text-gray-600">Standard forms help us process your application quickly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}