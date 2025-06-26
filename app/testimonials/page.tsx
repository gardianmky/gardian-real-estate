import Link from "next/link"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  location: string
  text: string
  image?: string
  rating: number
  service: "buying" | "selling" | "renting" | "property-management"
  date: string
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Mackay",
      text: "Ben and the team at Gardian Real Estate made selling our family home a stress-free experience. Their market knowledge, professional approach, and constant communication exceeded our expectations. We achieved a sale price above what we anticipated, and the whole process was smooth from start to finish.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "selling",
      date: "March 2023",
    },
    {
      id: 2,
      name: "Michael Thompson",
      location: "Northern Beaches",
      text: "As first-time home buyers, we were nervous about the process, but Mick guided us every step of the way. His patience, expertise, and genuine care for our needs made all the difference. He found us the perfect property that met all our requirements and helped us negotiate a fair price. Highly recommend!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "buying",
      date: "January 2023",
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "Mount Pleasant",
      text: "I've been using Gardian Real Estate's property management services for my investment properties for over three years now. Their team is responsive, thorough, and always has my best interests in mind. Maintenance issues are addressed promptly, and I receive detailed reports regularly. It's a relief to know my properties are in good hands.",
      rating: 4,
      service: "property-management",
      date: "November 2022",
    },
    {
      id: 4,
      name: "David Chen",
      location: "Andergrove",
      text: "Ryan helped us find the perfect rental property when we relocated to Mackay for work. He understood our requirements and showed us properties that matched our needs and budget. The application process was straightforward, and we were approved quickly. Great service from start to finish.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "renting",
      date: "February 2023",
    },
    {
      id: 5,
      name: "Jessica Brown",
      location: "Slade Point",
      text: "Selling our investment property through Gardian Real Estate was a fantastic experience. Their marketing strategy attracted multiple interested buyers, and we received offers within the first week. The team's negotiation skills helped us secure a great price, and the settlement process was handled efficiently.",
      rating: 5,
      service: "selling",
      date: "April 2023",
    },
    {
      id: 6,
      name: "Robert Taylor",
      location: "Rural View",
      text: "After trying another agency with no success, we switched to Gardian Real Estate to sell our home. The difference was night and day. Their professional photography, quality marketing materials, and proactive approach resulted in a quick sale at a price we were happy with. Wish we had gone with them from the start!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "selling",
      date: "December 2022",
    },
    {
      id: 7,
      name: "Lisa Martinez",
      location: "Eimeo",
      text: "As an interstate investor, I rely heavily on my property manager to take care of my rental property. The team at Gardian Real Estate has been exceptional. They found great tenants, handle all maintenance issues efficiently, and provide comprehensive reports. I have peace of mind knowing my investment is being well-managed.",
      rating: 4,
      service: "property-management",
      date: "January 2023",
    },
    {
      id: 8,
      name: "James Wilson",
      location: "Mackay City",
      text: "Ben's knowledge of the commercial property market in Mackay is outstanding. He helped us find the perfect location for our new business and negotiated favorable lease terms. His understanding of our business needs and budget constraints made the process smooth and successful.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "buying",
      date: "March 2023",
    },
  ]

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  // Function to get service label
  const getServiceLabel = (service: Testimonial["service"]) => {
    const labels = {
      buying: "Buying",
      selling: "Selling",
      renting: "Renting",
      "property-management": "Property Management",
    }
    return labels[service]
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Client Testimonials</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Don't just take our word for it. Read what our clients have to say about their experiences working with
          Gardian Real Estate.
        </p>

        {/* Featured Testimonial */}
        <div className="bg-gradient-to-r from-primary-50 to-teal-50 p-8 rounded-xl border border-primary-100 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Featured Client"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">{renderStars(5)}</div>
              <p className="text-lg md:text-xl italic text-gray-700 mb-4">
                "Ben and the team at Gardian Real Estate made selling our family home a stress-free experience. Their
                market knowledge, professional approach, and constant communication exceeded our expectations. We
                achieved a sale price above what we anticipated, and the whole process was smooth from start to finish."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-gray-600">Mackay • Selling • March 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.slice(1).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                {testimonial.image ? (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-600">{testimonial.date}</span>
              </div>

              <p className="text-gray-700 mb-4">{testimonial.text}</p>

              <div className="text-sm text-primary-600 font-medium">
                Service: {getServiceLabel(testimonial.service)}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to experience our exceptional service?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, rent, or need property management services, our team is here to help
            you achieve your real estate goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Contact Us Today
            </Link>
            <Link
              href="/agents"
              className="bg-white text-primary-700 border border-primary-200 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors duration-300"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
