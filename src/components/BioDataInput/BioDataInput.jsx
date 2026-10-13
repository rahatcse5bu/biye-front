import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "@/lib/navigation";

const BioDataInput = () => {
  const [bioId, setBioId] = useState("");
  const navigate = useNavigate();

  const navigateHandler = () => {
    if (Number(bioId) < 2000) return;
    navigate(`/biodata/${bioId}`);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4">
      <label
        htmlFor="biodata-number"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        বায়োডাটা নম্বর
      </label>
      <input
        id="biodata-number"
        value={bioId}
        onChange={(event) => setBioId(event.target.value)}
        type="number"
        inputMode="numeric"
        placeholder="যেমন: ২০৬৮"
        className="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 outline-none focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10"
      />

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-3 py-3 text-sm font-bold text-white hover:bg-[#0F8287] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={navigateHandler}
          disabled={Number(bioId) < 2000}
        >
          <AiOutlineSearch className="h-5 w-5" aria-hidden="true" />
          খুঁজুন
        </button>
      </div>
    </div>
  );
};

export default BioDataInput;
