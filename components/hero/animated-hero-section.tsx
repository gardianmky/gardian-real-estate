'use client';

import SearchBar from '@/components/search/search-bar';
import Link from "next/link";

export default function AnimatedHeroSection() {
  // Define keyframe animations as CSS-in-JS style objects
  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-20px) rotate(2deg); }
      50% { transform: translateY(-40px) rotate(0deg); }
      75% { transform: translateY(-20px) rotate(-2deg); }
    }
    
    @keyframes drift {
      0%, 100% { transform: translateX(0px) translateY(0px); }
      25% { transform: translateX(30px) translateY(-15px); }
      50% { transform: translateX(60px) translateY(-30px); }
      75% { transform: translateX(30px) translateY(-15px); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.2); }
    }
    
    @keyframes wave {
      0%, 100% { transform: translateX(0px) scaleX(1); }
      50% { transform: translateX(20px) scaleX(1.05); }
    }
    
    @keyframes shimmer {
      0%, 100% { opacity: 0.1; transform: translateX(-100px); }
      50% { opacity: 0.3; transform: translateX(100px); }
    }
    
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.05; }
      50% { transform: scale(1.02); opacity: 0.1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes fadeInScale {
      from { 
        opacity: 0; 
        transform: scale(0.8) translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.1); }
      50% { text-shadow: 0 0 15px rgba(59, 130, 246, 0.2), 0 0 25px rgba(16, 185, 129, 0.1); }
    }
    
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
      50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(16, 185, 129, 0.1); }
    }
  `;

  return (
    <>
      {/* Inject keyframes using a style tag */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      
      <section className="relative min-h-[85vh] bg-gradient-to-br from-primary-50 via-emerald-50 to-sky-50 overflow-hidden flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating orbs with enhanced animations */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-emerald-200/20 rounded-full blur-3xl" 
               style={{
                 animation: 'float 20s ease-in-out infinite, drift 25s ease-in-out infinite'
               }}></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-sky-200/20 to-primary-200/20 rounded-full blur-3xl" 
               style={{
                 animation: 'float 25s ease-in-out infinite 5s, drift 30s ease-in-out infinite 3s'
               }}></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-gradient-to-br from-emerald-200/15 to-sky-200/15 rounded-full blur-2xl" 
               style={{
                 animation: 'float 18s ease-in-out infinite 8s, drift 22s ease-in-out infinite 2s'
               }}></div>
          
          {/* Smaller sparkle elements */}
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-primary-300/40 rounded-full" 
               style={{ animation: 'sparkle 4s ease-in-out infinite' }}></div>
          <div className="absolute top-2/3 left-1/5 w-3 h-3 bg-emerald-300/40 rounded-full" 
               style={{ animation: 'sparkle 4s ease-in-out infinite 2s' }}></div>
          <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-sky-300/40 rounded-full" 
               style={{ animation: 'sparkle 4s ease-in-out infinite 4s' }}></div>
          
          {/* Enhanced wave patterns */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" 
               style={{ animation: 'wave 8s ease-in-out infinite' }}></div>
          <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-white/5 to-transparent" 
               style={{ animation: 'shimmer 6s ease-in-out infinite' }}></div>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="relative">
            {/* Enhanced Dynamic Content Blur Effect */}
            <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-[0.5px] pointer-events-none" 
                 style={{
                   animation: 'breathe 6s ease-in-out infinite'
                 }}></div>
            
            {/* Dynamic Typography with Enhanced Animations */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8 text-gray-800 leading-tight drop-shadow-sm relative z-10 transition-all duration-700 hover:scale-105 hover:text-primary-700"
                style={{
                  animation: 'fadeInUp 1.2s ease-out, textGlow 8s ease-in-out infinite'
                }}>
              We can help you buy, sell and manage your property
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 lg:mb-10 max-w-4xl mx-auto leading-relaxed px-4 font-medium drop-shadow-sm relative z-10 transition-all duration-700 hover:text-gray-600"
               style={{
                 animation: 'fadeInUp 1.5s ease-out 0.3s both'
               }}>
              The Mackay real estate market can be unpredictable, but with our local expertise and comprehensive services, we'll guide you through every step of your property journey.
            </p>
            
            {/* Enhanced Dynamic Search Bar Container */}
            <div className="max-w-4xl mx-auto mb-6 lg:mb-8 px-2 relative z-10"
                 style={{
                   animation: 'fadeInUp 1.8s ease-out 0.6s both'
                 }}>
              <div className="drop-shadow-2xl backdrop-blur-sm bg-white/5 rounded-2xl p-1 transition-all duration-500 hover:bg-white/15 hover:scale-105 hover:drop-shadow-3xl group"
                   style={{
                     animation: 'pulseGlow 6s ease-in-out infinite'
                   }}>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-200/10 to-emerald-200/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Enhanced Dynamic Quick Action Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-5xl mx-auto"
               style={{
                 animation: 'fadeInUp 2.1s ease-out 0.9s both'
               }}>
            {[
              { href: "/buy", color: "primary", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Buying", delay: "0s" },
              { href: "/sell", color: "emerald", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Selling", delay: "0.1s" },
              { href: "/rent", color: "sky", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", label: "Renting", delay: "0.2s" },
              { href: "/sold", color: "amber", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Auctions", delay: "0.3s" },
              { href: "/commercial", color: "violet", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", label: "Commercial", delay: "0.4s" }
            ].map((item, index) => (
              <Link key={item.href} href={item.href} 
                    className="bg-white/95 backdrop-blur-sm p-5 lg:p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group border border-white/20 hover:border-white/40"
                    style={{
                      animation: `cardFloat 6s ease-in-out infinite ${item.delay}, fadeInScale 0.8s ease-out ${1.2 + index * 0.1}s both`
                    }}>
                <div className="text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className={`text-sm font-bold text-gray-800 group-hover:text-${item.color}-600 transition-colors`}>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}