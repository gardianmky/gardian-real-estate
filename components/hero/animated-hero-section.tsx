'use client';

import SearchBar from '@/components/search/search-bar';
import Link from "next/link";

export default function AnimatedHeroSection() {
  // Define keyframe animations as CSS-in-JS style objects
  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-8px) rotate(0.5deg); }
      50% { transform: translateY(-15px) rotate(0deg); }
      75% { transform: translateY(-8px) rotate(-0.5deg); }
    }
    
    @keyframes drift {
      0%, 100% { transform: translateX(0px) translateY(0px); }
      25% { transform: translateX(15px) translateY(-8px); }
      50% { transform: translateX(25px) translateY(-12px); }
      75% { transform: translateX(12px) translateY(-6px); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0.05; transform: scale(1); }
      50% { opacity: 0.15; transform: scale(1.1); }
    }
    
    @keyframes wave {
      0%, 100% { transform: translateX(0px) scaleX(1); }
      50% { transform: translateX(10px) scaleX(1.02); }
    }
    
    @keyframes shimmer {
      0%, 100% { opacity: 0.05; transform: translateX(-50px); }
      50% { opacity: 0.15; transform: translateX(50px); }
    }
    
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.02; }
      50% { transform: scale(1.005); opacity: 0.05; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes fadeInScale {
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(10px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 2px rgba(12, 100, 115, 0.1); }
      50% { text-shadow: 0 0 8px rgba(12, 100, 115, 0.15), 0 0 12px rgba(245, 130, 32, 0.05); }
    }
    
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 10px rgba(12, 100, 115, 0.1); }
      50% { box-shadow: 0 0 20px rgba(12, 100, 115, 0.15), 0 0 30px rgba(245, 130, 32, 0.05); }
    }
    
    @keyframes slowPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.005); opacity: 0.98; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
      20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    @keyframes buttonGlow {
      0%, 100% { 
        box-shadow: 0 4px 15px rgba(12, 100, 115, 0.25), 0 0 0 0 rgba(12, 100, 115, 0.4);
      }
      50% { 
        box-shadow: 0 8px 25px rgba(12, 100, 115, 0.4), 0 0 0 4px rgba(12, 100, 115, 0.1);
      }
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes wobble {
      0% { transform: rotate(0deg); }
      15% { transform: rotate(-2deg); }
      30% { transform: rotate(2deg); }
      45% { transform: rotate(-1deg); }
      60% { transform: rotate(1deg); }
      75% { transform: rotate(-0.5deg); }
      100% { transform: rotate(0deg); }
    }
    
    @keyframes slowPulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 4px 15px rgba(12, 100, 115, 0.25);
      }
      50% { 
        transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(12, 100, 115, 0.4);
      }
    }
  `;

  return (
    <>
      {/* Inject keyframes using a style tag */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      
      <section className="relative min-h-[90vh] sm:min-h-[85vh] bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-50 overflow-hidden flex items-center" style={{ paddingBottom: '0.5em' }}>
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating orbs with enhanced animations - responsive sizes */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-teal-200/10 to-emerald-200/10 rounded-full blur-3xl" 
               style={{
                 animation: 'float 30s ease-in-out infinite, drift 40s ease-in-out infinite'
               }}></div>
          <div className="absolute top-3/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-teal-200/10 to-teal-200/10 rounded-full blur-3xl" 
               style={{
                 animation: 'float 35s ease-in-out infinite 8s, drift 45s ease-in-out infinite 5s'
               }}></div>
          <div className="absolute top-1/2 left-3/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-emerald-200/8 to-teal-200/8 rounded-full blur-2xl" 
               style={{
                 animation: 'float 28s ease-in-out infinite 12s, drift 38s ease-in-out infinite 3s'
               }}></div>
          
          {/* Smaller sparkle elements */}
          <div className="absolute top-1/3 right-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-teal-300/20 rounded-full" 
               style={{ animation: 'sparkle 6s ease-in-out infinite' }}></div>
          <div className="absolute top-2/3 left-1/5 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-300/20 rounded-full" 
               style={{ animation: 'sparkle 6s ease-in-out infinite 3s' }}></div>
          <div className="absolute top-1/5 right-1/5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-300/20 rounded-full" 
               style={{ animation: 'sparkle 6s ease-in-out infinite 6s' }}></div>
          
          {/* Enhanced wave patterns */}
          <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-white/5 to-transparent" 
               style={{ animation: 'wave 12s ease-in-out infinite' }}></div>
          <div className="absolute top-0 right-0 w-full h-16 sm:h-24 bg-gradient-to-b from-white/3 to-transparent" 
               style={{ animation: 'shimmer 10s ease-in-out infinite' }}></div>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `
              linear-gradient(rgba(12, 100, 115, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(12, 100, 115, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="relative max-w-6xl mx-auto">
            {/* Enhanced Dynamic Content Blur Effect */}
            <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-[0.5px] pointer-events-none" 
                 style={{
                   animation: 'breathe 6s ease-in-out infinite'
                 }}></div>
            
            {/* Dynamic Typography with Enhanced Animations - Improved responsive text sizes */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 lg:mb-8 text-gray-800 leading-tight drop-shadow-sm relative z-10 transition-all duration-700 hover:scale-102 hover:text-teal-700 px-2"
                style={{
                  marginTop: '1em',
                  animation: 'fadeInUp 1.5s ease-out, textGlow 12s ease-in-out infinite'
                }}>
              We can help you buy, sell and manage your property
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 lg:mb-10 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 font-medium drop-shadow-sm relative z-10 transition-all duration-700 hover:text-gray-600"
               style={{
                 animation: 'fadeInUp 1.5s ease-out 0.3s both'
               }}>
              The Mackay real estate market can be unpredictable, but with our local expertise and comprehensive services, we'll guide you through every step of your property journey.
            </p>
            
            {/* Enhanced Dynamic Search Bar Container - Improved mobile spacing */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-4 relative z-10"
                 style={{
                   animation: 'fadeInUp 2s ease-out 0.8s both'
                 }}>
              <div className="drop-shadow-xl backdrop-blur-sm bg-white/3 rounded-2xl p-1 transition-all duration-700 hover:bg-white/8 hover:scale-102 hover:drop-shadow-2xl group"
                   style={{
                     animation: 'slowPulse 8s ease-in-out infinite'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.animation += ', wobble 0.6s ease-in-out';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.animation = 'pulseGlow 6s ease-in-out infinite';
                   }}>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-200/10 to-emerald-200/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Enhanced Dynamic Quick Action Cards - Improved responsive grid and spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto px-2 sm:px-4"
               style={{
                 animation: 'fadeInUp 2.5s ease-out 1.2s both'
               }}>
            {[
              { href: "/buy", color: "primary", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Buying", delay: "0s" },
              { href: "/sell", color: "emerald", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Selling", delay: "0.1s" },
              { href: "/rent", color: "teal", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", label: "Renting", delay: "0.2s" },
              { href: "/sold", color: "amber", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Auctions", delay: "0.3s" },
              { href: "/commercial", color: "violet", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", label: "Commercial", delay: "0.4s" }
            ].map((item, index) => (
              <Link key={item.href} href={item.href} 
                    className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:scale-102 group border border-white/20 hover:border-white/40 relative overflow-hidden"
                    style={{
                      animation: `cardFloat 8s ease-in-out infinite ${item.delay}, fadeInScale 1s ease-out ${1.5 + index * 0.15}s both`,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                      backgroundSize: '200% 200%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animation += ', wobble 0.4s ease-in-out';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animation = `cardFloat 8s ease-in-out infinite ${item.delay}, fadeInScale 1s ease-out ${1.5 + index * 0.15}s both`;
                    }}>
                <div className="text-center relative z-10">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                       style={{
                         background: item.color === 'primary' ? 'linear-gradient(135deg, #0c6473 0%, #0a4550 100%)' :
                                   item.color === 'emerald' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                                   item.color === 'teal' ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' :
                                   item.color === 'amber' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                                   'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                       }}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className={`text-xs sm:text-sm font-bold text-gray-800 group-hover:text-${item.color}-600 transition-colors`}
                        style={{
                          color: '#1f2937'
                        }}>{item.label}</span>
                </div>
                
                {/* Enhanced hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}