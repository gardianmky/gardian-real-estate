import type React from "react"
import Link from "next/link"

interface NavigationCard {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  bgColor: string
  textColor: string
  borderColor: string
}

export default function NavigationCards() {
  const navigationItems: NavigationCard[] = [
    {
      title: "Buy",
      description: "Find your dream home from our selection of properties for sale",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      href: "/buy",
      bgColor: "bg-gradient-to-br from-primary-50 to-primary-100",
      textColor: "text-primary-700",
      borderColor: "border-primary-200",
    },
    {
      title: "Sell",
      description: "List your property with us and reach qualified buyers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      href: "/sell",
      bgColor: "bg-gradient-to-br from-accent-50 to-accent-100",
      textColor: "text-accent-700",
      borderColor: "border-accent-200",
    },
    {
      title: "Rent",
      description: "Explore rental properties available in your desired location",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      href: "/rent",
      bgColor: "bg-gradient-to-br from-primary-50 to-primary-100",
      textColor: "text-primary-700",
      borderColor: "border-primary-200",
    },
    {
      title: "Commercial",
      description: "Find commercial properties for your business needs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      href: "/commercial",
      bgColor: "bg-gradient-to-br from-accent-50 to-accent-100",
      textColor: "text-accent-700",
      borderColor: "border-accent-200",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto relative mt-8 z-10 px-4">
      {navigationItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`block group overflow-hidden rounded-lg border ${item.borderColor} ${item.bgColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full shadow-md`}
        >
          <div className="p-3 sm:p-4 flex flex-col h-full">
            <div className={`${item.textColor} mb-2 flex justify-center`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10">{item.icon}</div>
            </div>
            <h3 className={`text-base sm:text-lg font-bold mb-1 text-center ${item.textColor}`}>{item.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center line-clamp-2">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
