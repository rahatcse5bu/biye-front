// TODO: card-shaped placeholders shown on the first load instead of a bare spinner.
export default function BioDataSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
      role="status"
      aria-label="বায়োডাটা লোড হচ্ছে"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="animate-pulse bg-brand-900/80 px-4 pb-5 pt-4 motion-reduce:animate-none">
            <div className="flex justify-between">
              <div className="h-6 w-14 rounded-full bg-white/20" />
              <div className="h-6 w-20 rounded-full bg-white/20" />
            </div>
            <div className="mx-auto mt-3 h-20 w-20 rounded-2xl bg-white/20" />
            <div className="mx-auto mt-4 h-5 w-28 rounded bg-white/25" />
          </div>
          <div className="animate-pulse space-y-3 p-4 motion-reduce:animate-none">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gray-100" />
                <div className="h-3 flex-1 rounded bg-gray-100" />
                <div className="h-3 w-16 rounded bg-gray-100" />
              </div>
            ))}
            <div className="mt-2 h-11 rounded-xl bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
