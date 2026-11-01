import { useState } from "react";
import BioDataFilter from "../BioDataFilter/BioDataFilter";
import BioDataInput from "../BioDataInput/BioDataInput";

const tabs = [
  { id: "filter", label: "ফিল্টার সমূহ" },
  { id: "biodataid", label: "বায়োডাটা নং" },
];

export function BioDataTab() {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div role="tablist" className="flex flex-row rounded-xl bg-gray-100 p-1">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`biodata-tab-${id}`}
            aria-selected={active === id}
            aria-controls={`biodata-panel-${id}`}
            onClick={() => setActive(id)}
            className={`flex min-h-11 w-full items-center justify-center rounded-md px-2 py-1 text-sm font-bold text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 ${
              active === id ? "bg-white shadow" : "bg-transparent"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`biodata-panel-${active}`}
        aria-labelledby={`biodata-tab-${active}`}
        className="pt-3 text-base font-light leading-relaxed text-gray-700"
      >
        {active === "filter" ? <BioDataFilter /> : <BioDataInput />}
      </div>
    </div>
  );
}
