import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import SecondaryNavigation from '@/components/secondary-navigation';
import QuickLinks from '@/components/quick-links';
import FeaturedPropertyShowcase from '@/components/featured-property-showcase';
import HeroSection from '@/components/hero-section';
import CategoryListings from '@/components/category-listings';
import StackedAgents from '@/components/stacked-agents';
import RealEstateOptions from '@/components/real-estate-options';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Gardian Real Estate</h1>

        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Gardian Real Estate Team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Story</h2>
          <p>
            Founded in 2005, Gardian Real Estate has established itself as a leading real estate agency in Mackay and
            surrounding areas. With a commitment to excellence and a deep understanding of the local market, we have
            helped thousands of clients achieve their property goals.
          </p>

          <p>
            Our team of experienced professionals brings together decades of combined experience in the real estate
            industry. We pride ourselves on our local knowledge, personalized service, and dedication to achieving the
            best outcomes for our clients.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Our Mission</h2>
          <p>
            At Gardian Real Estate, our mission is to provide exceptional real estate services that exceed our clients'
            expectations. We are committed to:
          </p>

          <ul className="list-disc pl-6 mb-6">
            <li>Delivering personalized service tailored to each client's unique needs</li>
            <li>Maintaining the highest standards of professionalism and integrity</li>
            <li>Leveraging our local market knowledge to achieve optimal results</li>
            <li>Embracing innovation and technology to enhance the client experience</li>
            <li>Contributing positively to the communities we serve</li>
          </ul>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Integrity</h3>
              <p className="text-gray-700">
                We conduct our business with honesty, transparency, and ethical practices, building trust with our
                clients and the community.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Excellence</h3>
              <p className="text-gray-700">
                We strive for excellence in everything we do, from customer service to marketing strategies and
                negotiation skills.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Community</h3>
              <p className="text-gray-700">
                We are committed to giving back to the community that supports us, through sponsorships, volunteering,
                and local initiatives.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Our Services</h2>
          <p>Gardian Real Estate offers a comprehensive range of real estate services, including:</p>

          <ul className="list-disc pl-6 mb-6">
            <li>Residential property sales</li>
            <li>Property management and rentals</li>
            <li>Commercial property sales and leasing</li>
            <li>Property appraisals and market analysis</li>
            <li>Investment property advice</li>
            <li>Marketing and advertising strategies</li>
          </ul>

          <h2 className="text-2xl font-semibold text-teal-600 mt-8 mb-4">Visit Our Office</h2>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-700">123 Real Estate Avenue, Mackay, QLD 4740</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Phone className="h-5 w-5 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-700">(07) 4957 7424</p>
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
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM - 12:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Office Location Map"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
