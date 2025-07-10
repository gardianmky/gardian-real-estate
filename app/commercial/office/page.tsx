import Link from "next/link";

export default function CommercialOfficePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Gardian Style */}
      <div className="bg-teal-600 text-white py-2 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trusted Commercial Real Estate Partners
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Icon */}
          <div className="text-6xl mb-6">🏢</div>
          
          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Commercial Office Listings
          </h1>
          
          {/* Coming Soon Message */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our commercial office listings are currently being updated. 
              We'll have premium office spaces available for lease and sale very soon.
            </p>
            
            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Prime Locations</h3>
                <p className="text-sm text-gray-600">CBD and strategic business districts</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Modern Facilities</h3>
                <p className="text-sm text-gray-600">State-of-the-art office buildings</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Flexible Terms</h3>
                <p className="text-sm text-gray-600">Lease and purchase options available</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Looking for Office Space Now?
            </h3>
            <p className="text-lg mb-6 text-teal-100">
              Our commercial team can help you find the perfect office space for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Our Team
              </Link>
              <Link
                href="/commercial"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
              >
                View All Commercial
              </Link>
            </div>
          </div>

          {/* Notification Signup */}
          <div className="bg-white rounded-lg shadow p-6 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Get Notified When Office Listings Are Available
            </h3>
            <p className="text-gray-600 mb-4">
              Be the first to know when new commercial office spaces become available in Mackay.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5l-5-5h5v-12" />
              </svg>
              Request Notification
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link
              href="/commercial/retail"
              className="p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">🏬</div>
              <div className="font-medium text-gray-800">Retail</div>
            </Link>
            <Link
              href="/commercial/storage"
              className="p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">🏭</div>
              <div className="font-medium text-gray-800">Storage</div>
            </Link>
            <Link
              href="/commercial/land"
              className="p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">🏞️</div>
              <div className="font-medium text-gray-800">Land</div>
            </Link>
            <Link
              href="/commercial/investment"
              className="p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">📈</div>
              <div className="font-medium text-gray-800">Investment</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}