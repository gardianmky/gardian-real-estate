import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingUp, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Appraisals - Gardian Real Estate',
  description: 'Get an accurate property appraisal from Gardian Real Estate\'s experienced team in Mackay.'
};

export default function AppraisalsPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Appraisals</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get an accurate, professional property appraisal from Mackay's trusted real estate experts
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Calculator className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Accurate Valuations</h3>
            <p className="text-gray-600">Professional appraisals based on current market data and local expertise</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
            <p className="text-gray-600">Comprehensive market analysis including recent sales and trends</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Clock className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quick Turnaround</h3>
            <p className="text-gray-600">Fast, professional service with detailed written reports</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-teal-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Property Appraised?</h2>
          <p className="text-xl mb-8">Contact our expert team today for a professional appraisal</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Request Appraisal
            </Link>
            <a 
              href="tel:0749577424" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition-colors font-semibold"
            >
              Call (07) 4957 7424
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
