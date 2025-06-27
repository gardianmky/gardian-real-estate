import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Home, DollarSign, TrendingUp, CheckCircle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home Loans & Finance - Gardian Real Estate',
  description: 'Get expert home loan advice and finance solutions. Find the right mortgage for your new property with our trusted lending partners.',
};

export default function HomeLoansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Home Loans & Finance Solutions
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Secure the right home loan for your property purchase. Our finance specialists 
              work with leading lenders to find competitive rates and terms that suit your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=finance"
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Speak to Finance Specialist
              </Link>
              <Link
                href="/appraisals"
                className="bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors text-center"
              >
                Get Property Appraisal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Calculator Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Loan Calculator</h2>
              <p className="text-gray-600">
                Get an estimate of your home loan repayments with our easy-to-use calculator.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="500,000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="6.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="30">30 years</option>
                      <option value="25">25 years</option>
                      <option value="20">20 years</option>
                      <option value="15">15 years</option>
                    </select>
                  </div>
                  
                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    Calculate Repayments
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Estimated Repayments</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-semibold text-gray-900">Calculate above</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-gray-900">Calculate above</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-semibold text-gray-900">Calculate above</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    * Estimates only. Actual rates and terms may vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Finance Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with trusted lending partners to provide comprehensive finance solutions for your property purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Home className="h-12 w-12 text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">First Home Buyer Loans</h3>
            <p className="text-gray-600 mb-4">
              Special rates and government incentives available for first home buyers. 
              We'll guide you through the entire process.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                First Home Owner Grant assistance
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Low deposit options
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Government schemes guidance
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <TrendingUp className="h-12 w-12 text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Investment Property Loans</h3>
            <p className="text-gray-600 mb-4">
              Build your property portfolio with competitive investment loan options 
              and expert advice on tax benefits.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Interest-only options
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Tax deduction advice
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Portfolio lending strategies
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Calculator className="h-12 w-12 text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Refinancing</h3>
            <p className="text-gray-600 mb-4">
              Review your current home loan and potentially save thousands 
              with better rates and terms.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Rate comparison analysis
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Break cost calculations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Feature upgrades
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lenders Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Lending Partners</h2>
            <p className="text-gray-600">
              We work with leading financial institutions to secure the best loan options for you.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {[
              'Commonwealth Bank',
              'Westpac',
              'ANZ Bank',
              'NAB',
              'Bendigo Bank',
              'ING',
              'Bank of Queensland',
              'Suncorp Bank'
            ].map((lender, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600 font-medium">{lender}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Loan Process</h2>
          <p className="text-gray-600">Getting your home loan approved is easier than you think</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '1',
              title: 'Initial Consultation',
              description: 'Discuss your needs and assess your borrowing capacity'
            },
            {
              step: '2',
              title: 'Loan Application',
              description: 'Complete your application with our expert guidance'
            },
            {
              step: '3',
              title: 'Approval Process',
              description: 'We work with lenders to secure your approval'
            },
            {
              step: '4',
              title: 'Settlement',
              description: 'Finalize your loan and get the keys to your new home'
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Pre-Approved?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get pre-approved for your home loan and start house hunting with confidence. 
            Our finance specialists are here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=pre-approval"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Get Pre-Approved
            </Link>
            <a
              href="tel:0749577424"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
