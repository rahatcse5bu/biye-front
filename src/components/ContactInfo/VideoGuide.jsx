import { useState } from 'react';
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { trackEvent } from '@/utils/analytics';

// TODO: self-hosted tutorial videos for the two-step contact flow.
export const GUIDES = {
  proposal: {
    src: '/videos/proposal-guide.mp4',
    poster: '/videos/proposal-guide-poster.jpg',
    subtitle: 'প্রস্তাব (অনুরোধ) পাঠানোর নিয়ম — ৫টি সহজ ধাপে',
    event: 'proposal_guide_play',
  },
  contact: {
    src: '/videos/contact-guide.mp4',
    poster: '/videos/contact-guide-poster.jpg',
    subtitle: 'অভিভাবকের যোগাযোগ তথ্য নেওয়ার নিয়ম — ৩টি সহজ ধাপে',
    event: 'contact_guide_play',
  },
};

// TODO: nothing is downloaded until the video is played.
export const GuideVideo = ({ guide, autoPlay = false }) => {
  const { src, poster, event } = GUIDES[guide];
  return (
    <video
      className="aspect-video w-full rounded-xl bg-black"
      src={src}
      poster={poster}
      controls
      playsInline
      preload="none"
      autoPlay={autoPlay}
      onPlay={() => trackEvent(event)}
    >
      আপনার ব্রাউজার ভিডিওটি চালাতে পারছে না।
    </video>
  );
};

// TODO: collapsible inline guide inside the contact section.
export default function VideoGuide({ guide, heading = 'প্রথমবার? ভিডিও গাইড দেখে নিন' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-900/15 bg-brand-900/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
      >
        <PlayCircleIcon className="h-7 w-7 shrink-0 text-red-500" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-gray-900">{heading}</span>
          <span className="block text-xs text-gray-500">{GUIDES[guide].subtitle}</span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-3 pb-3">
          <GuideVideo guide={guide} autoPlay />
        </div>
      )}
    </div>
  );
}
