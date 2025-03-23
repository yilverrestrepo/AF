export default function PropertyDetailSkeleton() {
  return (
    <div>
      <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-4" />

      <div className="h-96 bg-gray-200 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border-b pb-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </div>

          <div className="border-b py-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          <div className="py-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-4" />
            <div className="h-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>

        <div>
          <div className="h-40 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

