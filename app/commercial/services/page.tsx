"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Building2, 
  Handshake, 
  TrendingUp, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Clock,
  Award
} from "lucide-react"

interface ServiceItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  color: string
}

interface CaseStudy {
  title: string
  property: string
  challenge: string
  solution: string
  result: string
  testimonial: string
  client: string
}

const services: ServiceItem[] = [
  {
    id: "sales",
    icon: <Building2 className="w-8 h-8" />,
    title: "Commercial Property Sales",
    description: "Expert guidance through commercial property transactions with deep market knowledge and strategic positioning to maximize your investment returns.",
    features: [
      "Office buildings and business centers",
      "Retail and hospitality properties",
      "Industrial and warehouse facilities",
      "Investment property portfolios",
      "Market analysis and valuation services"
    ],
    color: "from-teal-600 to-teal-500"
  },
  {
    id: "leasing",
    icon: <Handshake className="w-8 h-8" />,
    title: "Commercial Leasing Services",
    description: "Comprehensive leasing solutions for both tenants seeking the perfect space and landlords maximizing property potential.",
    features: [
      "Tenant representation and space sourcing",
      "Landlord leasing and marketing services",
      "Lease negotiation and documentation",
      "Market rent analysis and positioning",
      "Property presentation and staging"
    ],
    color: "from-blue-600 to-blue-500"
  },
  {
    id: "investment",
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Commercial Investment Advisory",
    description: "Strategic investment guidance backed by local market expertise and data-driven insights for informed commercial property decisions.",
    features: [
      "Investment property analysis",
      "Portfolio optimization strategies",
      "Market trend reporting and forecasts",
      "Due diligence support",
      "Exit strategy planning"
    ],
    color: "from-emerald-600 to-emerald-500"
  },
  {
    id: "management",
    icon: <Settings className="w-8 h-8" />,
    title: "Commercial Property Management",
    description: "Professional management services that protect your commercial investment while maximizing tenant satisfaction and property performance.",
    features: [
      "Building maintenance and operations",
      "Tenant relations and lease administration",
      "Financial reporting and budgeting",
      "Compliance and safety management",
      "Capital improvement planning"
    ],
    color: "from-purple-600 to-purple-500"
  },
  {
    id: "development",
    icon: <MapPin className="w-8 h-8" />,
    title: "Development & Site Selection",
    description: "Specialized support for commercial development projects from initial site selection through to completion and leasing.",
    features: [
      "Site identification and feasibility analysis",
      "Zoning and planning consultation",
      "Development project coordination",
      "Pre-leasing and marketing strategies",
      "Project timeline management"
    ],
    color: "from-orange-600 to-orange-500"
  }
]

const benefits = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "Local Market Expertise",
    description: "With over 20 years in the Mackay market, we understand local commercial property trends, zoning regulations, and business community needs."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Comprehensive Service Range",
    description: "From initial consultation to transaction completion and ongoing management, we provide end-to-end commercial real estate solutions."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Strategic Network",
    description: "Our established relationships with local businesses, developers, and industry professionals ensure optimal outcomes for every commercial transaction."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Technology-Driven Approach",
    description: "Advanced market analytics, digital marketing platforms, and streamlined processes deliver results efficiently and transparently."
  }
]

const caseStudies: CaseStudy[] = [
  {
    title: "CBD Office Building Sale",
    property: "1,200m² office building, Mackay CBD",
    challenge: "Aging building requiring strategic positioning",
    solution: "Comprehensive renovation recommendations and targeted marketing to owner-occupiers",
    result: "Sold 15% above initial asking price within 60 days",
    testimonial: "Gardian's market knowledge and strategic approach exceeded our expectations. The sale process was smooth and the result outstanding.",
    client: "Property Developer, Mackay"
  },
  {
    title: "Industrial Warehouse Leasing",
    property: "2,500m² warehouse facility with office component",
    challenge: "Niche property requiring specialized tenant",
    solution: "Targeted marketing to logistics and manufacturing sectors",
    result: "Secured 5-year lease at premium market rate",
    testimonial: "The Gardian team understood our property's unique features and found the perfect tenant. Professional service from start to finish.",
    client: "Industrial Property Owner"
  },
  {
    title: "Retail Portfolio Management",
    property: "8 retail properties across Mackay region",
    challenge: "Declining occupancy and maintenance issues",
    solution: "Comprehensive management strategy including tenant retention, strategic improvements, and lease restructuring",
    result: "Increased occupancy from 70% to 95% within 12 months, 20% increase in rental income",
    testimonial: "Gardian transformed our portfolio performance. Their proactive management approach has significantly improved our returns.",
    client: "Investment Fund Manager"
  }
]

const faqs = [
  {
    question: "What types of commercial properties does Gardian handle?",
    answer: "We handle all commercial property types including office buildings, retail spaces, industrial facilities, warehouses, hospitality properties, and mixed-use developments across Mackay and the wider region."
  },
  {
    question: "How long does a typical commercial property sale take?",
    answer: "Commercial sales typically take 60-120 days depending on property type, market conditions, and financing requirements. We provide realistic timelines during our initial consultation."
  },
  {
    question: "Do you provide commercial property valuations?",
    answer: "Yes, we can arrange professional valuations through certified commercial valuers and provide comprehensive market analysis to support your property decisions."
  },
  {
    question: "Can you help with commercial property financing?",
    answer: "While we don't provide financing directly, we have strong relationships with commercial lenders and can connect you with appropriate financing partners."
  },
  {
    question: "What areas do you service for commercial properties?",
    answer: "We service Mackay CBD, surrounding industrial areas, and the broader Mackay region including Sarina, Proserpine, and Bowen for commercial property transactions."
  },
  {
    question: "Do you handle commercial property development projects?",
    answer: "Yes, we provide development consulting services including site selection, feasibility analysis, planning consultation, and pre-leasing services for commercial developments."
  }
]

export default function CommercialServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    propertyType: '',
    serviceNeeded: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'Commercial Services Inquiry'
        }),
      })

      if (response.ok) {
        setFormStatus("success")
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          propertyType: '',
          serviceNeeded: '',
          message: ''
        })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)] opacity-70"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <div className="text-sm uppercase tracking-wider mb-4 text-teal-200">COMMERCIAL SERVICES</div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Commercial Real Estate Excellence in Mackay
              </h1>
              <p className="text-xl mb-8 text-white/90">
                From office buildings to industrial complexes, Gardian Real Estate delivers comprehensive 
                commercial property solutions tailored for business success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#consultation"
                  className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-700 transition-colors duration-300"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-[300px] lg:h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Commercial building in Mackay CBD"
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

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Comprehensive Commercial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expert team provides end-to-end commercial real estate solutions 
              designed to maximize your property investment potential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Why Choose Gardian for Commercial Real Estate?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-teal-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <div className="text-teal-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Transparent Commercial Fees
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear, competitive pricing with no hidden costs. All fees are negotiable based on 
              property value, transaction complexity, and client relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Sales Transactions</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Commercial sales: 2.5% + GST</li>
                <li>• Investment sales: 2.0% + GST</li>
                <li>• Portfolio transactions: Custom structure</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Leasing Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tenant representation: No fee to tenant</li>
                <li>• Landlord leasing: 15% of first year's rent</li>
                <li>• Lease renewals: 5% of annual rental</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Management</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Management fee: 7.7% of rental income</li>
                <li>• Includes inspections & reporting</li>
                <li>• Additional services quoted separately</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Advisory Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Consultation: $250/hour + GST</li>
                <li>• Market reports: $500-$1,500</li>
                <li>• Development consulting: Custom pricing</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">
              All fees are negotiable based on property value, transaction complexity, and client relationship. 
              Contact us for a personalised quote.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Recent Commercial Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{study.title}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Property:</span>
                    <p className="text-gray-600">{study.property}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Challenge:</span>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Solution:</span>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Result:</span>
                    <p className="text-gray-600 font-medium">{study.result}</p>
                  </div>
                </div>
                <blockquote className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-teal-600">
                  <p className="text-sm text-gray-600 italic">"{study.testimonial}"</p>
                  <cite className="text-xs text-gray-500 not-italic">- {study.client}</cite>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-4 px-0 text-left flex justify-between items-center hover:text-teal-600 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <ArrowRight 
                    className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-90' : ''}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="consultation" className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Discuss Your Commercial Property Needs?
              </h2>
              <p className="text-xl text-teal-100">
                Schedule a consultation with our commercial specialists today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 mt-1 text-teal-200" />
                    <div>
                      <p className="font-medium">Commercial Sales & Investment</p>
                      <p className="text-teal-100">(07) 4944 0000</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 mt-1 text-teal-200" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-teal-100">commercial@gardian.com.au</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 mt-1 text-teal-200" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-teal-100">94 Victoria Street, Mackay QLD 4740</p>
                      <p className="text-teal-100 text-sm">Mon-Fri 8:30am-5:30pm, Sat 9:00am-2:00pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="" className="text-gray-800">Property Type</option>
                      <option value="office" className="text-gray-800">Office Building</option>
                      <option value="retail" className="text-gray-800">Retail Space</option>
                      <option value="industrial" className="text-gray-800">Industrial Property</option>
                      <option value="warehouse" className="text-gray-800">Warehouse</option>
                      <option value="mixed-use" className="text-gray-800">Mixed Use</option>
                      <option value="other" className="text-gray-800">Other</option>
                    </select>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="" className="text-gray-800">Service Needed</option>
                      <option value="sales" className="text-gray-800">Commercial Sales</option>
                      <option value="leasing" className="text-gray-800">Commercial Leasing</option>
                      <option value="management" className="text-gray-800">Property Management</option>
                      <option value="investment" className="text-gray-800">Investment Advisory</option>
                      <option value="development" className="text-gray-800">Development Services</option>
                    </select>
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your commercial property needs..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Schedule Consultation"}
                  </button>
                  {formStatus === "success" && (
                    <p className="text-center text-green-200">Thank you! We'll contact you within 24 hours.</p>
                  )}
                  {formStatus === "error" && (
                    <p className="text-center text-red-200">There was an error sending your message. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Listings CTA */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            View Current Commercial Listings
          </h3>
          <p className="text-gray-600 mb-6">
            Browse our current portfolio of commercial properties available for sale and lease.
          </p>
          <Link
            href="/commercial"
            className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-300"
          >
            View Listings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
