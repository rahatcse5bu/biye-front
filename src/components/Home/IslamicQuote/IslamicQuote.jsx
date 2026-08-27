import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const IslamicQuote = ({ content }) => {
  return (
    <figure className="relative -mt-6 rounded-2xl border border-brand-900/10 bg-white p-5 shadow-sm sm:-mt-7 sm:p-7 lg:mx-12">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900">
          <ChatBubbleBottomCenterTextIcon
            className="h-6 w-6"
            aria-hidden="true"
          />
        </span>
        <blockquote>
          <p className="text-base font-semibold leading-8 text-gray-800 sm:text-lg">
            “
            {content?.text ||
              'যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।'}
            ”
          </p>
          <figcaption className="mt-2 text-sm font-bold text-brand-900 sm:text-base">
            {content?.reference || '(বায়হাকী, শু’আবুল ঈমান - ৫৪৮৬)'}
          </figcaption>
        </blockquote>
      </div>
    </figure>
  );
};

export default IslamicQuote;
