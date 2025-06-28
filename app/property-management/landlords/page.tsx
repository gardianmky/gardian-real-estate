import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LandlordForm } from '@/components/forms/landlord-form';

export const metadata: Metadata = {
  title: 'Landlord Services | Property Management | Gardian Real Estate',
  description: 'Comprehensive property management services for landlords in Mackay. Maximize your rental income with our expert property management team.',
  openGraph: {
    title: 'Landlord Services | Property Management | Gardian Real Estate',
    description: 'Expert property management services for landlords in Mackay. Let us handle your investment property.',
    type: 'website',
  },
};

export default function LandlordsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Property Management for Landlords
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Maximize your rental income and minimize stress with our comprehensive property management services in Mackay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Property Appraisal
              </a>
              <a
                href="tel:0407440222"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
              >
                Call: 0407 440 222
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Property Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding quality tenants to maintenance and rent collection, we handle every aspect of your investment property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Tenant Screening",
                description: "Comprehensive background checks, credit history, and employment verification to ensure quality tenants"
              },
              {
                icon: "💰",
                title: "Rent Collection",
                description: "Automated rent collection with direct deposit to your account. Late payment management included"
              },
              {
                icon: "🔧",
                title: "Maintenance & Repairs",
                description: "24/7 maintenance coordination with trusted local tradespeople. Emergency repairs handled promptly"
              },
              {
                icon: "📊",
                title: "Financial Reporting",
                description: "Monthly statements, annual tax summaries, and detailed expense tracking for your records"
              },
              {
                icon: "📋",
                title: "Property Inspections",
                description: "Regular property inspections with detailed reports and photos to protect your investment"
              },
              {
                icon: "⚖️",
                title: "Legal Compliance",
                description: "Stay compliant with all Queensland tenancy laws and regulations. We handle the paperwork"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Gardian Real Estate?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Local Market Expertise",
                    description: "Deep knowledge of Mackay rental market ensures optimal rental pricing and tenant placement"
                  },
                  {
                    title: "Proven Track Record",
                    description: "Years of successful property management with high tenant retention and minimal vacancy periods"
                  },
                  {
                    title: "Technology Driven",
                    description: "Modern property management software provides real-time updates and transparent communication"
                  },
                  {
                    title: "24/7 Support",
                    description: "After-hours emergency line ensures your property and tenants are always looked after"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-2 h-2 bg-teal-600 rounded-full mt-3 mr-4"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8">
                <Image
                  src="/placeholder.jpg"
                  alt="Property Management Services"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Fees */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Transparent Management Fees
              </h2>
              <p className="text-xl text-gray-600">
                No hidden costs or surprise fees. Simple, competitive pricing structure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Standard Management</h3>
                  <div className="text-4xl font-bold text-teal-600 mb-2">7.5%</div>
                  <div className="text-gray-600 mb-6">of rental income + GST</div>
                  <ul className="text-left space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Tenant finding & placement
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Rent collection & banking
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Maintenance coordination
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Regular inspections
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Monthly reporting
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-teal-600 text-white rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Premium Management</h3>
                  <div className="text-4xl font-bold mb-2">8.5%</div>
                  <div className="text-teal-100 mb-6">of rental income + GST</div>
                  <ul className="text-left space-y-3">
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      Everything in Standard, plus:
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      Bi-weekly inspections
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      Garden maintenance included
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      Priority maintenance response
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      Detailed market analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Form */}
      <LandlordForm />

      {/* Contact Information */}
      <div className="bg-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Call Us Today</h3>
              <p className="text-teal-100 mb-2">General Enquiries</p>
              <a href="tel:0749577424" className="text-xl font-semibold">07 4957 7424</a>
              <p className="text-teal-100 mt-4 mb-2">After Hours Property Management</p>
              <a href="tel:0407440222" className="text-xl font-semibold">0407 440 222</a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Visit Our Office</h3>
              <p className="text-teal-100">
                94 Victoria Street<br />
                Mackay QLD 4740
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Email Us</h3>
              <a href="mailto:info@gardianrealestate.com.au" className="text-teal-100 hover:text-white transition-colors">
                info@gardianrealestate.com.au
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
