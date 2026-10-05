'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FaWhatsapp,
  FaFacebookF,
  FaFacebookMessenger,
  FaTelegramPlane,
  FaLinkedinIn,
  FaShareAlt,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  CheckIcon,
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon,
  LinkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const isMobileDevice = () =>
  typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// TODO: each target opens its own share page or app with the link (and text where supported).
const buildTargets = (url, text) => {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  const both = encodeURIComponent(`${text}\n${url}`);
  return [
    { name: 'WhatsApp', Icon: FaWhatsapp, color: 'bg-[#25D366]', href: `https://wa.me/?text=${both}` },
    { name: 'Facebook', Icon: FaFacebookF, color: 'bg-[#1877F2]', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    // TODO: the web Messenger dialog needs a Facebook app id, so Messenger is offered only on phones.
    isMobileDevice() && { name: 'Messenger', Icon: FaFacebookMessenger, color: 'bg-gradient-to-br from-[#00B2FF] to-[#A033FF]', href: `fb-messenger://share/?link=${u}` },
    { name: 'Telegram', Icon: FaTelegramPlane, color: 'bg-[#229ED9]', href: `https://t.me/share/url?url=${u}&text=${t}` },
    { name: 'X', Icon: FaXTwitter, color: 'bg-black', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: 'LinkedIn', Icon: FaLinkedinIn, color: 'bg-[#0A66C2]', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'ইমেইল', Icon: EnvelopeIcon, color: 'bg-gray-700', href: `mailto:?subject=${t}&body=${both}` },
    isMobileDevice() && { name: 'SMS', Icon: ChatBubbleLeftEllipsisIcon, color: 'bg-emerald-600', href: `sms:?body=${both}` },
  ].filter(Boolean);
};

export default function ShareModal({ isOpen, onClose, url, title, text }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const closeRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    setCopied(false);
    closeRef.current?.focus();
    const onKey = (event) => event.key === 'Escape' && onClose();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const targets = buildTargets(url, text);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // TODO: older browsers without the Clipboard API; select the text so it can be copied by hand.
      inputRef.current?.select();
      document.execCommand?.('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text, url });
      onClose();
    } catch {
      // The user closed the system share sheet; keep the modal open.
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9000000] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        className="relative w-full max-w-md rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:p-6"
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-200 sm:hidden" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="share-modal-title" className="text-lg font-bold text-gray-900">
              শেয়ার করুন
            </h2>
            {title && <p className="mt-0.5 truncate text-sm text-gray-500">{title}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
            aria-label="বন্ধ করুন"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-x-2 gap-y-4">
          {targets.map(({ name, Icon, color, href }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => setTimeout(onClose, 300)}
              className="group flex flex-col items-center gap-1.5 rounded-xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:scale-105 motion-reduce:transition-none ${color}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-gray-700">{name}</span>
            </a>
          ))}
          {canNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="group flex flex-col items-center gap-1.5 rounded-xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-sm transition-transform group-hover:scale-105 motion-reduce:transition-none">
                <FaShareAlt className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-gray-700">আরও অপশন</span>
            </button>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="share-link" className="mb-1.5 block text-xs font-semibold text-gray-500">
            লিংক কপি করুন
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5 pl-3">
            <LinkIcon className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            <input
              ref={inputRef}
              id="share-link"
              readOnly
              value={url}
              onFocus={(event) => event.target.select()}
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-gray-700 outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={copyLink}
              className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors ${
                copied ? 'bg-emerald-600' : 'bg-brand-900 hover:bg-[#0F8287]'
              }`}
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4" aria-hidden="true" /> কপি হয়েছে
                </>
              ) : (
                'কপি'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
