"use client"

import React from "react"
import "./globals.css"
import MainNavigation from "../components/main-navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MainNavigation />
      <div className="bg-[#00535c] text-white py-2.5 px-6 text-center text-sm shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-50"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:space-x-2 space-y-1 sm:space-y-0 py-1 sm:py-0" style={{ margin: '0.5em' }}>
          <span className="text-center font-normal text-xs sm:text-base sm:font-medium">Gardian Real Estate</span>
          <span className="text-center font-light text-[10px] sm:text-base sm:font-medium">Mackay's Best Real Estate</span>
        </div>
      </div>
      <main className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Top right decorative ball */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gray-100/60 -translate-y-1/4 translate-x-1/4 -z-10 blur-[2px]"></div>

        {/* Bottom left decorative ball */}
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gray-100/60 translate-y-1/4 -translate-x-1/4 -z-10 blur-[2px]"></div>

        {children}
      </main>
    </>
  )
}