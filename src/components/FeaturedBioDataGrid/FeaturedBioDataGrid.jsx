import { ArrowLongRightIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Link } from '@/lib/navigation';
import BioData from '../BioData/BioData';

const FeaturedBioDataGrid = ({ data }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-brand-900">নির্বাচিত প্রোফাইল</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            ফিচারড বায়োডাটা
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            সাম্প্রতিক নির্বাচিত কিছু বায়োডাটা দেখুন।
          </p>
        </div>
        <Link
          to="/biodatas"
          className="hidden shrink-0 items-center gap-2 rounded-xl px-3 py-2 font-bold text-brand-900 transition-colors duration-200 hover:bg-brand-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 sm:inline-flex"
        >
          সব দেখুন
          <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      {data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.map((biodata) => (
            <BioData key={biodata?._id || biodata?.user_id} biodata={biodata} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <UserGroupIcon
            className="h-10 w-10 text-gray-400"
            aria-hidden="true"
          />
          <p className="mt-3 font-bold text-gray-700">
            এখন কোনো ফিচারড বায়োডাটা নেই
          </p>
          <p className="mt-1 text-sm text-gray-500">
            সব বায়োডাটা থেকে আপনার পছন্দের প্রোফাইল খুঁজে দেখুন।
          </p>
        </div>
      )}

      <Link
        to="/biodatas"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-900/20 font-bold text-brand-900 transition-colors duration-200 hover:bg-brand-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 sm:hidden"
      >
        সব বায়োডাটা দেখুন
        <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default FeaturedBioDataGrid;
