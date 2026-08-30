import { Link } from '@/lib/navigation';

function ForgotPasswordForm() {
  return (
    <main className="bg-gray-50 px-4 py-16 sm:px-6">
      <section className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          অ্যাকাউন্ট পুনরুদ্ধার
        </h1>
        <p className="mt-4 text-sm leading-7 text-gray-600">
          Google দিয়ে নিবন্ধন করে থাকলে একই Google অ্যাকাউন্ট ব্যবহার করে লগইন
          করুন। ইমেইল ও পাসওয়ার্ডের অ্যাকাউন্ট পুনরুদ্ধারের জন্য সহায়তা টিমের
          সঙ্গে যোগাযোগ করুন।
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="rounded-lg bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
          >
            লগইন পেজে ফিরুন
          </Link>
          <Link
            to="/contact-us"
            className="rounded-lg border border-brand-900 px-5 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
          >
            সহায়তা নিন
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ForgotPasswordForm;
