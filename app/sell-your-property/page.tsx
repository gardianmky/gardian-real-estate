import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield, FileText, Zap, HelpCircle } from "lucide-react"

export default function SellYourPropertyPage() {
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
              <div className="text-sm uppercase tracking-wider mb-4">SELLING</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Selling your property has never been easier</h1>
              <p className="text-xl mb-8 text-white/90">
                List your property with Gardian Real Estate and experience a seamless selling process. From professional
                marketing to negotiating the best price, we handle everything with expertise.
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
                  alt="Happy homeowner selling property"
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
            Everything you need to successfully sell your property
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert market valuation</h3>
              <p className="text-gray-600">
                Get an accurate assessment of your property's value based on current market conditions and comparable
                sales.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional marketing</h3>
              <p className="text-gray-600">
                Showcase your property with professional photography, virtual tours, and targeted marketing campaigns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Negotiation expertise</h3>
              <p className="text-gray-600">
                Our experienced agents will negotiate on your behalf to secure the best possible price for your
                property.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <HelpCircle className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">End-to-end support</h3>
              <p className="text-gray-600">
                From listing to settlement, we guide you through every step of the selling process with expert advice.
              </p>
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Selling Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Property Evaluation</h3>
                <p className="text-gray-600">
                  We'll assess your property's value and discuss your selling goals to create a tailored strategy.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Marketing & Exposure</h3>
                <p className="text-gray-600">
                  Your property will be professionally photographed and marketed across multiple channels.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sale & Settlement</h3>
                <p className="text-gray-600">
                  We'll handle negotiations, paperwork, and guide you through to a successful settlement.
                </p>
              </div>
            </div>
          </div>

          {/* Get Started Section */}
          <div
            id="get-started"
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to sell your property?</h2>
              <p className="text-xl mb-8 text-white/90">
                Contact us today for a free, no-obligation property appraisal and consultation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-primary-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Request an appraisal
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Speak to an agent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Sellers Say</h2>

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
                "The team at Gardian Real Estate made selling our family home a stress-free experience. Their market
                knowledge and professional approach exceeded our expectations."
              </p>
              <p className="font-semibold">Sarah Johnson, Mackay</p>
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
                "After trying another agency with no success, we switched to Gardian Real Estate. Their marketing
                strategy attracted multiple buyers, and we received offers within the first week."
              </p>
              <p className="font-semibold">Robert Taylor, Rural View</p>
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
                "Selling our investment property through Gardian Real Estate was a fantastic experience. Their
                negotiation skills helped us secure a great price, and the settlement process was handled efficiently."
              </p>
              <p className="font-semibold">Jessica Brown, Slade Point</p>
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
              <h3 className="text-xl font-semibold mb-2">How much is my property worth?</h3>
              <p className="text-gray-600">
                Property values depend on various factors including location, size, condition, and current market
                trends. Our agents provide free property appraisals based on comprehensive market analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What costs are involved in selling my property?</h3>
              <p className="text-gray-600">
                The main costs include agent commission, marketing expenses, legal fees, and potentially capital gains
                tax. We provide a transparent breakdown of all costs during our initial consultation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long will it take to sell my property?</h3>
              <p className="text-gray-600">
                The timeframe varies depending on market conditions, property type, location, and pricing strategy. In
                the current Mackay market, properties typically sell within 30-90 days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Should I renovate before selling?</h3>
              <p className="text-gray-600">
                Minor improvements can increase your property's appeal, but major renovations may not always provide a
                good return on investment. Our agents can advise on cost-effective improvements specific to your
                property.
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
