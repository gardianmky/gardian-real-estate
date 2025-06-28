"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Home, CreditCard, Shield, Building2, TrendingUp, Settings } from "lucide-react"

interface ServiceItem {
  id: string
  icon: React.ReactNode
  title: string
  subtitle: string
  href: string
  color: string
}

const services: ServiceItem[] = [
  {
    id: "real-estate",
    icon: <Home className="w-6 h-6" />,
    title: "Real Estate",
    subtitle: "Buy, sell, or rent your dream property",
    href: "/real-estate",
    color: "from-teal-600 to-teal-500"
  },
  {
    id: "finance",
    icon: <CreditCard className="w-6 h-6" />,
    title: "Finance / Home Loans",
    subtitle: "Get pre-approved with competitive rates",
    href: "/finance",
    color: "from-teal-600 to-teal-500"
  },
  {
    id: "insurance",
    icon: <Shield className="w-6 h-6" />,
    title: "Insurance",
    subtitle: "Protect your property and assets",
    href: "/insurance",
    color: "from-teal-600 to-teal-500"
  },
  {
    id: "commercial",
    icon: <Building2 className="w-6 h-6" />,
    title: "Commercial Sales & Leasing",
    subtitle: "Find the perfect business location",
    href: "/commercial",
    color: "from-teal-600 to-teal-500"
  },
  {
    id: "financial-planning",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Financial Planning",
    subtitle: "Build wealth with expert guidance",
    href: "/financial-planning",
    color: "from-teal-600 to-teal-500"
  },
  {
    id: "property-management",
    icon: <Settings className="w-6 h-6" />,
    title: "Property Management",
    subtitle: "Maximize your investment returns",
    href: "/property-management",
    color: "from-teal-600 to-teal-500"
  }
]

interface LogoDropdownMenuProps {
  className?: string
}

export default function LogoDropdownMenu({ className = "" }: LogoDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 150)
    }
  }

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    }
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Trigger */}
      <button
        onClick={handleClick}
        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        aria-label="Gardian Services Menu"
        aria-expanded={isOpen}
      >
        <Image
          src="/images/gardian-logo.webp"
          alt="Gardian Real Estate"
          width={140}
          height={56}
          className="h-10 lg:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          priority
        />
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.04, 0.62, 0.23, 0.98] 
            }}
            className={`absolute top-full left-0 z-50 ${
              isMobile 
                ? 'w-screen -left-4 mt-2' 
                : 'w-[600px] mt-3'
            }`}
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4">
                <h3 className="text-white text-lg font-bold mb-1">
                  Gardian Services
                </h3>
                <p className="text-teal-100 text-sm">
                  Your trusted partner for all property and financial needs
                </p>
              </div>

              {/* Services Grid */}
              <div className={`p-4 ${
                isMobile 
                  ? 'grid grid-cols-1 gap-3' 
                  : 'grid grid-cols-2 gap-4'
              }`}>
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.03,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={service.href}
                      onClick={handleLinkClick}
                      className="group block p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`
                          w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} 
                          flex items-center justify-center text-white flex-shrink-0
                          group-hover:scale-105 transition-transform duration-200
                        `}>
                          {service.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 font-semibold text-sm mb-1 group-hover:text-teal-700 transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {service.subtitle}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 mt-1">
                          <svg 
                            className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">
                      Need help choosing? <span className="font-medium text-teal-600">Contact our team</span>
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="inline-flex items-center px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}