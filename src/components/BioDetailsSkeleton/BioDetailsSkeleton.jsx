/* eslint-disable react/prop-types */

const Bar = ({ className = '' }) => <span className={`block rounded-md bg-gray-200 ${className}`} />;

const SectionSkeleton = ({ rows = 4 }) => (
  <div className="rounded-lg border-t-2 border-gray-200 bg-white shadow-sm">
    <div className="flex justify-center py-4">
      <Bar className="h-6 w-36" />
    </div>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="grid grid-cols-2 gap-6 border-t border-gray-100 px-4 py-4">
        <Bar className="h-4 w-3/4" />
        <Bar className="h-4 w-2/3" />
      </div>
    ))}
  </div>
);

// TODO: page-shaped placeholder shown while a biodata loads; withHeader mirrors the server page's title band.
const BioDetailsSkeleton = ({ withHeader = false }) => (
  <div role="status" aria-live="polite" className="w-full animate-pulse motion-reduce:animate-none">
    <span className="sr-only">বায়োডাটা লোড হচ্ছে…</span>

    {withHeader && (
      <div className="border-b border-gray-200 bg-[#F7F9F9]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="space-y-2.5">
            <Bar className="h-4 w-40" />
            <Bar className="h-8 w-56" />
            <Bar className="h-4 w-44" />
          </div>
          <Bar className="h-11 w-48 rounded-xl" />
        </div>
      </div>
    )}

    <div className="grid w-full grid-cols-1 gap-y-5 py-2 md:grid-cols-[50%,50%] lg:grid-cols-[30%,70%]">
      <div className="space-y-5 px-2">
        <div className="rounded-lg bg-brand-900/90 p-4 shadow-lg">
          <span className="mx-auto my-2 block h-20 w-20 rounded-full bg-white/25" />
          <span className="mx-auto mb-5 mt-3 block h-5 w-32 rounded-md bg-white/25" />
          <div className="space-y-4 px-4 pb-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="grid grid-cols-2 gap-6">
                <span className="block h-4 rounded-md bg-white/20" />
                <span className="block h-4 w-2/3 rounded-md bg-white/20" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
          <Bar className="h-11 rounded-full" />
          <Bar className="h-11 rounded-full" />
        </div>
      </div>

      <div className="space-y-5 px-2">
        <SectionSkeleton rows={3} />
        <SectionSkeleton rows={4} />
        <SectionSkeleton rows={3} />
      </div>
    </div>
  </div>
);

export default BioDetailsSkeleton;
