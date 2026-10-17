export default function RootLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton — matches Hero section */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 min-h-[480px] py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Badge */}
          <div className="h-6 w-40 bg-blue-500 bg-opacity-50 rounded-full mb-6" />

          {/* H1 */}
          <div className="space-y-3 mb-6">
            <div className="h-12 w-full max-w-2xl bg-blue-400 bg-opacity-40 rounded-xl" />
            <div className="h-12 w-2/3 max-w-xl bg-blue-400 bg-opacity-40 rounded-xl" />
          </div>

          {/* Description */}
          <div className="space-y-2 mb-10">
            <div className="h-5 w-full max-w-lg bg-blue-400 bg-opacity-25 rounded" />
            <div className="h-5 w-3/4 max-w-md bg-blue-400 bg-opacity-25 rounded" />
            <div className="h-5 w-1/2 max-w-sm bg-blue-400 bg-opacity-25 rounded" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-14 w-full sm:w-72 bg-white bg-opacity-20 rounded-xl" />
            <div className="h-14 w-full sm:w-52 bg-blue-500 bg-opacity-30 rounded-xl border-2 border-blue-400 border-opacity-30" />
          </div>
        </div>
      </div>

      {/* Services section skeleton */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-10 h-9 w-72 bg-gray-200 rounded-lg" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="h-10 w-10 bg-blue-200 rounded-xl mb-4" />
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advantages skeleton */}
      <div className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-10 h-9 w-64 bg-blue-200 rounded-lg" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 w-8 bg-blue-100 rounded mb-4" />
                <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews skeleton */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-10 h-9 w-60 bg-gray-200 rounded-lg" />
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-5/6 bg-gray-100 rounded" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                </div>
                <div className="h-4 w-32 bg-blue-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA skeleton */}
      <div className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="h-24 w-24 bg-blue-500 rounded-2xl mb-6" />
          <div className="h-9 w-72 bg-blue-500 rounded-lg mb-4" />
          <div className="h-5 w-96 max-w-full bg-blue-500 rounded mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 w-56 bg-white bg-opacity-20 rounded-lg" />
            <div className="h-14 w-56 bg-blue-500 bg-opacity-50 rounded-lg border-2 border-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
