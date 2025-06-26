import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ClipboardCheck, Home, DollarSign, Users } from "lucide-react"

export default function PropertyManagementPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)] opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <div className="text-sm uppercase tracking-wider mb-4">PROPERTY MANAGEMENT</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Managing rental properties has never been simpler</h1>
              <p className="text-xl mb-8 text-white/90">
                Let Gardian Real Estate handle your investment properties with our comprehensive property management
                services. From tenant screening to maintenance coordination, we take care of everything.
              </p>
              <Link
                href="#get-started"
                className="inline-flex items-center bg-white text-primary-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Property manager working with client"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything you need to confidently manage your rental properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tenant screening</h3>
              <p className="text-gray-600">
                We thoroughly vet potential tenants with comprehensive background and credit checks to find reliable
                renters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <ClipboardCheck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lease management</h3>
              <p className="text-gray-600">
                Our team handles all aspects of lease agreements, from creation to renewals, ensuring legal compliance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Home className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Property maintenance</h3>
              <p className="text-gray-600">
                We coordinate all maintenance and repairs with trusted contractors to keep your property in excellent
                condition.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <DollarSign className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rent collection</h3>
              <p className="text-gray-600">
                Our efficient rent collection system ensures on-time payments and handles any late payment issues
                professionally.
              </p>
            </div>
          </div>

          {/* Lease Management Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Streamlined Lease Management</h2>
                <p className="text-gray-700 mb-4">
                  Our digital lease management system makes handling rental agreements effortless. Upload existing
                  leases or create new ones using our customizable templates.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Legally compliant lease templates for Queensland</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Electronic signing for faster processing</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automatic renewal reminders</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure document storage and access</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Digital lease management interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tenant Application Form Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Easy Tenant Application Process</h2>
                <p className="text-gray-700 mb-4">
                  Our streamlined tenant application system makes it simple for prospective tenants to apply for your
                  property. Receive high-quality applications with all the information you need to make informed
                  decisions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Online application forms with identity verification</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive background and credit checks</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Employment and income verification</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Previous rental history assessment</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Tenant application process"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Inspection Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
                <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Property inspection process"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Regular Property Inspections</h2>
                <p className="text-gray-700 mb-4">
                  We conduct thorough property inspections to ensure your investment is well-maintained and tenants are
                  complying with lease terms.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed entry and exit condition reports</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quarterly routine inspections</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive inspection reports with photos</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Proactive maintenance recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Property Management Fees</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2">Management Fee</h3>
                <p className="text-3xl font-bold text-primary-600 mb-4">
                  7.7%<span className="text-sm text-gray-500 font-normal"> of rent collected</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Rent collection and processing</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regular property inspections</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maintenance coordination</span>
                  </li>
                </ul>
              </div>

              <div className="border border-primary-300 rounded-xl p-6 shadow-md relative">
                <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Service Package</h3>
                <p className="text-3xl font-bold text-primary-600 mb-4">
                  8.8%<span className="text-sm text-gray-500 font-normal"> of rent collected</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All Management Fee services</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tenant placement & screening</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional photography</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Marketing & advertising</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2">Leasing Fee</h3>
                <p className="text-3xl font-bold text-primary-600 mb-4">
                  2 weeks<span className="text-sm text-gray-500 font-normal"> rent + GST</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tenant sourcing & screening</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Property marketing</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lease preparation</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-6">
              Additional services available. Contact us for a customized property management solution.
            </p>
          </div>

          {/* Get Started Section */}
          <div
            id="get-started"
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to simplify your property management?</h2>
              <p className="text-xl mb-8 text-white/90">
                Contact us today to discuss how we can help manage your investment properties.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-primary-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Get a management quote
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Speak to a property manager
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Property Owners Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "I've been using Gardian Real Estate's property management services for my investment properties for
                over three years now. Their team is responsive, thorough, and always has my best interests in mind."
              </p>
              <p className="font-semibold">Emma Wilson, Mount Pleasant</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "As an interstate investor, I rely heavily on my property manager to take care of my rental property.
                The team at Gardian Real Estate has been exceptional. They found great tenants and handle all
                maintenance issues efficiently."
              </p>
              <p className="font-semibold">Lisa Martinez, Eimeo</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "After switching to Gardian Real Estate from another property manager, I've noticed a significant
                improvement in communication and service quality. They're proactive about maintenance issues and finding
                quality tenants."
              </p>
              <p className="font-semibold">Michael Thompson, Andergrove</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What services do your property managers provide?</h3>
              <p className="text-gray-600">
                Our property management services include tenant screening, rent collection, property inspections,
                maintenance coordination, lease management, financial reporting, and handling tenant communications and
                concerns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How much does property management cost?</h3>
              <p className="text-gray-600">
                Our standard management fee is 7.7% of rent collected, with a leasing fee of two weeks' rent for new
                tenancies. We offer transparent pricing with no hidden fees. Contact us for a detailed quote based on
                your specific needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How do you handle maintenance issues?</h3>
              <p className="text-gray-600">
                We have a network of trusted contractors for all maintenance needs. For minor repairs (under $500), we
                handle them promptly without bothering you. For larger issues, we seek your approval before proceeding,
                providing quotes and recommendations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How often will I receive updates about my property?</h3>
              <p className="text-gray-600">
                We provide monthly financial statements and quarterly inspection reports. You'll also receive immediate
                notifications about significant events such as lease renewals, tenant changes, or major maintenance
                issues.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/faq" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View all FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
