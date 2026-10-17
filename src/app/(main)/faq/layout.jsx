import { faqItems } from '@/constants/faqItems';
import { createBreadcrumbSchema, createPageMetadata, toJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনি সম্পর্কে সাধারণ জিজ্ঞাসা',
  description:
    'বিয়ে ম্যাট্রিমনিতে অ্যাকাউন্ট, বায়োডাটা, যোগাযোগ, পেমেন্ট এবং নিরাপত্তা সম্পর্কিত সাধারণ প্রশ্নের উত্তর দেখুন।',
  path: '/faq',
  keywords: ['বিয়ে FAQ', 'ম্যাট্রিমনি প্রশ্ন উত্তর', 'বায়োডাটা অনুমোদন', 'বিকাশ পেমেন্ট', 'পয়েন্ট রেট'],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question.trim(),
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer.trim(),
    },
  })),
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'হোম', path: '/' },
  { name: 'সাধারণ জিজ্ঞাসা', path: '/faq' },
]);

export default function FaqLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd([faqSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  );
}
