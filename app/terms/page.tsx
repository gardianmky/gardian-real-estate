import Link from "next/link"

export default function TermsOfServicePage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">
          Last updated: January 1, 2023
        </p>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-primary-600 mb-4">1. Introduction</h2>
          <p>
            Welcome to Gardian Real Estate. These Terms of Service ("Terms") govern your use of our website and services. 
            By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of the Terms, 
            you may not access our website or use our services.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">2. Definitions</h2>
          <p>
            Throughout these Terms, the following definitions apply:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>"Website"</strong> refers to Gardian Real Estate's website.</li>
            <li><strong>"Services"</strong> refers to the real estate services provided by Gardian Real Estate.</li>
            <li><strong>"User," "You," and "Your"</strong> refer to the individual accessing or using the Website or Services.</li>
            <li><strong>"We," "Us," and "Our"</strong> refer to Gardian Real Estate.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">3. Use of Our Website and Services</h2>
          <p>
            By using our Website and Services, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Use our Website and Services only for lawful purposes and in accordance with these Terms.</li>
            <li>Not use our Website or Services in any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>Not use our Website or Services to transmit or send unsolicited commercial communications.</li>
            <li>Not attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our Website or Services.</li>
            <li>Not use our Website or Services for any purpose that is unlawful or prohibited by these Terms.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, 
            and the design, selection, and arrangement thereof) are owned by Gardian Real Estate, its licensors, or other providers of such material and are protected by 
            Australian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <p>
            These Terms grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Website and Services for your personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website.
          </p>
          
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">5. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access our Website and Services and for any activities or actions under your password.
          </p>
          <p>
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            In no event shall Gardian Real Estate, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Your access to or use of or inability to access or use the Website or Services;</li>
            <li>Any conduct or content of any third party on the Website;</li>
            <li>Any content obtained from the Website; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">7. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Gardian Real Estate, its directors, employees, partners, agents, suppliers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Website or Services.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Queensland, Australia, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">9. Changes to These Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Website or Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Website or Services.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Gardian Real Estate<br />
            123 Real Estate Avenue<br />
            Mackay, QLD 4740<br />
            Australia<br />
            Phone: (07) 4957 7424<br />
            Email: legal@gardianrealestate.com.au
          </p>
        </div>
      </div>
  </div>
  )
}
