"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const faqItems: FAQItem[] = [
    {
      question: "How do I schedule a property viewing?",
      answer:
        "You can schedule a property viewing by contacting our office directly at (07) 4957 7424, using the contact form on our website, or by reaching out to the specific agent listed on the property details page. We're flexible with viewing times and can often accommodate same-day requests. For after-hours emergencies, call 0407 440 222.",
      category: "buying",
    },
    {
      question: "What documents do I need when applying for a rental property?",
      answer:
        "When applying for a rental property, you'll need proof of identity (driver's license or passport), proof of income (recent pay slips or employment contract), rental history references, and personal references. At Gardian, we use the official REIQ (Real Estate Institute of Queensland) application form to ensure compliance with all legal requirements and make the process as smooth as possible for you.",
      category: "renting",
    },
    {
      question: "How much deposit do I need to buy a property?",
      answer:
        "The deposit amount varies depending on the property price and your financial situation. Generally, most lenders require a minimum deposit of 5-20% of the property's purchase price. As part of our comprehensive services, Gardian Real Estate can connect you with our trusted finance partners who can help you understand your specific borrowing capacity and deposit requirements.",
      category: "buying",
    },
    {
      question: "What fees are involved in selling my property?",
      answer:
        "At Gardian, we believe in transparent pricing. The main fees involved in selling your property include agent commission, marketing costs, professional photography, and potentially staging costs. During our initial consultation, we'll provide a detailed breakdown of all costs specific to your property with no hidden fees - what we quote is what you pay.",
      category: "selling",
    },
    {
      question: "How long does the rental application process take?",
      answer:
        "At Gardian, we understand that finding the right rental property is important. The rental application process typically takes 24-48 hours once we have received all required documentation through the REIQ application form. This includes time for us to verify references and for the property owner to review your application. We'll keep you informed throughout the process and let you know the outcome as soon as possible.",
      category: "renting",
    },
    {
      question: "What's the difference between a building and pest inspection?",
      answer:
        "A building inspection assesses the structural integrity of the property, identifying issues like cracks, dampness, or roof problems. A pest inspection specifically looks for evidence of termites and other wood-destroying pests. While they're different inspections, they're often conducted together before purchasing a property. At Gardian, we can recommend trusted, licensed inspectors to ensure you make an informed decision.",
      category: "buying",
    },
    {
      question: "How do you determine the value of my property?",
      answer:
        "At Gardian, we determine your property's value through a comprehensive market analysis that considers recent comparable sales in your area, your property's unique features and condition, current market trends, and buyer demand. Our experienced agents use their deep local knowledge of the Mackay market to provide you with an accurate, detailed valuation report explaining our assessment.",
      category: "selling",
    },
    {
      question: "What happens if there are maintenance issues during my tenancy?",
      answer:
        "At Gardian, we care for and protect our people. If you encounter maintenance issues during your tenancy, report them promptly through our online maintenance request system or by calling our property management team at (07) 4957 7424. Emergency repairs will be addressed immediately, while non-urgent matters will be scheduled within a reasonable timeframe after obtaining owner approval and arranging suitable access times. For after-hours emergencies, call 0407 440 222.",
      category: "renting",
    },
    {
      question: "How long will it take to sell my property?",
      answer:
        "The time it takes to sell a property varies depending on market conditions, property type, location, price point, and marketing strategy. With our energetic marketing approach and deep knowledge of the Mackay market, properties typically sell within 30-90 days, but we'll provide a more specific estimate based on your property's unique characteristics during our initial consultation.",
      category: "selling",
    },
    {
      question: "What areas do you service?",
      answer:
        "Gardian Real Estate services Mackay and all surrounding suburbs, including Northern Beaches, Andergrove, Mount Pleasant, Glenella, Rural View, Slade Point, Eimeo, Bucasia, Shoal Point, Blacks Beach, Richmond, Beaconsfield, Ooralea, South Mackay, East Mackay, West Mackay, North Mackay, and Sarina.",
      category: "general",
    },
    {
      question: "What are your property management fees?",
      answer:
        "Our standard property management fee is 7.7% of rent collected, with a leasing fee of two weeks' rent for new tenancies. We provide transparent pricing with no hidden fees - contact us for a detailed quote based on your specific needs.",
      category: "renting",
    },
    {
      question: "Do you offer commercial property services?",
      answer:
        "Yes, we provide comprehensive commercial real estate services including sales, leasing, investment analysis, property management, and commercial appraisals. Our experienced commercial team specializes in office spaces, retail properties, industrial facilities, and storage solutions throughout the Mackay region.",
      category: "general",
    },
    {
      question: "How do I get a property appraisal?",
      answer:
        "You can request a property appraisal by contacting our office at (07) 4957 7424, using our online appraisal request form, or booking an appointment through our website. At Gardian, we provide complimentary market appraisals for residential properties and competitive pricing for commercial property valuations. Our experienced agents will visit your property and provide you with a comprehensive market analysis.",
      category: "selling",
    },
  ]

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "buying", label: "Buying" },
    { id: "selling", label: "Selling" },
    { id: "renting", label: "Renting" },
    { id: "general", label: "General" },
  ]

  const filteredFAQs = activeCategory === "all" ? faqItems : faqItems.filter((item) => item.category === activeCategory)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Find answers to common questions about buying, selling, and renting properties with Gardian Real Estate. If
          you can't find the answer you're looking for, please don't hesitate to contact us.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-teal-600" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {activeIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-700 mb-4">
            If you couldn't find the answer to your question, please feel free to contact us directly.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
