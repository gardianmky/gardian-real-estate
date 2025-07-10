import Link from "next/link"
import { Shield, Home, Users, Briefcase, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react"

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insurance Protection for Your Property Investment
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Protect your property, rental income, and assets with comprehensive insurance solutions 
              tailored for Mackay property owners and investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Get Insurance Quote
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
        {/* Insurance Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Insurance Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Landlord Insurance */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Home className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Landlord Insurance</h3>
              <p className="text-gray-600 mb-4">
                Protect your rental property investment with comprehensive coverage for property damage, 
                loss of rental income, and tenant-related risks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Building and contents protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Loss of rental income coverage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Malicious damage protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Legal liability coverage</span>
                </li>
              </ul>
            </div>

            {/* Building Insurance */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Building Insurance</h3>
              <p className="text-gray-600 mb-4">
                Essential protection for your property structure against natural disasters, 
                storms, fire, and other covered events specific to the Mackay region.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Cyclone and storm damage coverage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Fire and flood protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Temporary accommodation costs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Debris removal and cleanup</span>
                </li>
              </ul>
            </div>

            {/* Business Insurance */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Business Insurance</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive business protection including public liability, professional indemnity, 
                and cyber risk solutions for property investors and business owners.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Public liability coverage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Professional indemnity protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Cyber liability and data breach</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Business interruption coverage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Gardian for Insurance */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Gardian for Insurance?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Local Market Knowledge</h3>
              <p className="text-gray-700 mb-4">
                Our deep understanding of Mackay's climate risks, from cyclones to flooding, 
                ensures you get appropriate coverage for local conditions.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Multiple Insurance Partners</h3>
              <p className="text-gray-700">
                We work with leading insurance providers to compare policies and find 
                the best coverage at competitive rates for your specific needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Property Investment Focus</h3>
              <p className="text-gray-700 mb-4">
                Specialized in insurance solutions for property investors, landlords, 
                and business owners with property portfolios.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Ongoing Support</h3>
              <p className="text-gray-700">
                We provide ongoing support throughout your policy term, helping with 
                claims assistance and policy reviews as your needs change.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Investment?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get personalised insurance advice and competitive quotes tailored to your property 
            and business needs in Mackay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Insurance Quote
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
            <p>After Hours Property Management: 0407 440 222</p>
          </div>
        </div>
      </div>
    </div>
  )
}
