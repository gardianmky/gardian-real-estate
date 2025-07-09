// Example: Before and After Teal Gradient Implementation

import { Button } from '@/components/ui/button';
import { TealGradientSection, TealGradientButton, TealGradientText } from '@/components/ui/teal-gradient-section';

// BEFORE: Basic placeholder section
function PlaceholderSection() {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Placeholder Title
      </h2>
      <p className="text-gray-600 mb-6">
        This is a placeholder section with basic styling. It lacks visual appeal and doesn't capture attention.
      </p>
      <button className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors">
        Basic Button
      </button>
    </div>
  );
}

// AFTER: Teal gradient enhanced section
function TealGradientEnhancedSection() {
  return (
    <TealGradientSection className="text-white">
      <h2 className="text-2xl font-bold mb-4">
        <TealGradientText>Premium Real Estate Services</TealGradientText>
      </h2>
      <p className="mb-6 opacity-90">
        Experience the difference with our modern, professional approach to real estate. 
        Our teal gradient design creates trust and visual appeal.
      </p>
      <TealGradientButton>
        Get Started Today
      </TealGradientButton>
    </TealGradientSection>
  );
}

// BEFORE: Basic hero section
function BasicHeroSection() {
  return (
    <div className="bg-blue-600 text-white p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-xl mb-8">Find your dream property today</p>
      <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
        Explore Properties
      </button>
    </div>
  );
}

// AFTER: Teal gradient hero section
function TealGradientHeroSection() {
  return (
    <TealGradientSection variant="hero" className="text-center text-white">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Gardian Real Estate
      </h1>
      <p className="text-xl mb-8 opacity-90">
        Discover premium properties with our expert guidance
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <TealGradientButton>
          Explore Properties
        </TealGradientButton>
        <Button variant="gradient" size="lg">
          Contact Agent
        </Button>
      </div>
    </TealGradientSection>
  );
}

// BEFORE: Basic feature cards
function BasicFeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-3">Buy Properties</h3>
        <p className="text-gray-600">Find your perfect home</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-3">Sell Properties</h3>
        <p className="text-gray-600">Get the best value</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-3">Property Management</h3>
        <p className="text-gray-600">Professional management</p>
      </div>
    </div>
  );
}

// AFTER: Teal gradient feature cards
function TealGradientFeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TealGradientSection variant="card" className="text-center">
        <div className="text-3xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold mb-3">Buy Properties</h3>
        <p className="opacity-90">Find your perfect home with expert guidance</p>
      </TealGradientSection>
      <TealGradientSection variant="card" className="text-center">
        <div className="text-3xl mb-4">💰</div>
        <h3 className="text-xl font-semibold mb-3">Sell Properties</h3>
        <p className="opacity-90">Get the best value for your investment</p>
      </TealGradientSection>
      <TealGradientSection variant="card" className="text-center">
        <div className="text-3xl mb-4">⚙️</div>
        <h3 className="text-xl font-semibold mb-3">Property Management</h3>
        <p className="opacity-90">Professional management services</p>
      </TealGradientSection>
    </div>
  );
}

// BEFORE: Basic call-to-action
function BasicCallToAction() {
  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="mb-6">Contact us today for a consultation</p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
        Contact Us
      </button>
    </div>
  );
}

// AFTER: Teal gradient call-to-action
function TealGradientCallToAction() {
  return (
    <TealGradientSection className="text-center text-white">
      <h2 className="text-2xl font-bold mb-4">
        Ready to Find Your Dream Property?
      </h2>
      <p className="mb-6 opacity-90">
        Contact our expert team today for a personalized consultation
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <TealGradientButton>
          Schedule Consultation
        </TealGradientButton>
        <Button variant="gradient" size="lg">
          View Properties
        </Button>
      </div>
    </TealGradientSection>
  );
}

// Demo component showing all comparisons
export default function BeforeAfterGradientDemo() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <TealGradientText>Before & After: Teal Gradient Implementation</TealGradientText>
        </h1>
        <p className="text-lg text-gray-600">
          See how teal gradients transform basic placeholder blocks into visually appealing sections
        </p>
      </div>

      {/* Section Example */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Basic Section Enhancement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600">❌ BEFORE: Placeholder</h3>
            <PlaceholderSection />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">✅ AFTER: Teal Gradient</h3>
            <TealGradientEnhancedSection />
          </div>
        </div>
      </div>

      {/* Hero Section Example */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Hero Section Enhancement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600">❌ BEFORE: Basic</h3>
            <BasicHeroSection />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">✅ AFTER: Gradient</h3>
            <TealGradientHeroSection />
          </div>
        </div>
      </div>

      {/* Feature Cards Example */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Feature Cards Enhancement</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600">❌ BEFORE: Basic Cards</h3>
            <BasicFeatureCards />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">✅ AFTER: Gradient Cards</h3>
            <TealGradientFeatureCards />
          </div>
        </div>
      </div>

      {/* Call to Action Example */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Call-to-Action Enhancement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600">❌ BEFORE: Basic CTA</h3>
            <BasicCallToAction />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">✅ AFTER: Gradient CTA</h3>
            <TealGradientCallToAction />
          </div>
        </div>
      </div>

      {/* Implementation Tips */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Implementation Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-600">✅ Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li>• Use fallback colors for older browsers</li>
              <li>• Include smooth hover transitions</li>
              <li>• Apply appropriate border-radius values</li>
              <li>• Ensure proper contrast for accessibility</li>
              <li>• Use semantic HTML structure</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-600">❌ Avoid</h3>
            <ul className="space-y-2 text-sm">
              <li>• Too many gradients on one page</li>
              <li>• Gradients without fallback colors</li>
              <li>• Poor contrast ratios</li>
              <li>• Jarring color combinations</li>
              <li>• Overuse of animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}