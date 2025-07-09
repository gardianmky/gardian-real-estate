import Link from "next/link"
import { Calculator, TrendingUp, Shield, Users, Home, Building, Phone, Mail, CheckCircle, ArrowRight, DollarSign } from "lucide-react"

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Finance Solutions for Your Property Goals
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Access competitive home loans, investment finance, and commercial lending through our 
              network of 20+ Australian lenders. Get expert advice tailored to your financial situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Get Finance Pre-Approval
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
        {/* Finance Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Finance Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Home Loans */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Home className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Home Loans</h3>
              <p className="text-gray-600 mb-4">
                Secure competitive rates for your home purchase with access to multiple lenders 
                and loan products tailored to first-time buyers and upgraders.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">First home buyer programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Construction and land loans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Refinancing options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Low deposit loans available</span>
                </li>
              </ul>
            </div>

            {/* Investment Finance */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Investment Finance</h3>
              <p className="text-gray-600 mb-4">
                Build your property portfolio with specialized investment loans designed for 
                positive gearing, negative gearing, and capital growth strategies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Residential investment properties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Interest-only loan options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Portfolio structuring advice</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Tax optimization strategies</span>
                </li>
              </ul>
            </div>

            {/* Commercial Finance */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Building className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Commercial Finance</h3>
              <p className="text-gray-600 mb-4">
                Fund your business premises, commercial investments, or development projects 
                with specialized commercial lending solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Owner-occupier commercial loans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Commercial investment funding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Development and construction finance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Equipment finance options</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personal & Car Loans</h3>
              <p className="text-gray-600 mb-4">
                Access competitive personal loans, car finance, and debt consolidation solutions 
                to support your lifestyle and financial goals.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">New and used car loans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Personal loan solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Debt consolidation options</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Calculator className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Financial Planning</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive financial planning services including wealth advisory, 
                superannuation, and investment strategies for long-term security.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Wealth building strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Superannuation advice</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Life and income protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Gardian for Finance */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Gardian for Finance?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Access to 20+ Lenders</h3>
              <p className="text-gray-700 mb-4">
                Our extensive network of Australian lenders means we can compare rates and 
                find the most competitive finance solution for your situation.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Local Market Knowledge</h3>
              <p className="text-gray-700">
                Deep understanding of the Mackay property market helps us structure 
                finance solutions that align with local property values and growth potential.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">End-to-End Service</h3>
              <p className="text-gray-700 mb-4">
                From pre-approval to settlement, we guide you through the entire 
                finance process, liaising with lenders on your behalf.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Trustworthy Advice</h3>
              <p className="text-gray-700">
                Our experienced team provides honest, affordable financial advice 
                focused on your long-term success and financial wellbeing.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Finance?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get pre-approved for your home loan or investment finance. Our finance specialists 
            are ready to help you achieve your property goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Apply for Pre-Approval
            </Link>
            <a
              href="tel:0749577424"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (07) 4957 7424
            </a>
          </div>
          
          <div className="mt-8 text-sm text-white/80">
            <p>Office Hours: Monday-Friday 9AM-5PM, Saturday 9AM-12PM</p>
            <p>Free consultations available - no obligation to proceed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
