import { religionToApiKey } from "../../constants/religionContent";

const svgPattern = (markup) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='none' stroke='white' stroke-width='1'>${markup}</svg>`,
  )}")`;

const CrescentEmblem = (props) => (
  <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
    <path d="M38 6a26 26 0 1 0 20 42A22 22 0 1 1 38 6Z" />
    <path d="m46 18 2.4 6.2 6.6.3-5.2 4.1 1.8 6.4-5.6-3.7-5.6 3.7 1.8-6.4-5.2-4.1 6.6-.3Z" />
  </svg>
);

const LotusEmblem = (props) => (
  <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
    <path d="M32 8c6 7 8 15 6 24-2 6-4 9-6 11-2-2-4-5-6-11-2-9 0-17 6-24Z" />
    <path d="M10 22c9 1 16 6 19 14 1 3 2 6 2 8-9 0-16-4-19-11-1-4-2-7-2-11Zm44 0c0 4-1 7-2 11-3 7-10 11-19 11 0-2 1-5 2-8 3-8 10-13 19-14Z" />
    <path d="M6 44c8-3 17-2 26 4 9-6 18-7 26-4-6 8-15 11-26 11S12 52 6 44Z" />
  </svg>
);

const CrossEmblem = (props) => (
  <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
    <path d="M27 4h10v14h14v10H37v32H27V28H13V18h14Z" />
  </svg>
);

// TODO: full class strings only (JIT); withMT drops emerald/sky from the palette, so use hex for those.
const THEMES = {
  islam: {
    label: { base: "মুসলিম", practicing: "প্র্যাক্টিসিং মুসলিম" },
    badge: "bg-[#ECFDF5] text-[#047857] ring-[#A7F3D0]",
    header: "bg-brand-900",
    pattern: svgPattern(
      "<path d='M20 6l4 10 10 4-10 4-4 10-4-10-10-4 10-4z'/><rect x='12' y='12' width='16' height='16' transform='rotate(45 20 20)'/>",
    ),
    Emblem: CrescentEmblem,
    avatar: { male: "/assets/icons/male.svg", female: "/assets/icons/female.svg" },
    photoRingOffset: "focus-visible:ring-offset-brand-900",
    chip: "bg-brand-900/10 text-brand-900",
    cardHover: "hover:border-brand-900/25",
    accentBar: "bg-[#6EE7B7]",
    button:
      "bg-brand-900 hover:bg-[#0F8287] focus-visible:ring-brand-900",
    shareButton:
      "border-brand-900/20 text-brand-900 hover:bg-brand-900/5 focus-visible:ring-brand-900",
  },
  hinduism: {
    label: { base: "হিন্দু", practicing: "প্র্যাক্টিসিং হিন্দু" },
    badge: "bg-orange-50 text-orange-700 ring-orange-200",
    header: "bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#C2410C]",
    pattern: svgPattern(
      "<circle cx='20' cy='20' r='3'/><ellipse cx='20' cy='11' rx='3' ry='6'/><ellipse cx='20' cy='29' rx='3' ry='6'/><ellipse cx='11' cy='20' rx='6' ry='3'/><ellipse cx='29' cy='20' rx='6' ry='3'/>",
    ),
    Emblem: LotusEmblem,
    avatar: {
      male: "/assets/icons/hindu-male.svg",
      female: "/assets/icons/hindu-female.svg",
    },
    photoRingOffset: "focus-visible:ring-offset-[#9A3412]",
    chip: "bg-orange-100 text-orange-800",
    cardHover: "hover:border-orange-700/30",
    accentBar: "bg-amber-300",
    button:
      "bg-[#B4410E] hover:bg-[#9A3412] focus-visible:ring-[#B4410E]",
    shareButton:
      "border-orange-800/20 text-orange-800 hover:bg-orange-50 focus-visible:ring-[#B4410E]",
  },
  christianity: {
    label: { base: "খ্রিস্টান", practicing: "প্র্যাক্টিসিং খ্রিস্টান" },
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    header: "bg-gradient-to-br from-[#172554] via-[#1E3A8A] to-[#1D4ED8]",
    pattern: svgPattern("<path d='M20 12v16M14 18h12'/>"),
    Emblem: CrossEmblem,
    avatar: {
      male: "/assets/icons/christian-male.svg",
      female: "/assets/icons/christian-female.svg",
    },
    photoRingOffset: "focus-visible:ring-offset-[#1E3A8A]",
    chip: "bg-blue-100 text-blue-800",
    cardHover: "hover:border-blue-800/30",
    accentBar: "bg-[#7DD3FC]",
    button:
      "bg-[#1E3A8A] hover:bg-[#1D4ED8] focus-visible:ring-[#1E3A8A]",
    shareButton:
      "border-blue-800/20 text-blue-800 hover:bg-blue-50 focus-visible:ring-[#1E3A8A]",
  },
};

const PRACTICING_TYPES = new Set([
  "practicing_muslim",
  "practicing_hindu",
  "practicing_christian",
]);

// TODO: records without a religion predate multi-religion support and are Islamic.
export const getReligionCardTheme = (religion, religiousType) => {
  const key = religionToApiKey[religion] || "islam";
  const theme = THEMES[key] || THEMES.islam;

  return {
    key,
    ...theme,
    badgeLabel: PRACTICING_TYPES.has(religiousType)
      ? theme.label.practicing
      : theme.label.base,
  };
};
