import Link from "next/link"

interface HomelandCTAProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  backgroundImage?: string
  className?: string
}

export default function HomelandCTA({
  title = "Find Your Dream Home",
  subtitle = "Your Perfect Property Awaits",
  description = "Discover exceptional properties with our expert real estate team. From luxury homes to investment opportunities, we help you find the perfect match.",
  primaryButtonText = "Browse Properties",
  primaryButtonHref = "/buy",
  secondaryButtonText = "Get Free Consultation",
  secondaryButtonHref = "/contact",
  backgroundImage = "/images/images.jpeg",
  className = ""
}: HomelandCTAProps) {
  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-85" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-teal-500 rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-400 rounded-full opacity-5 animate-bounce" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-teal-500 bg-opacity-20 backdrop-blur-sm text-teal-300 rounded-full text-sm font-medium mb-6 border border-teal-400 border-opacity-30">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
            </svg>
            {subtitle}
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title.split(' ').map((word, index) => (
              <span 
                key={index}
                className={index === title.split(' ').length - 1 ? 'text-teal-400' : ''}
              >
                {word}{' '}
              </span>
            ))}
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { number: "2,500+", label: "Properties Sold" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "15+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              {primaryButtonText}
            </Link>

            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center px-8 py-4 border-2 border-white border-opacity-50 text-white hover:bg-white hover:text-gray-900 font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {secondaryButtonText}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              No Hidden Fees
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Licensed Agents
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}