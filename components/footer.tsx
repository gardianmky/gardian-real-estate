import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <>
      {/* Service Cards Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
              Mackay QLD <span className="text-teal-600">Real Estate</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to buy, rent, or sell property in Mackay
              and surrounding suburbs, we have the expertise to help you
              succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Buy a Home */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-teal-600 transition-colors">
                Buy a home
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A real estate agent can provide you with a clear breakdown of
                costs so that you can avoid surprise expenses.
              </p>
              <a
                href="/buy"
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors group-hover:translate-x-1 transform duration-200"
              >
                Find a local agent
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Rent a Home */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-yellow-600 transition-colors">
                Rent a home
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're creating a seamless online experience – from shopping on
                the largest rental network, to applying, to paying rent.
              </p>
              <a
                href="/rent"
                className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700 transition-colors group-hover:translate-x-1 transform duration-200"
              >
                Find rentals
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Sell a Home */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-emerald-600 transition-colors">
                Sell a home
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                No matter what path you take to sell your home, we can help you
                navigate a successful sale.
              </p>
              <a
                href="/sell"
                className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group-hover:translate-x-1 transform duration-200"
              >
                See your options
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-white py-12 lg:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-6 lg:mb-8">
                <img
                  src="/images/gardian-logo.webp"
                  alt="Gardian Real Estate - Mackay's Best Real Estate"
                  className="h-16 lg:h-20 w-auto"
                />
              </div>
              <p className="text-gray-600 mb-6 max-w-xl text-sm lg:text-base leading-relaxed">
                Contact us today at{" "}
                <a
                  href="mailto:info@gardianrealestate.com.au"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  info@gardianrealestate.com.au
                </a>{" "}
                for a free consultation and discover how Gardian can become your
                trusted partner in building your real estate success story in
                Mackay.
              </p>

              {/* Enhanced Social Media Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/showcase/gardian-real-estate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-teal-600 hover:border-teal-300 hover:shadow-md transition-all duration-300 group"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/channel/UCfC4NysAKeLCb5uldUcoN-w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:shadow-md transition-all duration-300 group"
                    aria-label="Subscribe to our YouTube channel"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/gardianmackay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:shadow-md transition-all duration-300 group"
                    aria-label="Follow us on Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/gardiangroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-teal-600 hover:border-teal-300 hover:shadow-md transition-all duration-300 group"
                    aria-label="Like us on Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:pl-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm leading-tight">
                      For all enquiries and after hours:
                    </p>
                    <a
                      href="tel:0749577424"
                      className="text-gray-800 hover:text-teal-600 transition-colors font-medium text-sm lg:text-base"
                    >
                      07 4957 7424
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm leading-tight">
                      After hours property management:
                    </p>
                    <a
                      href="tel:0407440222"
                      className="text-gray-800 hover:text-teal-600 transition-colors font-medium text-sm lg:text-base"
                    >
                      0407 440 222
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm lg:text-base leading-tight">
                      94 Victoria Street
                      <br />
                      Mackay QLD 4740
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <a
                      href="mailto:info@gardianrealestate.com.au"
                      className="text-gray-800 hover:text-teal-600 transition-colors text-sm lg:text-base"
                    >
                      Send us an email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Call-to-Action & Quick Links */}
            <div className="lg:pl-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Ready to Sell?
              </h3>

              {/* Looking to Sell Button - Standardized */}
              <div className="mb-8">
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/appraisal-request">
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Looking to Sell?
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </Button>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Get a free property appraisal today
                </p>
              </div>

              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/testimonials"
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm lg:text-base"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm lg:text-base"
                  >
                    Careers
                  </a>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mt-8 mb-4 text-gray-800">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/insurance-privacy"
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm lg:text-base"
                  >
                    Insurance Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm lg:text-base"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/complaints"
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm lg:text-base"
                  >
                    Complaints
                  </a>
                </li>
                <li>
                  <a
                    href="/compliance"
                    className="text-gray-600 hover:text-teal-600 transition-colors text-sm lg:text-base"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Enhanced Copyright Section */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-gray-500 text-sm lg:text-base text-center lg:text-left">
                © {new Date().getFullYear()} Gardian Real Estate. All rights
                reserved.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                <span>🏡 Mackay's Trusted Real Estate Partner Since 2000</span>
                <span className="hidden sm:block">•</span>
                <span>📞 Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
