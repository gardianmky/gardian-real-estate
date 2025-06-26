import Link from "next/link"

export default function CompliancePage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Compliance</h1>

        <div className="prose max-w-none">
          <p className="text-gray-600 mb-8">
            At Gardian Real Estate, we are committed to maintaining the highest standards of professional conduct and
            compliance with all relevant laws, regulations, and industry codes of practice.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mb-4">Regulatory Framework</h2>
          <p>
            As a licensed real estate agency operating in Queensland, we comply with the following key legislation and
            regulations:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Property Occupations Act 2014 (Qld)</li>
            <li>Property Occupations Regulation 2014 (Qld)</li>
            <li>Residential Tenancies and Rooming Accommodation Act 2008 (Qld)</li>
            <li>Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth)</li>
            <li>Australian Consumer Law</li>
            <li>Privacy Act 1988 (Cth)</li>
            <li>Fair Work Act 2009 (Cth)</li>
            <li>Work Health and Safety Act 2011 (Qld)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Licensing</h2>
          <p>
            All our real estate agents and property managers hold the appropriate licenses and registrations as required
            by the Property Occupations Act 2014 (Qld). Our agency holds a current Real Estate Agent License issued by
            the Queensland Office of Fair Trading.
          </p>
          <p>License details:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Agency License Number: 12345678</li>
            <li>Principal Licensee: Ben Kerrisk</li>
            <li>License Expiry: December 31, 2023</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Professional Memberships</h2>
          <p>
            Gardian Real Estate is a proud member of the Real Estate Institute of Queensland (REIQ) and adheres to their
            Code of Conduct. Our membership demonstrates our commitment to professional standards, ongoing education,
            and ethical business practices.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Anti-Money Laundering Compliance</h2>
          <p>
            We have implemented a comprehensive Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) program
            in accordance with our obligations under the AML/CTF Act. This includes:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Customer due diligence procedures</li>
            <li>Ongoing customer due diligence</li>
            <li>Suspicious matter reporting</li>
            <li>Record-keeping obligations</li>
            <li>Staff training and awareness</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Privacy Compliance</h2>
          <p>
            We respect your privacy and are committed to protecting your personal information. Our Privacy Policy
            outlines how we collect, use, disclose, and safeguard your information in accordance with the Privacy Act
            1988 (Cth) and the Australian Privacy Principles.
          </p>
          <p>
            For more information, please refer to our{" "}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-800">
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Trust Account Management</h2>
          <p>
            We maintain trust accounts in accordance with the Property Occupations Act 2014 (Qld) and Property
            Occupations Regulation 2014 (Qld). Our trust accounts are:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Regularly reconciled</li>
            <li>Subject to annual external audits</li>
            <li>Managed by qualified staff</li>
            <li>Protected by appropriate internal controls</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Complaints Handling</h2>
          <p>
            We have established a formal complaints handling procedure to address any concerns or issues raised by our
            clients. Our process is designed to ensure that complaints are handled fairly, efficiently, and in
            accordance with regulatory requirements.
          </p>
          <p>
            For more information, please refer to our{" "}
            <Link href="/complaints" className="text-primary-600 hover:text-primary-800">
              Complaints Procedure
            </Link>
            .
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Professional Development</h2>
          <p>
            We are committed to ongoing professional development and training for all our staff. This ensures that our
            team remains up-to-date with:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Changes in legislation and regulations</li>
            <li>Industry best practices</li>
            <li>Technological advancements</li>
            <li>Market trends and conditions</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our compliance with legal and regulatory requirements,
            please contact our Compliance Officer:
          </p>
          <p>
            Email: compliance@gardianrealestate.com.au
            <br />
            Phone: (07) 4957 7424
          </p>
        </div>
      </div>
    </div>
  )
}
