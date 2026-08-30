import { ChevronDownIcon } from "@heroicons/react/24/outline";

const CustomAccordion = ({ title, isOpen, onToggle, children }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-12 w-full items-center justify-between gap-3 bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-900"
      >
        <span className="text-base font-bold text-gray-800">{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="border-t border-gray-100 bg-white p-3 sm:p-4">
          {children}
        </div>
      )}
    </section>
  );
};

export default CustomAccordion;
