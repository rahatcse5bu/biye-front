import { GoogleLogin } from '@react-oauth/google';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from '@/lib/navigation';
import UserContext from '../../contexts/UserContext';
import { userServices } from '../../services/user';
import { setToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';

const getAuthErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

const loginBenefits = [
  'পছন্দের বায়োডাটা সংরক্ষণ করুন',
  'যোগাযোগের অনুরোধ পরিচালনা করুন',
  'নিজের বায়োডাটা সহজে আপডেট করুন',
];

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { setTokenInfo, setUser, setUserInfo, setUserLoading } =
    useContext(UserContext);
  const [searchParams] = useSearchParams();
  const requestedPath = searchParams.get('from');
  const from =
    requestedPath?.startsWith('/') && !requestedPath.startsWith('//')
      ? requestedPath
      : '/user/account/dashboard';
  const navigate = useNavigate();

  const completeLogin = (response) => {
    const authenticatedUser = response?.data;

    if (
      !response?.success ||
      !authenticatedUser?.token ||
      !authenticatedUser?.email
    ) {
      throw new Error('সার্ভার থেকে সঠিক লগইন তথ্য পাওয়া যায়নি');
    }

    const nextTokenInfo = { token: authenticatedUser.token };
    setToken(nextTokenInfo);
    setTokenInfo(nextTokenInfo);
    setUser(authenticatedUser);
    setUserInfo(response);
    setUserLoading(false);
    navigate(from, { replace: true });
  };

  const googleSignin = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      Toast.errorToast('Google থেকে লগইনের তথ্য পাওয়া যায়নি');
      return;
    }

    try {
      setGoogleLoading(true);
      const response = await userServices.googleAuth({
        credential: credentialResponse.credential,
      });
      completeLogin(response);
    } catch (error) {
      Toast.errorToast(
        getAuthErrorMessage(error, 'Google দিয়ে লগইন করা যায়নি')
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      Toast.errorToast('ইমেইল ও পাসওয়ার্ড লিখুন');
      return;
    }

    try {
      setLoading(true);
      const response = await userServices.login({
        email: email.trim(),
        password,
      });
      completeLogin(response);
    } catch (error) {
      Toast.errorToast(
        getAuthErrorMessage(error, 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়')
      );
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = loading || googleLoading;

  return (
    <main className="bg-[#F7F9F9] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] lg:grid-cols-[0.9fr_1.1fr]">
        <section
          className="hidden flex-col justify-between bg-brand-900 p-10 text-white lg:flex"
          aria-labelledby="login-benefits-heading"
        >
          <div>
            <Link
              to="/"
              className="inline-flex rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="বিয়ে হোম পেজ"
            >
              <img
                src="/assets/logo/biye-logo.svg"
                alt="বিয়ে বাংলাদেশী ম্যাট্রিমনি"
                width="220"
                height="70"
                className="h-auto w-36"
              />
            </Link>

            <p className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/85">
              <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
              নিরাপদ অ্যাকাউন্ট প্রবেশ
            </p>
            <h2
              id="login-benefits-heading"
              className="mt-5 text-3xl font-bold leading-[1.35]"
            >
              আপনার জীবনসঙ্গী খোঁজার যাত্রায় আবার স্বাগতম
            </h2>
            <p className="mt-4 leading-8 text-white/75">
              আপনার অ্যাকাউন্টে প্রবেশ করে বায়োডাটা, পছন্দের তালিকা ও যোগাযোগের
              অনুরোধ এক জায়গা থেকে পরিচালনা করুন।
            </p>

            <ul className="mt-8 space-y-4">
              {loginBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-white/85"
                >
                  <CheckCircleIcon
                    className="h-5 w-5 shrink-0 text-[#F8DDE5]"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 border-t border-white/15 pt-5 text-sm leading-6 text-white/60">
            সেবা এলাকা: বাংলাদেশ
          </p>
        </section>

        <section className="p-5 sm:p-9 lg:p-12" aria-labelledby="login-heading">
          <div className="mx-auto max-w-md">
            <div className="mb-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900 lg:hidden">
                <LockClosedIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-bold text-brand-900 lg:mt-0">
                আপনার অ্যাকাউন্ট
              </p>
              <h1
                id="login-heading"
                className="mt-2 text-3xl font-bold text-gray-900"
              >
                স্বাগতম, লগইন করুন
              </h1>
              <p className="mt-3 leading-7 text-gray-500">
                আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড ব্যবহার করুন।
              </p>
            </div>

            <form onSubmit={handleSignIn} aria-busy={loading}>
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <EnvelopeIcon
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-bold text-gray-700"
                  >
                    পাসওয়ার্ড
                  </label>
                  <Link
                    to="/forgot-password"
                    className="rounded text-sm font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </div>
                <div className="relative">
                  <LockClosedIcon
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="আপনার পাসওয়ার্ড"
                    autoComplete="current-password"
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-1.5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-200 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 motion-reduce:transition-none"
                    aria-label={
                      showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
              >
                {loading ? (
                  <>
                    <span
                      className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  'লগইন করুন'
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-400">অথবা</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div
              className="flex min-h-11 items-center justify-center overflow-hidden rounded-xl"
              aria-busy={googleLoading}
            >
              {googleLoading ? (
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900"
                  role="status"
                >
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-brand-900/20 border-t-brand-900 motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  Google লগইন প্রস্তুত হচ্ছে...
                </div>
              ) : (
                <GoogleLogin
                  onSuccess={googleSignin}
                  onError={() =>
                    Toast.errorToast('Google দিয়ে লগইন করা যায়নি')
                  }
                  text="signin_with"
                  size="large"
                  width="280"
                  shape="rectangular"
                  theme="outline"
                />
              )}
            </div>

            <p className="mt-7 text-center text-sm leading-6 text-gray-500">
              নতুন সদস্য?{' '}
              <Link
                to="/signup"
                className="rounded font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
              >
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>

            <p className="mt-4 text-center text-xs leading-6 text-gray-400">
              লগইন করার মাধ্যমে আপনি আমাদের{' '}
              <Link
                to="/terms-and-condition"
                className="underline hover:text-brand-900"
              >
                শর্তাবলি
              </Link>{' '}
              ও{' '}
              <Link
                to="/privacy-policy"
                className="underline hover:text-brand-900"
              >
                গোপনীয়তা নীতিমালা
              </Link>{' '}
              মেনে নিচ্ছেন।
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
