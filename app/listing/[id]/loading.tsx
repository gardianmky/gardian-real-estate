export default function ListingLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 w-24 bg-gray-200 rounded mb-8 animate-pulse"></div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-[600px] w-full bg-gray-200 animate-pulse"></div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-14 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="h-10 w-10 mx-auto bg-gray-200 rounded-full mb-3 animate-pulse"></div>
                <div className="h-6 w-12 mx-auto bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="mb-12">
            <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center py-2">
                  <div className="h-5 w-5 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="h-20 w-20 rounded-full bg-gray-200 mr-6 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <div className="h-12 w-64 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
