export default function RealEstateOptions() {
  const options = [
    { name: "Our Agents", href: "/agents" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="bg-gray-50 py-4">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Real Estate Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((option) => (
            <a
              key={option.name}
              href={option.href}
              className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100"
            >
              {option.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
