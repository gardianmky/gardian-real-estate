import Link from "next/link"

export default function CategoryNav() {
  const categories = [
    { name: "Buy", href: "/buy" },
    { name: "Sell", href: "/sell" },
    { name: "Rent", href: "/rent" },
    { name: "Commercial", href: "/commercial" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex justify-center items-center h-16 rounded-lg border-2 border-blue-300 bg-white hover:bg-blue-50 transition-colors duration-300 text-blue-600 font-medium"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
