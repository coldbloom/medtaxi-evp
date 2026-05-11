export default function UslugiLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex gap-2 mb-6">
            <div className="h-4 w-16 bg-blue-500 bg-opacity-50 rounded" />
            <div className="h-4 w-2 bg-blue-500 bg-opacity-30 rounded" />
            <div className="h-4 w-40 bg-blue-500 bg-opacity-50 rounded" />
          </div>

          {/* Eyebrow */}
          <div className="h-3 w-36 bg-blue-400 bg-opacity-40 rounded mb-4" />

          {/* H1 */}
          <div className="space-y-3 mb-6">
            <div className="h-10 w-full max-w-2xl bg-blue-400 bg-opacity-40 rounded-lg" />
            <div className="h-10 w-3/4 max-w-xl bg-blue-400 bg-opacity-40 rounded-lg" />
          </div>

          {/* Description */}
          <div className="space-y-2 mb-8">
            <div className="h-5 w-full max-w-xl bg-blue-400 bg-opacity-25 rounded" />
            <div className="h-5 w-2/3 max-w-md bg-blue-400 bg-opacity-25 rounded" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="h-14 w-full sm:w-72 bg-white bg-opacity-20 rounded-xl" />
            <div className="h-14 w-full sm:w-52 bg-blue-500 bg-opacity-30 rounded-xl border-2 border-blue-400 border-opacity-30" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {[80, 96, 72, 88].map((w) => (
              <div
                key={w}
                style={{ width: `${w}px` }}
                className="h-8 bg-blue-500 bg-opacity-30 rounded-full border border-blue-400 border-opacity-30"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features grid skeleton */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Section title */}
          <div className="mx-auto mb-4 h-9 w-80 bg-gray-200 rounded-lg" />
          <div className="mx-auto mb-12 h-5 w-64 bg-gray-100 rounded" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="h-10 w-10 bg-blue-200 rounded-lg mb-4" />
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded" />
                  <div className="h-3 w-4/6 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works skeleton */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mx-auto mb-12 h-9 w-64 bg-gray-200 rounded-lg" />
          <div className="grid sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="space-y-1">
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-5/6 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Routes / price block skeleton */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mx-auto mb-4 h-9 w-72 bg-gray-200 rounded-lg" />
          <div className="mx-auto mb-10 h-5 w-56 bg-gray-100 rounded" />
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 bg-blue-50 rounded-xl border border-blue-100" />
            ))}
          </div>
          <div className="h-40 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
