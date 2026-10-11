import { useContext, useEffect, useState } from 'react';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Link } from '@/lib/navigation';
import UserContext from '../../../contexts/UserContext';
import { ContactServices } from '../../../services/contact';

const MESSAGE_MAX = 3000;
const EMPTY_FORM = { name: '', email: '', phone: '', bio: '', message: '' };

const channels = [
  {
    Icon: EnvelopeIcon,
    label: 'ইমেইল',
    value: 'bibahosupport@gmail.com',
    href: 'mailto:bibahosupport@gmail.com',
  },
  {
    Icon: PhoneIcon,
    label: 'ফোন',
    value: '+৮৮০ ১৭৯৩ ২৭৮৩৬০',
    href: 'tel:+8801793278360',
  },
  {
    Icon: FaWhatsapp,
    label: 'হোয়াটসঅ্যাপ',
    value: 'মেসেজ পাঠান',
    href: 'https://wa.me/8801793278360',
    external: true,
  },
  {
    Icon: FaFacebookF,
    label: 'ফেসবুক',
    value: 'আমাদের পেজ',
    href: 'https://www.facebook.com/profile.php?id=61551063894495',
    external: true,
  },
];

const toBn = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2';

const inputClass =
  'mt-1.5 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20 disabled:bg-gray-50';

const Field = ({ id, label, required, hint, children }) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-800">
      {label}
      {required ? (
        <span className="text-rose-600" aria-hidden="true"> *</span>
      ) : (
        <span className="font-normal text-gray-400"> (ঐচ্ছিক)</span>
      )}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
  </div>
);

const ContactUs = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sent, setSent] = useState(false);

  // TODO: logged-in members get their name and email filled in; anything already typed is kept.
  useEffect(() => {
    if (!user) return;
    setFormData((current) => ({
      ...current,
      name: current.name || user.username || '',
      email: current.email || user.email || '',
      bio: current.bio || (user.user_id ? String(user.user_id) : ''),
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await ContactServices.createContactUsByEmail(formData);
      if (!response?.success) throw new Error(response?.message);
      setSent(true);
      setFormData(EMPTY_FORM);
    } catch (error) {
      setErrorMessage(
        error?.response?.status === 429
          ? 'আপনি অল্প সময়ে অনেকগুলো বার্তা পাঠিয়েছেন। কিছুক্ষণ পর আবার চেষ্টা করুন।'
          : error?.response?.data?.message ||
              'বার্তা পাঠানো যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F7F9F9]">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/10 px-3 py-1 text-sm font-bold text-brand-900">
            <ChatBubbleLeftRightIcon className="h-4 w-4" aria-hidden="true" />
            সাহায্য ও সহায়তা
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            যোগাযোগ করুন
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            আপনার যেকোনো জিজ্ঞাসা নিচের ফর্মে লিখে পাঠান। আমরা শীঘ্রই আপনার সঙ্গে যোগাযোগ করবো ইন শা আল্লাহ।
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:py-16 lg:grid-cols-[2fr_3fr]">
        <aside className="space-y-6" aria-label="অন্যান্য যোগাযোগ মাধ্যম">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">সরাসরি যোগাযোগ</h2>
            <ul className="mt-4 space-y-3">
              {channels.map(({ Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`flex items-center gap-4 rounded-xl border border-gray-100 p-3 transition-colors hover:border-brand-900/30 hover:bg-brand-900/5 ${focusRing}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-gray-500">{label}</span>
                      <span className="block truncate font-bold text-gray-900">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <QuestionMarkCircleIcon className="h-6 w-6 text-brand-900" aria-hidden="true" />
              <h2 className="text-lg font-bold text-gray-900">উত্তর হয়তো আগেই আছে</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              সাধারণ প্রশ্নের উত্তর এখানে পাবেন, বার্তা পাঠানোর আগে একবার দেখে নিন।
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { to: '/faq', label: 'সাধারণ জিজ্ঞাসা' },
                { to: '/refund-policy', label: 'রিফান্ড পলিসি' },
                { to: '/terms-and-condition', label: 'শর্তাবলি' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-full border border-brand-900/20 px-3 py-1.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900/5 ${focusRing}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="contact-form-title"
        >
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircleIcon className="h-9 w-9" aria-hidden="true" />
              </span>
              <h2 id="contact-form-title" className="mt-5 text-2xl font-bold text-gray-900">
                আপনার বার্তা পৌঁছেছে
              </h2>
              <p className="mt-2 max-w-md leading-7 text-gray-600">
                ধন্যবাদ! আমাদের টিম বার্তাটি দেখে আপনার দেওয়া ইমেইল বা ফোনে যোগাযোগ করবে ইন শা আল্লাহ।
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-brand-900/30 px-6 py-3 font-bold text-brand-900 transition-colors hover:border-brand-900 hover:bg-brand-900/5 ${focusRing}`}
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <>
              <h2 id="contact-form-title" className="text-2xl font-bold text-gray-900">
                বার্তা পাঠান
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                <span className="text-rose-600">*</span> চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="আপনার নাম" required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                      placeholder="আপনার পূর্ণ নাম"
                    />
                  </Field>
                  <Field id="email" label="আপনার ইমেইল" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={200}
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                      placeholder="example@gmail.com"
                    />
                  </Field>
                  <Field id="phone" label="মোবাইল নাম্বার">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={40}
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                      placeholder="01XXXXXXXXX"
                    />
                  </Field>
                  <Field id="bio" label="বায়োডাটা নং" hint="বায়োডাটা সংক্রান্ত প্রশ্ন হলে দিন">
                    <input
                      id="bio"
                      name="bio"
                      type="text"
                      maxLength={40}
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                      placeholder="যেমন: 2102"
                    />
                  </Field>
                </div>

                <Field id="message" label="আপনার বার্তা" required>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-describedby="message-count"
                    className={`${inputClass} resize-y`}
                    placeholder="আপনার সমস্যা বা প্রশ্ন বিস্তারিত লিখুন"
                  />
                  <p id="message-count" className="mt-1 text-right text-xs text-gray-400">
                    {toBn(formData.message.length)}/{toBn(MESSAGE_MAX)}
                  </p>
                </Field>

                {errorMessage && (
                  <div
                    className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
                    role="alert"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#0F8287] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${focusRing}`}
                >
                  {isSubmitting ? (
                    <ArrowPathIcon className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                  {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default ContactUs;
