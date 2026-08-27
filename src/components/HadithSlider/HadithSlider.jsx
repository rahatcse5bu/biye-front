import { BookOpenIcon } from '@heroicons/react/24/outline';

const HadithSlider = ({ slides = [] }) => {
  if (!slides.length) return null;

  return (
    <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] [scrollbar-color:#0D7377_transparent] lg:grid lg:grid-cols-3 lg:overflow-visible">
      {slides.map((slide, index) => (
        <li
          key={`${slide.ref}-${index}`}
          className="min-w-[88%] snap-center rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:min-w-[58%] lg:min-w-0 lg:p-6"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
            <BookOpenIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <blockquote className="mt-4">
            <p className="leading-8 text-gray-700">{slide.text}</p>
            <footer className="mt-3 text-sm font-bold text-brand-900">
              {slide.ref}
            </footer>
          </blockquote>
        </li>
      ))}
    </ol>
  );
};

export default HadithSlider;
