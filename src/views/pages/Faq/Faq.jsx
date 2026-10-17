import { Colors } from '../../../constants/colors';
import { faqItems } from '../../../constants/faqItems';

// TODO: native <details> keeps every answer in the HTML so crawlers index it while collapsed.
const Faq = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8 px-4">
      <h1
        className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2"
        style={{ color: Colors.titleText }}
      >
        বিয়ে ম্যাট্রিমনি — সাধারণ জিজ্ঞাসা (FAQ)
      </h1>
      <p className="mb-6 text-gray-600 leading-7">
        অ্যাকাউন্ট, বায়োডাটা জমা ও অনুমোদন, অনুরোধ পাঠানো, যোগাযোগ তথ্য,
        পয়েন্ট ও বিকাশ পেমেন্ট সম্পর্কে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর।
      </p>
      <ul>
        {faqItems.map((item) => (
          <li
            key={item.question}
            className="border-b bg-gray-300 mb-4 rounded"
            style={{ borderBottomColor: `rgba(${Colors.titleText}, 0.7)` }}
          >
            <details className="group px-8 py-4">
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-bold">{item.question}</h2>
                <span
                  className="text-gray-900 text-xl shrink-0"
                  aria-hidden="true"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">-</span>
                </span>
              </summary>
              <p className="mt-2 text-left whitespace-pre-line">{item.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
