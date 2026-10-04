import { useEffect, useRef, useState } from 'react';
import { convertToBengaliDigits } from '../../../utils/language';

export const toBn = (value) => convertToBengaliDigits(String(value));

// TODO: only same-site paths, so a crafted link can't send users to another domain.
export const safePath = (value, fallback) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : fallback;

// TODO: "null"/"undefined" leak into query strings from older links; treat them as empty.
export const cleanParam = (value) =>
  value && value !== 'null' && value !== 'undefined' ? value : '';

export const buildUrl = (path, params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
  });
  const text = query.toString();
  return text ? `${path}?${text}` : path;
};

export const useCountdown = (seconds, onDone, enabled = true) => {
  const [left, setLeft] = useState(seconds);
  const done = useRef(onDone);
  done.current = onDone;
  // TODO: fire once; a failed action is retried by the user, not by the timer.
  const fired = useRef(false);

  useEffect(() => {
    if (!enabled || fired.current) return undefined;
    if (left <= 0) {
      fired.current = true;
      done.current();
      return undefined;
    }
    const timer = setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [left, enabled]);

  return left;
};

const tones = {
  success: { ring: 'bg-emerald-50 ring-emerald-100', icon: 'text-emerald-600', bar: 'bg-emerald-500' },
  error: { ring: 'bg-rose-50 ring-rose-100', icon: 'text-rose-600', bar: 'bg-rose-500' },
  info: { ring: 'bg-[#0D7377]/10 ring-[#0D7377]/10', icon: 'text-[#0D7377]', bar: 'bg-[#0D7377]' },
};

export const PayResultShell = ({ tone = 'info', icon, title, subtitle, children, progress }) => {
  const style = tones[tone];
  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gradient-to-b from-[#0D7377]/[0.06] to-transparent px-4 py-10">
      <section
        className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_40px_rgba(13,115,119,0.12)]"
        aria-live="polite"
      >
        {typeof progress === 'number' && (
          <div className="h-1 w-full bg-gray-100" aria-hidden="true">
            <div
              className={`h-full ${style.bar} transition-[width] duration-1000 ease-linear motion-reduce:transition-none`}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
        )}
        <div className="px-6 pb-7 pt-8 text-center sm:px-8">
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ring-8 ${style.ring}`}>
            <span className={style.icon}>{icon}</span>
          </div>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm leading-6 text-gray-600">{subtitle}</p>}
          {children}
        </div>
      </section>
    </main>
  );
};

export const Spinner = ({ className = 'h-10 w-10' }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
    <path fill="currentColor" className="opacity-90" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
  </svg>
);

export const primaryButton =
  'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D7377] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40 focus-visible:ring-offset-2 disabled:opacity-60';

export const secondaryButton =
  'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300';
