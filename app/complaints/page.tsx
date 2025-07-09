"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Send } from "lucide-react"

export default function ComplaintsPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")

    try {
      const formData = new FormData(e.currentTarget)
      const formPayload = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        complainantType: formData.get('complainantType'),
        propertyAgent: formData.get('propertyAgent'),
        incidentDate: formData.get('incidentDate'),
        complaintDetails: formData.get('complaintDetails'),
        desiredResolution: formData.get('desiredResolution'),
        attemptedResolution: formData.get('attemptedResolution'),
        urgency: formData.get('urgency'),
        timestamp: new Date().toISOString(),
        source: 'Gardian Real Estate Website'
      }

      const response = await fetch('/api/contact/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`)
      }

      setFormStatus("success")
      // Reset form on success
      e.currentTarget.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus("error")
    }
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Complaints Procedure</h1>

        <div className="prose max-w-none mb-8">
          <p className="text-gray-600 mb-6">
            At Gardian Real Estate, we are committed to providing exceptional service to all our clients. However, we
            recognize that sometimes things may not go as planned. If you have a concern or complaint about our
            services, we want to hear from you so we can address the issue and improve our service.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Complaints Process</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Step 1: Initial Contact</h3>
              <p className="text-gray-700">
                In the first instance, please discuss your concerns with the staff member you have been dealing with.
                They will try to resolve your complaint immediately.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Step 2: Escalation</h3>
              <p className="text-gray-700">
                If you are not satisfied with the response, or if you prefer not to discuss the matter with the staff
                member involved, please contact our Office Manager at (07) 4957 7424 or email
                complaints@gardianrealestate.com.au.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Step 3: Formal Complaint</h3>
              <p className="text-gray-700">
                If your complaint cannot be resolved informally, we invite you to submit a formal complaint using the
                form below. We will acknowledge receipt of your complaint within 2 business days.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Step 4: Investigation</h3>
              <p className="text-gray-700">
                We will investigate your complaint thoroughly and aim to provide a full response within 14 days. If more
                time is needed, we will keep you informed of our progress.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Step 5: Resolution</h3>
              <p className="text-gray-700">
                Once we have completed our investigation, we will contact you with our findings and proposed resolution.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-teal-600 mb-4">External Resolution</h2>
          <p>
            If you are not satisfied with our response to your complaint, you may contact the following external bodies:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Queensland Office of Fair Trading</li>
            <li>Real Estate Institute of Queensland (REIQ)</li>
            <li>Queensland Civil and Administrative Tribunal (QCAT)</li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6">Formal Complaint Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700 mb-1">
                Type of Complaint*
              </label>
              <select
                id="complaintType"
                name="complaintType"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select a category</option>
                <option value="sales">Sales Service</option>
                <option value="rental">Property Management</option>
                <option value="staff">Staff Conduct</option>
                <option value="fees">Fees and Charges</option>
                <option value="marketing">Marketing and Advertising</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="complaintDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Complaint Details*
              </label>
              <textarea
                id="complaintDetails"
                name="complaintDetails"
                rows={6}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Please provide as much detail as possible about your complaint, including dates, names of staff involved, and any relevant documentation."
              ></textarea>
            </div>

            <div>
              <label htmlFor="desiredOutcome" className="block text-sm font-medium text-gray-700 mb-1">
                Desired Outcome
              </label>
              <textarea
                id="desiredOutcome"
                name="desiredOutcome"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="What would you like us to do to resolve your complaint?"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="inline-flex items-center bg-gradient-to-r from-teal-600 to-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70"
              >
                {formStatus === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Complaint
                  </>
                )}
              </button>
            </div>

            {formStatus === "success" && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
                Thank you for your complaint submission. We take all feedback seriously and will respond to you within 2
                business days.
              </div>
            )}

            {formStatus === "error" && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                There was an error submitting your complaint. Please try again later or contact us directly at (07) 4957
                7424.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
