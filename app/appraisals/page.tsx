import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingUp, MapPin, Clock, CheckCircle, ArrowRight, Phone, Mail, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Appraisals - Gardian Real Estate',
  description: 'Get an accurate property appraisal from Gardian Real Estate\'s experienced team in Mackay. Free market appraisals for residential properties.'
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Property Appraisals</h1>
            <p className="text-xl mb-8 text-white/90">
              Get an accurate, professional property appraisal from Mackay's trusted real estate experts. 
              Free market appraisals for residential properties with detailed market analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appraisal-request"
                className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Request Free Appraisal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:0749577424"
                className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-700 transition-colors duration-300"
              >
                Call (07) 4957 7424
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 mx-auto">
              <Calculator className="h-7 w-7 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Accurate Valuations</h3>
            <p className="text-gray-600">
              Professional appraisals based on current market data, recent sales analysis, 
              and deep local knowledge of Mackay property values.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 mx-auto">
              <TrendingUp className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Market Analysis</h3>
            <p className="text-gray-600">
              Comprehensive market analysis including recent comparable sales, 
              current trends, and future growth potential in your area.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 mx-auto">
              <Clock className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quick Turnaround</h3>
            <p className="text-gray-600">
              Fast, professional service with detailed written reports typically 
              provided within 24-48 hours of property inspection.
            </p>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">What's Included in Your Appraisal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Comprehensive Property Assessment</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Property condition and features evaluation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Land size and building specifications assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Location advantages and local amenities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Unique selling points identification</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Detailed Market Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Recent comparable sales in your suburb</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Current market trends and price movements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Days on market analysis for similar properties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Marketing strategy recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Gardian */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Gardian for Your Appraisal?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <Award className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600 text-sm">
                Deep knowledge of Mackay's property market with years of local experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Experienced Team</h3>
              <p className="text-gray-600 text-sm">
                Licensed real estate professionals with proven track record
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Current Data</h3>
              <p className="text-gray-600 text-sm">
                Access to latest market data and comparable sales information
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Areas</h3>
              <p className="text-gray-600 text-sm">
                Servicing all Mackay suburbs and surrounding areas
              </p>
            </div>
          </div>
        </div>

        {/* Areas We Service */}
        <div className="bg-gray-100 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Areas We Service</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Mackay CBD</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Northern Beaches</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Andergrove</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Mount Pleasant</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Glenella</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Rural View</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Slade Point</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Eimeo</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Bucasia</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Shoal Point</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Blacks Beach</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium">Sarina</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Property Appraised?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Contact our expert team today for a professional appraisal. Free market appraisals 
            for residential properties with no obligation to sell.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appraisal-request" 
              className="inline-flex items-center bg-white text-teal-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <Mail className="mr-2 h-5 w-5" />
              Request Free Appraisal
            </Link>
            <a 
              href="tel:0749577424" 
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (07) 4957 7424
            </a>
          </div>
          
          <div className="mt-8 text-sm text-white/80">
            <p>Office Hours: Monday-Friday 9AM-5PM, Saturday 9AM-12PM</p>
            <p>Same-day appraisals available by appointment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
