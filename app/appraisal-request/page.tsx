"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, FileText, Clock, CheckCircle, Calculator } from 'lucide-react';

export default function AppraisalRequestPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")

    try {
      const formData = new FormData(e.currentTarget)
      const formPayload = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        propertyAddress: formData.get('propertyAddress'),
        suburb: formData.get('suburb'),
        state: formData.get('state'),
        postcode: formData.get('postcode'),
        propertyType: formData.get('propertyType'),
        bedrooms: formData.get('bedrooms'),
        bathrooms: formData.get('bathrooms'),
        purpose: formData.get('purpose'),
        timeframe: formData.get('timeframe'),
        additionalInfo: formData.get('additionalInfo'),
        timestamp: new Date().toISOString(),
        source: 'Gardian Real Estate Website'
      }

      const response = await fetch('/api/contact/appraisal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`)
      }

      setFormStatus("success")
      // Reset form on success
      e.currentTarget.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus("error")
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Property Appraisal
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Discover your property's current market value with a comprehensive appraisal from our 
              experienced team. Get expert insights and data-driven valuations you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#appraisal-form"
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Get Free Appraisal
              </a>
              <a
                href="tel:0749577424"
                className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors text-center"
              >
                Call for Instant Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Get a Property Appraisal?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Whether you're thinking of selling, refinancing, or just curious about your property's value, 
            our professional appraisals provide the insights you need to make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Market Value</h3>
            <p className="text-gray-600">
              Get an accurate assessment of your property's worth in today's market conditions, 
              backed by recent sales data and local market trends.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Analysis</h3>
            <p className="text-gray-600">
              Understand your property's investment potential, rental yields, and growth prospects 
              to make smart financial decisions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Report</h3>
            <p className="text-gray-600">
              Receive a comprehensive written report with comparable sales, market analysis, 
              and recommendations for maximizing your property's value.
            </p>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Appraisal Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Request Submitted</h4>
              <p className="text-gray-600 text-sm">Complete our online form or call us directly</p>
              <div className="flex items-center justify-center mt-2 text-teal-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">Same day</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Property Inspection</h4>
              <p className="text-gray-600 text-sm">Our agent visits to assess your property</p>
              <div className="flex items-center justify-center mt-2 text-teal-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">Within 48 hours</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Market Analysis</h4>
              <p className="text-gray-600 text-sm">Research comparable sales and market data</p>
              <div className="flex items-center justify-center mt-2 text-teal-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">24 hours</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-semibold text-gray-900 mb-2">Report Delivered</h4>
              <p className="text-gray-600 text-sm">Receive your detailed appraisal report</p>
              <div className="flex items-center justify-center mt-2 text-teal-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">72 hours total</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-gray-100 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included in Your Appraisal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Current market value assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Comparable property analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Local market trends and insights</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Property condition assessment</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Improvement recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Selling strategy advice</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Written detailed report</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">No obligation consultation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appraisal Request Form */}
        <div id="appraisal-form" className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Your Free Property Appraisal</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Property Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="e.g., 123 Main Street, Mackay QLD 4740"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="unit">Unit</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Appraisal
              </label>
              <select
                id="purpose"
                name="purpose"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select Purpose</option>
                <option value="selling">Considering selling</option>
                <option value="refinancing">Refinancing</option>
                <option value="insurance">Insurance purposes</option>
                <option value="investment">Investment analysis</option>
                <option value="curiosity">Just curious about value</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-2">
                When are you looking to sell? (if applicable)
              </label>
              <select
                id="timeframe"
                name="timeframe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select Timeframe</option>
                <option value="immediately">Immediately</option>
                <option value="1-3months">1-3 months</option>
                <option value="3-6months">3-6 months</option>
                <option value="6-12months">6-12 months</option>
                <option value="not-sure">Not sure yet</option>
                <option value="not-selling">Not selling</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                placeholder="Tell us about any recent renovations, unique features, or specific questions you have about your property..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I consent to being contacted by Gardian Real Estate regarding my property appraisal request and agree to the 
                <Link href="/privacy" className="text-teal-600 hover:text-teal-700 ml-1">privacy policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold disabled:opacity-70"
            >
              {formStatus === "submitting" ? "Submitting..." : "Submit Appraisal Request"}
            </button>

            {formStatus === "success" && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
                Thank you for your appraisal request! Our team will contact you within 24 hours to arrange a property inspection.
              </div>
            )}

            {formStatus === "error" && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                There was an error submitting your request. Please try again or contact us directly.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">How accurate are your appraisals?</h4>
              <p className="text-gray-600 text-sm">
                Our appraisals are highly accurate, using current market data, recent sales, and our local expertise. 
                We provide a realistic market value range based on current conditions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Is the appraisal really free?</h4>
              <p className="text-gray-600 text-sm">
                Yes, absolutely. Our property appraisal service is completely free with no hidden costs or obligations. 
                We provide this service to help you make informed property decisions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">How long does the process take?</h4>
              <p className="text-gray-600 text-sm">
                Typically 72 hours from initial contact to receiving your detailed report. We arrange the inspection 
                within 48 hours and complete the analysis within 24 hours after that.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Do I have to sell with you?</h4>
              <p className="text-gray-600 text-sm">
                Not at all. There's no obligation to sell your property with us. The appraisal is a free service 
                to help you understand your property's value, regardless of your future plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
