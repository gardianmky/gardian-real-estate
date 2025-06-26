import Link from "next/link";

export default function PropertyManagementCTA() {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-3/5 p-8 md:p-12 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Gardian Property Management</h2>
              </div>

              <p className="text-lg mb-6 text-primary-50">
                Maximize your rental income with professional property management services designed to protect your investment.
              </p>

              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {[
                  "Expert Tenant Screening",
                  "Guaranteed Rent Collection", 
                  "24/7 Maintenance Support",
                  "Detailed Monthly Reporting"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white bg-opacity-10 rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold">98%</div>
                  <div className="text-xs text-primary-100">Occupancy</div>
                </div>
                <div className="text-center border-x border-primary-400">
                  <div className="text-xl font-bold">500+</div>
                  <div className="text-xs text-primary-100">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">15+</div>
                  <div className="text-xs text-primary-100">Years</div>
                </div>
              </div>

              <Link
                href="https://www.gardian.com.au/en/property-management"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Free Consultation
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="hidden md:block md:w-2/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/images/property-management-bg.jpg')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800 to-transparent opacity-60"></div>
              </div>
              <div className="absolute bottom-[-3%] left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px] z-10">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-700">"Excellent service and great returns!"</p>
                <p className="text-xs text-gray-500">- Sarah M.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}