import { Link } from "@/lib/navigation";

const NotFound = () => {
  return (
    <main className="flex min-h-[70dvh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-900">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, ঠিকানাটি ভুল অথবা এটি আর
          উপলভ্য নেই।
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-900 px-5 py-3 font-bold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
