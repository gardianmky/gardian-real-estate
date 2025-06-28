import Link from "next/link"

export default function SecondaryNavigation() {
  const secondaryItems = [
    {
      title: "Property Management",
      description: "Professional property management services by Gardian",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
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
      href: "/property-management",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
      borderColor: "border-teal-200",
    },
    {
      title: "Rentals",
      description: "Find your perfect rental property with Gardian",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      href: "/rentals",
      bgColor: "bg-accent-50",
      textColor: "text-accent-700",
      borderColor: "border-accent-200",
    }
  ]

  // This component should be placed below agents
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {secondaryItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`flex items-center p-4 rounded-lg border ${item.borderColor} ${item.bgColor} transition-all duration-300 hover:shadow-md group`}
        >
          <div className={`${item.textColor} mr-4`}>{item.icon}</div>
          <div>
            <h3 className={`font-semibold ${item.textColor} group-hover:underline`}>{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
