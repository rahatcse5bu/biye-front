import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CustomModal from "../../CustomModal/CustomModal";
import { aboutContent } from "@/constants/religionContent";

const AboutFeature = ({ content }) => {
  const [openModal, setOpenModal] = useState(false);
  const about = { ...aboutContent.islam, ...content };

  return (
    <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-900/15 bg-brand-900/5 p-5 sm:flex-row sm:items-center sm:p-6">
      <div>
        <p className="text-sm font-bold text-brand-900">{about.eyebrow}</p>
        <h3 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
          {about.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          {about.description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none sm:w-auto"
        aria-label="বিয়ের ফিচার সম্পর্কিত ভিডিও দেখুন"
      >
        <PlayIcon className="h-5 w-5" aria-hidden="true" />
        ভিডিও দেখুন
      </button>

      <CustomModal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        title="বিয়ের ব্যতিক্রমী ফিচারসমূহ"
      >
        <LiteYouTubeEmbed
          id="czYI7NaHymg"
          title="বিয়ের ব্যতিক্রমী ফিচারসমূহ"
        />
      </CustomModal>
    </div>
  );
};

export default AboutFeature;
