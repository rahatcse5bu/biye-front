'use client';

import { useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@/lib/navigation';
import {
  CONSENT_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  getConsent,
  saveConsent,
} from '@/utils/cookies';

const categories = [
  {
    key: 'necessary',
    title: 'প্রয়োজনীয়',
    locked: true,
    description:
      'লগইন, নিরাপত্তা ও আপনার কুকি পছন্দ মনে রাখার জন্য দরকারি। এগুলো ছাড়া সাইট ঠিকমতো কাজ করবে না, তাই বন্ধ করা যায় না।',
    items: [
      { name: 'token', detail: 'লগইন অবস্থা ধরে রাখে · ৩০ দিন' },
      { name: 'biye_consent', detail: 'আপনার কুকি পছন্দ মনে রাখে · ১৮০ দিন' },
      { name: 'Google লগইন', detail: 'Google দিয়ে লগইনের জন্য Google-এর স্ক্রিপ্ট', script: true },
    ],
  },
  {
    key: 'preferences',
    title: 'পছন্দ',
    description:
      'আপনার বেছে নেওয়া ধর্ম ফিল্টার মনে রাখে, যাতে প্রতিবার নতুন করে বাছাই করতে না হয়।',
    items: [{ name: 'biye_religion', detail: 'ধর্ম ফিল্টারের পছন্দ · ১ বছর' }],
  },
];

const primaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none';
const secondaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-900/30 bg-white px-5 py-2.5 text-sm font-bold text-brand-900 transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none';

function Switch({ checked, disabled, onChange, labelledBy }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed motion-reduce:transition-none ${
        checked ? 'bg-brand-900' : 'bg-gray-300'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 motion-reduce:transition-none ${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function SettingsDialog({ initial, onSave, onClose }) {
  const dialogRef = useRef(null);
  const [choices, setChoices] = useState({ preferences: Boolean(initial?.preferences) });

  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previous?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-settings-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border-0 bg-white p-0 text-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 pb-4 pt-6">
        <div>
          <h2 id="cookie-settings-title" className="text-lg font-bold">
            কুকি সেটিংস
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            কোন ধরনের কুকি আমরা ব্যবহার করতে পারব তা বেছে নিন। বিজ্ঞাপন বা
            ট্র্যাকিংয়ের কোনো কুকি আমরা ব্যবহার করি না।
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
          aria-label="বন্ধ করুন"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <ul className="space-y-3 px-6 py-5">
        {categories.map((category) => {
          const checked = category.locked || choices[category.key];
          const titleId = `cookie-category-${category.key}`;
          return (
            <li key={category.key} className="rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 id={titleId} className="font-bold text-gray-900">
                  {category.title}
                  {category.locked && (
                    <span className="ml-2 rounded-full bg-brand-900/10 px-2 py-0.5 text-xs font-semibold text-brand-900">
                      সবসময় চালু
                    </span>
                  )}
                </h3>
                <Switch
                  checked={checked}
                  disabled={category.locked}
                  labelledBy={titleId}
                  onChange={(value) => setChoices((current) => ({ ...current, [category.key]: value }))}
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{category.description}</p>
              <ul className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                {category.items.map((item) => (
                  <li key={item.name} className="text-xs leading-5 text-gray-500">
                    {item.script ? (
                      <span className="font-semibold text-gray-700">{item.name}</span>
                    ) : (
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-700">
                        {item.name}
                      </code>
                    )}{' '}
                    {item.detail}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => onSave(choices)} className={secondaryButton}>
          সেটিংস সংরক্ষণ করুন
        </button>
        <button type="button" onClick={() => onSave({ preferences: true })} className={primaryButton}>
          সব গ্রহণ করুন
        </button>
      </div>
    </dialog>
  );
}

export default function CookieConsent() {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(getConsent());
    setReady(true);
    const open = () => setSettingsOpen(true);
    const sync = (event) => setConsent(event.detail);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
      window.removeEventListener(CONSENT_EVENT, sync);
    };
  }, []);

  const save = (choices) => {
    saveConsent(choices);
    setSettingsOpen(false);
  };

  if (!ready) return null;

  return (
    <>
      {!consent && !settingsOpen && (
        <section
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-[9000] mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_16px_48px_rgba(15,23,42,0.18)] sm:p-5 lg:bottom-5"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <h2 id="cookie-banner-title" className="font-bold text-gray-900">
                আমরা কুকি ব্যবহার করি
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                লগইন ধরে রাখতে প্রয়োজনীয় কুকি লাগে। আপনার অনুমতি নিয়ে আমরা
                আপনার ধর্ম ফিল্টারের পছন্দও মনে রাখি।{' '}
                <Link
                  to="/privacy-policy"
                  className="rounded font-semibold text-brand-900 underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
                >
                  বিস্তারিত
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center md:shrink-0">
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="order-last col-span-2 min-h-9 rounded-lg text-sm font-semibold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 sm:order-first sm:px-3"
              >
                কাস্টমাইজ
              </button>
              <button type="button" onClick={() => save({ preferences: false })} className={secondaryButton}>
                শুধু প্রয়োজনীয়
              </button>
              <button type="button" onClick={() => save({ preferences: true })} className={primaryButton}>
                সব গ্রহণ করুন
              </button>
            </div>
          </div>
        </section>
      )}
      {settingsOpen && (
        <SettingsDialog initial={consent} onSave={save} onClose={() => setSettingsOpen(false)} />
      )}
    </>
  );
}
