import Link from "next/link"
import { Home, Building, DollarSign, Users, Phone, CheckCircle, Key } from "lucide-react";

export default function QuickLinks() {
  const links = [
    {
      href: "/buy",
      icon: <Home className="h-5 w-5 text-teal-500" />,
      title: "Gardian Properties For Sale",
      description: "Browse Gardian Real Estate listings of properties for sale",
    },
    {
      href: "/rent",
      icon: <Key className="h-5 w-5 text-teal-500" />,
      title: "Gardian Rentals",
      description: "Find your perfect rental property with Gardian Real Estate",
    },
    {
      href: "/commercial",
      icon: <Building className="h-5 w-5 text-teal-500" />,
      title: "Gardian Commercial",
      description: "Explore commercial real estate opportunities with Gardian",
    },
    {
      href: "/sold",
      icon: <CheckCircle className="h-5 w-5 text-teal-500" />,
      title: "Recently Sold",
      description: "View recently sold properties",
    },
    {
      href: "/property-management",
      icon: <Building className="h-5 w-5 text-teal-500" />,
      title: "Gardian Property Management",
      description: "Learn about Gardian's property management services",
    },
    {
      href: "/sell-your-property",
      icon: <DollarSign className="h-5 w-5 text-teal-500" />,
      title: "Sell With Gardian",
      description: "Get your property listed with Gardian Real Estate",
    },
    {
      href: "/agents",
      icon: <Users className="h-5 w-5 text-teal-500" />,
      title: "Gardian Agents",
      description: "Meet Gardian's team of experienced real estate professionals",
    },
    {
      href: "/contact",
      icon: <Phone className="h-5 w-5 text-teal-500" />,
      title: "Contact Us",
      description: "Get in touch with our team",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="group">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
            <div className="mr-4">{link.icon}</div>
            <div>
              <h3 className="font-medium group-hover:text-teal-600 transition-colors">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
