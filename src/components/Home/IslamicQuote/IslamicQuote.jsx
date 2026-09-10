import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { quoteContent } from "@/constants/religionContent";

const IslamicQuote = ({ content }) => {
  const quote = content ?? quoteContent.islam;
  const QuoteBody = quote.editorial ? "div" : "blockquote";

  return (
    <figure className="relative -mt-6 rounded-2xl border border-brand-900/10 bg-white p-5 shadow-sm sm:-mt-7 sm:p-7 lg:mx-12">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900">
          <ChatBubbleBottomCenterTextIcon
            className="h-6 w-6"
            aria-hidden="true"
          />
        </span>
        <QuoteBody>
          <p className="text-base font-semibold leading-8 text-gray-800 sm:text-lg">
            {quote.text}
          </p>
        </QuoteBody>
      </div>
      {quote.reference && (
        <figcaption className="mt-2 pl-[3.75rem] text-sm font-bold text-brand-900 sm:text-base">
          {quote.reference}
        </figcaption>
      )}
    </figure>
  );
};

export default IslamicQuote;
