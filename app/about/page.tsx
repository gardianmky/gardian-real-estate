import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  TealGradientSection,
  TealGradientButton,
} from "@/components/ui/teal-gradient-section";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <TealGradientSection
        variant="hero"
        className="text-center text-white mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          About Gardian Real Estate
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          At Gardian, we care for and protect our people.
        </p>
      </TealGradientSection>

      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg mb-12">
        <div className="relative h-[400px] md:h-[500px] w-full mb-10 rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
          <div className="text-center text-teal-600">
            <div className="text-6xl md:text-7xl mb-4">🏢</div>
            <p className="text-lg md:text-xl font-medium mb-2">
              Gardian Real Estate Office
            </p>
            <p className="text-sm md:text-base opacity-75">
              94 Victoria Street, Mackay QLD 4740
            </p>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 mb-6">
            Who We Are
          </h2>
          <p>
            Gardian Real Estate is a full-service real estate agency located in
            Mackay, Queensland. At Gardian, we care for and protect our people.
            We bring together long-term business owner experience with an
            energetic marketing approach to deliver exceptional results for our
            clients.
          </p>

          <p>
            Our team of experienced professionals combines decades of industry
            expertise with access to 20+ Australian lenders, ensuring we can
            provide comprehensive solutions for all your property and financial
            needs.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 mt-10 mb-6">
            Our Commitment
          </h2>
          <p>
            We are committed to providing trustworthy, affordable financial
            advice and exceptional real estate services. Our approach is built
            on:
          </p>

          <ul className="list-disc pl-6 mb-6">
            <li>Caring for and protecting our clients' interests</li>
            <li>Long-term business owner experience and expertise</li>
            <li>Energetic and innovative marketing strategies</li>
            <li>Access to comprehensive financial solutions</li>
            <li>Trustworthy and affordable professional advice</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 mt-10 mb-6">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-10">
            <TealGradientSection variant="card" className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Protection</h3>
              <p className="opacity-90">
                We care for and protect our people, ensuring their interests are
                always at the forefront of everything we do.
              </p>
            </TealGradientSection>

            <TealGradientSection variant="card" className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="opacity-90">
                We provide trustworthy, affordable financial advice built on
                long-term business owner experience and expertise.
              </p>
            </TealGradientSection>

            <TealGradientSection variant="card" className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Energy</h3>
              <p className="opacity-90">
                Our energetic marketing approach and innovative strategies
                deliver exceptional results for our clients.
              </p>
            </TealGradientSection>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 mb-6">
            Our Comprehensive Services
          </h2>
          <p className="mb-8">
            Drawing on long-term experience as business owners, our team
            understands the pressures and opportunities involved in all aspects
            of property, finance, and insurance. We provide comprehensive
            solutions tailored to your specific needs:
          </p>

          {/* Commercial Real Estate Services */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-3">🏢</span>
              Commercial Real Estate
            </h3>
            <p className="text-gray-700 mb-4">
              Drawing on long-term experience as business owners, our commercial
              real estate team understand the pressures and opportunities
              involved in buying and leasing business premises.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Commercial land and property sales</li>
              <li>Commercial property management for owners</li>
              <li>Commercial property leasing to tenants</li>
            </ul>
          </div>

          {/* Residential Real Estate Services */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-3">🏠</span>
              Residential Real Estate
            </h3>
            <p className="text-gray-700 mb-4">
              Our specialist sales teams are here to help you with all areas of
              buying and selling property – going above and beyond through our
              fresh and energetic marketing style.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Residential land and property sales</li>
              <li>Residential land and property purchasing</li>
              <li>In room auctions</li>
            </ul>
          </div>

          {/* Property Management Services */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-3">🔧</span>
              Property Management
            </h3>
            <p className="text-gray-700 mb-4">
              We provide support and assistance to homeowners and tenants across
              all areas of property management, ensuring properties are both
              well maintained and providing a quality return.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Assisting with finding a property to rent and call home</li>
              <li>Managing your property assets</li>
              <li>Maintaining your property with qualified tradesmen</li>
              <li>Providing you with up-to-date policy information</li>
            </ul>
          </div>

          {/* Financial Services */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-3">💰</span>
              Financial Services
            </h3>
            <p className="text-gray-700 mb-4">
              As a long-established and respected financial services firm, with
              access to over 20 of Australia's leading lenders, we can compare
              hundreds of products to help you find the loan that's right for
              you, at no added cost to you.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Home and investment loans (purchase or refinancing)</li>
              <li>Debt consolidation</li>
              <li>Commercial finance</li>
              <li>Personal and car loans</li>
              <li>Equipment finance and leasing</li>
            </ul>
          </div>

          {/* Insurance Services */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-3">🛡️</span>
              Insurance Services
            </h3>
            <p className="text-gray-700 mb-4">
              We specialise in general/heavy industry insurance advice and
              covers to align with your needs. We have an experienced team of
              brokers to be "with you, at every step" in all facets of general
              insurance, some of which include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Business Insurance</li>
                <li>Cyber risk solutions</li>
                <li>
                  Financial lines - management liability, professional indemnity
                </li>
                <li>Public/Products liability</li>
                <li>Commercial motor</li>
              </ul>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Mining/Civil contractors</li>
                <li>Engineering/Construction</li>
                <li>Marine risks</li>
                <li>Personal lines - house, car, boat, caravan etc</li>
              </ul>
            </div>
          </div>

          {/* Financial Planning Services */}
          <div className="bg-teal-50 p-6 rounded-lg border border-teal-100 mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-3">📈</span>
              Financial Planning & Advisory
            </h3>
            <p className="text-gray-700 mb-4">
              Regardless of what you do or who you are, money will always play a
              significant role in your life. That's why it is so important to
              know how to properly manage your money. We believe all Australians
              should be able to access trustworthy and affordable financial
              advice.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Life and income protection insurance</li>
              <li>Superannuation advice and management</li>
              <li>Wealth and finance advisory services</li>
              <li>Cashflow and debt management strategies</li>
              <li>Managed funds and investments</li>
              <li>Estate planning advice</li>
            </ul>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 mt-12 mb-6">
            Visit Our Office
          </h2>

          <div className="bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-700">
                    94 Victoria Street, Mackay, QLD 4740
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Phone className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-700">(07) 4957 7424</p>
                  <p className="text-sm text-gray-600">
                    After Hours Management: 0407 440 222
                  </p>
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
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </p>
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
      <TealGradientSection className="text-center text-white py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Ready to Experience the Gardian Difference?
        </h2>
        <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
          At Gardian, we care for and protect our people. Whether you need real
          estate, financial services, or insurance solutions, our experienced
          team is here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <TealGradientButton
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 text-center font-semibold rounded-lg bg-white text-teal-600 hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            Contact Us Today
          </TealGradientButton>
          <TealGradientButton
            href="/for-sale"
            className="w-full sm:w-auto px-8 py-4 text-center font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            View Properties
          </TealGradientButton>
        </div>
      </TealGradientSection>
    </div>
  );
}
