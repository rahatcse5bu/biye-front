import { useState } from 'react';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate, useSearchParams } from '@/lib/navigation';
import { userServices } from '../../../services/user';
import { Toast } from '../../../utils/toast';

const MIN_LENGTH = 6;

const inputClass =
  'min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60';

const primaryButtonClass =
  'mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none';

const linkClass =
  'rounded font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900';

const statusMessages = {
  429: 'অনেকবার চেষ্টা করা হয়েছে, কিছুক্ষণ পর আবার চেষ্টা করুন',
  503: 'এই মুহূর্তে ইমেইল পাঠানো যায়নি, কয়েক মিনিট পর আবার চেষ্টা করুন',
};

const getErrorMessage = (error, fallback) =>
  statusMessages[error?.response?.status] ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

const Spinner = () => (
  <span
    className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
    aria-hidden="true"
  />
);

const PasswordInput = ({ id, label, value, onChange, disabled, hint, invalid }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="mt-5">
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <LockClosedIcon
          className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="new-password"
          className={`${inputClass} pr-12`}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
          required
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-1.5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-200 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
          aria-label={visible ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {hint && (
        <p
          id={`${id}-hint`}
          className={`mt-1.5 text-xs ${invalid ? 'text-rose-600' : 'text-gray-500'}`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

function RequestResetForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    try {
      setLoading(true);
      await userServices.forgotPassword({ email: trimmed });
      setSentTo(trimmed);
    } catch (error) {
      Toast.errorToast(getErrorMessage(error, 'অনুরোধ পাঠানো যায়নি, আবার চেষ্টা করুন'));
    } finally {
      setLoading(false);
    }
  };

  if (sentTo) {
    return (
      <div role="status">
        <CheckCircleIcon className="h-12 w-12 text-brand-900" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">ইমেইল চেক করুন</h1>
        <p className="mt-3 leading-7 text-gray-600">
          <span className="font-semibold text-gray-900">{sentTo}</span> ঠিকানায়
          কোনো অ্যাকাউন্ট থাকলে পাসওয়ার্ড রিসেটের লিংক পাঠানো হয়েছে। লিংকটি ৩০
          মিনিট পর্যন্ত কার্যকর থাকবে।
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          ইমেইল না পেলে স্প্যাম ফোল্ডার দেখুন, অথবা এক মিনিট পর{' '}
          <button type="button" onClick={() => setSentTo('')} className={linkClass}>
            আবার চেষ্টা করুন
          </button>
          ।
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">পাসওয়ার্ড ভুলে গেছেন?</h1>
      <p className="mt-3 leading-7 text-gray-500">
        আপনার নিবন্ধিত ইমেইল লিখুন। আমরা পাসওয়ার্ড রিসেটের একটি লিংক পাঠাব।
      </p>
      <form onSubmit={handleSubmit} aria-busy={loading} className="mt-6">
        <label htmlFor="forgot-email" className="mb-2 block text-sm font-bold text-gray-700">
          ইমেইল ঠিকানা
        </label>
        <div className="relative">
          <EnvelopeIcon
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            className={inputClass}
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={primaryButtonClass}>
          {loading ? (
            <>
              <Spinner />
              পাঠানো হচ্ছে...
            </>
          ) : (
            'রিসেট লিংক পাঠান'
          )}
        </button>
      </form>
    </>
  );
}

function ResetPasswordForm({ token }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const mismatch = confirmPassword.length > 0 && confirmPassword !== password;
  const canSubmit = password.length >= MIN_LENGTH && confirmPassword === password;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      await userServices.resetPassword({ token, password });
      Toast.successToast('পাসওয়ার্ড পরিবর্তন হয়েছে, এখন লগইন করুন');
      navigate('/login', { replace: true });
    } catch (error) {
      Toast.errorToast(
        error?.response?.status === 400 && /invalid|expired/i.test(error?.response?.data?.message)
          ? 'লিংকটি অকার্যকর বা মেয়াদোত্তীর্ণ, নতুন লিংকের অনুরোধ করুন'
          : getErrorMessage(error, 'পাসওয়ার্ড পরিবর্তন করা যায়নি')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">নতুন পাসওয়ার্ড সেট করুন</h1>
      <p className="mt-3 leading-7 text-gray-500">
        আপনার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড লিখুন।
      </p>
      <form onSubmit={handleSubmit} aria-busy={loading} className="mt-1">
        <PasswordInput
          id="reset-password"
          label="নতুন পাসওয়ার্ড"
          value={password}
          onChange={setPassword}
          disabled={loading}
          invalid={tooShort}
          hint="কমপক্ষে ৬ অক্ষর"
        />
        <PasswordInput
          id="reset-confirm-password"
          label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={loading}
          invalid={mismatch}
          hint={mismatch ? 'পাসওয়ার্ড দুটি মিলছে না' : undefined}
        />
        <button type="submit" disabled={!canSubmit || loading} className={primaryButtonClass}>
          {loading ? (
            <>
              <Spinner />
              সেভ হচ্ছে...
            </>
          ) : (
            'পাসওয়ার্ড সেভ করুন'
          )}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-500">
        লিংকের মেয়াদ শেষ?{' '}
        <Link to="/forgot-password" className={linkClass}>
          নতুন লিংক নিন
        </Link>
      </p>
    </>
  );
}

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <main className="bg-[#F7F9F9] px-4 py-10 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-9">
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900">
          <KeyIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        {token ? <ResetPasswordForm token={token} /> : <RequestResetForm />}
        <p className="mt-7 border-t border-gray-100 pt-5 text-center text-sm text-gray-500">
          পাসওয়ার্ড মনে পড়েছে?{' '}
          <Link to="/login" className={linkClass}>
            লগইন করুন
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;
