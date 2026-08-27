import Image from 'next/image';
import { Link } from '@/lib/navigation';
import {
  BiLogoFacebook,
  BiLogoGmail,
  BiLogoLinkedin,
  BiLogoWhatsapp,
} from 'react-icons/bi';
import { BsTelephoneInbound } from 'react-icons/bs';
import { HiOutlineChevronRight, HiOutlineLocationMarker } from 'react-icons/hi';

const biodataLinks = [
  { label: 'সকল বায়োডাটা', to: '/biodatas' },
  { label: 'বায়োডাটা তৈরি করুন', to: '/biodata-submit' },
  { label: 'নিবন্ধন করুন', to: '/signup' },
  { label: 'পয়েন্ট প্যাকেজ', to: '/points-package' },
];

const helpLinks = [
  { label: 'আমাদের সম্পর্কে', to: '/about-us' },
  { label: 'যোগাযোগ', to: '/contact-us' },
  { label: 'সাধারণ জিজ্ঞাসা', to: '/faq' },
  { label: 'গোপনীয়তা নীতিমালা', to: '/privacy-policy' },
  { label: 'শর্তাবলি', to: '/terms-and-condition' },
  { label: 'রিফান্ড নীতিমালা', to: '/refund-policy' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61551063894495',
    Icon: BiLogoFacebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/showcase/pnc-nikah/',
    Icon: BiLogoLinkedin,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8801793278360',
    Icon: BiLogoWhatsapp,
  },
];

const internalLinkClass =
  'group inline-flex w-fit items-center gap-2 rounded-sm text-sm leading-6 text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none';

const contactLinkClass =
  'rounded-sm text-sm leading-6 text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-8 border-t border-white/10 bg-brand-900 text-white"
      aria-labelledby="footer-brand"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <section
            className="sm:col-span-2 lg:col-span-1"
            aria-labelledby="footer-brand"
          >
            <Link
              to="/"
              className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="বিয়ে বাংলাদেশী ম্যাট্রিমনি হোমপেজ"
            >
              <Image
                src="/assets/logo/biye-logo.svg"
                alt="বিয়ে বাংলাদেশী ম্যাট্রিমনি"
                width={220}
                height={70}
                className="h-auto w-44"
              />
            </Link>

            <h2 id="footer-brand" className="sr-only">
              বিয়ে বাংলাদেশী ম্যাট্রিমনি
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75 sm:text-base">
              বিয়ে একটি বাংলাদেশী ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে
              পাত্র-পাত্রীরা সহজে বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী
              খুঁজতে পারেন।
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
              <HiOutlineLocationMarker className="h-5 w-5" aria-hidden="true" />
              সেবা এলাকা: বাংলাদেশ
            </p>
          </section>

          <nav aria-labelledby="footer-biodata-heading">
            <h2
              id="footer-biodata-heading"
              className="text-base font-semibold text-white"
            >
              বায়োডাটা
            </h2>
            <ul className="mt-5 space-y-3">
              {biodataLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={internalLinkClass}>
                    <HiOutlineChevronRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-help-heading">
            <h2
              id="footer-help-heading"
              className="text-base font-semibold text-white"
            >
              সহায়তা ও গুরুত্বপূর্ণ লিংক
            </h2>
            <ul className="mt-5 space-y-3">
              {helpLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={internalLinkClass}>
                    <HiOutlineChevronRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-heading">
            <h2
              id="footer-contact-heading"
              className="text-base font-semibold text-white"
            >
              যোগাযোগ
            </h2>
            <address className="mt-5 not-italic">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
                    <BsTelephoneInbound
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <span className="block text-xs text-white/55">ফোন</span>
                    <a
                      href="tel:+8801793278360"
                      className={contactLinkClass}
                      aria-label="বিয়ে ম্যাট্রিমনিতে ফোন করুন"
                    >
                      +880 1793-278360
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
                    <BiLogoGmail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs text-white/55">ইমেইল</span>
                    <a
                      href="mailto:pnc.nikah@gmail.com"
                      className={`${contactLinkClass} break-all`}
                    >
                      pnc.nikah@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
                    <BiLogoWhatsapp className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-xs text-white/55">
                      WhatsApp
                    </span>
                    <a
                      href="https://wa.me/8801793278360"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClass}
                      aria-label="WhatsApp-এ বিয়ে ম্যাট্রিমনির সঙ্গে যোগাযোগ করুন"
                    >
                      বার্তা পাঠান
                    </a>
                  </div>
                </li>
              </ul>
            </address>

            <div className="mt-7">
              <h3 className="text-sm font-semibold text-white">
                সামাজিক যোগাযোগ
              </h3>
              <ul
                className="mt-4 flex flex-wrap gap-3"
                aria-label="সামাজিক যোগাযোগমাধ্যম"
              >
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label}-এ বিয়ে ম্যাট্রিমনি`}
                      title={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-200 hover:-translate-y-1 hover:border-white/40 hover:bg-white hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-center text-sm text-white/70 sm:px-8 md:flex-row md:text-left lg:px-10">
          <p>Copyright © 2023-{currentYear} বিয়ে | সর্বস্বত্ব সংরক্ষিত</p>
          <nav aria-label="আইনি নীতিমালা">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
              <li>
                <Link to="/privacy-policy" className={contactLinkClass}>
                  গোপনীয়তা
                </Link>
              </li>
              <li>
                <Link to="/terms-and-condition" className={contactLinkClass}>
                  শর্তাবলি
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className={contactLinkClass}>
                  রিফান্ড নীতি
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
