import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from '@/lib/navigation';

const NotFound = () => {
  return (
    <main className="flex min-h-[70dvh] items-center justify-center bg-white px-4 py-16 sm:py-24">
      <div className="w-full max-w-lg text-center">
        <p
          className="select-none text-[7rem] font-extrabold leading-tight tracking-tight text-[rgba(13,115,119,0.14)] sm:text-[9rem]"
          aria-hidden="true"
        >
          ৪০৪
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, ঠিকানাটি ভুল অথবা এটি আর
          উপলভ্য নেই।
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
            হোম পেজে যান
          </Link>
          <Link
            to="/biodatas"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-900/30 bg-white px-6 py-3 font-bold text-brand-900 transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            বায়োডাটা খুঁজুন
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          সমস্যা থেকে গেলে{' '}
          <Link
            to="/contact-us"
            className="rounded font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
          >
            আমাদের জানান
          </Link>
        </p>
      </div>
    </main>
  );
};

export default NotFound;
