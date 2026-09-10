"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { religionToApiKey } from "@/constants/religionContent";
import { getReligionCookie, setReligionCookie } from "@/utils/cookies";

const ReligionPreferenceContext = createContext(null);

const LEGAL_PAGE_PATHS = new Set([
  "/refund-policy",
  "/terms-and-condition",
  "/privacy-policy",
]);

function IslamIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3a9 9 0 0 0 0 18c.7 0 1.4-.08 2.1-.24A7 7 0 0 1 9.5 8.5a7 7 0 0 1 2.5-.5z" fill="currentColor" />
      <path d="M16.5 6.5a.75.75 0 0 0 0 1.5.75.75 0 0 0 0-1.5zM15 8a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" fill="currentColor" />
    </svg>
  );
}

function HinduismIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3C8 3 5 6 5 9c0 2 1 3.5 2 4.5C6 14.5 5 16 5 18c0 3.3 3.1 6 7 6s7-2.7 7-6c0-2-1-3.5-2-4.5 1-1 2-2.5 2-4.5 0-3-3-6-7-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 7c1.5 1 2.5 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 7c-1.5 1-2.5 2-4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChristianityIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const options = [
  { value: "islam", Icon: IslamIcon, label: "ইসলাম", detail: "মুসলিম পাত্র-পাত্রীর জন্য" },
  { value: "hinduism", Icon: HinduismIcon, label: "হিন্দু", detail: "হিন্দু পাত্র-পাত্রীর জন্য" },
  { value: "christianity", Icon: ChristianityIcon, label: "খ্রিস্টান", detail: "খ্রিস্টান পাত্র-পাত্রীর জন্য" },
];

function ReligionForm({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <form
      className="px-4 pb-4 pt-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSelect(selected);
      }}
    >
      <fieldset className="space-y-2">
        <legend className="sr-only">ধর্ম নির্বাচন করুন</legend>
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <label
              key={option.value}
              className={`group flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-3 py-2.5 transition-all duration-150 ${
                isSelected
                  ? "border-[#0D7377] bg-[#0D7377]/[0.04]"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="religion"
                value={option.value}
                checked={isSelected}
                onChange={() => setSelected(option.value)}
                className="sr-only"
              />
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-150 ${
                  isSelected
                    ? "bg-[#0D7377] text-white shadow-md shadow-[#0D7377]/20"
                    : "bg-gray-100 text-[#0D7377] group-hover:bg-gray-200/70"
                }`}
              >
                <option.Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold ${isSelected ? "text-[#0D7377]" : "text-gray-800"}`}>
                  {option.label}
                </div>
                <div className="text-[11px] text-gray-400">{option.detail}</div>
              </div>
              <div
                className={`h-5 w-5 shrink-0 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-150 ${
                  isSelected
                    ? "border-[#0D7377] bg-[#0D7377]"
                    : "border-gray-300 group-hover:border-gray-400"
                }`}
              >
                {isSelected && (
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-4 space-y-2">
        <button
          type="submit"
          disabled={!selected}
          className="h-11 w-full rounded-xl bg-[#0D7377] text-sm font-bold text-white transition-all duration-150 hover:bg-[#0a5f62] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
        >
          এগিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="h-9 w-full rounded-xl text-xs font-semibold text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-600"
        >
          সকল ধর্ম দেখুন
        </button>
      </div>

      <p className="mt-3 text-center text-[10px] text-gray-400">
        শুধু ব্রাউজিং পছন্দ। পরিবর্তন করতে হেডার ব্যবহার করুন।
      </p>
    </form>
  );
}

function DialogModal({ onClose, onSelect }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="religion-dialog-title"
      aria-describedby="religion-dialog-description"
      onCancel={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border-0 bg-white p-0 text-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="bg-gradient-to-b from-[#0D7377] to-[#085860] px-5 pb-4 pt-5 text-center text-white">
        <h2 id="religion-dialog-title" className="text-lg font-extrabold">
          পছন্দ বাছাই করুন
        </h2>
        <p id="religion-dialog-description" className="mt-1 text-[12px] text-white/65">
          কোন ধর্মের পাত্র-পাত্রী দেখতে চান?
        </p>
      </div>
      <ReligionForm onSelect={onSelect} />
    </dialog>
  );
}

function BottomSheet({ onClose, onSelect }) {
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 bottom-0 z-[9999] rounded-t-3xl bg-white shadow-[0_-8px_32px_rgba(0,0,0,0.25)]"
        style={{ animation: "religion-sheet-up 0.25s ease-out" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>
        <div className="bg-gradient-to-b from-[#0D7377] to-[#085860] px-5 pb-4 pt-5 text-center text-white">
          <h2 className="text-lg font-extrabold">পছন্দ বাছাই করুন</h2>
          <p className="mt-1 text-[12px] text-white/65">
            কোন ধর্মের পাত্র-পাত্রী দেখতে চান?
          </p>
        </div>
        <ReligionForm onSelect={onSelect} />
      </div>
      <style>{`
        @keyframes religion-sheet-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export function ReligionPreferenceProvider({ children }) {
  const pathname = usePathname();
  const [religion, setReligion] = useState(null);
  const [ready, setReady] = useState(false);
  const [showChooser, setShowChooser] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Legal information must remain readable without choosing a browsing preference.
  const canShowChooser = showChooser && pathname != null &&
    !LEGAL_PAGE_PATHS.has(pathname.replace(/\/+$/, "") || "/");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    try {
      const saved = getReligionCookie();
      if (saved === "all" || religionToApiKey[saved]) {
        setReligion(religionToApiKey[saved] || null);
      } else {
        setShowChooser(true);
      }
    } catch {
      setShowChooser(true);
    }
    setReady(true);
  }, []);

  const chooseReligion = (value) => {
    const canonical = religionToApiKey[value] || null;
    setReligion(canonical);
    setReligionCookie(canonical || "all");
    setShowChooser(false);
  };

  return (
    <ReligionPreferenceContext.Provider value={{ religion, ready, chooseReligion }}>
      {children}
      {canShowChooser && !isMobile && (
        <DialogModal
          onClose={() => setShowChooser(false)}
          onSelect={chooseReligion}
        />
      )}
      {canShowChooser && isMobile && (
        <BottomSheet
          onClose={() => setShowChooser(false)}
          onSelect={chooseReligion}
        />
      )}
    </ReligionPreferenceContext.Provider>
  );
}

export const useReligionPreference = () => useContext(ReligionPreferenceContext);
