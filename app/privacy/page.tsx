import Link from "next/link"

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: January 1, 2023</p>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-primary-600 mb-4">Introduction</h2>
          <p>
            Gardian Real Estate ("we," "our," or "us") respects your privacy and is committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access the site or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Register on our website</li>
            <li>Express interest in obtaining information about our services</li>
            <li>Participate in activities on our website</li>
            <li>Contact us</li>
          </ul>

          <p>The personal information we collect may include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name, email address, phone number, and mailing address</li>
            <li>Financial information for transactions</li>
            <li>Demographic information</li>
            <li>Other information relevant to customer surveys and/or offers</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">How We Use Your Information</h2>
          <p>We may use the information we collect from you for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website and services</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you about our services, updates, and other information</li>
            <li>Process transactions and send related information</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Disclosure of Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your information in connection with a
              merger, acquisition, or sale of all or a portion of our assets.
            </li>
            <li>
              <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will
              require those affiliates to honor this Privacy Policy.
            </li>
            <li>
              <strong>With Business Partners:</strong> We may share your information with our business partners to offer
              you certain products, services, or promotions.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
              your consent.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do
              so.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to protect your personal information. While
            we have taken reasonable steps to secure the personal information you provide to us, please be aware that no
            security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against
            any interception or other type of misuse.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Your Privacy Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to access personal information we hold about you</li>
            <li>The right to request correction of your personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
            Email: privacy@gardianrealestate.com.au
          </p>
        </div>
      </div>
    </div>
  )
}
