import { TealGradientExample } from '@/components/ui/teal-gradient-section';

export default function TealGradientDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Teal Gradient Components Demo
          </h1>
          <p className="text-lg text-gray-600">
            Showcasing visually appealing teal gradient CSS sections and components
          </p>
        </div>
        
        <TealGradientExample />
        
        {/* Additional CSS-only examples */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pure CSS Examples</h2>
          
          {/* Teal Gradient Border Example */}
          <div className="teal-gradient-border">
            <h3 className="text-xl font-semibold mb-2">Teal Gradient Border</h3>
            <p className="text-gray-700">
              This section demonstrates the teal gradient border effect with smooth hover transitions.
            </p>
          </div>
          
          {/* Navbar Example */}
          <div className="teal-gradient-navbar p-4">
            <div className="flex items-center justify-between text-white">
              <div className="text-xl font-bold">Gardian Real Estate</div>
              <nav className="space-x-6">
                <a href="#" className="hover:text-teal-100 transition-colors">Home</a>
                <a href="#" className="hover:text-teal-100 transition-colors">Properties</a>
                <a href="#" className="hover:text-teal-100 transition-colors">About</a>
                <a href="#" className="hover:text-teal-100 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
          
          {/* Large Feature Section */}
          <div className="teal-gradient-section text-white p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Experience Modern Real Estate
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Our teal gradient designs provide a modern, professional look that builds trust 
                and creates visual appeal across all your real estate marketing materials.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-2xl mb-2">🏠</div>
                  <h3 className="font-semibold mb-2">Premium Properties</h3>
                  <p className="text-sm opacity-80">Exclusive listings in prime locations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-semibold mb-2">Market Analysis</h3>
                  <p className="text-sm opacity-80">Data-driven insights and trends</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-2xl mb-2">🤝</div>
                  <h3 className="font-semibold mb-2">Expert Support</h3>
                  <p className="text-sm opacity-80">Professional guidance every step</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Button Showcase */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Gradient Button Variations</h3>
            <div className="flex flex-wrap gap-4">
              <button className="teal-gradient-button">
                Contact Agent
              </button>
              <button className="teal-gradient-button">
                Schedule Viewing
              </button>
              <button className="teal-gradient-button">
                Get Appraisal
              </button>
              <button className="teal-gradient-button">
                View Details
              </button>
            </div>
          </div>
          
          {/* Text Examples */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Gradient Text Examples</h3>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold teal-gradient-text">
                Premium Real Estate Services
              </h1>
              <h2 className="text-2xl font-semibold teal-gradient-text">
                Your Trusted Property Partner
              </h2>
              <p className="text-lg">
                Regular text with <span className="teal-gradient-text font-semibold">highlighted gradient text</span> for emphasis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}