"use client";

import React from "react";
import "./globals.css";
import MainNavigation from "../components/main-navigation";
import Footer from "../components/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavigation />
      <div className="bg-gradient-to-r from-[#00535c] to-[#006b75] text-white py-3 px-4 shadow-lg relative overflow-hidden border-b border-white/20">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <h1 className="text-sm sm:text-lg font-semibold tracking-wide">
              Gardian Real Estate
            </h1>
            <div className="hidden sm:block w-1 h-1 bg-white/60 rounded-full"></div>
            <p className="text-xs sm:text-base font-light tracking-wider text-white/90">
              Mackay's Best Real Estate
            </p>
          </div>
        </div>
      </div>
      <main className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Top right decorative ball */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gray-100/60 -translate-y-1/4 translate-x-1/4 -z-10 blur-[2px]"></div>

        {/* Bottom left decorative ball */}
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gray-100/60 translate-y-1/4 -translate-x-1/4 -z-10 blur-[2px]"></div>

        {children}
      </main>
      <Footer />
    </>
  );
}
