import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeLoanCTA() {
  return (
    <>
      {/* Home Loan CTA Section */}
      <section className="py-12 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                <h2 className="text-2xl font-bold mb-4">Gardian Finance Home Loans</h2>
                <p className="mb-4">
                  Our expertise spans various lending solutions including:
                </p>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  <li>Home loans for aspiring homeowners</li>
                  <li>Investment and commercial loans</li>
                  <li>Debt consolidation solutions</li>
                  <li>Personal and car loans</li>
                  <li>Equipment finance and leasing</li>
                </ul>
                <Link
                  href="/home-loans"
                  className="inline-flex items-center px-6 py-3 bg-white text-teal-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Home Loan Advice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="hidden md:block md:w-1/2 bg-[url('/images/finance-bg.jpg')] bg-cover bg-center">
                {/* Background image for larger screens */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

