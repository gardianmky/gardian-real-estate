import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TenantApplicationForm from '@/components/forms/tenant-application-form';

export const metadata: Metadata = {
  title: 'Tenant Services | Property Management | Gardian Real Estate',
  description: 'Find your perfect rental home in Mackay. Easy rental applications, maintenance requests, and tenant support services.',
  openGraph: {
    title: 'Tenant Services | Property Management | Gardian Real Estate',
    description: 'Find your perfect rental home in Mackay with Gardian Real Estate. Professional tenant services and support.',
    type: 'website',
  },
};

export default function TenantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Rental Home
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Discover quality rental properties in Mackay with professional tenant support and easy application process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/for-rent"
                className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Rental Properties
              </Link>
              <Link
                href="/property-management/tenants#reiq-application"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
              >
                Apply for Rental
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services for Tenants */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services for Tenants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to make your rental experience smooth and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Property Search",
                description: "Browse our extensive portfolio of quality rental properties in Mackay and surrounding areas"
              },
              {
                icon: "📋",
                title: "Easy Applications",
                description: "Streamlined online application process with quick approval turnaround times"
              },
              {
                icon: "🔧",
                title: "Maintenance Support",
                description: "24/7 maintenance request system with prompt response for urgent repairs"
              },
              {
                icon: "💬",
                title: "Tenant Portal",
                description: "Online portal to pay rent, submit maintenance requests, and communicate with property managers"
              },
              {
                icon: "📞",
                title: "After Hours Support",
                description: "Emergency contact line for urgent maintenance issues outside business hours"
              },
              {
                icon: "📄",
                title: "Lease Support",
                description: "Clear lease agreements and ongoing support throughout your tenancy"
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

      {/* Rental Process */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Easy Rental Process
              </h2>
              <p className="text-xl text-gray-600">
                From application to move-in, we've simplified every step
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Browse Properties",
                  description: "Search our available rental properties online or visit our office"
                },
                {
                  step: "2",
                  title: "Submit Application",
                  description: "Complete our online application form with required documents"
                },
                {
                  step: "3",
                  title: "Application Review",
                  description: "We'll review your application and contact you within 24-48 hours"
                },
                {
                  step: "4",
                  title: "Move In",
                  description: "Sign lease, pay bond and first rent, collect keys and move in!"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Requirements */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Application Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Prepare these documents to speed up your application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Required Documents</h3>
                <ul className="space-y-4">
                  {[
                    "Photo identification (Driver's License or Passport)",
                    "Proof of income (Payslips or Employment Contract)",
                    "Bank statements (Last 3 months)",
                    "Previous rental references (If applicable)",
                    "Pet documentation (If you have pets)"
                  ].map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-teal-600 mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-teal-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Application Tips</h3>
                <ul className="space-y-4">
                  {[
                    "Complete all sections of the application form",
                    "Provide accurate and honest information",
                    "Include contact details for references",
                    "Submit all required documents together",
                    "Be prompt in responding to requests"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-teal-600 mr-3 mt-1">💡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Rental Application Form */}
      <div id="reiq-application">
        <TenantApplicationForm />
      </div>

      {/* Maintenance Request Form */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Maintenance Request
              </h2>
              <p className="text-xl text-gray-600">
                Current tenants can submit maintenance requests here
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Property Address *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your rental property address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <select 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select priority level</option>
                    <option value="emergency">Emergency (safety/security issue)</option>
                    <option value="urgent">Urgent (within 24 hours)</option>
                    <option value="routine">Routine (within 1 week)</option>
                    <option value="non-urgent">Non-urgent (when convenient)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Description *
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Please describe the maintenance issue in detail, including location within the property and any relevant circumstances..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Best Time to Contact You
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Weekdays after 5pm, Weekends any time"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-4 px-8 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg"
                >
                  Submit Maintenance Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="text-teal-100 mb-2">General Enquiries</p>
              <a href="tel:0749577424" className="text-xl font-semibold">07 4957 7424</a>
              <p className="text-teal-100 mt-4 mb-2">After Hours Emergency</p>
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
