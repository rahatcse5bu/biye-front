import {
  ArrowRightIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { Link } from '@/lib/navigation';

const CREATE_PATH = '/user/account/edit-biodata';

const steps = [
  {
    Icon: UserPlusIcon,
    title: 'অ্যাকাউন্ট খুলুন',
    text: 'ইমেইল অথবা Google দিয়ে বিনামূল্যে নিবন্ধন করুন।',
  },
  {
    Icon: ClipboardDocumentListIcon,
    title: 'ধাপে ধাপে তথ্য দিন',
    text: '১২টি সহজ ধাপে আপনার বায়োডাটা পূরণ করুন, যেকোনো সময় থেমে আবার শুরু করা যায়।',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'যাচাই ও অনুমোদন',
    text: 'জমা দেওয়ার পর আমাদের টিম বায়োডাটা যাচাই করে প্রকাশ করে।',
  },
  {
    Icon: HeartIcon,
    title: 'প্রস্তাব পাঠান ও পান',
    text: 'পছন্দের বায়োডাটায় প্রস্তাব পাঠান এবং আপনার কাছে আসা প্রস্তাবের উত্তর দিন।',
  },
];

const videos = [
  { id: 'czYI7NaHymg', title: 'বিয়ের বিশেষ ফিচারসমূহ', tag: 'পরিচিতি' },
  { id: 'NXNa1NAvMbI', title: 'মোবাইল দিয়ে পাত্রীর বায়োডাটা দেওয়ার নিয়ম', tag: 'বায়োডাটা তৈরি' },
  { id: '26Kj5LuD2DY', title: 'পাত্রের বায়োডাটা দেওয়ার নিয়ম', tag: 'বায়োডাটা তৈরি' },
  { id: 'X6sjWCZjiuQ', title: 'প্রস্তাব (অনুরোধ) পাঠানোর নিয়ম', tag: 'প্রস্তাব' },
  { id: 'x0-RXTR0DfQ', title: 'অভিভাবকের যোগাযোগ তথ্য নেওয়ার নিয়ম', tag: 'যোগাযোগ' },
];

const toBn = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

const primaryButton =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none';

const Instructions = () => {
  return (
    <main className="bg-[#F7F9F9]">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/10 px-3 py-1 text-sm font-bold text-brand-900">
            সম্পূর্ণ বিনামূল্যে
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            আপনার বায়োডাটা তৈরি করুন, জীবনসঙ্গী খোঁজা শুরু করুন
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            কয়েকটি সহজ ধাপে বায়োডাটা জমা দিন। যাচাইয়ের পর এটি প্রকাশিত হবে এবং আগ্রহীরা আপনার কাছে প্রস্তাব পাঠাতে পারবেন।
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to={CREATE_PATH} className={primaryButton}>
              বায়োডাটা তৈরি শুরু করুন
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/biodatas"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-900/30 bg-white px-6 py-3 font-bold text-brand-900 transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
              সকল বায়োডাটা দেখুন
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16" aria-labelledby="how-it-works">
        <div className="text-center">
          <h2 id="how-it-works" className="text-2xl font-bold text-gray-900 sm:text-3xl">
            কীভাবে কাজ করে
          </h2>
          <p className="mt-2 text-gray-500">চারটি ধাপে বায়োডাটা থেকে প্রস্তাব পর্যন্ত</p>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, index) => (
            <li key={title} className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="absolute right-5 top-5 text-sm font-bold text-gray-300">
                {toBn(String(index + 1).padStart(2, '0'))}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-gray-200 bg-white" aria-labelledby="video-guides">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
              <PlayCircleIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id="video-guides" className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              ভিডিও নির্দেশনা
            </h2>
            <p className="mt-2 max-w-xl text-gray-500">
              বায়োডাটা তৈরি থেকে প্রস্তাব পাঠানো পর্যন্ত, প্রতিটি ধাপ ভিডিওতে দেখে নিন।
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <article
                key={video.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="bg-gray-900 [&_.yt-lite]:rounded-none">
                  <LiteYouTubeEmbed id={video.id} title={video.title} noCookie />
                </div>
                <div className="flex items-start gap-3 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
                    {toBn(index + 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand-900">{video.tag}</p>
                    <h3 className="mt-0.5 font-bold leading-6 text-gray-900">{video.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-brand-900 px-6 py-10 text-center text-white shadow-lg sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">আজই আপনার বায়োডাটা তৈরি করুন</h2>
          <p className="max-w-xl leading-7 text-white/80">
            বায়োডাটা জমা দেওয়া সম্পূর্ণ বিনামূল্যে। অসম্পূর্ণ থাকলেও পরে এসে বাকি ধাপগুলো পূরণ করতে পারবেন।
          </p>
          <Link
            to={CREATE_PATH}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-brand-900 shadow-sm transition-colors duration-200 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 motion-reduce:transition-none"
          >
            বায়োডাটা তৈরি শুরু করুন
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Instructions;
