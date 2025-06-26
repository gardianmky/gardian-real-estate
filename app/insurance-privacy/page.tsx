import Link from "next/link"

export default function InsurancePrivacyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Insurance Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: January 1, 2023</p>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-primary-600 mb-4">Introduction</h2>
          <p>
            This Insurance Privacy Policy explains how Gardian Real Estate ("we," "our," or "us") collects, uses,
            discloses, and safeguards your personal information specifically in relation to insurance services we may
            offer or recommend. This policy should be read in conjunction with our general Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">
            Information We Collect for Insurance Purposes
          </h2>
          <p>
            When you express interest in or apply for insurance services through us, we may collect additional personal
            information, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Health information</li>
            <li>Financial details</li>
            <li>Insurance history</li>
            <li>Claims history</li>
            <li>Property details</li>
            <li>Risk assessment information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">How We Use Your Insurance Information</h2>
          <p>We may use the information we collect for insurance purposes to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Assess your insurance needs</li>
            <li>Provide quotes and recommendations for insurance products</li>
            <li>Assist with insurance applications</li>
            <li>Help process insurance claims</li>
            <li>Communicate with insurance providers on your behalf</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">
            Disclosure of Your Insurance Information
          </h2>
          <p>We may share your insurance-related information with:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Insurance providers and underwriters</li>
            <li>Insurance brokers and agents</li>
            <li>Claims assessors and investigators</li>
            <li>Regulatory authorities</li>
            <li>Legal representatives (in the event of a claim or dispute)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Your Consent</h2>
          <p>
            We will obtain your explicit consent before collecting, using, or disclosing sensitive information for
            insurance purposes. You have the right to withdraw your consent at any time, though this may affect our
            ability to provide certain services.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Security of Your Insurance Information</h2>
          <p>We take additional precautions to protect sensitive insurance information, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Enhanced encryption for sensitive data</li>
            <li>Restricted access to authorized personnel only</li>
            <li>Regular security audits and assessments</li>
            <li>Secure disposal of information when no longer needed</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Retention of Insurance Information</h2>
          <p>
            We retain insurance-related information for as long as necessary to fulfill the purposes outlined in this
            policy, unless a longer retention period is required or permitted by law. This typically includes the
            duration of your insurance policy plus any applicable statutory retention periods.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">
            Your Rights Regarding Insurance Information
          </h2>
          <p>
            In addition to the rights outlined in our general Privacy Policy, you have specific rights regarding your
            insurance information:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to know what insurance information we hold about you</li>
            <li>The right to correct inaccurate insurance information</li>
            <li>The right to restrict processing of your insurance information in certain circumstances</li>
            <li>The right to object to automated decision-making related to insurance underwriting or claims</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">
            Changes to This Insurance Privacy Policy
          </h2>
          <p>
            We may update our Insurance Privacy Policy from time to time. We will notify you of any changes by posting
            the new policy on this page and updating the "Last updated" date. You are advised to review this policy
            periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Insurance Privacy Policy, please contact us at:</p>
          <p>
            Gardian Real Estate
            <br />
            123 Real Estate Avenue
            <br />
            Mackay, QLD 4740
            <br />
            Australia
            <br />
            Phone: (07) 4957 7424
            <br />
            Email: insurance-privacy@gardianrealestate.com.au
          </p>
        </div>
      </div>
    </div>
  )
}
