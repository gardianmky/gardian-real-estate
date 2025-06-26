"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-sky-700 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/finance-bg.jpg')] bg-cover bg-center opacity-20"/>
      
      <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Home with Guardian
          </h1>
          <p className="text-xl mb-8">
            Discover the perfect property with Gardian Real Estate - Mackay's Best Real Estate
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Search className="h-5 w-5" />
              Browse Properties
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <MapPin className="h-5 w-5" />
              Explore Locations
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}