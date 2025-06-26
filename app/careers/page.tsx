"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, MapPin, Clock, DollarSign, Upload, Send } from "lucide-react"

interface JobListing {
  id: number
  title: string
  location: string
  type: "Full-time" | "Part-time" | "Contract"
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  postedDate: string
}

export default function CareersPage() {
  const [activeJobId, setActiveJobId] = useState<number | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)

  const jobListings: JobListing[] = [
    {
      id: 1,
      title: "Real Estate Sales Agent",
      location: "Mackay, QLD",
      type: "Full-time",
      salary: "Commission-based + Base Salary",
      description:
        "We're looking for an experienced and motivated Real Estate Sales Agent to join our growing team. In this role, you'll work with clients to list and sell properties, conduct property viewings, and negotiate sales.",
      responsibilities: [
        "Generate and follow up on leads to list and sell properties",
        "Conduct property viewings and open houses",
        "Negotiate sales and guide clients through the selling process",
        "Develop and implement effective marketing strategies for listings",
        "Maintain regular communication with clients throughout the sales process",
        "Stay up-to-date with market trends and property values in the Mackay region",
      ],
      requirements: [
        "Current real estate license or willingness to obtain one",
        "Proven sales experience, preferably in real estate",
        "Excellent communication and negotiation skills",
        "Strong work ethic and self-motivation",
        "Ability to work weekends and evenings as required",
        "Valid driver's license and reliable transportation",
      ],
      benefits: [
        "Competitive commission structure",
        "Base salary component",
        "Professional development opportunities",
        "Supportive team environment",
        "Modern office with latest technology",
        "Marketing support and lead generation",
      ],
      postedDate: "June 15, 2023",
    },
    {
      id: 2,
      title: "Property Manager",
      location: "Mackay, QLD",
      type: "Full-time",
      salary: "$60,000 - $75,000 per annum + super",
      description:
        "We are seeking an experienced Property Manager to oversee our growing portfolio of residential properties. The ideal candidate will have strong organizational skills, attention to detail, and excellent customer service abilities.",
      responsibilities: [
        "Manage a portfolio of residential properties",
        "Conduct regular property inspections",
        "Handle tenant inquiries, applications, and lease agreements",
        "Coordinate maintenance and repairs with contractors",
        "Resolve tenant issues and complaints",
        "Ensure compliance with relevant legislation and regulations",
        "Prepare detailed property condition reports",
      ],
      requirements: [
        "Current real estate license or registration certificate",
        "Minimum 2 years' experience in property management",
        "Strong knowledge of residential tenancy legislation",
        "Excellent organizational and time management skills",
        "Proficiency with property management software",
        "Customer service orientation with problem-solving abilities",
        "Valid driver's license",
      ],
      benefits: [
        "Competitive salary package",
        "Career advancement opportunities",
        "Professional development and training",
        "Supportive team environment",
        "Modern office facilities",
        "Employee recognition programs",
      ],
      postedDate: "July 2, 2023",
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      location: "Mackay, QLD",
      type: "Part-time",
      salary: "$30 - $35 per hour",
      description:
        "We're looking for a creative and data-driven Digital Marketing Specialist to enhance our online presence and support our property marketing efforts. This role will focus on social media management, content creation, and digital advertising campaigns.",
      responsibilities: [
        "Develop and implement digital marketing strategies for the agency and property listings",
        "Create engaging content for social media platforms and website",
        "Manage paid advertising campaigns across Google, Facebook, and Instagram",
        "Monitor and analyze campaign performance and provide regular reports",
        "Optimize website content for SEO",
        "Coordinate with photographers and videographers for property marketing materials",
      ],
      requirements: [
        "Proven experience in digital marketing, preferably in real estate or related industry",
        "Strong knowledge of social media platforms and digital advertising tools",
        "Experience with SEO, SEM, and Google Analytics",
        "Creative content creation skills",
        "Basic graphic design abilities (Canva, Adobe Creative Suite)",
        "Excellent written communication skills",
        "Relevant qualification in marketing or digital media",
      ],
      benefits: [
        "Flexible working hours",
        "Opportunity to grow into a full-time role",
        "Professional development allowance",
        "Modern office with latest technology",
        "Collaborative and innovative work environment",
        "Industry networking opportunities",
      ],
      postedDate: "July 10, 2023",
    },
  ]

  const handleApplyNow = (job: JobListing) => {
    setSelectedJob(job)
    setShowApplicationForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would submit the form data to a server
    alert("Thank you for your application! We will review it and contact you soon.")
    setShowApplicationForm(false)
    setSelectedJob(null)
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

      {showApplicationForm ? (
        <div className="bg-white p-8 rounded-xl shadow-md mb-10">
          <h1 className="text-3xl font-bold mb-6">Apply for: {selectedJob?.title}</h1>
          <button
            onClick={() => setShowApplicationForm(false)}
            className="mb-6 text-primary-600 hover:text-primary-800 underline"
          >
            ← Back to job listings
          </button>

          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Resume/CV*
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" required />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center bg-gradient-to-r from-primary-600 to-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Application
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="bg-white p-8 rounded-xl shadow-md mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Careers at Gardian Real Estate</h1>

            <div className="relative h-[300px] w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=1200"
                alt="Gardian Real Estate Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-primary-600 mb-4">Join Our Team</h2>
              <p>
                At Gardian Real Estate, we're always looking for talented, passionate individuals to join our team. We
                believe that our success is built on the strength of our people, and we're committed to creating a
                supportive, collaborative environment where everyone can thrive.
              </p>

              <p>
                Whether you're an experienced real estate professional or just starting your career, we offer
                opportunities for growth, development, and success. Our team enjoys competitive compensation, ongoing
                training, and a positive work culture that celebrates achievements and encourages innovation.
              </p>

              <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Why Work With Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-primary-700">Growth Opportunities</h3>
                  <p className="text-gray-700">
                    We invest in our team's professional development through training, mentoring, and advancement
                    opportunities.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-primary-700">Supportive Culture</h3>
                  <p className="text-gray-700">
                    Our collaborative environment encourages teamwork, knowledge sharing, and celebrating each other's
                    successes.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-primary-700">Work-Life Balance</h3>
                  <p className="text-gray-700">
                    We value the importance of balance and offer flexible arrangements to help our team thrive
                    professionally and personally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>

            {jobListings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  There are currently no open positions. Please check back later or send your resume to
                  careers@gardianrealestate.com.au for future opportunities.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {jobListings.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="p-6 bg-gray-50 cursor-pointer"
                      onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>Posted: {job.postedDate}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="mt-4 md:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApplyNow(job)
                          }}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                    {activeJobId === job.id && (
                      <div className="p-6 border-t border-gray-200">
                        <p className="text-gray-700 mb-6">{job.description}</p>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {job.responsibilities.map((item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {job.requirements.map((item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {job.benefits.map((item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
                          onClick={() => handleApplyNow(job)}
                        >
                          Apply for this position
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
