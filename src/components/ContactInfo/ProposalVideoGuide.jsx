import { useState } from 'react';
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { trackEvent } from '@/utils/analytics';

export const PROPOSAL_GUIDE_SRC = '/videos/proposal-guide.mp4';
export const PROPOSAL_GUIDE_POSTER = '/videos/proposal-guide-poster.jpg';

// TODO: self-hosted "প্রস্তাব পাঠানোর নিয়ম" video; nothing is downloaded until it is played.
export const ProposalGuideVideo = ({ autoPlay = false }) => (
  <video
    className="aspect-video w-full rounded-xl bg-black"
    src={PROPOSAL_GUIDE_SRC}
    poster={PROPOSAL_GUIDE_POSTER}
    controls
    playsInline
    preload="none"
    autoPlay={autoPlay}
    onPlay={() => trackEvent('proposal_guide_play')}
  >
    আপনার ব্রাউজার ভিডিওটি চালাতে পারছে না।
  </video>
);

// TODO: collapsible inline guide shown before the first proposal is sent.
export default function ProposalVideoGuide() {
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
          <span className="block text-sm font-semibold text-gray-900">প্রথমবার? ভিডিও গাইড দেখে নিন</span>
          <span className="block text-xs text-gray-500">প্রস্তাব (অনুরোধ) পাঠানোর নিয়ম — ৫টি সহজ ধাপে</span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-3 pb-3">
          <ProposalGuideVideo autoPlay />
        </div>
      )}
    </div>
  );
}
