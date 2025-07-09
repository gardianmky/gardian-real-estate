import Link from "next/link"
import { TrendingUp, Shield, PiggyBank, Target, Users, CheckCircle, ArrowRight, Phone, Mail, Award } from "lucide-react"

export default function FinancialPlanningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Financial Planning & Wealth Advisory
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Build long-term wealth through strategic financial planning, superannuation optimization, 
              and smart property investment strategies tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:0749577424"
                className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-700 transition-colors duration-300"
              >
                Call (07) 4957 7424
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Financial Planning Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Wealth Building */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Wealth Building Strategies</h3>
              <p className="text-gray-600 mb-4">
                Develop personalized strategies to build long-term wealth through property investment, 
                diversified portfolios, and tax-effective structures.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Property investment strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Portfolio diversification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Tax optimization planning</span>
                </li>
              </ul>
            </div>

            {/* Superannuation */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <PiggyBank className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Superannuation Advice</h3>
              <p className="text-gray-600 mb-4">
                Maximize your retirement savings through strategic superannuation planning, 
                contribution strategies, and investment selection.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Contribution optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Investment option selection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Transition to retirement</span>
                </li>
              </ul>
            </div>

            {/* Life & Income Protection */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Life & Income Protection</h3>
              <p className="text-gray-600 mb-4">
                Protect your family's financial future with comprehensive life insurance, 
                income protection, and disability coverage solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Life insurance coverage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Income protection insurance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Total & permanent disability cover</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Retirement Planning</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive retirement planning to ensure you maintain your desired lifestyle 
                throughout your retirement years with financial security.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Retirement income strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Age pension optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Estate planning advice</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Family Financial Planning</h3>
              <p className="text-gray-600 mb-4">
                Tailored financial strategies for families, including education funding, 
                family protection, and intergenerational wealth transfer planning.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Education funding strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Family protection planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Intergenerational wealth transfer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Gardian */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Gardian for Financial Planning?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Trustworthy & Affordable Advice</h3>
              <p className="text-gray-700 mb-4">
                We provide honest, transparent financial advice with no hidden fees. 
                Our recommendations are always in your best interest, not ours.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Property & Finance Integration</h3>
              <p className="text-gray-700">
                Unique advantage of combining property expertise with financial planning, 
                creating comprehensive wealth strategies that leverage real estate investment.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Local Market Knowledge</h3>
              <p className="text-gray-700 mb-4">
                Deep understanding of the Mackay economy and local market conditions 
                helps tailor financial strategies to regional opportunities.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Long-term Relationships</h3>
              <p className="text-gray-700">
                We build long-term relationships with our clients, providing ongoing 
                support and regular reviews as your circumstances change.
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-100 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Financial Planning Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Discovery</h3>
              <p className="text-sm text-gray-600">
                Understand your goals, current financial situation, and risk tolerance
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Strategy</h3>
              <p className="text-sm text-gray-600">
                Develop personalized financial strategies aligned with your objectives
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Implementation</h3>
              <p className="text-sm text-gray-600">
                Execute the agreed strategy with ongoing support and guidance
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Review</h3>
              <p className="text-sm text-gray-600">
                Regular reviews and adjustments as your circumstances evolve
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Schedule a free consultation with our financial planning specialists. No obligation, 
            just honest advice about your financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Book Free Consultation
            </Link>
            <a
              href="tel:0749577424"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (07) 4957 7424
            </a>
          </div>
          
          <div className="mt-8 text-sm text-white/80">
            <p>Office Hours: Monday-Friday 9AM-5PM, Saturday 9AM-12PM</p>
            <p>Licensed financial advisors with comprehensive insurance and planning expertise</p>
          </div>
        </div>
      </div>
    </div>
  )
}
