import { GoogleLogin } from '@react-oauth/google';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { Link, useNavigate } from '@/lib/navigation';
import UserContext from '../../contexts/UserContext';
import { userServices } from '../../services/user';
import { setToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';

const getAuthErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

const signupBenefits = [
  'নিজের বিস্তারিত বায়োডাটা তৈরি করুন',
  'পছন্দ ও এলাকা অনুযায়ী প্রোফাইল খুঁজুন',
  'অ্যাকাউন্ট থেকে অনুরোধ ও পছন্দ পরিচালনা করুন',
];

const isValidEmail = (emailAddress) =>
  String(emailAddress)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export function Signup() {
  const { setTokenInfo, setUser, setUserInfo, setUserLoading } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const completeSignup = (response) => {
    const authenticatedUser = response?.data;

    if (
      !response?.success ||
      !authenticatedUser?.token ||
      !authenticatedUser?.email
    ) {
      throw new Error('সার্ভার থেকে সঠিক নিবন্ধন তথ্য পাওয়া যায়নি');
    }

    const nextTokenInfo = { token: authenticatedUser.token };
    setToken(nextTokenInfo);
    setTokenInfo(nextTokenInfo);
    setUser(authenticatedUser);
    setUserInfo(response);
    setUserLoading(false);
    navigate('/user/account/dashboard');
  };

  const googleSignup = async (credentialResponse) => {
    if (!acceptedTerms) {
      Toast.errorToast('নিবন্ধনের আগে শর্তাবলি মেনে নিন');
      return;
    }

    if (!credentialResponse?.credential) {
      Toast.errorToast('Google থেকে নিবন্ধনের তথ্য পাওয়া যায়নি');
      return;
    }

    const payload = { credential: credentialResponse.credential };
    if (username.trim()) payload.username = username.trim();
    if (gender) payload.gender = gender;

    try {
      setGoogleLoading(true);
      const response = await userServices.googleAuth(payload);
      completeSignup(response);
    } catch (error) {
      Toast.errorToast(
        getAuthErrorMessage(error, 'Google দিয়ে নিবন্ধন করা যায়নি')
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedEmail || !password || !trimmedUsername || !gender) {
      Toast.errorToast('সবগুলো তথ্য পূরণ করুন');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Toast.errorToast('সঠিক ইমেইল ঠিকানা লিখুন');
      return;
    }

    if (password.length < 6) {
      Toast.errorToast('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }

    if (!acceptedTerms) {
      Toast.errorToast('নিবন্ধনের আগে শর্তাবলি মেনে নিন');
      return;
    }

    try {
      setLoading(true);
      const response = await userServices.register({
        email: trimmedEmail,
        password,
        username: trimmedUsername,
        gender,
      });
      completeSignup(response);
    } catch (error) {
      Toast.errorToast(
        getAuthErrorMessage(error, 'নিবন্ধন সম্পন্ন করা যায়নি')
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
          aria-labelledby="signup-benefits-heading"
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
                className="h-auto w-36"
              />
            </Link>

            <p className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/85">
              <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
              নতুন যাত্রার শুরু
            </p>
            <h2
              id="signup-benefits-heading"
              className="mt-5 text-3xl font-bold leading-[1.35]"
            >
              পছন্দের জীবনসঙ্গী খুঁজতে আজই যোগ দিন
            </h2>
            <p className="mt-4 leading-8 text-white/75">
              একটি অ্যাকাউন্ট তৈরি করে নিজের বায়োডাটা প্রকাশ করুন এবং পছন্দ
              অনুযায়ী জীবনসঙ্গী খোঁজা শুরু করুন।
            </p>

            <ul className="mt-8 space-y-4">
              {signupBenefits.map((benefit) => (
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

        <section
          className="p-5 sm:p-9 lg:p-12"
          aria-labelledby="signup-heading"
        >
          <div className="mx-auto max-w-md">
            <div className="mb-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900 lg:hidden">
                <UserPlusIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-bold text-brand-900 lg:mt-0">
                নতুন অ্যাকাউন্ট
              </p>
              <h1
                id="signup-heading"
                className="mt-2 text-3xl font-bold text-gray-900"
              >
                নিবন্ধন করুন
              </h1>
              <p className="mt-3 leading-7 text-gray-500">
                প্রাথমিক তথ্য দিয়ে আপনার অ্যাকাউন্ট তৈরি করুন।
              </p>
            </div>

            <form onSubmit={handleSignUp} aria-busy={loading}>
              <fieldset disabled={isSubmitting} className="space-y-5">
                <div>
                  <label
                    htmlFor="signup-name"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    আপনার নাম
                  </label>
                  <div className="relative">
                    <UserIcon
                      className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      aria-hidden="true"
                    />
                    <input
                      id="signup-name"
                      name="username"
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="আপনার পূর্ণ নাম"
                      autoComplete="name"
                      className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
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
                      id="signup-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <LockClosedIcon
                      className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      aria-hidden="true"
                    />
                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      autoComplete="new-password"
                      minLength={6}
                      aria-describedby="signup-password-hint"
                      className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
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
                  <p
                    id="signup-password-hint"
                    className="mt-1.5 text-xs text-gray-400"
                  >
                    নিরাপত্তার জন্য কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড ব্যবহার করুন।
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="signup-gender"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    লিঙ্গ
                  </label>
                  <select
                    id="signup-gender"
                    name="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-gray-900 outline-none transition-colors duration-200 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  >
                    <option value="">লিঙ্গ নির্বাচন করুন</option>
                    <option value="পুরুষ">পুরুষ</option>
                    <option value="মহিলা">মহিলা</option>
                  </select>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-gray-600">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-900 accent-[#0D7377] focus:ring-brand-900"
                    required
                  />
                  <span>
                    আমি{' '}
                    <Link
                      to="/terms-and-condition"
                      className="font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
                    >
                      শর্তাবলি
                    </Link>{' '}
                    এবং{' '}
                    <Link
                      to="/privacy-policy"
                      className="font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
                    >
                      গোপনীয়তা নীতিমালা
                    </Link>{' '}
                    পড়েছি এবং সম্মত আছি।
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
                >
                  {loading ? (
                    <>
                      <span
                        className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
                        aria-hidden="true"
                      />
                      নিবন্ধন হচ্ছে...
                    </>
                  ) : (
                    'অ্যাকাউন্ট তৈরি করুন'
                  )}
                </button>
              </fieldset>
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
                  Google নিবন্ধন প্রস্তুত হচ্ছে...
                </div>
              ) : (
                <GoogleLogin
                  onSuccess={googleSignup}
                  onError={() =>
                    Toast.errorToast('Google দিয়ে নিবন্ধন করা যায়নি')
                  }
                  text="signup_with"
                  size="large"
                  width="280"
                  shape="rectangular"
                  theme="outline"
                />
              )}
            </div>

            <p className="mt-7 text-center text-sm leading-6 text-gray-500">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link
                to="/login"
                className="rounded font-bold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
              >
                লগইন করুন
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
