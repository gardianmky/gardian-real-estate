import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { TealGradientSection } from '@/components/ui/teal-gradient-section';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <TealGradientSection variant="hero" className="text-center text-white mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Gardian Real Estate</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          At Gardian, we care for and protect our people.
        </p>
      </TealGradientSection>

      <div className="bg-white p-8 rounded-xl shadow-md mb-10">
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
          <div className="text-center text-teal-600">
            <div className="text-6xl mb-4">🏢</div>
            <p className="text-lg font-medium">Gardian Real Estate Office</p>
            <p className="text-sm opacity-75">94 Victoria Street, Mackay QLD 4740</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Who We Are</h2>
          <p>
            Gardian Real Estate is a full-service real estate agency located in Mackay, Queensland. At Gardian, we care for and protect our people. We bring together long-term business owner experience with an energetic marketing approach to deliver exceptional results for our clients.
          </p>

          <p>
            Our team of experienced professionals combines decades of industry expertise with access to 20+ Australian lenders, ensuring we can provide comprehensive solutions for all your property and financial needs.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Our Commitment</h2>
          <p>
            We are committed to providing trustworthy, affordable financial advice and exceptional real estate services. Our approach is built on:
          </p>

          <ul className="list-disc pl-6 mb-6">
            <li>Caring for and protecting our clients' interests</li>
            <li>Long-term business owner experience and expertise</li>
            <li>Energetic and innovative marketing strategies</li>
            <li>Access to comprehensive financial solutions</li>
            <li>Trustworthy and affordable professional advice</li>
          </ul>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
            <TealGradientSection variant="card" className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Protection</h3>
              <p className="opacity-90">
                We care for and protect our people, ensuring their interests are always at the forefront of everything we do.
              </p>
            </TealGradientSection>

            <TealGradientSection variant="card" className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="opacity-90">
                We provide trustworthy, affordable financial advice built on long-term business owner experience and expertise.
              </p>
            </TealGradientSection>

            <TealGradientSection variant="card" className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Energy</h3>
              <p className="opacity-90">
                Our energetic marketing approach and innovative strategies deliver exceptional results for our clients.
              </p>
            </TealGradientSection>
          </div>

          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Services</h2>
          <p>Gardian Real Estate offers a comprehensive range of services designed to meet all your property and financial needs in Mackay and the surrounding region:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-teal-600 mb-3">🏠 Real Estate Services</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Residential property sales across Mackay region</li>
                <li>Commercial property sales and leasing</li>
                <li>Property purchasing assistance and buyer advocacy</li>
                <li>Comprehensive property management (7.7% management fee)</li>
                <li>Professional property appraisals and market analysis</li>
                <li>Property asset management and investment advice</li>
                <li>Qualified tradesman network for maintenance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-teal-600 mb-3">💰 Financial Services</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Home loans through 20+ Australian lenders</li>
                <li>Investment property finance and portfolio loans</li>
                <li>Commercial finance and business loans</li>
                <li>Personal loans and vehicle finance</li>
                <li>Equipment finance for business needs</li>
                <li>Debt consolidation strategies</li>
                <li>Financial planning and wealth advisory</li>
                <li>Life and income protection insurance</li>
                <li>Superannuation and retirement planning</li>
              </ul>
            </div>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
            <h3 className="text-lg font-semibold text-teal-600 mb-3">🛡️ Insurance Services</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Landlord insurance for rental property protection</li>
              <li>Building insurance with cyclone and storm coverage</li>
              <li>Business insurance including public liability and cyber risk</li>
              <li>Professional indemnity and commercial motor insurance</li>
              <li>Personal insurance lines and family protection</li>
              <li>Investment management and estate planning</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Visit Our Office</h2>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-700">94 Victoria Street, Mackay, QLD 4740</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Phone className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-700">(07) 4957 7424</p>
                  <p className="text-sm text-gray-600">After Hours Management: 0407 440 222</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Mail className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-700">info@gardianrealestate.com.au</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Office Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM - 12:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="relative h-[200px] w-full rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <div className="text-center text-teal-600">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-lg font-medium">Visit Our Office</p>
                  <p className="text-sm opacity-75">94 Victoria Street</p>
                  <p className="text-sm opacity-75">Mackay QLD 4740</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <TealGradientSection className="text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Gardian Difference?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          At Gardian, we care for and protect our people. Whether you need real estate, financial services, or insurance solutions, our experienced team is here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="teal-gradient-button inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-white text-teal-600 hover:bg-gray-100"
          >
            Contact Us Today
          </Link>
          <Link
            href="/for-sale"
            className="teal-gradient-button inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-white/10 text-white hover:bg-white/20"
          >
            View Properties
          </Link>
        </div>
      </TealGradientSection>
    </div>
  )
}
