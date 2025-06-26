import Link from "next/link"

export default function SecondaryNavigation() {
  const secondaryItems = [
    {
      title: "Our Agents",
      description: "Meet our team of experienced real estate professionals",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      href: "/agents",
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
      borderColor: "border-primary-200",
    },
    {
      title: "About Us",
      description: "Learn about our company history and values",
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      href: "/about",
      bgColor: "bg-accent-50",
      textColor: "text-accent-700",
      borderColor: "border-accent-200",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team for any inquiries",
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      href: "/contact",
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
      borderColor: "border-primary-200",
    },
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
